<?php

try {

    include_once 'conexao.php';

    $requisicao = explode('/', trim($_SERVER['PATH_INFO'], '/'));
    /*
trim: remove caracteres de início e fim, nesse caso "/";
explode: transforma em array com "/" de divisores;
*/

    header('Content-Type: application/json');

    switch ($requisicao[0]) {
        case 'usuarios':
            $stmt = $conn->prepare("SELECT * FROM usuarios");
            $stmt->execute();
            $usuarios = $stmt->fetchAll();
            echo json_encode($usuarios);
            break;

        case 'busca':
            $busca = $requisicao[1];
            $stmt = $conn->prepare("SELECT * FROM usuarios WHERE (nome LIKE CONCAT('%', :nome, '%') OR email LIKE CONCAT('%', :email, '%')) OR idade = :idade");
            $stmt->bindParam(':nome', $busca, PDO::PARAM_STR_CHAR);
            $stmt->bindParam(':email', $busca, PDO::PARAM_STR_CHAR);
            $stmt->bindParam(':idade', $busca, PDO::PARAM_INT);
            $stmt->execute();
            $usuarios = $stmt->fetchAll();
            echo json_encode($usuarios);
            break;

        default:
            echo json_encode(['error' => true, 'errorMessage' => 'Usuario nao encontrado']);
            break;
    }
} catch (PDOException $e) { //caso aconteça erro

    echo "Error: " . $e->getMessage(); //exibe erro

}
