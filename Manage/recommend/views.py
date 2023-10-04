from django.shortcuts import render
from rest_framework import generics
from account.models import CustomUser
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from recommend.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from api.models import project
User = get_user_model()
import pandas as pd
import json
from io import StringIO
import csv
from recommend.mlModels.recom2 import recommend_projects
from recommend.mlModels.find import find_project

from api.serializers import ProjectSerializer
# Create your views here.


class Recommend(generics.ListAPIView):
    permission_classes = (AllowAny,)

    def get(self, request, id, domain):
        AllProjects = project.objects.all()
        jsonDataAllProject=ProjectSerializer(AllProjects,many=True)
        User = CustomUser.objects.all()
        jsonDataAllUser=UserCreateSerializer(User,many=True)
        userData=json.dumps(jsonDataAllUser.data)
        projectData=json.dumps(jsonDataAllProject.data)
        dataProject = json.loads(projectData)
        dataUser = json.loads(userData)
        # to convert into csv
        csv_buffer1 = StringIO()
        csv_writer1 = csv.DictWriter(csv_buffer1, fieldnames=dataProject[0].keys())
        csv_writer1.writeheader()
        csv_writer1.writerows(dataProject)
        csv_data1 = csv_buffer1.getvalue()
        csv_buffer1.close()
        # output_csv_file_path = 'Project.csv'
        # with open(output_csv_file_path, 'w', newline='') as csv_file:
        #     csv_file.write(csv_data1)

        # print(f'CSV data saved to {output_csv_file_path}')

        # to convert into csv
        csv_buffer2 = StringIO()
        csv_writer2 = csv.DictWriter(csv_buffer2, fieldnames=dataUser[0].keys())
        csv_writer2.writeheader()
        csv_writer2.writerows(dataUser)
        csv_data2 = csv_buffer2.getvalue()
        csv_buffer2.close()
        StringData1 = StringIO(csv_data1)
        df1 = pd.read_csv(StringData1, sep =";")
        StringData2 = StringIO(csv_data2)
        df2 = pd.read_csv(StringData2, sep =";")
        merged_data=pd.merge(df1,df2,on='email',how='inner')
        # print(f'CSV data saved to {output_csv_file_path}')

        # combining above csv data
        fieldnames = ['name', 'age', 'is_active', 'user_permissions', 'is_staff', 'last_login',
              'preferred_language', 'full_name', 'branch', 'level_of_understanding_of_preferred_language',
              'academic_year', 'is_superuser', 'first_name', 'email', 'date_joined', 'groups',
              'last_name', 'university']
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

        output_csv_file_path = 'rand1.csv'
        with open(output_csv_file_path, 'w', newline='') as csv_file:
            csv_file.write(csv_data1)
        output_csv_file_path = 'rand2.csv'
        with open(output_csv_file_path, 'w', newline='') as csv_file:
            csv_file.write(csv_data2)
        output_csv_file_path = 'rand3.csv'
        with open(output_csv_file_path, 'w', newline='') as csv_file:
            csv_file.write(merged_data)

        # print(f'CSV data saved to {output_csv_file_path}')

        print(merged_data)
        return Response('louvere lage pade hai')
