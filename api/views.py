from rest_framework import generics
from .serializers import TaskSerializer, UserSerializer
from .models import Task, User
from rest_framework.views import Response
import bcrypt
from .validators import checkStrongPassword
from rest_framework.views import APIView

class checkLogin(APIView):
    def get(self,request):
        if "id" in request.session:
            return Response({"message":"true"})
        return Response({"message":"false"})


class NewTask(generics.ListCreateAPIView):
    serializer_class=TaskSerializer
    queryset=Task.objects.all()
    # permission_classes = (check, )

    def post(self,request):
        if "id" in request.session:
            request.data['user_id'] = request.session['id']
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,201)
            return Response(serializer.errors,400)
        else:
            return Response({"message":"Not Authenticated"},400)


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class=TaskSerializer
    queryset=Task.objects.all()

    def put(self,request,*args,**kwargs):
        request.data['user_id'] = request.session['id']
        return super().put(request,*args,**kwargs)

class UserTasks(generics.ListAPIView):
    queryset=Task.objects.all()
    serializer_class=TaskSerializer
    lookup_field='user_id'

    def get(self, request, *args, **kwargs):
        if "id" not in request.session: 
            return Response({"message":"Not Authenticated"},400)
        user_id = request.session['id']
        tasks = Task.objects.filter(user_id=user_id)
        serializer = self.serializer_class(tasks,many=True)
        return Response(serializer.data,200)

class UserDateTasks(generics.ListAPIView):
    queryset=Task.objects.all()
    serializer_class=TaskSerializer

    def get(self,request,*args, **kwargs):
        if "id" not in request.session:
            return Response({"message":"Not Authenticated"},400)
        date=self.kwargs['date']
        user_id = request.session['id']
        tasks = Task.objects.filter(user_id=user_id,date=date)
        serializer = self.serializer_class(tasks,many=True)
        return Response(serializer.data,200)


def encryptPassword(password):
    encoded=password.encode('utf-8')
    hashed = bcrypt.hashpw(encoded,bcrypt.gensalt())
    decoded=hashed.decode('utf-8')
    return decoded

class CreateUser(generics.ListCreateAPIView):
    serializer_class=UserSerializer
    queryset=User.objects.all()

    def post(self,request):
        if "password" not in request.data:
            return Response({"message":"Password field is required"},400)
        password=request.data['password']
        if not checkStrongPassword(password):
            return Response({"message":"Strong Password Required"},400)
        
        request.data['password']=encryptPassword(password)
        return self.create(request)

class Login(APIView):
    def post(self,request):
        email=request.data['email']
        password=request.data['password']
        password=password.encode('utf-8')
        try:
            user = User.objects.get(email=email)
        except:
            return Response({"message":"Mail Id not registered"},400)
        store_password = user.password.encode('utf-8')
        if bcrypt.checkpw(password,store_password):
            request.session['id']=user.id
            return Response({"name":user.name,"id":request.session['id']},200)
        else:
            return Response({"message":"Incorrect Details"},400)