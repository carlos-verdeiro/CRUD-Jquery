$(document).ready(() => {//quando carrega página
    const tbody = $('#tbodyRegistros');
    function criaTabela(dados) {
        $(tbody).empty();
        if (dados.length > 0) {

            $.each(dados, (key, value) => {


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

    $('#findButton').click((e) => {//Procurar
        e.preventDefault();
        let procura = $("#findInput").val();
        if (procura == '') {
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
            })
        } else {
            $.ajax({
                url: "server/api.php/busca/" + procura,
                dataType: "json",
                type: "POST",
                success: (data) => {
                    criaTabela(data);
                },
                error: (xhr, status, error) => {
                    alert("Error: " + error);
                }
            })
        }

    });

    $(document).on('mouseenter', '.registro', function () {
        $(this).find('.funcoes i').removeClass('d-none');
    });

    $(document).on('mouseleave', '.registro', function () {
        $(this).find('.funcoes i').addClass('d-none');
    });
})