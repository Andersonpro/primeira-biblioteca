var rex = /@gmail,com/gm;

let texto = "Texto para testar expressões regulares, [] 123456789, [ $#%& anderson@gmail.com";

var re = /[^b]/gm; //todas as letras e caracteres menos o b
var re = /[\s]/gm; //espaços em branco
var re = /\[[^[\]]*?\]/gm; //pegando colchetes
var re = /\(https?:\/\/[^\s?#.].[^\s]*\)/;
var re = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/
console.log(rex.test(texto));
