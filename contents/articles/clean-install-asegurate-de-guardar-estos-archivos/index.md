---
title: ¿Realizarás un Clean Install del nuevo OSX? Asegúrate de guardar estos archivos
author: jonalvarezz
date: 2014-10-17 13:15
template: article.pug
---

Me gusta aprovechar al máximo todas las caracterísiticas de las nuevas versiones de sistemas operativos, en especial en OSX, por eso siempre que sale una nueva versión no lo pienso dos veces para realizar una instalación en limpio (Clean Install)

Particularmente no utilizo gestores de backup como **Time Machine, o copia completa del disco duro**. Lo hago todo _a la antigua_: copio manualmente mis archivos, sólo los realmente importantes, en una **memoría USB** y luego los restauro.

El proceso es más lento, si, pero me aseguro que Disfrutaré del nuevo sistema _como recién salido de la caja_, como nuevo, como a la gente de Palo Alto mejor les ha parecido.

> Al usar Time Machine para restaurar tus datos también restauras las aplicaciones y tus configuraciones anteriores. Podrías perderte de alguna nueva característica y nunca darte cuenta.

Sin embargo hay archivos que guardan ciertas configuraciones y que no son necesariamente propios de OSX y que deberías asegurarte de guardar.

En mi caso:

- **Imágenes de tus máquinas virtuales.** Recrearlas es fácil, pero meh. En Virtualbox puedes exportar las imágenes que quieres utilizando `File -> Export Appliance`

- **Archivos de configuración (dotfiles).** Las configuraciones que no quieres perder de tus herramientas favoritas, yo las mantengo siempre en un [repositorio de GitHub](https://github.com/jonalvarezz/my-dot-files) actualizadas para el momento que las necesite.

- **Configuración de SSH** Si tienen la buena costumbre de definir los parámetros de conexión de sus servidores en SSH, no querrán volverlo a hacer. `~/ssh/config`

- **Historia de la terminal de comandos** Con el tiempo siempre será más valiosa, yo atesoro la mia y siempre hago backup de mi `~/.zsh_history`. En el caso que uses bash sería: `~/.zsh_history`. Por razones de seguridad esto es uno de los archivos que no incluyo en mis [dot-files públicos](https://github.com/jonalvarezz/my-dot-files)

- **Tus sitios locales y sus bases de datos** Los archivos por lo general no se te escaparan, pero si tienes bases de datos en MySQL no olvides exportarlas. Puedes usar `mysqldump` o bien utilizar algún gestor gráfico como [Sequel PRO](http://www.sequelpro.com)

- **Entornos virtuales de Python** Si los usas, sería problemático crearlos de nuevo. Por defecto están en `~/.enviroments`

- **Los marcadores de tu navegador** Lamentable perder tan valiosa recopilación.

- **Gestores de Contraseña** Asegúrate de tener como recuperar tu información de contraseñas si usas Apps como **1Password** o similares. Lo mejor es utilizar sincronización por iCloud o Dropbox y así recuperar tu información.

- **Llaves privadas** Utilizo [GPG Suite](https://gpgtools.org/) para gestionar mis llaves y principalmente [firmar mis git-commits](https://stealthpuppy.com/signing-git-commits-for-sweet-verified-badges/), y afortunadamente cuenta con opciones para exportar/importar llaves.

- **Carpetas ocultas** Tal vez tengas alguna carpeta oculta con información muy importante o porno.

¿Alguno que se me haya escapado o que te falte a tí?
