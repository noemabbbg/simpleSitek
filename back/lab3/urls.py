"""lab3 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from lab3_app import views as db_views
from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenRefreshView, TokenVerifyView,
)

from lab3_app.views import MyTokenObtainPairView, ComicManAPIView, UpdateComicViewSet

router_comics = routers.DefaultRouter()
router_comics.register(r'Comics', db_views.ComicViewSetUser)
router_comics.register(r'ComicsMan', db_views.ComicViewSetMan)
router_comics.register(r'Publishers', db_views.PubViewSet)
router_comics.register(r'Developers', db_views.DevViewSet)
router_comics.register(r'Genres', db_views.GenViewSet)
router_comics.register(r'Users', db_views.UserViewSet)
router_comics.register(r'Cart', db_views.CartViewSet)
router_comics.register(r'Library', db_views.LibViewSet)
#router_comics.register(r'Prices', db_views.PriceFilterListView)

urlpatterns = [
    path('', include(router_comics.urls)),
    path('api-auth/', include('rest_framework.urls', namespace = 'rest_framework')),
    path('find_comic/', db_views.ComicAPIView.as_view()),
    path('find_genre/', db_views.GenApiView.as_view()),
    path('filter_price/', db_views.PriceFilterView.as_view()),
    path('admin/', admin.site.urls),
    path('api/', include('lab3_app.urls')),
    path('api/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('updateComic/', UpdateComicViewSet),
    path('getComicByMan/', ComicManAPIView.as_view())
]
