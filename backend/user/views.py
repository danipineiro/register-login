import logging

from rest_framework import views, permissions
from rest_framework import generics
from rest_framework.response import Response

from . import tasks
from .models import User
from .serializers import UserSerializer

logger = logging.getLogger(__name__)


class UserSignUpView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        tasks.send_welcome_email.delay(user.email, user.first_name, user.last_name)
        tasks.send_welcome_sms.delay(user.phone_number, user.first_name, user.last_name)


class UserProfileView(views.APIView):

    def get(self, request, *args, **kwargs):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
