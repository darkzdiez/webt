<?php

class Login_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function run(){
        $data = $this->db->select("SELECT iduser, login, role FROM app_user WHERE login = :login AND password = :password", array(
            ':login' => $_POST['login'],
            ':password' => Hash::create('sha256', $_POST['password'], HASH_PASSWORD_KEY)
        ));
        //exit("SELECT iduser, role FROM app_user WHERE login = '".$_POST['login']."' AND password = '".Hash::create('sha256', $_POST['password'], HASH_PASSWORD_KEY)."'");
        $count = count($data, COUNT_RECURSIVE);
        if ($count > 0) {
            // login
            $time=time()+60*60*24;
            if (isset($_POST['recordarme'])) {
                setcookie('recordarme','ab', $time, '/');
                $recordar=true;
            }else{
                setcookie('recordarme','ac', $time, '/');
                $recordar=false;
            }
            Session::init($recordar);
            if($_POST['password']=='123'){
                Session::set('seguridadPass', 'b');
            }else{
                Session::set('seguridadPass', 'm');
            }
            Session::set('role', $data[0]['role']);
            Session::set('loggedIn', true);
            Session::set('login', $data[0]['login']);
            Session::set('iduser', $data[0]['iduser']);
            if(isset($_POST['redirect'])){
                $redirect=PATH_NAV.$_POST['redirect'];
            }else{
                $redirect=PATH_NAV;
            }
            header('location: '.$redirect);
        } else {
            if(isset($_POST['redirect'])){
                $redirect=PATH_NAV.$_POST['redirect'];
            }else{
                $redirect=PATH_NAV.'login';
            }
            header('location: '.$redirect);
        }
        
    }
    
}