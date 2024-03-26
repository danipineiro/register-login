import logging

from rest_framework import permissions
from rest_framework import generics

from .models import User
from .serializers import RegisterUserSerializer

logger = logging.getLogger(__name__)


class UserSignUpView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)

    queryset = User.objects.all()
    serializer_class = RegisterUserSerializer
