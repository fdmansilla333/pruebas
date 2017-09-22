/******************************************************************************/
/************************     CONSTANTES GENERALES     ************************/
/******************************************************************************/

var ERROR = -1;
var CADENA_VACIA = "";
var MIN_INT = -2147483648;
var MAX_INT = 2147483647;
var MIN_LONG = -9223372036854775808;
var MAX_LONG = 9223372036854775807;
var MIN_ANIO = 1900;
var MAX_ANIO = 2100;

/******************************************************************************/
/*******************     CONSTANTES DE MANEJO DE CADENAS     ******************/
/******************************************************************************/

var APOSTROFE = "'";
var CARACTER_ESCAPE = '\\';
var CARACTER_GUION = '-';
var CARACTER_PUNTO = '.';
var CARACTER_COMA = ',';

/******************************************************************************/
/*******     CONSTANTES DE MANEJO DE FECHAS EN FORMATO "dd/mm/aaaa"     *******/
/******************************************************************************/

var DIVISOR_FECHA = "/";
var MIN_YEAR = 1900;
var MAX_YEAR = 2100;
var ENERO = 1;
var FEBRERO = 2;
var MARZO = 3;
var ABRIL = 4;
var MAYO = 5;
var JUNIO = 6;
var JULIO = 7;
var AGOSTO = 8;
var SEPTIEMBRE = 9;
var OCTUBRE = 10;
var NOVIEMBRE = 11;
var DICIEMBRE = 12;

/******************************************************************************/
/**********     CONSTANTES DE MANEJO DE HORAS EN FORMATO "hh:mm"     **********/
/******************************************************************************/

var DIVISOR_HORA = ":";
var MIN_HORA = 0;
var MAX_HORA = 23;
var MIN_MINUTOS = 0;
var MAX_MINUTOS = 59;

/******************************************************************************/
/*******************     FUNCIONES DE MANEJO DE CADENAS     *******************/
/******************************************************************************/
var nav = window.Event ? true : false;

function aceptarEntero(evt) {
    // NOTE: Backspace = 8, Enter = 13, '0' = 48, '9' = 57
    var key = nav ? evt.which : evt.keyCode;
    return (key <= 13 || (key >= 48 && key <= 57));
}

function aceptarEntero(evt, campoTexto) {
    // NOTE: Backspace = 8, Enter = 13, '0' = 48, '9' = 57
    var key = nav ? evt.which : evt.keyCode;
    if (campoTexto.value.length >= 8 && (key >= 48 && key <= 57)) {
        return false;
    } else {
        return (key <= 13 || (key >= 48 && key <= 57));
    }
}

function aceptarNumero(evt, campoTexto) {
    // NOTE: Backspace = 8, Enter = 13, '0' = 48, '9' = 57
    var key = nav ? evt.which : evt.keyCode;
    
    return (key <= 13 || (key >= 48 && key <= 57));
}

// Determina si es una cadena vacia
function esCadenaVacia(str) {
// Devuelve: true si la cadena recibida es una cadena vacia o false en caso contrario

  var expresionRegular = /^$/;

  return(expresionRegular.test(str));
}

// Determina la validez de una cadena que se utilizara con SQL
function esCadenaSQL(str) {
// Devuelve: true si la cadena recibida es valida para usar con SQL o false en caso
//           contrario

  var strLength = str.length;
  var index = 0;
  var lastIndex = 0;

  // Si la cedana comienza con un apostrofe
  if(str.indexOf(APOSTROFE) == 0) {
    return(false);}
  else {
    // Mientra se encuentren apostrofes en la cadena
    while((lastIndex < strLength) && ((index = str.indexOf(APOSTROFE, lastIndex)) != ERROR)) {
      // Si el caracter anterior al apostrofe no es un caracter de escape
      if(str.charAt(index - 1) != CARACTER_ESCAPE){
        return(false);}
      else
        lastIndex = index+1;
    }
  }
  return(true);
}

// Determina si la cadena es un numero telefonico
function esCadenaConTelefono(str) {

  var expresionRegular = /^((([0-9]{3})|(([0-9]){5}))-?)?((([0-9]){6})|(([0-9]){8}))$/;

  return(expresionRegular.test(str));
}

// Determina si la cadena es un e-mail
function esCadenaConEmail(str) {

  var expresionRegular = /^[A-Za-z0-9_-]+@[A-Za-z0-9_-]+(.[A-Za-z]+){1,2}$/;

  return(expresionRegular.test(str));
}

