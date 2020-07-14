<?php include 'layout/header.php'; ?>
<div  ondragstart="return false" onselectstart="return false" oncontextmenu="return false" class="row mt-3 md-3 mb-3 justify-content-center">
<!-- <div  class="row mt-3 md-3 mb-3 justify-content-center"> -->
    <div class="col-md-6">
        <div class="card" >
            <div class="card-body">
                <h2 class="card-title text-center">Resolver Captcha</h2>
                <hr>
                <div class="bg-info p-3 mb-3 text-white text-center">
                    <h1><?=$this->captcha['captcha']?></h1>
                    <input id="idcaptcha" hidden value="<?=$this->captcha['captcha']?>" />
                </div>
                <form>
                    <div class="input-group mb-3">
                        <input type="text" id="valorUno" class="form-control">
                        <div class="input-group-prepend">
                            <span class="input-group-text">-</span>
                        </div>
                        <input type="text" id="valorDos" class="form-control">
                        <div class="input-group-prepend">
                            <span class="input-group-text">-</span>
                        </div>
                        <input type="text" id="valorTres" class="form-control">
                    </div>
                    <button type="button" id="validarCampos" onclick="validarCaptcha()" class="btn btn-primary btn-block">Validar</button>
                </form>
            </div>
        </div>
    </div>
</div>
<div id="div-botones" class="row justify-content-center">
</div>
<?php include 'layout/footer.php'; ?>
<script src="public/js/vercaptcha.js" type="text/javascript"></script>