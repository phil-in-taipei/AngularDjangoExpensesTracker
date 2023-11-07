import datetime
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Expense, SpendingRecord
from .serializers import ExpenseSerializer, SpendingRecordSerializer


class ExpenseEditAndDeleteView(
        generics.RetrieveUpdateDestroyAPIView
        ):
    permission_classes = (
        IsAuthenticated,
    )
    lookup_field = 'id'
    serializer_class = ExpenseSerializer
    model = serializer_class.Meta.model
    http_method_names = ['patch', 'delete']
    queryset = Expense.objects.all()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        id = instance.id
        self.perform_destroy(instance)
        return Response(data={"id": id,
                        "message": "Expense successfully deleted!"})

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class ExpensesListView(APIView):
    permission_classes = (
        IsAuthenticated,
    )

    def get(self, request, *args, **kwargs):
        users_expenses = Expense.objects.filter(user=request.user)
        serializer = ExpenseSerializer(users_expenses, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = ExpenseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user_id=request.user.id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SpendingRecordDeleteView(
        generics.RetrieveDestroyAPIView
        ):
    permission_classes = (
        IsAuthenticated,
    )
    lookup_field = 'id'
    serializer_class = SpendingRecordSerializer
    model = serializer_class.Meta.model
    http_method_names = ['delete']
    queryset = SpendingRecord.objects.all()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        id = instance.id
        self.perform_destroy(instance)
        return Response(data={"id": id,
                        "message": "Spending Record successfully deleted!"})


class SpendingRecordListView(APIView):
    permission_classes = (
        IsAuthenticated,
    )

    def get(self, request, *args, **kwargs):
        month = self.kwargs.get("month")
        year = self.kwargs.get("year")
        start_date = datetime.date(int(year), int(month), 1)
        if int(month) == 12:
            finish_date = datetime.date(int(year) + 1, 1, 1)
        else:
            finish_date = datetime.date(int(year), int(month) + 1, 1)
        spending_records = SpendingRecord.objects.filter(
            date__gte=start_date,
            date__lt=finish_date,
            expense__user=self.request.user).order_by('date')
        serializer = SpendingRecordSerializer(spending_records, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = SpendingRecordSerializer(data=request.data)
        print('this is the data in the view')
        print(serializer)
        if serializer.is_valid():
            serializer.save(expense_id=request.data['expense']['id'],
                            currency_id=request.data['currency']['id'])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

