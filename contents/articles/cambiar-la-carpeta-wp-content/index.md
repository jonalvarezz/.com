---
title: Cómo cambiar la carpeta wp-content en Wordpress
author: jonalvarezz
date: 2014-11-3 13:44
template: article.jade
---

Una buena forma de personalizar aún más nuestro Wordpress es cambiar la carpeta `wp-content` por otra que elijamos.

Aunque el hecho que hagas esto **no evitará que se conozca que tu sitio es un Wordpress**, tal vez si ayude un poco a evitar bots automatizados que busquen vulnerabilidades en estos sitios, pues la estructura de archivos no será igual.

Pueden utilizar los nombres que quieran. Yo utilizaré la siguiente estructura

- `wp-content` ahora será `assets`
- La carpeta de `plugins` ahora será `scripts`
- La carpeta `uploads` ahora será `media`

Para hacerlo, modificaremos el archivo `wp-config.php`, pueden agregar esto al final.

	/**
	 * Changing Wordpress default directories
	 *
	 */
	define ('WP_CONTENT_FOLDERNAME', 'assets');
	define ('WP_CONTENT_DIR', ABSPATH . WP_CONTENT_FOLDERNAME);

	define('WP_SITEURL', 'http://sitioWordpress/');
	define('WP_CONTENT_URL', WP_SITEURL . WP_CONTENT_FOLDERNAME);

	define ('WP_PLUGIN_FOLDERNAME', 'scripts');
	define( 'WP_PLUGIN_DIR', WP_CONTENT_DIR . '/' . WP_PLUGIN_FOLDERNAME );
	define( 'WP_PLUGIN_URL', WP_CONTENT_URL . '/' . WP_PLUGIN_FOLDERNAME );

	define( 'UPLOADS', 'assets/media' );

Nótese que la URL del sitio debe *hardcodearse* en `WP_SITEURL` para que los plugins funcionen adecuadamente. 

Lo que resta por hacer es que cambies el nombre de las carpetas `wp-content`, `plugins` y `uploads` por los nuevos nombres que definiste.

Si todo ha salido bien, podrán acceder al administrador, instalar/eliminar temas, plugins y subir archivos como de costumbre. El cambio sólo se verá en la estructura de las URLs de sus archivos.
