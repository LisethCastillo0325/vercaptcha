<?php
include 'controllers/errors.controller.php';
require_once('controllers/main.controller.php');

class App{

    function __construct(){
        $this->manejadorGET();
    }

    public function manejadorGET(){
        $url = isset($_REQUEST['url']) ? $_REQUEST['url']: '';
        $url = rtrim($url, "/");
        $url = explode('/', $url);
        $idCaptcha = $url[0];
        $controller = new MainController();
        if( !isset($idCaptcha) || strlen(trim($idCaptcha)) == 0 || count($url) > 1) {
            return new ErrorsController();
        }else{
            $controller->verificarCaptcha($idCaptcha);
        }
    }
}


?>