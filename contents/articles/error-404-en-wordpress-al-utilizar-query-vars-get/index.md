---
title: Error 404 en Wordpress al utilizar query vars (GET)
author: jonalvarezz
date: 2014-11-11 00:54
excerpt: Conoce las palabras reservadas que utiliza Wordpress para sus consultas públicas (GET) y como evitar un error 404 al usar tus propias consultas personalizadas
template: article.pug
---

Estaba creando una **página personalizada en Wordpress** en la que recibía información, a través de parámetros GET, desde un servicio externo y aunque la URL estaba bien escrita, los parámetros GET o query vars tampoco presentaban errores, **Wordpress me arrojaba a la página de error 404**, página no encontrada.

Me jodí muchas horas encontrando la causa, desde conflicto de plugins de caché, seguridad hasta configuración backend del servidor, nada parecia funcionar.

Finalmente fijándome en los parámetros que estaba recibiendo por GET noté que venía el atributo `name` y como bien se sabe éste parámetro es propio de Wordpress para sus búsquedas por GET.

En general, los parámetros o query vars que recibes por GET no pueden ser iguales a ninguno de los atributos de query_vars() de Wordpress ya que son palabras reservadas. _A no ser claro que tu propósito sea alterar el query de Wordpress._

Esta es la lista de palabras reservadas de query vars:

    var $public_query_vars = array('m', 'p', 'posts', 'w', 'cat', 'withcomments', 'withoutcomments', 's', 'search', 'exact', 'sentence', 'debug', 'calendar', 'page', 'paged', 'more', 'tb', 'pb', 'author', 'order', 'orderby', 'year', 'monthnum', 'day', 'hour', 'minute', 'second', 'name', 'category_name', 'tag', 'feed', 'author_name', 'static', 'pagename', 'page_id', 'error', 'comments_popup', 'attachment', 'attachment_id', 'subpost', 'subpost_id', 'preview', 'robots', 'taxonomy', 'term', 'cpage', 'post_type');

    var $private_query_vars = array('offset', 'posts_per_page', 'posts_per_archive_page', 'showposts', 'nopaging', 'post_type', 'post_status', 'category__in', 'category__not_in', 'category__and', 'tag__in', 'tag__not_in', 'tag__and', 'tag_slug__in', 'tag_slug__and', 'tag_id', 'post_mime_type', 'perm', 'comments_per_page');

Sí alguno de los parámetros GET que necesitas se encuentra en esta lista, tienes dos opciones:

1\. Si tienes control sobre cómo se envían los parámetros GET a tu página receptora en cuestión, simplemente cambia el nombre del atributo por uno que no cause conflicto.

2\. Si no tienes control sobre el cómo se envían tus campos, utiliza la dirección sin permalink para tu sitio. Por ejemplo, si el ID de mi página receptora es 13, sería `http://misitio.com/?p=13`

De esta forma se evita ese **error 404 en Wordpress recibiendo parámetros GET** y podrás manipular los datos que recibas sin problema.
