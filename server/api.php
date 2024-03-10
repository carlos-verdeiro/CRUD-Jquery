<?php

try {

    include_once 'conexao.php';

    $requisicao = explode('/', trim($_SERVER['PATH_INFO'], '/'));

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

        case 'excluir':
            $id = $requisicao[1];
            $stmt = $conn->prepare("DELETE FROM usuarios WHERE id = :id");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                echo json_encode(array('mensagem' => 'Usuário excluído com sucesso'));
            } else {
                echo json_encode(array('mensagem' => 'Erro ao excluir o usuário:' . $id));
            }

            break;

        case 'editar':
            $id = $requisicao[1];
            if ($_POST) {
                $nome = $_POST['nome'];
                $email = $_POST['email'];
                $idade = $_POST['idade'];

                $stmt = $conn->prepare("UPDATE usuarios SET nome = :nome, email = :email, idade = :idade WHERE id = :id");
                $stmt->bindParam(':id', $id, PDO::PARAM_INT);
                $stmt->bindParam(':nome', $nome, PDO::PARAM_STR);
                $stmt->bindParam(':email', $email, PDO::PARAM_STR);
                $stmt->bindParam(':idade', $idade, PDO::PARAM_INT);

                $stmt->execute();

                if ($stmt->rowCount() > 0) {
                    echo json_encode(array('mensagem' => 'Usuário editado com sucesso'));
                } else {
                    echo json_encode(array('mensagem' => 'Erro ao editar o usuário'));
                }
            } else {
                echo json_encode(array('mensagem' => 'Nenhum registro'));
            }
            break;

        case 'cadastrar':
            if ($_POST) {
                $nome = $_POST['nome'];
                $email = $_POST['email'];
                $idade = $_POST['idade'];

                $stmt = $conn->prepare("INSERT INTO usuarios (nome, email, idade) VALUES (:nome, :email, :idade)");
                $stmt->bindParam(':nome', $nome, PDO::PARAM_STR);
                $stmt->bindParam(':email', $email, PDO::PARAM_STR);
                $stmt->bindParam(':idade', $idade, PDO::PARAM_INT);

                $stmt->execute();

                if ($stmt->rowCount() > 0) {
                    echo json_encode(array('mensagem' => 'Usuário inserido com sucesso'));
                } else {
                    echo json_encode(array('mensagem' => 'Erro ao inserir o usuário'));
                }
            } else {
                echo json_encode(array('mensagem' => 'Nenhum registro'));
            }
            break;

        default:
            echo json_encode(['error' => true, 'mensagem' => 'Usuario nao encontrado']);
            break;
    }
} catch (PDOException $e) {
    echo json_encode(['error' => true, 'mensagem' => 'Erro no servidor: ' . $e->getMessage()]);
}
