using {VCT as my} from '../db/schema';

@path : 'api'
service vehcontran {

    entity Conductores          as projection on my.OIGD;
    entity UnidadesDeTransporte as projection on my.OIGC;
    entity Vehiculo             as projection on my.OIGV;


    type TypeType {
        filter : array of TypeUT;
    }

    type TypeUT {
        filterType : String(200); // Caption
        filterKey  : String(50); // Campo a filtrar
        value      : array of Values;
    };

    type Values {
        valueKey : String(1); // Filtro
        text     : String(100);
        data     : Integer // Cantidad de registros
    }

    // FILTROS Unidades de Transporte
    function filtersUT() returns TypeType;
    
    // FILTROS Conductores
    function filtersDrivers() returns TypeType;

}
