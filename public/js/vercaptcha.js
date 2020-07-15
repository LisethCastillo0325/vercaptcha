
var idcaptcha;
var contadorLinksBoton1 = 0;
var contadorLinksBoton2 = 0;
var contadorLinksBoton3 = 0;
var finalLinksBoton1 = false;
var finalLinksBoton2 = false;
var finalLinksBoton3 = false;
var agregarbotones = false;

function validarCaptcha(){
    idcaptcha     = document.getElementById("idcaptcha").value;
    var valorUno  = document.getElementById("valorUno").value;
    var valorDos  = document.getElementById("valorDos").value;
    var valorTres = document.getElementById("valorTres").value;
    var captchaValidar = valorUno+'-'+valorDos+'-'+valorTres;

    if((valorUno).length === 0 || (valorDos).length === 0 || (valorTres).length === 0){
        alerta('info','Debes completar los campos!','');
    }else{
        if(captchaValidar !== idcaptcha){
            alerta('warning','Aún no logras resolver el captcha!','Intenta de nuevo.');
        }else{
            habilitarBotones();
        }
    }
}

function habilitarBotones(){
    if(agregarbotones === false){
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
    agregarbotones = true;
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
        $.post("http://localhost/captchamvc/captcha/apiObtenerCaptcha/", {idcaptcha: idcaptcha},
            function (data) {
                manejadorLinks(keyLink, data['data']['links'][0][keyLink]);
            }, "json");
    }
}

function manejadorLinks(botonID, links){
    console.log('links: ', links);

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
    // Abrir nuevo tab
    var win = window.open(url, '_blank');
    // Cambiar el foco al nuevo tab 
    win.focus();
}

function inhabilitarBoton(id){
    $('#'+id).attr("disabled", true);
}

function alerta(tipo, titulo, mensaje){
    swal({
        title: titulo,
        text: mensaje,
        type: tipo
    });
}

function confirmDelete(idcaptcha) {

    swal({
        title: "Atención!!!",
        text: "¿Esta seguro de eliminar el registro?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Eliminar!",
        cancelButtonText: "Cancelar!",

    }).then(result => {
        swal("Eliminado!", "Su Registro ha sido eliminado.", "success");
        if (result.value) {

            //window.location.href="http://localhost/captchamvc/captcha/eliminar/"+idcaptcha;
            $.post("http://localhost/captchamvc/captcha/eliminar/" + idcaptcha);
            location.reload();

        } else if (
            // Read more about handling dismissals
            result.dismiss === swal.DismissReason.cancel
        ) {
            swal("Cancelado", "Tu Registro esta seguro :)", "error");
        }
        //swal.closeModal();
    });
}


function adiccionarCamposLinkUno() {

    var campos_max          = 10;   //max de 10 campos

    var x = 3;
    $('#add_btn_1').click (function(e) {
        e.preventDefault();     //prevenir novos clicks
        if (x < campos_max) {
            $('#link_1').append('<div class="form-group">\
                                <input type="text" class="form-control form-control-sm" name="campo[]">\
                                <a href="#" class="remover_campo">Remover</a>\
                                </div>');
            x++;
        }
    });
    // Remover o div anterior
    $('#listas').on("click",".remover_campo",function(e) {
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    });
}

function adiccionarCamposLinkDos() {

    var campos_max          = 10;   //max de 10 campos

    var x = 3;
    $('#add_btn_2').click (function(e) {
        e.preventDefault();     //prevenir novos clicks
        if (x < campos_max) {
            $('#link_2').append('<div class="form-group">\
                                <input type="text" class="form-control form-control-sm" name="campo[]">\
                                <a href="#" class="remover_campo">Remover</a>\
                                </div>');
            x++;
        }
    });
    // Remover o div anterior
    $('#listas').on("click",".remover_campo",function(e) {
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    });
}


function adiccionarCamposLinkTres() {

    var campos_max          = 10;   //max de 10 campos

    var x = 3;
    $('#add_btn_3').click (function(e) {
        e.preventDefault();     //prevenir novos clicks
        if (x < campos_max) {
            $('#link_3').append('<div class="form-group">\
                                <input type="text" class="form-control form-control-sm" name="campo[]">\
                                <a href="#" class="remover_campo">Remover</a>\
                                </div>');
            x++;
        }
    });
    // Remover o div anterior
    $('#listas').on("click",".remover_campo",function(e) {
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    });
}