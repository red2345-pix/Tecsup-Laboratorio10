from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # <--- Asegúrate de que termine en .urls
    path('api/', include('productos.urls')),
]
