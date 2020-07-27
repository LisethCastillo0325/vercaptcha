
var contadorLinksBoton1 = 0;
var contadorLinksBoton2 = 0;
var contadorLinksBoton3 = 0;
var finalLinksBoton1 = false;
var finalLinksBoton2 = false;
var finalLinksBoton3 = false;
var agregarBotones = false;
var codigoCaptcha;
var idcaptcha = document.getElementById('idcaptcha').value; 
var url = document.getElementById("url").value;

$(document).ready(function(){
    obtenerDatosLocalizacion();
    generarCodigo();
}); 

function validarCaptcha(){
    var valorUno  = document.getElementById("valorUno").value;
    var valorDos  = document.getElementById("valorDos").value;
    var captchaValidar = valorUno+'-'+valorDos;
    if((valorUno).length === 0 || (valorDos).length === 0){
        alerta('warning','Debes completar los campos!','');
    }else{
        if(captchaValidar !== codigoCaptcha){
            alertaTiempo('error','Incorrecto!','Intenta de nuevo.', 1300).then(function(){
                generarCodigo();
            });
        }else{
            habilitarBotones();
        }
    }
}

function habilitarBotones(){
    if(agregarBotones === false){
        var boton1 = "<button id='linkUno' class='btn btn-dark p-3 ml-3 boton-link' type='button'>Link 1</button>";
        var boton2 = "<button id='linkDos' class='btn btn-dark p-3 ml-3 boton-link' type='button'>Link 2</button>";
        var boton3 = "<button id='linkTres' class='btn btn-dark p-3 ml-3 boton-link' type='button'>Link 3</button>";
        $("#div-botones").addClass('animated fadeIn');
        $("#div-botones").append(boton1, boton2, boton3);
        inhabilitarBoton('validarCampos');
        agregarEventoABotones();
    }
}

function agregarEventoABotones(){
    agregarBotones = true;
    agregarEventoABoton('linkUno');
    agregarEventoABoton('linkDos');
    agregarEventoABoton('linkTres');
}

function agregarEventoABoton($id){
    document
    .getElementById($id)
    .addEventListener('click', function(){
        obtenerLinksBotones($id);
    });
}

function obtenerLinksBotones(keyLink){
    if(finalLinksBoton1 === false || finalLinksBoton2 === false || finalLinksBoton3 === false){
        $.post(url+"captcha/apiObtenerCaptcha/", {idcaptcha: idcaptcha},
            function (data) {
                manejadorLinks(keyLink, data['data']['links'][0][keyLink]);
            }, "json");
    }
}

function manejadorLinks(botonID, links){

    switch (botonID) {
        case 'linkUno':
            if(links.length <= contadorLinksBoton1){
                finalLinksBoton1 = true;
                inhabilitarBoton(botonID);
            }else{
                abrirLink(links[contadorLinksBoton1]);
                contadorLinksBoton1++;
            }
            break;
        case 'linkDos':
            if(links.length <= contadorLinksBoton2){
                finalLinksBoton2 = true;
                inhabilitarBoton(botonID);
            }else{
                abrirLink(links[contadorLinksBoton2]);
                contadorLinksBoton2++;
            }
            break;
        case 'linkTres':
            if(links.length <= contadorLinksBoton3){
                finalLinksBoton3 = true;
                inhabilitarBoton(botonID);
            }else{
                abrirLink(links[contadorLinksBoton3]);
                contadorLinksBoton3++;
            }
            break;
        default:
            break;
    }
}

function abrirLink(url){
    var win = window.open(url, '_blank'); // Abrir nuevo tab
    win.focus();  // Cambiar el foco al nuevo tab 
}

function inhabilitarBoton(id){
    $('#'+id).attr("disabled", true);
}

function alerta(tipo, titulo, mensaje){
    return swal({
        title: titulo,
        text: mensaje,
        type: tipo
    });
}

function alertaTiempo(tipo, titulo, mensaje, tiempo){
    return swal({
        title: titulo,
        text: mensaje,
        type: tipo,
        showConfirmButton: false,
        timer: tiempo
    });
}

