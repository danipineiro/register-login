import logging

from rest_framework import permissions, status
from rest_framework import generics
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response

from .models import User
from .serializers import RegisterUserSerializer, ProfileUserSerializer

logger = logging.getLogger(__name__)


class UserSignUpView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)

    queryset = User.objects.all()
    serializer_class = RegisterUserSerializer

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return Response(
                {"error": "You are already logged in."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().dispatch(request, *args, **kwargs)


class UserProfileView(RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ProfileUserSerializer

    def get_object(self):
        return self.request.user
