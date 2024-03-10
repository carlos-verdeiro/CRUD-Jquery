$(document).ready(function () {
    const toastLive = document.getElementById('liveToast');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);

    const tbody = $('#tbodyRegistros');

    function criaTabela(dado) {
        $(tbody).empty();

        if (x.length > 0) {
            let dados = [];

            $.each(x, (key, value) => {

                let dadoRow = {
                    id: value.id,
                    nome: value.nome,
                    email: value.email,
                    idade: value.idade
                };
                dados.push(dadoRow);


                let row = $('<tr class="registro">').appendTo(tbody);
                $('<th scope="row">').text(dadoRow.id).appendTo(row);
                $('<td>').text(dadoRow.nome).appendTo(row);
                $('<td>').text(dadoRow.email).appendTo(row);
                $('<td>').text(dadoRow.idade).appendTo(row);
                $('<td class="funcoes">').append('<i type="button" class="edicao bi bi-pencil-fill btn btn-outline-info d-none w-25 p-0" value="' + dadoRow.id + '"></i>   <i type="button" class="exclusao bi bi-trash-fill btn btn-outline-danger d-none w-25 p-0" value="' + dadoRow.id + '"></i>').appendTo(row);

            });
            console.log(dados);

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

        $.ajax({
            type: "POST",
            url: 'server/api.php/editar/' + id,
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