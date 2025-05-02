from django.conf import settings
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from auth.serializers import GoogleLoginSerializer

User = get_user_model()


class GoogleLoginAPIView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = GoogleLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data["id_token"]

        try:
            idinfo = id_token.verify_oauth2_token(
                token, google_requests.Request(), settings.GOOGLE_CLIENT_ID
            )

            if idinfo["iss"] not in [
                "accounts.google.com",
                "https://accounts.google.com",
            ]:
                return Response(
                    {"detail": "Invalid issuer."}, status=status.HTTP_400_BAD_REQUEST
                )

            email = idinfo.get("email")
            if not email:
                return Response(
                    {"detail": "Email not found in token."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user_data = {
                "email_verified": idinfo.get("email_verified", False),
                "username": email,
            }

            user, _ = User.objects.update_or_create(email=email, defaults=user_data)

            refresh = RefreshToken.for_user(user)

            return Response(
                {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                }
            )

        except ValueError as e:
            return Response(
                {"detail": "Invalid token.", "error": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )
