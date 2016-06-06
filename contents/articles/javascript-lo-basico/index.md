---
title: Javascript, lo básico
author: jonalvarezz
date: 2014-12-29 19:32
template: article.jade
---

Esto es una recopilación de apuntes personales sobre cosas de Javascript. Espero que a alguien le pueda ser útil también.

## Objetos
Todo lo que no sea un número (Number), una cadena de texto (String), un boolean (Boolean), un símbolo (Symbol), null o Undefined es un objeto en Javascript.

Esto quiere decir que las funciones (Function), los fechas (Date), las expresiones regulares (RegExp) y los array (Array) son un *tipo especial de objeto*.

La mejor forma de definir objetos es en forma literal (literal syntax):

	var o = {};

	var person = {
		name: "Jonathan",
		lastName: "Alvarez",
			likes : {
			play: "Zelda, Pokemon"
		}
	};

La razón de esto es porque:

1\. Es fácil de entender.
2\. Es rápido de escribir.
3\. Es la sintaxys usada por JSON por lo que deberá preferirse siempre.

Para acceder a las propiedades de un objeto:

	person.name; 
	person["name"]; //Forma preferida

La segunda es la forma preferida ya que no interferirá con el uso de palabras reservadas del lenguaje, pues siempre irá entre comillas dobles o simples.

## Array
Funcionan como un objeto salvo por dos cosas:

* Solo pueden ser accedidos utilizando valores númericos, correspondientes al índice, entre llaves `[]`.
* Poseen la propiedad `length`.

Ejemplo de sintaxis:

	var ciudades = ["Pereira", "Manizales", "Medellín"];
	ciudades[1]; // Manizales.
	ciudades.length; // 3

No es recomendado dejar una coma al final de los valores del array ya que en algunos browsers puede crear un nuevo índice con valor `undefined`.

Se debe tener en cuenta que el valor de la propiedad `length` es el valor del índice mas alto más uno; y no el tamaño del array en sí. Esto es:

	var a = ["apple", "onion", "coconaut"];
	a.length; // 3

	a[120] = "orange";
	a.length; // 121

Interesante, no?

Un error común al utilizar variables es calcular el tamaño en cada iteración de un ciclo o loop:

	for(var i = 0; i < a.length; a++;) {
		// Do something
	}

Una forma más óptima sería

	for(var i = 0, len = a.length; i < len; a++;) {
		// Do something
	}

Y una forma más bonita: 

	for (var i = 0, item; item = a[i++];) {
		// Do something
	}

Esta última recorrerá el array hasta toparse con una *sentencia falsa* como `undefined`. Así que si hay un valor en el array separado por `undefined`, nunca se llegará a este valor de esa forma.

Y la forma preferida que no fallará como la anterior sería:

	for( var fruit in a ) {
		// Do something
	}

### Array Map
La propiedad `Array.prototype.map` de los arrays permite recorrerlos también. Por su facilidad, ante un `for`, esta forma es proferible. 

Siguiendo con el ejemplo del array `a`

	a.map(function(element, index) {
		console.log(element)
	}

Referencia: [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FArray%2Fmap)
