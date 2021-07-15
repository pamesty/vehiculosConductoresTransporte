using {cuid} from '@sap/cds/common';

namespace VCT;

// Conductores
entity OIGD {
    key ID         : Integer;
        DRIVERCODE : String(10);
        FIRST_NAME : String(20);
        LAST_NAME  : String(20);
        PERSCODE   : String(30); // 12345678912345678901
        CARRIER    : String(10);
        DRVSTATUS  : String enum {
            ![0];
            ![1]
        };
        IMG        : String;
        SHIFTS     : Composition of many SHIFTS
                         on SHIFTS.OIGD = $self;
        LICENSES   : Composition of many LICENSES
                         on LICENSES.OIGD = $self;
}

@cds.autoexpose
entity SHIFTS {
    key ID          : Integer;
        OIGD        : Association to OIGD;
        START_DATE  : String(10);
        END_DATE    : String(10);
        SHIFT       : String enum {
            DIURNO;
            NOCTURNO
        };
        START_SHIFT : String(8);
        END_SHIFT   : String(8);
        DESC        : String enum {
            ![Cargar Camiones];
            ![Descargar Camiones]
        } default 'Cargar Camiones';
}

@cds.autoexpose
entity LICENSES {
    key ID                 : Integer;
        LICENSETYP         : String(4);
        OIGD               : Association to OIGD;
        LICENSEDESCRIPTION : String(255);
        LICENSENUMBER      : String(50);
        VALID_FROM         : String(10);
        VALID_TO           : String(10);
}

// Unidades de Transporte
entity OIGC {
    key ID             : Integer;
        TU_NUMBER      : String(10);
        TU_TYPE        : String(10);
        TU_TEXT        : String;
        TU_STATUS      : String(1);
        TU_CLASS       : String(1);
        TU_MODE        : String(1);
        CreatedBy      : String(10);
        CreatedOn      : String(10);
        ChangedBy      : String(10);
        ChangedOn      : String(10);
        REG_DATE       : String(10);
        TU_length      : Decimal(10, 3);
        TU_width       : Decimal(10, 3);
        TU_height      : Decimal(10, 3);
        DIM_UOM        : String enum {
            Mts;
            Miles
        } default 'Mts';
        TU_UNLWGT      : Decimal(15, 3);
        TU_WGT         : Decimal(10, 3);
        WGT_UOM        : String;
        TU_MAXVOL      : Decimal(10, 3);
        VOL_UOM        : String enum {
            gal;
            Lts
        };
        TU_AXLES       : Integer;
        TU_CARRIER     : Composition of one TU_CARRIER
                             on TU_CARRIER.OIGC = $self;
        Compartimentos : Composition of many Compartimentos
                             on Compartimentos.OIGC = $self;
        Habilitaciones : Composition of many Habilitaciones
                             on Habilitaciones.OIGC = $self;
        CamposZ        : Composition of one CamposZ
                             on CamposZ.OIGC = $self;

}

@cds.autoexpose
entity TU_CARRIER {
    OIGC     : Association to OIGC;
    name     : String(50);
    lastName : String(50);
    id       : String(10);
    email    : String(255);
    phone    : String(15);
}

@cds.autoexpose
entity Compartimentos {
    key CMP_NUMBER : String(15);
        OIGC       : Association to OIGC;
        CMP_MINVOL : String(5);
        CMP_MAXVOL : Integer;
        COM_IDTEXT : String(10);
        GROUPNAME  : String(10);
}

@cds.autoexpose
entity Habilitaciones {
    key ID        : Integer;
        OIGC      : Association to OIGC;
        H_NUMBER  : String(5);
        H_IDTEXT  : String(10);
        H_XPRTION : String(10);
        H_DETAIL  : String;
}

@cds.autoexpose
entity CamposZ {
    key ID             : Integer;
        OIGC           : Association to OIGC;
        Z_ALARM        : Boolean;
        Z_MODEL        : String(100);
        Z_BRAND        : String(100);
        Z_CHASIS       : String(5);
        Z_MOTOR        : String(5);
        Z_YPFSECURED   : String(15);
        Z_VENTRAL      : Boolean;
        Z_EURO5        : Boolean;
        Z_POWER        : String(10);
        Z_IMG          : String(255);
        Z_BRKSYS       : String(20);
        Z_SEALSPERTANK : Integer;
        Z_TRANSFERPUMP : Boolean;
        Z_NUMTANK      : Integer;
}

// Vehículos
entity OIGV {
    key VEH_ID        : String(10);
        VEH_NUMBER    : String(20);
        VEH_TYPE      : String(20);
        VEH_TEXT      : String;
        VEH_BRAND     : String(50);
        VEH_MODEL     : String(50);
        VEH_PATENT    : String(50);
        NAME_EFF_DATE : String(10);
        OWNER         : String(100);
        REG_OWNER     : String(100);
        REG_CNTRY     : String(5);
        REG_DATE      : String(10);
        VEH_MODE      : String(1);
        CLF_EFDT      : String(10);
        VEH_STATUS    : String(1);
        LGTUD         : String(20);
        ANCHO         : String(20);
        ALTURA        : String(20);
        CARRIER       : String(255);
        CLASS_GRP     : String(20);
        WGT_UOM       : String(20);
        VOL_UOM       : String(20);
        MED_TRANSP    : Composition of many OIGVTU
                            on MED_TRANSP.OIGV = $self;
}

@cds.autoexpose
entity OIGVTU {
    key ID       : Integer;
        OIGV     : Association to OIGV;
        SEQ_NMBR : String(10);
        PSCRGA   : String(10);
        PS_MAX   : String(10);
        VOL_MAX  : String(10);
}