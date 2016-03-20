angular.module('myApp.config', [])
.constant('DB_CONFIG', {
    name: 'pescaDB',
	version: '1.0',
	descipcion: 'Base de datos de pesca',
    tables: [
		{
            name: 'fiscalizados',
            fields:  {
                "id":{
                    "type": "INTEGER",
                    "null": "NOT NULL", // default is "NULL" (if not defined)
                    "primary": true, // primary
                    "auto_increment": true // auto increment
                },
                "created":        { "type": "TIMESTAMP", "null": "NOT NULL", "default": "CURRENT_TIMESTAMP"  },
                'fiscalia':       { "type": 'text'},
                'equipo':         { "type": 'text'},
                'variedad':       { "type": 'text'},
                'cantidad':       { "type": 'text'},
                'medida_mayor':   { "type": 'text'},
                'observaciones':  { "type": 'text'} 
            
            }
        }
        ,
		{
           name: 'pescados',
           fields: {
                 'id': {"type" :'INTEGER NOT NULL PRIMARY KEY'},
                 'variedad':  { "type": 'text'}
            } 
            
        },
    ]
});



		