// script.js
$(document).ready(function() {
    $('#form-cep').on('submit', function(e) {
        e.preventDefault();

        // Limpa mensagens anteriores
        $('#erro').hide();
        $('#endereco').hide();
        $('#cep').removeClass('invalid');

        var cep = $('#cep').val().replace(/\D/g, ''); // Remove caracteres não numéricos

        if (cep === "") {
            alert("Por favor, insira um CEP.");
            return;
        }

        if (cep.length !== 8) {
            $('#cep').addClass('invalid');
            alert("CEP inválido. Deve ter 8 números.");
            return;
        }

        // Faz a requisição AJAX usando a API ViaCEP
        $.ajax({
            url: `https://viacep.com.br/ws/${cep}/json/`,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                if (!data.erro) {
                    // Preenche os campos com os dados retornados
                    $('#logradouro').text(data.logradouro);
                    $('#bairro').text(data.bairro);
                    $('#cidade').text(data.localidade);
                    $('#estado').text(data.uf);

                    // Exibe o resultado
                    $('#endereco').show();
                } else {
                    $('#erro').show();
                }
            },
            error: function() {
                $('#erro').show();
            }
        });
    });
});
