$(document).ready(() => {//quando carrega página
    const tbody = $('#tbodyRegistros');
    function criaTabela(x) {
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