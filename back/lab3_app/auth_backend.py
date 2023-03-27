import jwt
import datetime
from typing import Optional
from rest_framework import authentication, exceptions
from django.conf import settings

from lab3_app.models import Users


class AuthBackend(authentication.BaseAuthentication):
    authentication_header_prefix = 'Token'

    def authenticate(self, request, token = None, **kwargs) -> Optional[tuple]:
        auth_header = authentication.get_authorization_header(request).split()

        if not auth_header or auth_header[0].lower() != b'token':
            return None

        if len(auth_header) == 1:
            raise exceptions.AuthenticationFailed('Invalid token header.')
        elif len(auth_header) > 2:
            raise exceptions.AuthenticationFailed('Token string should not contain spaces')

        try:
            token = auth_header[1].decode('utf-8')
        except UnicodeError:
            raise exceptions.AuthenticationFailed('Token string should not contain invalid characters.')
        return self.authenticate_credential(token)

    def authenticate_credential(self, token) -> tuple:
        try:
            payload = jwt.decode(token, settings.SIMPLE_JWT['SIGNING_KEY'], algorithms=settings.SIMPLE_JWT['ALGORITHM'])
        except jwt.pyJWTError:
            raise exceptions.AuthenticationFailed('Could not decode token')

        token_exp = datetime.datetime.fromtimestamp(payload['exp'])
        if token_exp < datetime.datetime.utcnow():
            raise exceptions.AuthenticationFailed('Token expired.')

        try:
            user = Users.objects.get(id = payload['user_id'])
        except Users.DoesNotExist:
            raise exceptions.AuthenticationFailed('No user matching this token was found.')

        return user, None

