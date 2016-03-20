app.config(function($routeProvider) {
  $routeProvider
   .when('/', {
		templateUrl: 'partials/lista.html',
        controller: 'ListaFiscalizadosCtrl as ctrl'
	})
   .when('/home', {
		templateUrl: 'partials/lista.html',
        controller: 'ListaFiscalizadosCtrl as ctrl'
	})
	.when('/formulario', {
		templateUrl: 'partials/formulario.html',
        controller: 'NewFiscalizados as editCtrl'
	})
	.when('/edit/:id', {
		templateUrl: 'partials/formulario.html',
        controller: 'EditFiscalizados as editCtrl'
	})
	.when('/acercade', {
		template: '<acercade></acercade>'
	})
    .when('/listaVariedades', {
		templateUrl: 'partials/listaVariedades.html',
        controller: 'ListaVariedadesCtrl as listCtrl'
	})
	.otherwise({redirectTo: '/'});
	
});