<?php

$DBUSER="visualou_adm";
$DBPASSWD="Sso6eZK0bf=;";
$DATABASE="visualou_contao";

$filename = "backup-" . date("d-m-Y") . ".sql.gz";
$mime = "application/x-gzip";

header( "Content-Type: " . $mime );
header( 'Content-Disposition: attachment; filename="' . $filename . '"' );

$cmd = "mysqldump -u $DBUSER --password=$DBPASSWD $DATABASE | gzip --best";

passthru( $cmd );