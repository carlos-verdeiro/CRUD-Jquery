$(document).ready(() => {//quando carrega página
    const tbody = $('#tbodyRegistros');
    function criaTabela(dado) {
        $(tbody).empty();
        if (dado.length > 0) {
            $.each(dado, (key, value) => {
                let row = $('<tr>').appendTo(tbody);
                $('<td>').text(value.id).appendTo(row);
                $('<td>').text(value.nome).appendTo(row);
                $('<td>').text(value.email).appendTo(row);
                $('<td>').text(value.idade).appendTo(row);
                $('<td>').append('<i type="button" class="bi bi-pencil-fill btn btn-outline-info"></i>   <i type="button" class="bi bi-trash-fill btn btn-outline-danger"></i>').appendTo(row);
            });
        } else {
            $('<tr>').append($('<td colspan="5">').text('Nenhum usuário encontrado')).appendTo(tbody);
        }
    }
    $.ajax({
        url: "server/consulta.php/usuarios",
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
                url: "server/consulta.php/usuarios",
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
                url: "server/consulta.php/busca/" + procura,
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
})