// Determina si la cadena es un numero entero
function esCadenaConNumeroEntero(str) {
// Devuelve: true si la cadena recibida es un numero entero o false en caso
//           contrario

  var expresionRegularNumeroEnteroPositivo = /^\d{1,10}$/;
  var expresionRegularNumeroEnteroNegativo = /^-\d{1,10}$/;
  var indiceDelCaracterGuion = 0;

  indiceDelCaracterGuion = str.indexOf(CARACTER_GUION);
  // Si es un numero entero positivo
  if(indiceDelCaracterGuion == ERROR)
    return(expresionRegularNumeroEnteroPositivo.test(str));
  else {
    // Si es un numero entero negativo
    if (indiceDelCaracterGuion == 0)
      return(expresionRegularNumeroEnteroNegativo.test(str));
    else
      return(false);
  }
}

// Determina si la cadena es un numero real
function esCadenaConNumeroReal(str) {
// Precondicion: se considera un numero real  a un numero de a lo sumo
//               ocho digitos seguido por un punto y dos decimales
// Devuelve: true si la cadena recibida es un numero real o false en caso 
//           contrario

  var expresionRegularNumeroRealPositivoConPunto = /^\d{1,8}\.\d{2}$/;
  var expresionRegularNumeroRealPositivoConComa = /^\d{1,8},\d{2}$/;
  var expresionRegularNumeroRealNegativoConPunto = /^-\d{1,8}\.\d{2}$/;
  var expresionRegularNumeroRealNegativoConComa = /^-\d{1,8},\d{2}$/;
  var indiceDelCaracterGuion = 0;
  var indiceDelCaracterPunto = 0;
  var indiceDelCaracterComa = 0;

  indiceDelCaracterGuion = str.indexOf(CARACTER_GUION);
  indiceDelCaracterPunto = str.indexOf(CARACTER_PUNTO);
  indiceDelCaracterComa = str.indexOf(CARACTER_COMA);
  // Si es un numero real positivo
  if(indiceDelCaracterGuion == ERROR) {
    if (indiceDelCaracterPunto != ERROR)
      return(expresionRegularNumeroRealPositivoConPunto.test(str));
    if (indiceDelCaracterComa != ERROR)
      return(expresionRegularNumeroRealPositivoConComa.test(str));
  } else {
    // Si es un numero real negativo
    if(indiceDelCaracterGuion == 0) {
      if (indiceDelCaracterPunto != ERROR)
        return(expresionRegularNumeroRealNegativoConPunto.test(str));
      if (indiceDelCaracterComa != ERROR)
        return(expresionRegularNumeroRealNegativoConComa.test(str));
    } else
      return(false);
  }
}

// Determina si la cadena es alfanumerica
function esCadenaAlfanumerica(str) {
// Devuelve: true si la cadena recibida es alfanumerica o false en caso contrario

  var expresionRegular = /^[A-Za-z0-9]+$/;

  return(expresionRegular.test(str));
}

// Determina si la cadena tiene un numero de afiliado valido
function esNumeroAfiliadoValido(str) {

  var expresionRegular = /^\d{3,8}$/;

  // Si es un numero entero
  if (esCadenaConNumeroEntero(str))
    return(expresionRegular.test(str));
  else
    return(false);
}

// Determina si la cadena tiene un numero de beneficiario valido
function esNumeroBeneficiarioValido(str) {

  var expresionRegular = /^\d{6}$/;

  // Si es un numero entero
  if (esCadenaConNumeroEntero(str))
    return(expresionRegular.test(str));
  else
    return(false);
}

// Determina si la cadena tiene un numero de documento valido
function esNumeroDocumentoValido(str) {

  var expresionRegular = /^\d{6,10}$/;

  // Si es un numero entero
  if (esCadenaConNumeroEntero(str))
    if (str > 10000)
      return(expresionRegular.test(str));
    else
      return(false);
  else
    return(false);
}

// Determina si las cadenas comparadas son iguales
function sonCadenasIguales(str1, str2) {
// Devuelve: true si las cadenas recibidas son iguales o false en caso contrario

  if(str1 == str2)
    return(true);
  else
    return(false);
}

// Determina si el monto es valido
function esMontoValido(str) {

  // Si es un numero entero
  if ((esCadenaConNumeroEntero(str)) &&
      (str > 0))
    return(true);
  else {
    if ((esCadenaConNumeroReal(str)) &&
        (str > 0))
      return(true);
    else
      return(false);
  }
}

