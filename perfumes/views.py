from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Perfume
from .serializers import PerfumeSerializer

class PerfumeViewSet(viewsets.ModelViewSet):
    queryset = Perfume.objects.all()
    serializer_class = PerfumeSerializer
    permission_classes = [IsAuthenticated]
