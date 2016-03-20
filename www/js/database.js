app.factory('$database', function($q, DB_CONFIG) {

	console.log('llamando a $database factory... ');
	var self = this;
    self.db = null;

	/**
	Metodo para inicializar la base de datos
	*/
	self.init = function() {
        self.open();    
        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];

            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });

            var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
            self.query(query).then(function(result){
                console.log('Init Exito.' + result);
            }, function(error) {
                console.log('Init Error.' + error.message);
                
            });
            console.log('Table ' + table.name + ' iniciada');
        });
    };
    
    self.dropTables = function () {
        angular.forEach(DB_CONFIG.tables, function(table) {
            
            var query = 'DROP TABLE IF EXISTS ' + table.name ;
            self.query(query);
            console.log('DROP Table ' + table.name );
        });
    } 
    
    /**
     * Verificar si esta o no abierta la base de datos.
     */
    self.isOpendb = function() { 
        
        console.log('Esta abierta la base de datos?' + self.db !== null );
        return  self.db !== null;
    }
    
    /**
     * Abrir la base de datos
     */
    self.open = function () {
        console.log('llamado para abrir la base de datos');
        if (!self.isOpendb()) {
            // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
            console.log('Abirendo la base de datos');
            self.db = window.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.descripcion, -1);
        
        }
        else {
            console.log('No se abrio la db pues ya esta abierta');
        }
    }
    
    /**
     * Preparar la base de datos para trabajar
     * 0976, 571394
     */
    self.prepare = function() {
       if (!self.isOpendb) {
            self.open();
        } 
    }
	
	self.query = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();
        self.prepare();
        self.db.transaction(function(transaction) {
            transaction.executeSql(query, bindings, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                deferred.reject(error);
            });
        });

        return deferred.promise;
    };

    self.fetchAll = function(result) {
        var output = [];
        
        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }
        console.log('Salida de database fetchAll \n');
        console.log(output);
        return output;
    };

    self.fetch = function(result) {
        return result.rows.item(0);
    };
	
	self.open();
    
	return self;
	
});