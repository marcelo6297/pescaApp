
/**
 * Fiscalizados DB permite acceder a la base de datos de la aplicacion
 * especificamente a la tabla fiscalizados, permitiendo realizar todas
 * las operaciones basicas de un ABM
 */
app.factory('$fiscalizadosDB', function($webSql, DB_CONFIG){
    
    var self = this;
    var _tabla = 'fiscalizados';
    self.webSql = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.descripcion, 2 * 1024 * 1024);;
    
    self.isOpenDb = function() {
        return self.webSql != null;
    }
    
    self.openDB = function() {
        console.log("abriendo la base de datos"); 
        self.webSql = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.descripcion, 2 * 1024 * 1024);
    }
    
    self.prepare = function() {
        if (!self.isOpenDb) {
            self.openDB();
        }
    }
    
    self.drop = function() {
        
        angular.forEach(DB_CONFIG.tables, function(item){
            self.webSql.dropTable(item.name, item.fields)
            .then(function(){
                console.log('creado tabla!');
            },
            
            function() {
                console.log('creado tabla!');
            });
        }); 
    }
    
    self.init = function() {
        angular.forEach(DB_CONFIG.tables, function(item){
            self.webSql.createTable(item.name, item.fields)
            .then(function(){
                console.log('creado tabla!');
            },
            
            function() {
                console.log('creado tabla!');
            });
        })
    }
    /**
     * Modificar
     */
    self.insert =function(item){
        self.prepare();
        
        self.webSql.insert(_tabla, item)
        .then(function(result) {
           console.log(result); 
        }, function(error) {
            console.log(error.message);
        });
    }
    
    /**
     * Seleccionar todos los elementos de la tabla
     */
    self.selectAll = function(handler, callback) {
        self.prepare();
        self.webSql.selectAll(_tabla).then(function(results) {
            for(var i=0; i < results.rows.length; i++) {
                handler(results);
            }
            // callback();    
        });
        // console.log('Ingresando a select all');
        // self.prepare();
        // self.webSql.query('SELECT * FROM fiscalizados').then(function (results) {
            // console.log('Seleccionar todos los fiscalizados');
            
        // }, function(error) {
            // console.log(error.message);
        // });
    }
    
    
    /**
     * Seleccionar un objeto de la tabla
     */
    self.select = function(idx, handler){
        console.log('$fiscalizadosDB Llamando a select');
        self.prepare();
        self.webSql.select(_tabla, idx)
        .then(function(results) {
            handler (results.rows.item(0));
        }) 
    }
    
    
    /**
     * Convertir objeto a array
     * 
     */
    
    toArray = function(item) {
      var values = []
        angular.forEach(item, function(element) {
            values.push(element)
        });
        return values;  
    }
    /**
     * Todavia no actualizado
     */
    self.update =function(item){
        self.prepare();
        self.webSql.update(_tabla, item)
        .then(function(result){
            
            console.log('$fiscalizadosDB update success');
            console.log(result);
        }, function(error) {
            console.log('$fiscalizadosDB update Error');
            console.log(error);
            
        });
    }
    
   self.delete = function(idx) {
       self.prepare();
       self.db.delete(_tabla, {id: idx});
       console.log('$fiscalizadosDB borrando elemento '+ idx);
   }
   
   /**
    * Cuenta el total de items
    */
   self.count = function () {
       self.$webSql.executeQuery('SELECT COUNT(*) as total FROM '+ _tabla)
       .then(function(results) {
           console.log('Total fiscalizados: '+results);
       }, function(error){
           console.log(result);
           
       } );
   }  
    
    return self;
    
});
