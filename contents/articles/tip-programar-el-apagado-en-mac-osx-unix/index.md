---
title: TIP Programar el apagado en MAC OSX / *Unix
author: jonalvarezz
date: 2014-10-21 1:55
template: article.pug
---

Muchas veces dejamos nuestros equipos descargando archivos muy pesados en la noche mientras dormimos y aunque la descarga dure unas pocas horas, el equipo permanecerá encendido hasta que despertemos de nuevo.

Para evitar esto, podemos **programar el equipo para que se apague luego de cierto tiempo o a una hora específica**, así ahorramos algo de energía.

En la familia \*Unix programar el apagado del equipo es tan fácil como:

    $ sudo shutdown -h +90

Esto creará una un proceso de apagado que indica que el equipo se apagará dentro de 1 hora 30 minutos.

En general para apagar el equipo,

    $ sudo shutdown -h <time>

Donde `<time>` pueden ser los minutos a partir de los cuales se ejecutará el proceso de apagado `+minutos`, o bien una fecha exacta en formato `yymmddhhmm` año, mes, día, hora, minutos.

Si programan un apagado no olviden **desactivar la función de _dormir_ del equipo**, ya que podría dormir el proceso que se ha dejado ejecutando. Para esto utilizo en MAC OS X, [Sleep No More](http://sleepnomoreapp.com).

Para más información sobre este comando:

    $ man shutdown

Si has descargado algún programa de un tercero para hacer esto, deberías sentirte muy mal ahora mismo.
