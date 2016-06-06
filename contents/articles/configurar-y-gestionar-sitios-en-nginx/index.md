---
title: Configurar y gestionar sitios en Nginx I
author: jonalvarezz
date: 2014-01-24 16:00
template: article.jade
thumb: nginx_featured_image_emerald_bg_1.jpg
---

*¿Así que quieres/debes abandonar tu querido servidor Apache con CPanel, te pasas a Nginx y no sabes cómo empezar?*

Aunque al principio Nginx paresca confuso, verás que es estúpidamente simple y flexible. *Además de rápido.*

Lo que muestro a continuación es la forma más recomendada y pro de mantener tus sitios en orden en Nginx.

> Las ubicaciones pueden variar de acuerdo a la distribución linux utilizada. Se muestran como ejemplo en Archlinux

Lo primero es darle una configuración básica a Nginx.

Reemplaza el contenido del archivo `/etc/nginx/nginx.conf` por:

	# https://github.com/perusio/wordpress-nginx

	user http; 
	worker_processes 1; 

	error_log logs/error.log;
	#error_log logs/error.log notice; 
	#error_log logs/error.log info; 

	#pid logs/nginx.pid;

	events {
		worker_connections 2048;
		# optmized to serve many clients with each thread, essential for linux Accept as many connections as possible.
		use epoll;

		# Accept as many connections as possible.
		multi_accept on;
	}
	http {

		include mime.types;
		default_type application/octet-stream;
		server_names_hash_bucket_size 64;

		#log_format main '$remote_addr - $remote_user [$time_local] \"$request\" '
		#                  '$status $body_bytes_sent \"$http_referer\" ' '\"$http_user_agent\" \"$http_x_forwarded_for\"'; access_log 
		#off;
		## FastCGI.
		include /etc/nginx/fastcgi.conf;

		## Use sendfile() syscall to speed up I/O operations and speed up static file serving.}
		sendfile on;

		## Handling of IPs in proxied and load balancing situations.
		#set_real_ip_from 0.0.0.0/32; # all addresses get a real IP. real_ip_header X-Forwarded-For; # the ip is forwarded from the 
		#load balancer/proxy

		## Define a zone for limiting the number of simultaneous connections nginx accepts. 1m means 32000 simultaneous sessions. 
		## We need to define for each server the limit_conn value refering to this or other zones. ** This syntax requires nginx 
		## version >= ** 1.1.8. Cf. http://nginx.org/en/CHANGES. If using an older ** version then use the limit_zone directive 
		## below ** instead. Comment out this ** one if not using nginx version >= 1.1.8.
		limit_conn_zone $binary_remote_addr zone=arbeit:10m;

		## Define a zone for limiting the number of simultaneous connections nginx accepts. 1m means 32000 simultaneous sessions. 
		## We need to define for each server the limit_conn value refering to this or other zones. ** Use this directive for nginx 
		## versions below 1.1.8. Uncomment the line below.
		#limit_zone arbeit $binary_remote_addr 10m;

		## Timeouts.
		client_body_timeout 60;
		client_header_timeout 60;
		keepalive_timeout 10 10;
		send_timeout 60;

		## Reset lingering timed out connections. Deflect DDoS.
		reset_timedout_connection on;

		## Body size.
		client_max_body_size 10m;

		## TCP options.
		tcp_nodelay on;

		## Optimization of socket handling when using sendfile.
		tcp_nopush on;

		## Compression.
		gzip on;
		gzip_buffers 16 8k;
		gzip_comp_level 1;
		gzip_http_version 1.1;
		gzip_min_length 10;
		gzip_types text/plain text/css application/x-javascript text/xml application/xml application/xml+rss text/javascript image/x-icon application/vnd.ms-fontobject font/opentype application/x-font-ttf;
		gzip_vary on;
		gzip_proxied any; # Compression for all requests.

		## No need for regexps. See http://wiki.nginx.org/NginxHttpGzipModule#gzip_disable
		gzip_disable \"msie6\";

		## Serve already compressed files directly, bypassing on-the-fly compression.
		gzip_static on;

		## Hide the Nginx version number.
		server_tokens off;

		## Use a SSL/TLS cache for SSL session resume. This needs to be here (in this context, for session resumption to work. See 
		## this thread on the Nginx mailing list: http://nginx.org/pipermail/nginx/2010-November/023736.html.
		#ssl_session_cache shared:SSL:10m; ssl_session_timeout 10m;

		## Enable clickjacking protection in modern browsers. Available in IE8 also. See 
		## https://developer.mozilla.org/en/The_X-FRAME-OPTIONS_response_header
		add_header X-Frame-Options sameorigin;

		## Include the upstream servers for PHP FastCGI handling config.
		#include upstream_phpcgi.conf;

		## Include the upstream servers for Apache handling the PHP processes. In this case Nginx functions as a reverse proxy.
		#include reverse_proxy.conf; include upstream_phpapache.conf;
		## Include the php-fpm status allowed hosts configuration block. Uncomment to enable if you're running php-fpm.
		#include php_fpm_status_allowed_hosts.conf;
		## Include blacklist for bad bot and referer blocking.
		#include blacklist.conf;

		## Include all vhosts.
		include /etc/nginx/sites-enabled/*;
	}


*Calm down. Es algo genérico y  funcionará con cualquier sitio.*

Sólo debes asegurarte que el usuario que utilices sea el que realmente emplea tu servidor, en Archlinux es `http`, otras distribuciones familia Debian como Ubuntu, utilizan `www-data`.

## Hora de modular
Ahora, creemos archivos de configuración para utilizarlos como módulos e incluirlos sólo en los sitios que queramos. Como por ejemplo para `php`, controles de seguridad, manejo de archivos estáticos comúnes y el que necesites.

	cd /etc/nginx/
	mkdir -p global

Algunas restricciones para archivos comunes `/etc/nginx/global/drop.conf`

	# http://centminmod.com/nginx_configure_wordpress.html
	location = /robots.txt { access_log off; log_not_found off; } 
	location = /favicon.ico { access_log off; log_not_found off; expires 30d; } 
	location ~ /\.  { access_log off; log_not_found off; deny all; } 
	location ~ ~$ { access_log off; log_not_found off; deny all; }
	location ~ /\.git { access_log off; log_not_found off; deny all; }

Algunos controles de seguridad `/etc/nginx/global/sec.conf`

	## http://centminmod.com/nginx_configure_wordpress.html
	# Deny access to any files with a .php extension in the uploads directory Works in sub-directory installs and also in multisite 
	# network
	location ~* /(?:uploads|files)/.*\.php$ {
	        deny all;
	}
	# Make sure files with the following extensions do not get loaded by nginx because nginx would display the source code, and 
	# these files can contain PASSWORDS!
	location ~* \.(engine|inc|info|install|make|module|profile|test|po|sh|.*sql|theme|tpl(\.php)?|xtmpl)$|^(\..*|Entries.*|Repository|Root|Tag|Template)$|\.php_  {
		return 444;
	}
	#nocgi
	location ~* \.(pl|cgi|py|sh|lua)\$ {
		return 444;
	}
	#disallow
	location ~* (roundcube|webdav|smtp|http\:|soap|w00tw00t) {
		return 444;
	}
	location ~ /(\.|wp-config.php|readme.html|license.txt) { deny all; }

Y este último para `php-fpm` en `/etc/nginx/global/php.conf`

	# PHP FastCGI config
	location ~ \.php$ {
		try_files $uri = 404;
		# socket
		fastcgi_pass unix:/var/run/php-fpm/php-fpm.sock;
		fastcgi_index index.php;
		include fastcgi.conf;
	}

Podemos verificar la sintaxis y estado ejecutando `nginx -t` si recibimos un error, tal vez escribiste algo mal.

Ahora continua [creando cada configuración específica para cada sitio](http://blog.jonalvarezz.com/configurar-y-gestionar-sitios-en-nginx-ii/).
