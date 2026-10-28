from django.urls import path
from . import views

urlpatterns = [
    path('producto/', views.producto_list, name='producto_list'),
]
