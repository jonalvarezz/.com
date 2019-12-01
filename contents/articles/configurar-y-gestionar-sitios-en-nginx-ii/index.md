---
title: Configurar  y gestionar sitios en Nginx II
author: jonalvarezz
date: 2014-01-24 16:04
template: article.pug
---

Continuando, y ahora que tenemos nuestra [configuración global para Nginx](http://blog.jonalvarezz.com/configurar-y-gestionar-sitios-en-nginx/), veremos cómo administrar nuestros sitios.

Primero creamos dos carpetas sobre el directorio de configuración de Nginx

    cd /etc/nginx/
    mkdir -p sites-available
    mkdir -p sites-enabled

Los nombres de las carpetas describen su funcionalidad. **Esto es importante:** Crearemos un archivo `misitio.conf` en `sites-available` por cada sitio que queramos en nuestro servidor.

> En algunas distribuciones, como Ubuntu, viene un archivo predefinido llamado default. Recomiendo borrarlo y utilizar `misitio.conf`

De este modo, cada archivo `.conf` describirá configuraciones específicas para cada sitio, por ejemplo incluir o no `php` o servir como un frontend proxy para usar `node`, `django` ó demás. Nginx es supremamente flexible.

Así, un sitio típico con php para Nginx sería: `/etc/nginx/sites-available/misitio.conf`

    server {
    		listen 80;

    	server_name misitio.com;

    	root /srv/http/misitio;
    	index index.php index.html index.htm;

    	# limit_conn limit_per_ip 16; ssi on;
    				#location / {
    		#  Enables directory listings when index file not found
    	# autoindex on; Shows file listing times as local time autoindex_localtime on; Enable for vBulletin usage WITHOUT
    	# vbSEO installed try_files $uri $uri/ /index.php; root /usr/share/nginx/html; index index.html index.htm;
    				#}

    	location / {
    			root /srv/http/misitio;
    		try_files $uri $uri/ /index.php?$args;
    				}
    	include /etc/nginx/global/php.conf;
    	include /etc/nginx/global/drop.conf;
    }

Aclaremos unas cosas:

- `server_name` Lleva el dominio, en caso de no tener uno aún, usen la IP del servidor.
- `root` Especifica la ruta del servidor donde se encuentran los archivos del sitio. Es decir que en `/srv/http/` existe una carpeta de nombre `misitio` que contiene mis archivos de `html`, `php`, `css` y demás. **Usen siempre carpeta por sitio, así solo sea uno.**
- `include` Incluye archivos/ módulos adicionales para ese sitio que Nginx deberá tener en cuenta. Para este caso agregamos el módulo para ejecutar `php` y algunas excepciones para el servidor en `drop.conf` que [antes habíamos definido](http://blog.jonalvarezz.com/configurar-y-gestionar-sitios-en-nginx/).

El sitio está añadido, habilitémoslo entonces:

    cd /etc/nginx/sites-enabled/
    ln -s ../sites-available/misitio.conf misitio.conf

Si, sólo creamos un enlace simbólico a la configuración del sitio que queremos habilitar. Así no perdemos archivos de configuración cuando queramos dar sitios de baja.

Y sólo por confirmar, definamos permisos sobre la carpeta de nuestro sitio

    # chown -hR http:http /srv/http/

Recuerden cambiar el usuario `http` por el usuario correcto, por ejemplo en ubuntu debería ser `www-data`; Así mismo la ruta de archivos públicos, que en Ubuntu sería `/home/www/public/misitio/`

Nuestra configuración esta lista. Verificamos que todo este bien ejecutando `nginx -t` y reiniciamos el servicio de Nginx con `sudo systemctl nginx restart`. No debería aparecer algún error, y nuestro sitio debería ser visible desde el dominio especificado en `server_name`.
