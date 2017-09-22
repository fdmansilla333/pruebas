/*@Damian*/


var app = angular.module("app",['autofields']);


app.controller('PruebaController', function ($scope) {
    //agregar las funcionalidades de carga de datos
    console.log("[Borrar]Carga de controlador finalizada ver aplicacion.js");
    $scope.cambiarMensaje = function () {
            alert("En construccion...");
        };
       

    }
);
