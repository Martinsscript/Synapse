$(document).ready(function () {
    const $user = $('#nomeUsuario');
    const $pass = $('#senhaUsuario');
    const $submit = $('#submit');

    $submit.on('click', function () {
        let userSalvo = localStorage.getItem('user');
        let senhaSalva = localStorage.getItem('senha');
        let userDigitado = $user.val();
        let senhaDigitada = $pass.val();

        if (userSalvo === null || senhaSalva === null) {
            if (userDigitado === "" || senhaDigitada === "") {
                alert('Por favor, preencha todos os campos para criar a conta.');
                return;
            }

            localStorage.setItem('user', userDigitado);
            localStorage.setItem('senha', senhaDigitada);
            window.alert('Conta criada! Bem-vindo(a), ' + userDigitado);
            location.href = "app.html";
        } else if (userDigitado === userSalvo && senhaDigitada === senhaSalva) {
            location.href = "app.html";
        } else {
            window.alert('Usuário ou senha incorretos.');
            $user.val('');
            $pass.val('');
        }
    });
})