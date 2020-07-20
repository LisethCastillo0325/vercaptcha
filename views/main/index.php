<?php include 'views/layout/header.php'; ?>

<div class="wrapper fadeInDown">
    <div id="formContent">
        <div class="textoTitulo">
            <h3 class="card-title text-center pt-3">Resolver Captcha</h3>
        </div>
        <hr>
        <div class="text-center fadeIn first codigoCaptcha textoCodigoCaptcha">
            <h1><div id="codigo-captcha" ></div></h1>
            <input id="idcaptcha" hidden value="<?=$this->captcha['captcha']?>" />
        </div>
        <form class="p-2 frmCaptcha">
            <div class="input-group mb-3">
                <input type="text" id="valorUno" class="form-control" maxlength="4" required>
                <div class="input-group-prepend">
                    <span class="input-group-text border-0">-</span>
                </div>
                <input type="text" id="valorDos" class="form-control" maxlength="4" required>
            </div>
            <button type="button" id="validarCampos" onclick="validarCaptcha()" class="btn btn-block fadeIn btnValidarCaptcha">Validar</button>
        </form>
    </div>  
    <hr><br>
    <div id="div-botones" class="row justify-content-center mb-2">
    </div>
    <div class="visitas-captcha fadeIn first" title="Visita número <?=$this->captcha['cantidadVisitas']+1?>">
        <i class="fa fa-eye fa-2x " aria-hidden="true" > <br>
            <span><?=$this->captcha['cantidadVisitas']+1?></span>
        </i>
    </div>
    <span class="fadeIn second texto-visitas">Visitas</span>
</div>

<?php include 'views/layout/footer.php'; ?>
<script src="public/js/vercaptcha.js" type="text/javascript"></script>