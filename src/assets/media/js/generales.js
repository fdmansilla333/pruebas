function popUp(URL, id, width, height) {
    
    eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=0,width=" + width + ",height=" + height + ",left = 326,top = 157');");

}

function alerta(msg) {
    if (msg.length != 0)
        alert(msg);
}


function formatearFecha( campo ) {
    if ( (/^\d{8}$/.test(campo.value)) ) {
        campo.value = campo.value.substring(0,2) + '/' + campo.value.substring(2, 4) + '/' + campo.value.substring(4,8);
    }
}


function trim(campo){
    do {
        campo.value = campo.value.replace(' ','');
    } while(campo.value.indexOf(' ') >= 0);
}




