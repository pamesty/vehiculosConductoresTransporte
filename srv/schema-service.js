const cds = require('@sap/cds');
const { OIGC } = cds.entities;

// Función de Filtros
const fFilter = (selectLength, vObject, vValueKey,vText) => {
    if (selectLength > 0) {
        vObject = {
            valueKey: vValueKey,
            text: vText,
            data: selectLength
        }
    } else {
        vObject = {
            valueKey: vValueKey,
            text: vText,
            data: 0
        }
    }
    
    return vObject;
}

module.exports = cds.service.impl(async (srv) => {

    // Filtros UT
    srv.on('filtersUT', async () => {
        const tx = srv.tx();

        // Función para sacar el aSelect.length (la cantidad de datos existentes por filtro)
        const aQuery = async (vField, vValueKey) => {
            let selectLenght = 0;

            let aSelect = await tx.run(SELECT(vField).from(OIGC).where(`${vField} = '${vValueKey}'`));
            if (aSelect.length > 0 && aSelect !== null && aSelect) {
                selectLenght = aSelect.length;
            } else {
                selectLenght = 0;
            }

            return selectLenght;
        }

        // Declaración de variables utilizadas en las funciones
        let statusLength0 = 0, statusLength1 = 0, statusLength2 = 0;
        let oFilterStatus0 = {}, oFilterStatus1 = {}, oFilterStatus2 = {};
        let modoUTLength1 = 0, modoUTLength2 = 0; modoUTLength3 = 0, modoUTLength4 = 0, modoUTLength5 = 0;
        let oFilterModoUT1 = {}, oFilterModoUT2 = {}, oFilterModoUT3 = {}, oFilterModoUT4 = {}, oFilterModoUT5 = {};
        let tipoLengthPHSX = 0, tipoLengthZREF = 0; tipoLengthZTRT = 0, tipoLengthZTET = 0, tipoLengthZTEF = 0;
        let oTipoPHSX = {}, oTipoZREF = {}, oTipoZTRT = {}, oTipoZTET = {}, oTipoZTEF = {};
        let modoUTTLength1 = 0, modoUTTLength2 = 0, modoUTTLength3 = 0, modoUTTLength4 = 0;
        let oModoUUTT1 = {}, oModoUUTT2 = {}, oModoUUTT3 = {}, oModoUUTT4 = {};

        // TU_STATUS
        statusLength0 = await aQuery('TU_STATUS', '0');
        oFilterStatus0 = await fFilter(statusLength0,oFilterStatus0,'0','Disponible');
        statusLength1 = await aQuery('TU_STATUS', '1');
        oFilterStatus1 = await fFilter(statusLength1,oFilterStatus1,'1','No Disponible');
        statusLength2 = await aQuery('TU_STATUS', '2');
        oFilterStatus2 = await fFilter(statusLength2,oFilterStatus2,'2','A Borrar');

        let aFilterStatus = {
            filterType: 'Status',
            filterKey: 'TU_STATUS',
            value: [oFilterStatus0, oFilterStatus1, oFilterStatus2]
        };
        console.log(aFilterStatus);

        // TU_MODE
        modoUTLength1 = await aQuery('TU_MODE', '1');
        oFilterModoUT1 = await fFilter(modoUTLength1,oFilterModoUT1,'1','Carretera');
        modoUTLength2 = await aQuery('TU_MODE', '2');
        oFilterModoUT2 = await fFilter(modoUTLength2,oFilterModoUT2,'2','Ferrocarril');
        modoUTLength3 = await aQuery('TU_MODE', '3');
        oFilterModoUT3 = await fFilter(modoUTLength3,oFilterModoUT3,'3','Mar');
        modoUTLength4 = await aQuery('TU_MODE', '4');
        oFilterModoUT4 = await fFilter(modoUTLength4,oFilterModoUT4,'4','Gabarra');
        modoUTLength5 = await aQuery('TU_MODE', '5');
        oFilterModoUT5 = await fFilter(modoUTLength5,oFilterModoUT5,'5','Pipeline');

        let aFilterModeUT = {
            filterType: 'ModoUT',
            filterKey: 'TU_MODE',
            value: [oFilterModoUT1, oFilterModoUT2, oFilterModoUT3, oFilterModoUT4, oFilterModoUT5]
        }
        console.log(aFilterModeUT);

        // TU_TYPE
        tipoLengthPHSX = await aQuery('TU_TYPE', 'PHSX');
        oTipoPHSX = await fFilter(tipoLengthPHSX,oTipoPHSX,'PHSX','PHSX');
        tipoLengthZREF = await aQuery('TU_TYPE', 'ZREF');
        oTipoZREF = await fFilter(tipoLengthZREF,oTipoZREF,'ZREF','ZREF');
        tipoLengthZTRT = await aQuery('TU_TYPE', 'ZTRT');
        oTipoZTRT = await fFilter(tipoLengthZTRT,oTipoZTRT,'ZTRT','ZTRT');
        tipoLengthZTET = await aQuery('TU_TYPE', 'ZTET');
        oTipoZTET = await fFilter(tipoLengthZTET,oTipoZTET,'ZTET','ZTET');
        tipoLengthZTEF = await aQuery('TU_TYPE', 'ZTEF');
        oTipoZTEF = await fFilter(tipoLengthZTEF,oTipoZTET,'ZTEF','ZTEF');

        let aFilterTipoUT = {
            filterType: 'TipoUT',
            filterKey: 'TU_TYPE',
            value: [oTipoPHSX, oTipoZREF, oTipoZTRT, oTipoZTET, oTipoZTEF]
        }
        console.log(aFilterTipoUT);

        // TU_CLASS
        modoUTTLength1 = await aQuery('TU_CLASS', '1');
        oModoUUTT1 = await fFilter(modoUTTLength1,oModoUUTT1,'1','Máquina motriz (sin capacidad de carga)');
        modoUTTLength2 = await aQuery('TU_CLASS', '2');
        oModoUUTT2 = await fFilter(modoUTTLength2,oModoUUTT2,'2','Remolque (sin motor)');
        modoUTTLength3 = await aQuery('TU_CLASS', '3');
        oModoUUTT3 = await fFilter(modoUTTLength3,oModoUUTT3,'3','Unidad individual con motor y capacidad de carga');
        modoUTTLength4 = await aQuery('TU_CLASS', '4');
        oModoUUTT4 = await fFilter(modoUTTLength4,oModoUUTT4,'4','Otras unidades que sostienen peso (sin capacidad de carga)');
        
        let aFilterModoUUTT = {
            filterType: 'Modo de UUTT',
            filterKey: 'TU_CLASS',
            value: [oModoUUTT1, oModoUUTT2, oModoUUTT3, oModoUUTT4]
        }

        let aFilter = { filter: [aFilterStatus, aFilterModeUT, aFilterTipoUT, aFilterModoUUTT] };
        console.log(aFilter);

        return aFilter;

    });

});