//Iniciando aplicação e importando dependências
var app = angular.module('timeline', ['ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('deep-purple');
});

