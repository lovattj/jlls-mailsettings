<?php
define("db_path", "sqlite:emailsettings.sqlite"); // Modify this if your .sqlite file isn't in the same folder.

function getProviders() {
	$arraytoreturn = Array();
	$db = new PDO(db_path);
	$sprepare = $db->prepare('SELECT * FROM providers ORDER by providername COLLATE NOCASE asc');
	$sprepare->execute(array());
	foreach ($sprepare->fetchAll() as $row) {
		array_push($arraytoreturn, array('providerid' => $row['providerid'], 'providername' => $row['providername']));
	}
	return $arraytoreturn;
}

function getNews() {
	$arraytoreturn = Array();
	$db = new PDO(db_path);
	$sprepare = $db->prepare('SELECT * FROM news ORDER by timestamp desc');
	$sprepare->execute(array());
	foreach ($sprepare->fetchAll() as $row) {
		array_push($arraytoreturn, array('newsid' => $row['newsid'], 'timestamp' => $row['timestamp'], 'newstext' => $row['newstext'], 'newssubject' => $row['newssubject']));
	}
	return $arraytoreturn;
}

function getTips() {
	$arraytoreturn = Array();
	$db = new PDO(db_path);
	$sprepare = $db->prepare('SELECT * FROM tips ORDER BY tiptimestamp DESC');
	$sprepare->execute(array());
	foreach ($sprepare->fetchAll() as $row) {
		array_push($arraytoreturn, array('newsid' => $row['tipid'], 'newstext' => $row['tiptext'], 'newssubject' => $row['tipsubject'], 'newstimestamp' => $row['tiptimestamp']));
	}
	return $arraytoreturn;
}

function getGlossary() {
	$arraytoreturn = Array();
	$db = new PDO(db_path);
	$sprepare = $db->prepare('SELECT * FROM glossary ORDER BY entrytitle ASC');
	$sprepare->execute(array());
	foreach ($sprepare->fetchAll() as $row) {
		array_push($arraytoreturn, array('entryid' => $row['entryid'], 'entrytitle' => $row['entrytitle'], 'entrydescription' => $row['entrydescription']));
	}
	return $arraytoreturn;
}

function getProviderByExtension($extension) {
	$arraytoreturn = Array();
	$db = new PDO(db_path);
	$sprepare = $db->prepare('SELECT providers.providerid, providers.providername, providers.incomingtype, providers.incomingserver, providers.incomingport, providers.incomingssl, providers.outgoingtype, providers.outgoingserver, providers.outgoingport, providers.outgoingssl, providers.notes, providers.username FROM providers INNER JOIN extensions ON providers.providerid = extensions.providerid WHERE extensions.extension = ? LIMIT 1');
	$sprepare->execute(array($extension));
	foreach ($sprepare->fetchAll() as $row) {
		array_push($arraytoreturn, array('providerid' => $row['providerid'], 'providername' => $row['providername'], 'incomingtype' => $row['incomingtype'], 'incomingserver' => $row['incomingserver'], 'incomingport' => $row['incomingport'], 'incomingssl' => $row['incomingssl'], 'outgoingtype' => $row['outgoingtype'], 'outgoingserver' => $row['outgoingserver'], 'outgoingport' => $row['outgoingport'], 'outgoingssl' => $row['outgoingssl'], 'notes' => $row['notes'], 'username' => $row['username']));
	}
	return $arraytoreturn;
}

function getProviderInfo($providerid) {
	$arraytoreturn = Array();
	$db = new PDO(db_path);
	$sprepare = $db->prepare('SELECT * FROM providers WHERE providerid = ? LIMIT 1');
	$sprepare->execute(array($providerid));
	foreach ($sprepare->fetchAll() as $row) {
		array_push($arraytoreturn, array('providerid' => $row['providerid'], 'providername' => $row['providername'], 'incomingtype' => $row['incomingtype'], 'incomingserver' => $row['incomingserver'], 'incomingport' => $row['incomingport'], 'incomingssl' => $row['incomingssl'], 'outgoingtype' => $row['outgoingtype'], 'outgoingserver' => $row['outgoingserver'], 'outgoingport' => $row['outgoingport'], 'outgoingssl' => $row['outgoingssl'], 'notes' => $row['notes'], 'username' => $row['username']));
	}
	return $arraytoreturn;
}

?>