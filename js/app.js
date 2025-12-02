const userSalvo = localStorage.getItem('user')

if (userSalvo == null) {
    alert('Você precisa fazer login para acessar essa página.')
    location.href = 'login.html'
} else {
    const userWelcome = document.querySelector('#usuario')
    userWelcome.innerHTML = 'Bem vindo, ' +  userSalvo
}


const formCategoria = document.querySelector('#form-categoria');
const inputNomeCategoria = document.querySelector('#nomeCategoria');
const inputCorCategoria = document.querySelector('#corCategoria');
const listaFiltros = document.querySelector('#lista-filtros');

const formMidia = document.querySelector('#form-midia');
const inputTituloMidia = document.querySelector('#tituloMidia');
const categoriaMidiaSelect = document.querySelector('#categoriaMidiaSelect');
const gridMidias = document.querySelector('#grid-midias');

function getCategorias() {
    let categoriaStorage = localStorage.getItem('user')
    let vetorCategorias

    if (categoriaStorage == null) {
        vetorCategorias = []
        return vetorCategorias
    } else {
       vetorCategorias = JSON.parse(categoriaStorage)
       return vetorCategorias
    }
}

function getMidias() {
    let midiasStorage = localStorage.getItem('midias')
    let vetorMidias

    if (midiasStorage == null) {
        vetorMidias = []
        return vetorMidias
    } else {
       vetorMidias = JSON.parse(midiasStorage)
       return vetorMidias
    }
}

function saveCategorias(vetorCategorias) {
    localStorage.setItem('categorias', JSON.stringify(vetorCategorias))
}

function saveMidias(vetorMidias) {
    localStorage.setItem('midias', JSON.stringify(vetorMidias))
}

function renderizarCategorias() {
    let vetorCategorias = getCategorias()

    listaFiltros.innerHTML = ''
    categoriaMidiaSelect.innerHTML = ''

    for (let i = 0; i < vetorCategorias.length; i++) {
        let categoriasBtn = document.createElement('button')
        categoriasBtn.classList.add('btn', 'btn-outline-secondary')
        categoriasBtn.innerHTML = inputNomeCategoria.value
        categoriasBtn.style.borderColor = vetorCategorias[i].cor
        DataTransferItem.id = vetorCategorias[i].id

    }
}