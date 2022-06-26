from django.urls import path
from . import views

urlpatterns = [
    path('list-of-donors/', views.DonorList.as_view(), name='list-of-donor'),
    path('donor/', views.DonorFormView.as_view(), name='donor'),
]