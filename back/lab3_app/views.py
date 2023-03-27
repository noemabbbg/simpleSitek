from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from lab3_app.serializers import *
from lab3_app.models import Comic, Publishers, Developers, Genre, Users, Library
from rest_framework import generics, filters, permissions
from rest_framework.views import APIView, Response
from rest_framework.exceptions import AuthenticationFailed
import jwt
import datetime
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework 


class IsStaff(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_permission(self, request, view):
        return bool(request.user and (request.user.is_manager))
    



class ProductFilter(rest_framework.FilterSet):
    min_price = rest_framework.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = rest_framework.NumberFilter(field_name="price", lookup_expr='lte')
     
    class Meta:
        model = Comic
        fields = ['price', 'id', 'genre']


class PriceFilterView(generics.ListAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Comic.objects.all()
    serializer_class = ComicSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter


from rest_framework import permissions


class IsLoggedInUserOrAdmin(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
        return obj == request.user or request.user.is_staff


class IsAdminUser(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user and request.user.is_staff

    def has_object_permission(self, request, view, obj):
        return request.user and request.user.is_staff 


class IsExecutor(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        print(request.META['HTTP_USERID'])
        return obj.user_id != request.META['HTTP_USERID']
    

class IsLog(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
    
        return obj.user_id != request.META['HTTP_USERID']


class ComicViewSetUser(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    #permission_classes = [IsAuthenticated]
    queryset = Comic.objects.filter(is_deleted = False)
    serializer_class = ComicSerializer  # Сериализатор для модели


class ComicViewSetMan(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Comic.objects.all()
    serializer_class = ComicSerializer  # Сериализатор для модели

    #permission_classes = [IsAuthenticated]
@api_view(['PUT'], )
def UpdateComicViewSet(request):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    if request.method == 'PUT':
        #permission_classes = [permissions.IsAuthenticatedOrReadOnly]
        serializer = ComicSerializer(data = request.data)
        data = {}
        if serializer.is_valid():
            serializer.save()
            data["success"] = "update successful"
            return Response(data=data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PubViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Publishers.objects.all().order_by('id')
    serializer_class = PubSerializer  # Сериализатор для модели


class DevViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Developers.objects.all().order_by('id')
    serializer_class = DevSerializer  # Сериализатор для модели


class ComicAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    #permission_classes = [IsAuthenticated]
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    queryset = Comic.objects.filter(is_deleted = False)
    serializer_class = ComicSearchSerializer


class ComicManAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    search_fields = ['managed_by']
    filter_backends = (filters.SearchFilter,)
    queryset = Comic.objects.filter()
    serializer_class = ComicSearchSerializer


class GenViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Genre.objects.all().order_by('id')
    serializer_class = GenSerializer  # Сериализатор для модели


class GenApiView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    search_fields = ['id']
    filter_backends = (filters.SearchFilter,)
    queryset = Genre.objects.all()
    serializer_class = GenSearchSerializer

class PriceViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Genre.objects.all().order_by('id')
    serializer_class = GenSerializer  # Сериализатор для модели


class PriceApiView(generics.ListCreateAPIView):
    search_fields = ['id']
    filter_backends = (filters.SearchFilter,)
    queryset = Genre.objects.all()
    serializer_class = GenSearchSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Users.objects.all().order_by('pk')
    serializer_class = UserSerializer  # Сериализатор для модели


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        login = request.data['login']
        password = request.data['password']

        user = Users.objects.filter(login = login).first()

        if user is None:
            raise AuthenticationFailed('User not found.')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password.')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=15),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)

        response.data = {
            'jwt': token
        }

        return response


class UserView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        user = Users.objects.filter(id = payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }

        return response


class CartView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        serializer = CartSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    def get(self, request):
        serializer = CartSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class CartViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    permission_classes = [IsExecutor]
    search_fields = ['user_id__id']
    filter_backends = (filters.SearchFilter,)
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    @action(['post'], detail=True)
    def delete(self, request, pk = None):
        try:
            instance = Cart.objects.get(pk = pk)
            instance.delete()
            return Response({'Deleted'})
        except:
            return Response({'Not deleted'})



   # def delete(self, request, pk = None):
   #      try:
   #          cart = Cart.objects.get(pk = pk).delete()
   #          return Response({'Deleted'})
   #      except:
   #          return Response({'Not deleted'})


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['login'] = user.login
        token['email'] = user.email
        token['is_manager'] = user.is_manager;

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class LibView(APIView):
    permission_classes = [IsExecutor]

    def post(self, request):
        serializer = LibSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LibViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    permission_classes = [IsExecutor]
    search_fields = ['user_id__id']
    filter_backends = (filters.SearchFilter,)
    queryset = Library.objects.all()
    serializer_class = LibSerializer

    @action(['post'], detail=True)
    def delete(self, request, pk = None):
        try:
            instance = Library.objects.get(pk = pk)
            instance.delete()
            return Response({'Deleted'})
        except:
            return Response({'Not deleted'})