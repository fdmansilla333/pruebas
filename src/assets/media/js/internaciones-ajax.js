/*
    Dependencias:

        YUI:
        /yui/yahoo/yahoo-min.js
        /yui/json/json-min.js
        /yui/event/event-min.js
        /yui/connection/connection_core-min.js
        /yui/connection/connection-min.js

        PROPIAS:
        /js/validaciones.js

*/

/**
 * Constante para indicar en la obtencion de tipos de tarifas, que se desea 
 * obtener todos los tipos de tarifas del complejo
 */
var OBTENER_TIPOS_TARIFAS = 1;
/**
 * Constante para indicar en la obtencion de tipos de tarifas, que se desea 
 * obtener solo los tipos de tarifas del complejo, aplicables a afiliados
 */
var OBTENER_TIPOS_TARIFAS_AFILIADOS = 2;
/**
 * Constante para indicar en la obtencion de tipos de tarifas, que se desea 
 * obtener solo los tipos de tarifas del complejo, aplicables a no afiliados
 */
var OBTENER_TIPOS_TARIFAS_NO_AFILIADOS = 3;


function getCentrosInternacionPorDelegacionIssys(idSource,idSelectTarget,
        defaultCentroInternacionSelected, functionToExecuteOnSucces) {

    document.getElementById(idSelectTarget).innerHTML = '';
    var tagOption = document.createElement('option');
    tagOption.setAttribute('value','');
    tagOption.textContent = '-- Seleccione --';
    document.getElementById(idSelectTarget).appendChild(tagOption);

    if (esCadenaVacia(document.getElementById(idSource).value)) {
        return;
    }

    var url = '/AuditoriaMedicaInternaciones/Internaciones/GetCentrosInternacionPorDelegacionIssys.do';

    var paramData = 'codigoDelegacionIssys=' + document.getElementById(idSource).value;

    var callback = {
      success: function(o) {
            if (o.responseText.indexOf('LA SESSION HA EXPIRADO') != -1) {
                document.location.href = '/Internaciones/login/login.jsp';
                return;
            }
            
            var respuesta = null;
            try {
                respuesta = YAHOO.lang.JSON.parse(o.responseText);
            } catch(e) {}

            if (respuesta != null) {
                if (respuesta.error) {
                    if (respuesta.mensaje != null) {
                        alert(respuesta.mensaje);
                    } else {
                        alert('No se pudieron obtener los centros de internacion.');
                    }
                } else {
                    document.getElementById(idSelectTarget).innerHTML = '';

                    for (var i = 0; i < respuesta.objeto.length; i++) {
                        tagOption = document.createElement('option');
                        tagOption.setAttribute('value',respuesta.objeto[i].codigo);
                        tagOption.textContent = respuesta.objeto[i].descripcion;
                        document.getElementById(idSelectTarget).appendChild(tagOption);
                    }

                    if (defaultCentroInternacionSelected != null) {
                        document.getElementById(idSelectTarget).value = defaultCentroInternacionSelected;
                    }
                }
            } else {
                alert('No se pudieron obtener los centros de internacion.');
            }

            if (functionToExecuteOnSucces != null) {
                try {functionToExecuteOnSucces();} catch(e){}
            }
      },
      failure: function(o) {
      },
      argument: [idSelectTarget,defaultCentroInternacionSelected,functionToExecuteOnSucces]
    }

    var request = YAHOO.util.Connect.asyncRequest('POST', url, callback, paramData);
}