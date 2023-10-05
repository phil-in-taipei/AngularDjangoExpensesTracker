from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import IncomeSource
from .serializers import IncomeSourceSerializer


class IncomeSourceEditAndDeleteView(
        generics.RetrieveUpdateDestroyAPIView
        ):
    permission_classes = (
        IsAuthenticated,
    )
    lookup_field = 'id'
    serializer_class = IncomeSourceSerializer
    model = serializer_class.Meta.model
    http_method_names = ['patch', 'delete']
    queryset = IncomeSource.objects.all()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        id = instance.id
        self.perform_destroy(instance)
        return Response(data={"id": id,
                        "message": "Income source successfully deleted!"})

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class IncomeSourceListView(APIView):
    permission_classes = (
        IsAuthenticated,
    )

    def get(self, request, *args, **kwargs):
        users_income_sources = IncomeSource.objects.filter(user=request.user)
        serializer = IncomeSourceSerializer(users_income_sources, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = IncomeSourceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user_id=request.user.id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
