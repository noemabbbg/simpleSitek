from lab3_app.models import Comic, Publishers, Developers, Genre, Users, Cart, Library
from rest_framework import serializers


class ComicSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Comic
        # Поля, которые мы сериализуем
        fields = ["id", "name", "genre", "releasedate", "developer", "publisher", "price", "managed_by", "is_deleted"]


class PubSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Publishers
        # Поля, которые мы сериализуем
        fields = ["id", "name"]


class DevSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Developers
        # Поля, которые мы сериализуем
        fields = ["id", "name"]


class ComicSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comic
        fields = ['id', "name", 'genre', "releasedate", "publisher", "developer",  "price", "managed_by", "is_deleted"]


class GenSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Genre
        # Поля, которые мы сериализуем
        fields = ["id", "name"]


class GenSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['pk', 'name']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Users
        # Поля, которые мы сериализуем
        fields = ["id", "login", "password", "email", "is_manager"]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['pk', 'user_id', 'comic_id', 'add_date']


class LibSerializer(serializers.ModelSerializer):
    class Meta:
        model = Library
        fields = '__all__'


'''class RegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = ["login", "password", "email"]
        extra_kwargs = {
            'password' : 
        }
'''

