---
title: Ordenar strings numéricamente en Angular JS
author: jonalvarezz
date: 2014-10-26 23:37
template: article.pug
---

Utilizar el filtro `OrderBy` de **AngularJS** es bastante sencillo. Ordenará alfabéticamente las cadenas de texto y numéricamente los números.

Sin embargo cuando traemos devuelta algunos campos númericos de algunas APIS o bases de datos, pueden ser retornados como `strings` y al querer ordenar númericamente el resultado no será el esperado. Puede suceder por ejemplo con fechas.

Una forma rápido de solucionarlo, sin modificar el valor en la base de datos sería crear una expresión para evaluar el `OrderBy`.

Veámoslo en código, supongamos que cargamos una lista de posts y queremos filtrar por fecha. La fecha del post es devuelta como `"mmm-dd-yy"` lo cual no nos sirve ya que es una cadena. Utilizando una expresión en el filtro `OrderBy`, sería:

    ng-repeat="post in posts | orderBy : date"

Donde `date` es el nombre de la expresión. Y en el controlador de esa plantilla:

    $scope.date = function(post) {
    	var date = new Date(post.publishedDate);
    	return date;
    }

Y para ordenar en orden inverso sería:

    ng-repeat="post in posts | orderBy : date : true"
