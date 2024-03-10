<?php

$conn = new PDO('mysql:host=localhost;dbname=crud', 'root', ''); //conexão e pa^rametros do banco
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);//para receber erro