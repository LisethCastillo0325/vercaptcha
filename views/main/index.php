<?php include 'layout/header.php'; ?>

<!-- <div  class="row mt-3 md-3 mb-3 justify-content-center"> -->

<div class="wrapper fadeInDown">
    <div id="formContent">
        <h3 class="card-title text-center pt-3">Resolver Captcha</h3>
        <hr>
        <div class="bg-info p-3 m-2 text-white text-center fadeIn first">
            <h1><?=$this->captcha['captcha']?></h1>
            <input id="idcaptcha" hidden value="<?=$this->captcha['captcha']?>" />
        </div>
        <form class="p-2">
            <div class="input-group mb-3">
                <input type="text" id="valorUno" class="form-control" required>
                <div class="input-group-prepend">
                    <span class="input-group-text border-0">-</span>
                </div>
                <input type="text" id="valorDos" class="form-control" required>
                <div class="input-group-prepend border-0">
                    <span class="input-group-text border-0">-</span>
                </div>
                <input type="text" id="valorTres" class="form-control">
            </div>
            <button type="button" id="validarCampos" onclick="validarCaptcha()" class="btn btn-primary btn-block fadeIn">Validar</button>
        </form>
    </div>  
    <hr><br>
    <div id="div-botones" class="row justify-content-center">
    </div>
</div>


<?php include 'layout/footer.php'; ?>
<script src="public/js/vercaptcha.js" type="text/javascript"></script>