/******************************************************************************/
/********     FUNCIONES DE MANEJO DE FECHAS EN FORMATO "dd/mm/aaaa"     *******/
/******************************************************************************/

// Convierte una fecha expresada en un numero de 8 digitos en una una fecha en
// formato "dd/mm/aaaa"
function aFormatoEstandar(strFecha) {

  var expresionRegular = /^\d{8}$/;

  if (! expresionRegular.test(strFecha))
		 	return (strFecha);

  return strFecha.substring(0,2) +"/" + strFecha.substring(2,4) + "/" + strFecha.substring(4,8);
}

// Compara dos fechas en formato "dd/mm/aaaa"
function compararCadenasDeFechas(strFecha1, strFecha2) {
// Precondicion: las fechas debe tener el formato "dd/mm/aaaa" y deben ser validas
// Devuelve: un valor menor que 0 si strFecha1 < strFecha2
//           un valor mayor que 0 si strFecha1 > strFecha2
//           0 si strFecha1 == strFecha2

    var f1 = strFecha1.split("/");
    var f2 = strFecha2.split("/");
  
    var fecha1 = new Date(f1[2],f1[1] - 1, f1[0]);
    var fecha2 = new Date(f2[2],f2[1] - 1, f2[0]);
  
    var fecha1MS = fecha1.getTime();
    var fecha2MS = fecha2.getTime();

    if (fecha1MS < fecha2MS) {
        return(-1);
    } else {
        if(fecha1MS == fecha2MS){ 
            return (0);
        } else { 
            return (1); 
        }
    }
}

// Calcula la cantidad de dias entre dos fechas en formato "dd/mm/aaaa"
function obtenerCantidadDeDiasEntreFechas(strFechaDesde, strFechaHasta) {
// Precondicion: las fechas debe tener el formato "dd/mm/aaaa"
// Devuelve: la cantidad de dias entre las dos fechas recibidas

  var f1 = strFechaDesde.split("/");
  var f2 = strFechaHasta.split("/");

  // Se obtienen instancias de la clase Date para calcular la cantidad de dias
  // entre las fechas recibidas
  var fechaDesde = new Date(f1[2],f1[1] - 1, f1[0]);
  var fechaHasta = new Date(f2[2],f2[1] - 1, f2[0]);
  var fechaDesdeMS = fechaDesde.getTime();
  var fechaHastaMS = fechaHasta.getTime();

  // Se comparan las fechas para poder obtener el valor absoluto de la cantidad
  // de dias cuando sea necesario
  var comparacion = compararCadenasDeFechas(strFechaDesde, strFechaHasta);

  if(comparacion < 0)
    return(((fechaDesdeMS - fechaHastaMS) / 1000 / 60 / 60 / 24) * (-1));
  else {
    if(comparacion > 0)
      return((fechaDesdeMS - fechaHastaMS) / 1000 / 60 / 60 / 24);
    else
      return(0);
  }
}

// Determina la cantidad de dias que posee un mes en determinado anio
function obtenerCantidadDeDiasDelMes(mes, anio) {
// Precondicion: el mes recibido debe corresponderse con alguna de las constantes
//               definidas anteriormente
// Devuelve: la cantidad de dias que posee el mes recibido en el anio recibido 

  // Si no es un mes valido
  if(mes < ENERO || mes > DICIEMBRE)
    return(0);
  // Si el mes recibido tiene 31 dias
  if(mes == ENERO || mes == MARZO || mes == MAYO || mes == JULIO ||
     mes == AGOSTO || mes == OCTUBRE || mes == DICIEMBRE)
    return(31);
  // Si el mes recibido tiene 30 dias
  if(mes == ABRIL || mes == JUNIO || mes == SEPTIEMBRE || mes == NOVIEMBRE)
    return(30);
  // Si el mes recibido es Febrero y es un anio bisiesto
  if((anio % 400 == 0) || ((anio % 4 == 0) && (anio % 100 != 0)))
    return(29);
  // Si el mes recibido es Febrero y no es un anio bisiesto
  else
    return(28);
}

// Determina la validez de una fecha
function esFechaValida(strFecha) {
// Precondicion: la fecha recibida debe tener el formato "dd/mm/aaaa"
// Devuelve: true si la fecha recibida es valida o false en caso contrario
    
    var f = strFecha.split("/");

  var dia = parseInt(f[0],10);
  var mes = parseInt(f[1],10);
  var anio = parseInt(f[2],10);
  var cantidadDeDias = 0;
  var expresionRegular = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(\d{4})$/;

  // Si la fecha es valida
  if(expresionRegular.test(strFecha)) {
    // Si el anio es valido
    if((anio >= MIN_YEAR) && (anio <= MAX_YEAR)) {
      cantidadDeDias = obtenerCantidadDeDiasDelMes(mes, anio);
      // Si el dia es valido (se hace esto para chequear los anios bisiestos)
      if((dia >= 1) && (dia <= cantidadDeDias))
        return(true);
      else
        return(false);
    }
    else
      return(false);
  }
  else
    return(false);
}

