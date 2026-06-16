from django.db import models

class Perfume(models.Model):
    nome = models.CharField(max_length=255)
    valor = models.FloatField()
    ativo = models.BooleanField(default=True)

    def __str__(self):
        return self.nome