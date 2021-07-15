const cds = require('@sap/cds');
const { OIGC } = cds.entities;

module.exports = cds.service.impl(async (srv) => {

    srv.on('filtersUT', async () => {
        const tx = srv.tx();

        // Función para cargar la lista de filtros
        const fQUery = async (vField, vValueKey, vObject, vText) => {
            let aSelect = '';

            if (vField === 'TU_STATUS') {
                aSelect = await tx.run(SELECT('TU_STATUS').from(OIGC).where({ TU_STATUS: vValueKey }));
            } else if (vField === 'TU_MODE') {
                aSelect = await tx.run(SELECT('TU_MODE').from(OIGC).where({ TU_MODE: vValueKey }));
            } else if (vField === 'TU_TYPE') {
                aSelect = await tx.run(SELECT('TU_TYPE').from(OIGC).where({ TU_TYPE: vValueKey }));
            } else if (vField === 'TU_CLASS') {
                aSelect = await tx.run(SELECT('TU_CLASS').from(OIGC).where({ TU_CLASS: vValueKey }));
            }

            if (aSelect.length > 0 && aSelect !== null && aSelect) {
                vObject = {
                    valueKey: vValueKey,
                    text: vText,
                    data: aSelect.length
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

        let oFilterStatus0 = {}, oFilterStatus1 = {}, oFilterStatus2 = {};
        let oFilterModoUT1 = {}, oFilterModoUT2 = {}, oFilterModoUT3 = {}, oFilterModoUT4 = {}, oFilterModoUT5 = {};
        let oTipoPHSX = {}, oTipoZREF = {}, oTipoZTRT = {}, oTipoZTET = {}, oTipoZTEF = {};
        let oModoUUTT1 = {}, oModoUUTT2 = {}, oModoUUTT3 = {}, oModoUUTT4 = {};

        // TU_STATUS
        oFilterStatus0 = await fQUery('TU_STATUS', '0', oFilterStatus0, 'Disponible');
        oFilterStatus1 = await fQUery('TU_STATUS', '1', oFilterStatus1, 'No Disponible');
        oFilterStatus2 = await fQUery('TU_STATUS', '2', oFilterStatus2, 'A Borrar');

        let aFilterStatus = {
            filterType: 'Status',
            filterKey: 'TU_STATUS',
            value: [oFilterStatus0, oFilterStatus1, oFilterStatus2]
        };

        // TU_MODE
        oFilterModoUT1 = await fQUery('TU_MODE', '1', oFilterModoUT1, 'Carretera');
        oFilterModoUT2 = await fQUery('TU_MODE', '2', oFilterModoUT2, 'Ferrocarril');
        oFilterModoUT3 = await fQUery('TU_MODE', '3', oFilterModoUT3, 'Mar');
        oFilterModoUT4 = await fQUery('TU_MODE', '4', oFilterModoUT4, 'Gabarra');
        oFilterModoUT5 = await fQUery('TU_MODE', '5', oFilterModoUT5, 'Pipeline');

        let aFilterModeUT = {
            filterType: 'ModoUT',
            filterKey: 'TU_MODE',
            value: [oFilterModoUT1, oFilterModoUT2, oFilterModoUT3, oFilterModoUT4, oFilterModoUT5]
        }

        // TU_TYPE
        oTipoPHSX = await fQUery('TU_TYPE', 'PHSX', oTipoPHSX, 'PHSX');
        oTipoZREF = await fQUery('TU_TYPE', 'ZREF', oTipoZREF, 'ZREF');
        oTipoZTRT = await fQUery('TU_TYPE', 'ZTRT', oTipoZTRT, 'ZTRT');
        oTipoZTET = await fQUery('TU_TYPE', 'ZTET', oTipoZTET, 'ZTET');
        oTipoZTEF = await fQUery('TU_TYPE', 'ZTEF', oTipoZTEF, 'ZTEF');

        let aFilterTipoUT = {
            filterType: 'TipoUT',
            filterKey: 'TU_TYPE',
            value: [oTipoPHSX, oTipoZREF, oTipoZTRT, oTipoZTET, oTipoZTEF]
        }

        // TU_CLASS
        oModoUUTT1 = await fQUery('TU_CLASS', '1', oModoUUTT1, 'Máquina motriz (sin capacidad de carga)');
        oModoUUTT2 = await fQUery('TU_CLASS', '2', oModoUUTT2, 'Remolque (sin motor)');
        oModoUUTT3 = await fQUery('TU_CLASS', '3', oModoUUTT3, 'Unidad individual con motor y capacidad de carga');
        oModoUUTT4 = await fQUery('TU_CLASS', '4', oModoUUTT4, 'Otras unidades que sostienen peso (sin capacidad de carga)');

        let aFilterModoUUTT = {
            filterType: 'Modo de UUTT',
            filterKey: 'TU_CLASS',
            value: [oModoUUTT1, oModoUUTT2, oModoUUTT3, oModoUUTT4]
        }

        let aFilter = { filter: [aFilterStatus, aFilterModeUT, aFilterTipoUT, aFilterModoUUTT] };
        console.log(aFilter);

        return aFilter;
    });

    srv.on('filtersUT', async () => {
        const tx = srv.tx();

        // Función para cargar la lista de filtros
        const fQUery = async (vField, vValueKey, vObject, vText) => {
            let aSelect = '';

            if (vField === 'TU_STATUS') {
                aSelect = await tx.run(SELECT('TU_STATUS').from(OIGC).where({ TU_STATUS: vValueKey }));
            } else if (vField === 'TU_MODE') {
                aSelect = await tx.run(SELECT('TU_MODE').from(OIGC).where({ TU_MODE: vValueKey }));
            } else if (vField === 'TU_TYPE') {
                aSelect = await tx.run(SELECT('TU_TYPE').from(OIGC).where({ TU_TYPE: vValueKey }));
            } else if (vField === 'TU_CLASS') {
                aSelect = await tx.run(SELECT('TU_CLASS').from(OIGC).where({ TU_CLASS: vValueKey }));
            }

            if (aSelect.length > 0 && aSelect !== null && aSelect) {
                vObject = {
                    valueKey: vValueKey,
                    text: vText,
                    data: aSelect.length
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

        
    });

});
