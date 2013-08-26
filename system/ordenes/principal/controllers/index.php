<?php

class Index extends Controller {

    function __construct() {
        parent::__construct();
        Session::init();
        $logged = Session::get('loggedIn');
        if ($logged == false) {
            Session::destroy();
            $this->view->redirect='orden';
            $this->view->render('login/index');
            exit();
        }
    }

    function index() {
        $this->view->render('index/index');
    }

    function details() {
        $this->view->render('index/index');
    }

}