$(document).ready(function () {
    const toastLive = document.getElementById('liveToast');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);

    const tbody = $('#tbodyRegistros');

    function criaTabela(data) {
        $(tbody).empty();

        if (data.length > 0) {

            $.each(data, (key, value) => {


                let row = $('<tr class="registro">').appendTo(tbody);
                $('<th scope="row">').text(value.id).appendTo(row);
                $('<td class="nome">').text(value.nome).appendTo(row).addClass('nome');
                $('<td class="email">').text(value.email).appendTo(row).addClass('email');
                $('<td class="idade">').text(value.idade).appendTo(row).addClass('idade');
                $('<td class="funcoes">').append('<i type="button" class="edicao bi bi-pencil-fill btn btn-outline-info d-none w-25 p-0" value="' + value.id + '"></i>   <i type="button" class="exclusao bi bi-trash-fill btn btn-outline-danger d-none w-25 p-0" value="' + value.id + '"></i>').appendTo(row);

            });

        } else {

            $('<tr>').append($('<td colspan="5">').text('Nenhum usuário encontrado')).appendTo(tbody);

        }
    }



    $(document).on('click', '.exclusao', function (e) {
        e.preventDefault();
        let id = $(this).attr('value');

        $.ajax({
            type: "GET",
            url: "server/api.php/excluir/" + id,
            dataType: "json",
            success: function (data) {
                $('#liveToastBody').text(data.mensagem);
                toastBootstrap.show();
                carregarUsuarios();
            },
            error: function (xhr, status, error) {
                console.log("Error: " + error);
                alert("Error: " + error);
            }
        });
    });

    $(document).on('click', '.edicao', function (e) {
        e.preventDefault();
        let id = $(this).attr('value');
        let usuario = $(this).closest('.registro'); // Seleciona o avô
        let nome = usuario.find('.nome').text();
        let email = usuario.find('.email').text();
        let idade = usuario.find('.idade').text();

        $.ajax({
            type: "POST",
            url: 'server/api.php/editar/' + id,
            data: {
                nome: nome,
                email: email,
                idade: idade
            },
            dataType: "json",
            success: function (data) {
                $('#liveToastBody').text(data.mensagem);
                toastBootstrap.show();
                carregarUsuarios();
            },
            error: function (xhr, status, error) {
                console.log("Error: " + error);
                alert("Error: " + error);
            }
        });
    });

    function carregarUsuarios() {
        $.ajax({
            url: "server/api.php/usuarios",
            dataType: "json",
            type: "POST",
            success: (data) => {
                criaTabela(data);
            },
            error: (xhr, status, error) => {
                alert("Error: " + error);
            }
        });
    }



});