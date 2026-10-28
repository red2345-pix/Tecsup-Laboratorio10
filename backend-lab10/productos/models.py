from django.db import models

class Producto(models.Model):
    codigo = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=255)
    precio = models.FloatField()

    def __str__(self):
        return self.descripcion
