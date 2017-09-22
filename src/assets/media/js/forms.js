/* forms.js */

/**
 * Esta funcion se encarga de mostrar
 * los errores de un form que fue 
 * enviado con ajax al server...
 * @param errores un json
 */
function mostrarErrorForm(errores, form){
	limpiarErrorsForm(form);
	$.each(errores, function(k,v){ 
		$('#id_td_'+k).addClass('error');
		$('#id_p_'+k).html(v);
	});
}

function limpiarErrorsForm(form){
	
	$('.error > p', form).each(function(k,v){
		$(v).html("");
	});
	
	$('.error', form).each(function(k,v){ 
			$(v).removeClass('error');
			
	});
}

function mostrarMensajeDeError(msg){
	
	var boton = document.createElement('a');
	
	$('#mensaje_error').html(msg+"<br><br>");
	$(boton).button();
	$(boton).html("Cerrar");
	$(boton).click(cerrarMensajeDeError);
	$('#mensaje_error').append(boton);
	$('#mensaje_error').slideDown();
	
}

function cerrarMensajeDeError(){
	$('#mensaje_error').html("");
	$('#mensaje_error').slideUp();
}
