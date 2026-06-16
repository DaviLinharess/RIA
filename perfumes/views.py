from rest_framework import viewsets
from .models import Perfume
from .serializers import PerfumeSerializer

class PerfumeViewSet(viewsets.ModelViewSet):
    queryset = Perfume.objects.all()
    serializer_class = PerfumeSerializer
