console.log('Creando la app')
var app = angular.module('pescaApp', ['ngCordova', 'ngRoute' , 'myApp.config', 'app.propiedades', 'angular-websql']);
app.controller('ListaFiscalizadosCtrl',  function($scope, $modelServ, $fiscalizadosDB ) {
	
    $scope.Titulo = 'Sistema para pesca deportiva';
	$scope.subTitulo = 'El sub titulo';
	
    // var vista = '';
	// $scope.fiscalizados = datos.fiscalizados();
    //Inicializar el modelo 
   $modelServ.reset();
     
    $scope.fiscalizados = [];
    $fiscalizadosDB.selectAll(function (result) { 
        $scope.fiscalizados = result.rows;
        } 
    );
    
    $scope.initdb = function() {
        $fiscalizadosDB.init();
    }
    $scope.dropdb = function() {
        $fiscalizadosDB.drop();
    }
   
	
       
});


app.controller('EditFiscalizados', function($scope, $fiscalizadosDB , $modelServ , $location ,$routeParams ) {
    var editCtrl = this;
    
        
    // $editServ.set({status:true, id: $routeParams.id});
   
    editCtrl.Titulo = 'Editando: '+$routeParams.id
    
    if ($modelServ.model.isEditing) {
        editCtrl.item = $modelServ.model.item;
    }
    else {
        editCtrl.item = $fiscalizadosDB.select($routeParams, function(item) { 
                editCtrl.item = item;
        });        
    }
    
     
     
    
    
    
    
    /**
     * Funcion para guardar los datos en la base de datos
     * Actualiza los datos
     * redirige a la pagina de new formulario
     * 
     * 
     */
	editCtrl.save = function() {
        
        $fiscalizadosDB.update(editCtrl.item);
        var fiscalia = editCtrl.item.fiscalia;
        $modelServ.reset();
        $modelServ.model.item.fiscalia = fiscalia; 
        $location.path('/formulario');
    
    };
    
    
       
     $scope.$on( '$routeChangeStart', function(event) {
         console.log( "New llamando a $routeChangeStart ");
         console.log( "Item: " + $modelServ.model.item);
         $modelServ.model.item = editCtrl.item;
     });
    
    
    
});

/**
 * Controller para nuevo
 */
app.controller('NewFiscalizados', function($scope, $fiscalizadosDB, $modelServ, datos) {
    var editCtrl = this;
    
    editCtrl.item = $modelServ.model.isEditing ? $modelServ.model.item : $modelServ.reset();
    
    
    editCtrl.Titulo = 'Agregar Nuevo';
    
    
    
    /**
     * Funcion para guardar los datos en la base de datos
     * 
     */
	editCtrl.save = function() {
       
        $fiscalizadosDB.insert(editCtrl.item);
        var item =  {fiscalia: editCtrl.item.fiscalia, equipo: editCtrl.item.equipo};
        //reseteo los campos
        $modelServ.reset();
        //asigno los nuevos valores
        $modelServ.model.item.fiscalia = item.fiscalia;
        $modelServ.model.item.equipo = item.equipo;
        editCtrl.item = $modelServ.model.item;
    
    };
    
    $scope.$on( '$routeChangeStart', function(event) {
         console.log( "Llamando a $routeChangeStart");
         console.log( "Item:" + $modelServ.model.item);
         $modelServ.model.item = editCtrl.item;
     }
    )
    
    
    
});


app.controller('ListaVariedadesCtrl', function(datos,$modelServ ) {
     var listCtrl = this;
     
     $modelServ.model.isEditing = true; 
     
     listCtrl.pescados = datos.pescados();
     listCtrl.setVariedad = function(tipo) {
        $modelServ.model.item.variedad = tipo;
     }
     
          
     listCtrl.getUrl = function() {
         return isNaN( $modelServ.model.item.id )  ? '#/formulario' : '#/edit/'+$modelServ.model.item.id;
     }
     
    
});

app.controller('btnCtrl', function($scope, $location) {
       
       $scope.getClass = function (path) {
		if ($location.path().substr(0, path.length) === path) {
			return 'active';
		} else {
			return '';
		}
	}
    
})


/**
 * Guarda el estado del modelo
 */
app.service('$modelServ', function() {
    var self = this;
    self.model = {};
    self.reset =function() {
        self.model = {isEditing: false, item: {}, variedad: 'Seleccione...'};
        return self.model;
    }
    return self;
    
});



app.directive('formulario', function(){
	return {
		templateUrl: 'partials/formulario.html'
	}
});
app.directive('lista', function(){
	return {
		templateUrl: 'partials/lista.html'
	}
});
app.directive('otros', function(){
	return {
		templateUrl: 'partials/acercade.html'
	}
});

app.service('datos', function() {
	return {
		pescados: function() {
			return [
				{tipo: 'pacu'},
				{tipo: 'boga'},
				{tipo: 'dorado'},
				{tipo: 'manguruyu'},
				{tipo: 'surubi'},
				{ tipo: 'salmon' },
                { tipo: 'salmon1' },
                { tipo: 'salmon2' },
                { tipo: 'salmon3' },
                { tipo: 'salmon4' },
                { tipo: 'salmon5' },
                { tipo: 'salmon6' },
                { tipo: 'salmon7' },
                { tipo: 'salmon8' },
			];
		},
		
	}

})



