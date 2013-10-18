<?php
error_reporting(E_ALL ^ E_NOTICE);
date_default_timezone_set('Europe/London');
require_once "functions.php";

$arraytoreturn = Array();

switch (@$_GET['method']) {

case "getproviders":
	$status = 'success';
	$arraytoreturn = getProviders();
	break;

case "getnews":
	$status = 'success';
	$arraytoreturn = getNews();
	break;

case "getglossary":
	$status = 'success';
	$arraytoreturn = getGlossary();
	break;


case "gettips":
	$status = 'success';
	$arraytoreturn = getTips();
	break;

case "getproviderinfo":
	$status = 'success';
	$arraytoreturn = getProviderInfo($_GET['providerid']);
	break;
	
case "getproviderbyextension":
	$status ='success';
	$arraytoreturn = getProviderByExtension($_GET['extension']);
	break;

default:
	$status = 'error';
	$arraytoreturn = array('Error' => 'No method specified');
}

$result = Array('result' => $arraytoreturn);

if (($arraytoreturn) == null) {
	// Return 404 if a matching result wasn't found.
	header("HTTP/1.1 404 File Not Found");
	echo (json_encode($arraytoreturn));
} else if ($arraytoreturn['Error'] == 'No method specified') {
	// Return 500 if the user attempts to access an unimplemented API method.
	header("HTTP/1.0 500 Internal Server Error");
	echo (json_encode($arraytoreturn));
} else {
	// Otherwise return 200 and the output.
	echo (json_encode($arraytoreturn));
}
?>