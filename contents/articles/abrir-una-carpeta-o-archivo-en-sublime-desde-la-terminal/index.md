---
title: Abrir una carpeta o archivo en Sublime Text desde la Terminal
author: jonalvarezz
date: 2014-12-8 12:48
template: article.pug
---

Si eres desarrollador, poder abrir cualquier archivo o carpeta entera en Sublime Text mientras se esta trabajando en la terminal sin duda es algo que no puede faltar si quieres ahorrarte algunos segundos y clicks extras.

<iframe width="760" height="428" src="//www.youtube.com/embed/P1WW3wTU4WY?controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

Los pasos para hacerlo son:

1\. Crear un enlace simbólico de la aplicación de Sublime Text en `/usr/local/bin/`

    # ln -s /Applications/Sublime Text.app/Contents/SharedSupport/bin/subl usr/local/bin/subl

Pueden crear el enlace con cualquier nombre. Prefiero `subl` porque es mas corto.

2\. Asegurarse de que `/usr/local/bin` se encuentre en nuestro `$PATH`, pueden revisarlo abriendo el archivo `~/.bash_profile` o bien revisando la salida de esa variable:

    $PATH

En caso que la salida de que la ruta no este incluida la agregan al archivo `~/.bash_profile`

3\. Cargar el archivo bash nuevamente. También pueden cerrar por completo la terminal y abrirla de nuevo para retomar los cambios.

    $ source ~/.bash_profile

## Modo de uso

Podemos **abrir archivos o carpetas completas desde la terminal en Sublime Text**:

- Para abrir archivos en específico

      		$ subl nombre_del_archivo

- Para abrir carpetas completas

      		$ subl /ruta/de/la/carpeta/

O bien si nos encontramos en la carpeta de nuestro interés, basta con reemplazar la ruta con un punto

    $ subl .
