<?php
/* index.php */
date_default_timezone_set('America/Caracas');
ini_set('zlib.output_compression', 'On');
ini_set('zlib.output_compression_level', '9');
ini_set('session.gc_maxlifetime', 5400);
$version = (float) phpversion();
if($_SERVER['REMOTE_ADDR'] == '::1' OR $_SERVER['REMOTE_ADDR'] == '127.0.0.1'){
	ini_set('track_errors', 1);
    if($version < (float) 5.4){
        ini_set('error_reporting', E_ALL);
    }else{
        ini_set('error_reporting', E_ALL ^ E_STRICT);
    }
    ini_set('display_errors', true);
}else{
	ini_set('track_errors', 0);
	ini_set('error_reporting', 0);
	ini_set('display_errors', false);
}
require 'generalConfig.php';
require 'util/Auth.php';
require LIBS . 'System.php';
//exit(print get_magic_quotes_gpc());
if (get_magic_quotes_gpc()) {

    function stripslashes_array(&$arr) {
        foreach ($arr as $k => &$v) {
            $nk = stripslashes($k);
            if ($nk != $k) {
                $arr[$nk] = &$v;
                unset($arr[$k]);
            }
            if (is_array($v)) {
                stripslashes_array($v);
            } else {
                $arr[$nk] = stripslashes($v);
            }
        }
    }

    @stripslashes_array($_POST);
    @stripslashes_array($_GET);
    @stripslashes_array($_REQUEST);
    @stripslashes_array($_COOKIE);
}
$path = new System();
$path->path($listSYSTEM,$RewriteBase);

// Load the Bootstrap!
require _pathMODULE . '/config.php';
/*exit(print_r(get_defined_constants(true)));*/
function __autoload($class) {
    if (!defined('BASE')) {
        define('BASE', 'tema1');
    }
    $file = LIBS . $class . ".php";
    $file2 = LIBS . $class . "/" . $class . ".php";
    $file3 = 'system/base/' . BASE . '/controllers/' . $class . ".php";
    $file4 = 'system/base/' . BASE . '/models/' . $class . ".php";
    if (file_exists($file)) {
        require $file;
    }elseif(file_exists($file2)){
        require $file2;
    }elseif(file_exists($file3)){
        require $file3;
    }elseif(file_exists($file4)){
        require $file4;
    }
}
function gestor_excepciones($excepcion) {
    print 'Error: ' . DS::logERROR($excepcion->getMessage());
}
set_exception_handler('gestor_excepciones');

$bootstrap = new Bootstrap(_pathMODULE);
// Optional Path Settings
//$bootstrap->setControllerPath();
//$bootstrap->setModelPath();
//$bootstrap->setDefaultFile();
//$bootstrap->setErrorFile();
$bootstrap->init();
?>