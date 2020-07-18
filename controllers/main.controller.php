<?php
class MainController extends Controller{

    function __construct() {
        parent::__construct();
    }

    public function verificarCaptcha($id){
        $resultado = Http::httpPost(constant('URL') . "captcha/apiObtenerCaptcha/", ["idcaptcha" => $id]);  //$this->httpPost($id);
        if(!$resultado['OK'] || is_null($resultado['data'])){
            new ErrorsController('404');
        }else{
            $captcha = $resultado['data'];
            $this->view->captcha = $captcha;
            $this->view->render('main/index');
        }
    }

}


?>