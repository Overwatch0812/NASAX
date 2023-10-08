import csv
from io import StringIO
import json
import pandas as pd
from account.models import CustomUser
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth import get_user_model
from api.models import project
from api.serializers import ProjectSerializer
User = get_user_model()
from .mlModels.func import get_recommendations

# Create your views here.


class Suggest(generics.ListAPIView):
    permission_classes = (AllowAny,)
    def get_queryset(self):
        queryset=User.objects.all()
        return queryset
    

    def get(self, request, id):
        # to get current users data
        User = CustomUser.objects.get(id=id)
        jsonDataAllUser = UserSerializer(User)
        userData = json.dumps(jsonDataAllUser.data)
        dataUser = json.loads(userData)
        val=dataUser['email']
        
        # to convert projects table data into csv
        AllProjects = project.objects.all()
        jsonDataAllProject = ProjectSerializer(AllProjects, many=True)
        projectData = json.dumps(jsonDataAllProject.data)
        dataProject = json.loads(projectData)
        csv_buffer1 = StringIO()
        csv_writer1 = csv.DictWriter(
            csv_buffer1, fieldnames=dataProject[0].keys())
        csv_writer1.writeheader()
        csv_writer1.writerows(dataProject)
        csv_data1 = csv_buffer1.getvalue()
        csv_buffer1.close()
        # output_csv_file_path = 'creator_data.csv'
        # with open(output_csv_file_path, 'w', newline='') as csv_file:
        #     csv_file.write(csv_data1)
        AllUsers = CustomUser.objects.all()
        jsonDataAllUser = UserSerializer(AllUsers, many=True)
        usersData = json.dumps(jsonDataAllUser.data)
        dataUser = json.loads(usersData)
        csv_buffer2 = StringIO()
        csv_writer2 = csv.DictWriter(
            csv_buffer2, fieldnames=dataUser[0].keys())
        csv_writer2.writeheader()
        csv_writer2.writerows(dataUser)
        csv_data2 = csv_buffer2.getvalue()
        csv_buffer2.close()
        # print(csv_data1)
        # print(csv_data2)
        # output_csv_file_path = 'contributors_data.csv'
        # with open(output_csv_file_path, 'w', newline='') as csv_file:
        #     csv_file.write(csv_data2)
        # print(f'CSV data saved to {output_csv_file_path}')
        # main func call
        csv_data1 = pd.read_csv(StringIO(csv_data1))
        csv_data2 = pd.read_csv(StringIO(csv_data2))
        # print(get_recommendations(csv_data1,csv_data2,val, id))
        suggested_users, suggested_projects = get_recommendations(csv_data1,csv_data2,val, id)
        # print(suggested_users)
        # print(suggested_projects)
        data={'a':suggested_users,'b':suggested_projects}
        # to convert into csv
        # print(data)
        return Response(data)
        # StringData1 = StringIO(csv_data1)
        # df1 = pd.read_csv(StringData1, sep=";")
        # StringData2 = StringIO(csv_data2)
        # df2 = pd.read_csv(StringData2, sep=";")
        # merged_data = pd.merge(df1, df2, on='email', how='inner')
        # print(f'CSV data saved to {output_csv_file_path}')

        # combining above csv data
        # fieldnames = ['name', 'age', 'is_active', 'user_permissions', 'is_staff', 'last_login',
        #               'preferred_language', 'full_name', 'branch', 'level_of_understanding_of_preferred_language',
        #               'academic_year', 'is_superuser', 'first_name', 'email', 'date_joined', 'groups',
        #               'last_name', 'university']
        # csv_reader1 = csv.DictReader(StringIO(csv_data1),fieldnames=fieldnames)
        # data1 = [row for row in csv_reader1]

        # csv_reader2 = csv.DictReader(StringIO(csv_data2),fieldnames=fieldnames)
        # data2 = [row for row in csv_reader2]
        # combined_data = data1 + data2

        # merged_csv_buffer = StringIO()
        # csv_writer3 = csv.DictWriter(merged_csv_buffer, fieldnames=fieldnames)

        # csv_writer3.writeheader()
        # csv_writer3.writerows(combined_data)
        # merged_csv_data = merged_csv_buffer.getvalue()
        # merged_csv_buffer.close()

        # output_csv_file_path = 'rand1.csv'
        # with open(output_csv_file_path, 'w', newline='') as csv_file:
        #     csv_file.write(csv_data1)
        # output_csv_file_path = 'rand2.csv'
        # with open(output_csv_file_path, 'w', newline='') as csv_file:
        #     csv_file.write(csv_data2)
        # output_csv_file_path = 'rand3.csv'
        # with open(output_csv_file_path, 'w', newline='') as csv_file:
        #     csv_file.write(merged_data)

        # print(f'CSV data saved to {output_csv_file_path}')

