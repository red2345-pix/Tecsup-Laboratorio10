from django.contrib import admin
# Cambia 'TuApp' por el nombre de tu carpeta y 'Producto' por el nombre de tu modelo
from .models import Producto 

# Registrar el modelo en el panel de administración
admin.site.register(Producto)
