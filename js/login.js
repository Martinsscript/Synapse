const user = document.querySelector('#nomeUsuario')
const pass = document.querySelector('#senhaUsuario')
const submit = document.querySelector('#submit')

submit.addEventListener('click', function() {
    let userSalvo = localStorage.getItem('user')
    let senhaSalva = localStorage.getItem('senha')

    if (userSalvo === null || senhaSalva === null) {
        window.alert('Conta criada! Bem-vindo(a), ' + user.value)
        localStorage.setItem('user', user.value)
        localStorage.setItem('senha', pass.value)
        location.reload();
    } else if (user.value === userSalvo && pass.value === senhaSalva) {
        location.href = "app.html"
    } else {
        window.alert('Usuário ou senha incorretos.')
        user.value = ''
        pass.value = ''
    }
})