/******************************************************************************/
/***********     FUNCIONES DE MANEJO DE HORAS EN FORMATO "hh:mm"     **********/
/******************************************************************************/

// Obtiene la hora de una hora en formato "hh:mm"
function obtenerHorasDeHora(strHora) {
// Precondicion: la hora debe tener el formato "hh:mm"

  return(strHora.substring(0,strHora.indexOf(DIVISOR_HORA)));
}

// Obtiene los minutos de una hora en formato "hh:mm"
function obtenerMinutosDeHora(strHora) {
// Precondicion: la hora debe tener el formato "hh:mm"

  return(strHora.substring(strHora.indexOf(DIVISOR_HORA) + 1 ,strHora.length));
}

// Compara dos horas en formato "hh:mm"
function compararCadenasDeHoras(strHora1, strHora2) {
// Precondicion: las horas debe tener el formato "hh:mm" y deben ser validas
// Devuelve: un valor menor que 0 si strHora1 < strHora2
//           un valor mayor que 0 si strHora1 > strHora2
//           0 si strHora1 == strHora2

  var hora1 = parseInt(obtenerHorasDeHora(strHora1),10);
  var minutos1 = parseInt(obtenerMinutosDeHora(strHora1),10);
  var hora2 = parseInt(obtenerHorasDeHora(strHora2),10);
  var minutos2 = parseInt(obtenerMinutosDeHora(strHora2),10);

  if(hora1 < hora2)
    return(-1);
  else {
    if(hora1 > hora2)
      return(1);
    else {
      if(minutos1 < minutos2)
        return(-1);
      else {
        if(minutos1 > minutos2)
          return(1);
        else
          return(0);
      }
    }
  }
}

// Determina la validez de una hora
function esHoraValida(strHora) {
// Precondicion: la hora recibida debe tener el formato "hh:mm"
// Devuelve: true si la hora recibida es valida o false en caso contrario

  var expresionRegular = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;

  return(expresionRegular.test(strHora));
}

/******************************************************************************/
/******************     FUNCIONES DE MANEJO DE DOCUMENTOS     *****************/
/******************************************************************************/

// Deshabilita los campos del documento recibido por parametro
function deshabilitarCampos(documento) {

  var formularios = documento.forms;

  // Para todos los formularios del documento
  for (i=0; i < formularios.length; i++) {
    for (j=0; j < formularios[i].elements.length; j++) {
      if ((formularios[i].elements[j].type == 'submit') ||
          (formularios[i].elements[j].type == 'button') ||
          (formularios[i].elements[j].type == 'reset'))
        formularios[i].elements[j].disabled = true;
      else {
        if ((formularios[i].elements[j].type == 'text') ||
            (formularios[i].elements[j].type == 'textarea') ||
            (formularios[i].elements[j].type == 'radio') ||
            (formularios[i].elements[j].type == 'checkbox') ||
            (formularios[i].elements[j].type == 'select-one') ||
            (formularios[i].elements[j].type == 'select-multiple'))
          formularios[i].elements[j].readOnly = true;
      }
    }
  }
}

// Habilita los campos del documento recibido por parametro
function habilitarCampos(documento) {

  var formularios = documento.forms;

  // Para todos los formularios del documento
  for (i=0; i < formularios.length; i++) {
    for (j=0; j < formularios[i].elements.length; j++) {
      if ((formularios[i].elements[j].type == 'submit') ||
          (formularios[i].elements[j].type == 'button') ||
          (formularios[i].elements[j].type == 'reset'))
        formularios[i].elements[j].disabled = false;
      else {
        if ((formularios[i].elements[j].type == 'text') ||
            (formularios[i].elements[j].type == 'textarea') ||
            (formularios[i].elements[j].type == 'radio') ||
            (formularios[i].elements[j].type == 'checkbox') ||
            (formularios[i].elements[j].type == 'select-one') ||
            (formularios[i].elements[j].type == 'select-multiple'))
          formularios[i].elements[j].readOnly = false;
      }
    }
  }
}