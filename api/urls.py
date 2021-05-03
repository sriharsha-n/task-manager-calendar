from django.urls import path
from .views import *

urlpatterns=[
    path('new-task/',NewTask.as_view()),
    path('task/<str:pk>/',TaskDetail.as_view()),
    path('tasks/',UserTasks.as_view()),
    path('tasks/<str:date>/',UserDateTasks.as_view()),
    path('create-user/',CreateUser.as_view()),
    path('login/',Login.as_view()),
    path('is-logged-in/',checkLogin.as_view()),
]