function obtenerDatosLocalizacion(){

    $.ajax({
        type: 'POST',
        url: url+"ipapi/api-obtener-ipapi-seleccionado/",
        data : { pagina: "vercaptcha"},
        async: true,
        success: function(data) {
            resultado = JSON.parse(data);
            //console.log(resultado);
            if(! resultado.OK){
                alerta("error", "Error", resultado.mensaje);
            }else{
                if(resultado.data === undefined || resultado.data === null){
                    console.log('No se encontró información de api seleccionado para registrar los datos de vista del usuario.');
                }else{
                    consumoApi(resultado.data.urlConsumo, resultado.data.datosRespuesta);
                }
            }
        },
        error: function() {
            alerta("error","No es posible completar la operación!","");
        }
    });
}

function consumoApi(urlConsumo, datosRespuesta){

    $.get(urlConsumo, function(response){
        
        if(datoValidoApi(response)){
            if(datoValidoApi(response[datosRespuesta.pais]) && datoValidoApi(response[datosRespuesta.paisCodigo]) && datoValidoApi(response[datosRespuesta.departamento]) && datoValidoApi(response[datosRespuesta.ciudad]) && datoValidoApi(response[datosRespuesta.ip])){
                
                var paisCodigo = response[datosRespuesta.paisCodigo];
                var urlCountryCode = "http://api.worldbank.org/v2/country/"+paisCodigo+"?format=json";

                $.get(urlCountryCode, function(responseCountryCode){
                    
                    var datosLocalizacion;
                    var nombrePais;

                    if(datoValidoApi(responseCountryCode)){
                        nombrePais = responseCountryCode[1][0].name;
                    }else{
                        console.log('Error en la respuesta de ', urlCountryCode, 'Respuesta: ',responseCountryCode);
                    }

                    if(! datoValidoApi(nombrePais)){
                        nombrePais = response[datosRespuesta.pais];
                    }
                    //console.log(nombrePais);

                    datosLocalizacion = {
                        "captcha": idcaptcha,
                        "pais": nombrePais,
                        "dpto": response[datosRespuesta.departamento],
                        "ciudad":  response[datosRespuesta.ciudad],
                        "ip": response[datosRespuesta.ip],
                        "paisCodigo": paisCodigo
                    };

                    enviarDatos(datosLocalizacion);
                }, "json");
                
               
            }else{
                console.log('Error en ', urlConsumo, ' no proporciona los datos de respuesta establecidos. Respuesta: ',response);
            }
        }else{
            console.log('Error en la respuesta de ', urlConsumo, 'Respuesta: ',response);
        }
    },"json");
}

function datoValidoApi(dato){
    return (dato !== undefined && dato !== null) ? true : false;
}

function enviarDatos(datosLocalizacion){
    $.ajax({
        type: 'POST',
        url: url+'captcha/api-agregar-visita/',
        data: datosLocalizacion,
        success: function(data){
           resultado = JSON.parse(data);
           //console.log('datos: ', resultado);
        }
    });
}

function generarCodigo(){
    var letras  = new Array("A","B","C","D","F","G","H","K","W","X","Y","Z");
    var posicionLetra1 = Math.floor(Math.random()*11);
    var posicionLetra2 = Math.floor(Math.random()*11);
    while(posicionLetra1==posicionLetra2){
        posicionLetra2 = Math.floor(Math.random()*11);	
    }

    var letra1 = letras[posicionLetra1];
    var letra2 = letras[posicionLetra2];
    var numero1 = "";
    var numero2 = "";

    for(var i=0;i<3;i++){
        numero1=numero1+""+Math.floor((Math.random()*8)+1);	
        numero2=numero2+""+Math.floor((Math.random()*8)+1);	
    }

    codigo1 = letra1+numero1;
    codigo2 = letra2+numero2;
    codigoCaptcha = codigo1+"-"+codigo2;

    document.getElementById("codigo-captcha").innerHTML="<span class='fadeIn'>"+codigo1+"</span><span class='fadeIn white'> - </span><span class='fadeIn'>"+codigo2+"</span>";
}