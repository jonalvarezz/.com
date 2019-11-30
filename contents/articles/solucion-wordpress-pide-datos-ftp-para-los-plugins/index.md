---
title: Solución Wordpress pide datos FTP para los plugins
author: jonalvarezz
date: 2014-2-26 23:45
template: article.jade
---

Algunas veces, luego de instalar Wordpress, nos encontraremos que al acceder a nuestros plugins, bien sea para eliminar o instalar uno nuevo, Wordpress nos pide información de conexión relacionada a nuestro FTP.

## WHY?

Simple: permisos del servidor. – _Linux, qué_

Wordpress es incapaz de eliminar o crear nuevos ficheros en el directorio `/wp-content/plugins`.

Pasa frecuentemente cuando descargamos Wordpress en el `home` de nuestro usuario, lo descomprimimos y luego lo movemos a nuestra carpeta de acceso público o donde se ejecuta el servidor web.

Los permisos permanecerán definidos al del usuario que creó los archivos. El primero y que regularmente no coincide con el usuario que ejecuta el servidor web (\_www, http, www-data...)

## Cómo lo soluciono?

Arreglando permisos. _–Really?_

1\. Arreglar permisos de todos los directorios.

    # find * -type d | xargs chmod g+ws

2\. Arreglar permisos de todos los archivos.

    # find * -type f | xargs chmod g+w

3\. El más importante: Asignar a la carpeta que contiene wordpress `wpfolder` el mismo usuario y grupo que esta ejecutando el proceso de su servidor web (apache, nginx...)

    # chown -hR user:group wpfolder

Si no estan seguros de cuál usuario y grupo ejecuta ese proceso lo pueden averiguar con:

    ps aux | grep ‘apache’

Y con eso será suficiente.
