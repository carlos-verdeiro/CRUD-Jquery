$(document).ready(function () {
    const toastLive = document.getElementById('liveToast');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);
    const edicaoModal = new bootstrap.Modal($('#modalEdicao'));
    const cadastroModal = new bootstrap.Modal($('#modalInsercao'));
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

        $('#idFormEdicao').val(id);
        $('#nomeFormEdicao').val(nome);
        $('#emailFormEdicao').val(email);
        $('#idadeFormEdicao').val(idade);

        edicaoModal.show();

    });

    $(document).on('click', '#btnAtualizar', function (e) {
        e.preventDefault();
        let id = $('#idFormEdicao').val();
        let nomeNovo = $('#nomeFormEdicao').val();
        let emailNovo = $('#emailFormEdicao').val();
        let idadeNovo = $('#idadeFormEdicao').val();

        //VALIDAÇÃO
        let invalidos = false
        $('#formEdicao').addClass('was-validated');
        if (nomeNovo.trim() === "" || nomeNovo.length < 3) {
            invalidos = true;
        }
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailNovo) === "" || emailNovo.length < 3) {
            invalidos = true;
        }
        if (idadeNovo.trim() === "" || idadeNovo < 1) {
            invalidos = true;
        }

        if (!invalidos) {
            $.ajax({
                type: "POST",
                url: 'server/api.php/editar/' + id,
                data: {
                    nome: nomeNovo,
                    email: emailNovo,
                    idade: idadeNovo
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
            $('#formEdicao').removeClass('was-validated');
            edicaoModal.hide();
        }

    });
    //Cadastro
    $(document).on('click', '#btnCadastrar', function (e) {
        e.preventDefault();
        let nome = $('#nomeForm').val();
        let email = $('#emailForm').val();
        let idade = $('#idadeForm').val();

        //VALIDAÇÃO
        let invalidos = false
        $('#formCadastro').addClass('was-validated');
        if (nome.trim() === "" || nome.length < 3) {
            invalidos = true;
        }
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email) === "" || email.length < 3) {
            invalidos = true;
        }
        if (idade.trim() === "" || idade < 1) {
            invalidos = true;
        }

        if (!invalidos) {
            $.ajax({
                type: "POST",
                url: 'server/api.php/cadastrar',
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
            $('#formCadastro').removeClass('was-validated');
            cadastroModal.hide();
        }

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