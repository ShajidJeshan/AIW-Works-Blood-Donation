from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.db.models import Q
import requests
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
app_time_zone = 'Asia/Omsk'
from .serializers import *
from core.models import *
import os
from collections import OrderedDict

class CustomPageNumber(PageNumberPagination):
    page_size = 20

    def get_paginated_response(self, data):
        return Response(OrderedDict([
             ('count', self.page.paginator.count),
             ('next', self.get_next_link()),
             ('previous', self.get_previous_link()),
             ('results', data)
         ]))

class DonorList(APIView,CustomPageNumber):
    """Available Donor List API.

    Args:
        APIView ([class]): inherits default APIView of Django REST Framework(DRF)
    """

    permission_classes = (AllowAny, )

    def get(self, request, format=None):
        """Getting Available Donor list data. Authentication does not require.

        Args:
            request ([GET]): http://127.0.0.1:8000/api/list-of-donors/

        Returns:
            [json]: Multiple dictionary object in a list.
            {
                "count": 5,
                "next": null,
                "previous": null,
                "results": [
                    {
                        "id": 1,
                        "firstname": "Shajid",
                        "lastname": "Jeshan",
                        "age": "24",
                        "sex": "Male",
                        "location": "Dhaka",
                        "blood_group": "O+"
                    },
                    {
                        "id": 2,
                        "firstname": "Moinul",
                        "lastname": "Islam",
                        "age": "26",
                        "sex": "Male",
                        "location": "Dhaka",
                        "blood_group": "O+"
                    },
                    ...
                ]
            }
        """
        try:
            donor_list = Donor.objects.all().order_by('id')
            page = self.paginate_queryset(donor_list,request)
            for i in page:
                if 'NEG' in i.blood_group:
                    i.blood_group = i.blood_group.replace('NEG','-')
                elif 'POS' in i.blood_group:
                    i.blood_group = i.blood_group.replace('POS','+')
            serializer = DonorSerializer(page, many=True)
            
            if(serializer.data):
                return self.get_paginated_response(serializer.data)
            else:
                res = {
                        "error" : "Data Not Found"
                    }
                return Response(res, status=status.HTTP_204_NO_CONTENT)

        except Exception as e:
            res = {
                "error" : e.args[0]
            }
            return Response(res, status=status.HTTP_400_BAD_REQUEST)
 