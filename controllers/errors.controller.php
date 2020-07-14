<?php

class ErrorsController extends Controller{

    function __construct($error_code='404')
    {
        parent::__construct();
        $this->view->render('errors/'.$error_code);
    }

}


?>