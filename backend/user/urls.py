from django.urls import path

from .views import UserSignUpView, UserProfileView

urlpatterns = [
    path('signup/', UserSignUpView.as_view(), name='signup'),
    path('profile/', UserProfileView.as_view(), name='profile'),
]
