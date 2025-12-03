const userSalvo = localStorage.getItem('user')

if (userSalvo == null) {
    alert('Você precisa fazer login para acessar essa página.')
    location.href = 'login.html'
} else {
    const userWelcome = document.querySelector('#usuario')
    userWelcome.innerHTML = 'Bem vindo, ' +  userSalvo
}


const formCategoria = document.querySelector('#form-categoria')
const inputNomeCategoria = document.querySelector('#nomeCategoria')
const inputCorCategoria = document.querySelector('#corCategoria')
const listaFiltros = document.querySelector('#lista-filtros')

const formMidia = document.querySelector('#form-midia')
const inputTituloMidia = document.querySelector('#tituloMidia')
const categoriaMidiaSelect = document.querySelector('#categoriaMidiaSelect')
const gridMidias = document.querySelector('#grid-midias')

const inputPesquisa = document.querySelector('#Pesquisar')

function getCategorias() {
    let categoriaStorage = localStorage.getItem('categorias')
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
    categoriaMidiaSelect.innerHTML = '<option value="" disabled selected>Selecione a Categoria</option>'

    for (let i = 0; i < vetorCategorias.length; i++) {
        let categoriasBtn = document.createElement('button')
        categoriasBtn.classList.add('btn', 'btn-outline-secondary', 'w-100', 'mt-2')
        categoriasBtn.textContent = vetorCategorias[i].nome
        categoriasBtn.style.borderColor = vetorCategorias[i].cor
        categoriasBtn.dataset.id = vetorCategorias[i].id
        listaFiltros.appendChild(categoriasBtn)

        let option = document.createElement('option')
        option.value = vetorCategorias[i].id
        option.textContent = vetorCategorias[i].nome
        categoriaMidiaSelect.appendChild(option)
    }
}

function renderizarMidias(midiasParaRenderizar) {
    const todasCategorias = getCategorias()
    gridMidias.innerHTML = ''

    for (let i = 0; i < midiasParaRenderizar.length; i++) {
        const midia = midiasParaRenderizar[i]
        const categoria = todasCategorias.find(c => c.id == midia.categoriaId);

        const cardHTML = `
            <div class="col-md-4" data-midia-id="${midia.id}"> <div class="card bg-dark border-secondary text-white h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <h5 class="card-title">${midia.titulo}</h5>
                    
                        <button class="btn btn-danger btn-sm delete-btn" 
                                    data-id="${midia.id}" 
                                    data-acao="deletar" 
                                    aria-label="Deletar Mídia" 
                                    style="line-height: 0.5; margin-left: 10px;">
                                &times;
                            </button>
                        </div>
                    
                        ${categoria ? 
                            `<span class="badge" style="background-color: ${categoria.cor};">
                                ${categoria.nome}
                            </span>` 
                        : ''}
                    </div>
                </div>
            </div>
        `

        gridMidias.innerHTML += cardHTML
    }

}

formCategoria.addEventListener('submit', function(evento) {
    evento.preventDefault()

    const nome = inputNomeCategoria.value
    const cor = inputCorCategoria.value

    const novaCategoria = {
        id: Date.now(),
        nome: nome,
        cor: cor
    }

    let categoriasAtuais = getCategorias()
    categoriasAtuais.push(novaCategoria)
    saveCategorias(categoriasAtuais)

    renderizarCategorias()

    inputNomeCategoria.value = ''
    inputCorCategoria.value = '#000000'

})

formMidia.addEventListener('submit', function(evento) {
    evento.preventDefault()

    const titulo = inputTituloMidia.value
    const categoriaId = categoriaMidiaSelect.value
    
    if (categoriaId === "") {
        alert("Por favor, selecione uma categoria.")
        return
    }

    const novaMidia = {
        id: Date.now(),
        titulo: titulo,
        categoriaId: categoriaId
    }

    let midiasAtuais = getMidias()
    midiasAtuais.push(novaMidia)
    saveMidias(midiasAtuais)

    renderizarMidias(midiasAtuais)

    inputTituloMidia.value = ''
    categoriaMidiaSelect.value = ''
})

listaFiltros.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
        const categoriaId = e.target.dataset.id
        
        let midiasAtuais = getMidias()
        
        if (categoriaId) {
            const midiasFiltradas = midiasAtuais.filter(midia => midia.categoriaId == categoriaId)
            renderizarMidias(midiasFiltradas)
        } else {
            renderizarMidias(midiasAtuais)
        }
    }
})

gridMidias.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn') && e.target.dataset.acao === 'deletar') {
        
        const idParaDeletar = e.target.dataset.id;
        
        if (!confirm('Tem certeza que deseja apagar esta mídia?')) {
            return;
        }

        let midiasAtuais = getMidias();
        
        const midiasAtualizadas = midiasAtuais.filter(midia => midia.id != idParaDeletar);
        
        saveMidias(midiasAtualizadas);
        renderizarMidias(midiasAtualizadas);
    }
});

inputPesquisa.addEventListener('keyup', function(e) {
    const termoBusca = e.target.value.toLowerCase();
    let midiasAtuais = getMidias();

    if (termoBusca.length === 0) {
        renderizarMidias(midiasAtuais);
        return;
    }

    const resultados = midiasAtuais.filter(midia => {
        return midia.titulo.toLowerCase().includes(termoBusca);
    });

    renderizarMidias(resultados);
})

renderizarCategorias()
renderizarMidias(getMidias())
