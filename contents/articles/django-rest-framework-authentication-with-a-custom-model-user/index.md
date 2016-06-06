---
title: Django Rest Framework Authentication with a custom Model User
author: jonalvarezz
date: 2015-7-7 10:54
template: article.jade
---

**Django Rest Framework** uses the Django user model by default. If you have a custom user model, you will get this error when trying to browse the API with a logged in user:

```
TypeError at /some/endpoint/
'bool' object is not iterable
...
```

You need to create your own authentication model in order to Django Rest Framework authenticate the resquest.

First, create and `authentication.py` file under your project primary folder, wich defines the authenticate class:

```python
from your.custom.user.model.path import User
from rest_framework import authentication
from rest_framework import exceptions

class ApiAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        username = request.META.get('X_USERNAME')
        if not username:
            return None

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed('No such user')

        return (user, None)

```

The first line is the line what really matters; and note that our authentication class extends the Django Rest Framework default one: `BaseAuthentication`.

Now, in your `settings.py` :
```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'your-proyect.authentication.ApiAuthentication',
    )
    }
```

And that's all.

## More Info
* [Authentication - Django Rest Framework Documentation](http://www.django-rest-framework.org/api-guide/authentication/)
