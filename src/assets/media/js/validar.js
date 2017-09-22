//------------------------------------------------------
// FUNCIONES COMUNES
//------------------------------------------------------

function isValidFecha(fecha) {
    re = /^(0[1-9]|1\d|2\d|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/
    if (re.test(fecha)) {return true;}
    return false;
}

function isValidNroDocumento(num) {
    re = /^\d{6,8}$/
    if (re.test(num)) {return true;}
    return false;
}

function isValidReal(num) {
    re = /^\d{1,5}(\.\d{2}){0,1}$/
    if (re.test(num)) {return true;}
    return false;
}


function isValidEntero(num, base, tope) {
    
    var valor;

    re = /^\d{1,10}$/
    if (re.test(num)) {
        valor = Number(num);
        return valor >= base && valor <= tope;
    }
    return false;
}



function isValidCadena(cadena) {
    /*
    re = /^[\w\b\s]{2,}$/
    if (re.test(cadena)) {return true;}
    return false;
    */
    return isValidCadenaLen(cadena, 2);
}

function isValidCadenaLen(cadena, longitud) {
    /*     re = / ^(.*\w.*){2,}$ / */

    re = new RegExp("(.*\\w.*){" + longitud + ",}");
    if (re.test(cadena)) {return true;}
    return false;
}
