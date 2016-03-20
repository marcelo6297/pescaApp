var pro = angular.module('app.propiedades', []);
pro.constant('appDefault', {

    autor: 'Ing. Marcelo Flores',
    titulo: 'Ingeniero Informático',
    descripcion: 'Sistema para ...',
    tecnologias: ['apache-cordova', 'angular', 'angular route', 'angular material', 'bower', 'android']
     

});
pro.controller('acercaDeCtrl', function($scope, appDefault) {
    $scope.appDefault = appDefault;
});
pro.directive('acercade', function() {
    return {
        controller: 'acercaDeCtrl',
        template: '<h1>{{appDefault.autor}}</h1><h2>{{appDefault.titulo}}</h2><h2>{{appDefault.descripcion}}</h2>Tecnologias utilizadas:<ul ng-repeat="item in appDefault.tecnologias"><li><a >{{item}}</a></li></ul>'
    }
})