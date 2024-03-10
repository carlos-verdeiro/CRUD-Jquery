$(document).ready(() => {//quando carrega página
    const tbody = $('#tbodyRegistros');
    function criaTabela(dado) {
        $(tbody).empty();
        if (dado.length > 0) {
            $.each(dado, (key, value) => {
                let row = $('<tr class="registro">').appendTo(tbody);
                $('<th scope="row">').text(value.id).appendTo(row);
                $('<td>').text(value.nome).appendTo(row);
                $('<td>').text(value.email).appendTo(row);
                $('<td>').text(value.idade).appendTo(row);
                $('<td class="funcoes">').append('<i type="button" class="bi bi-pencil-fill btn btn-outline-info d-none w-25 px-0" value="'+value.id+'"></i>   <i type="button" class="bi bi-trash-fill btn btn-outline-danger d-none w-25 px-0" value="'+value.id+'"></i>').appendTo(row);
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

    $(document).on('mouseenter', '.registro', function() {
        $(this).find('.funcoes i').removeClass('d-none');
    });

    $(document).on('mouseleave', '.registro', function() {
        $(this).find('.funcoes i').addClass('d-none');
    });
})