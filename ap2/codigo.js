const urlmasc = "https://botafogo-atletas.mange.li/masculino"
const urlfem = "https://botafogo-atletas.mange.li/feminino"
const url = "https://botafogo-atletas.mange.li/all"

const body = document.body;
body.style.display = 'flex';
body.style.gap = '.5em';
body.style.flexWrap = 'wrap';

const jogadoresContainer = document.getElementById('jogadores-container');
const carregandoElement = document.getElementById('carregando');

const preenche = (atleta) => {
    const container = document.createElement('article');
    const titulo = document.createElement('h3');
    const imagem = document.createElement('img');

    container.dataset.id = atleta.id;
    container.dataset.altura = atleta.altura;
    container.dataset.nome_completo = atleta.nome_completo;
    container.dataset.nascimento = atleta.nascimento;
    container.dataset.tipo = atleta.tipo;

    titulo.innerText = atleta.nome;
    imagem.src = atleta.imagem;
    imagem.alt = `Imagem de ${atleta.nome}`;

    container.addEventListener('click', handleClick);

    container.appendChild(titulo);
    container.appendChild(imagem);

    jogadoresContainer.appendChild(container);
};

const handleClick = (e) => {
    const artigo = e.target.closest('article');
    //cookie
    document.cookie = `id=${artigo.dataset.id}`;
    document.cookie = `nome_completo=${artigo.dataset.nome_completo}`;
    document.cookie = `nascimento=${artigo.dataset.nascimento}`;
    document.cookie = `altura=${artigo.dataset.altura}`;

    //localStorage
    localStorage.setItem('id', artigo.dataset.id);
    localStorage.setItem('nome_completo', artigo.dataset.nome_completo);
    localStorage.setItem('nascimento', artigo.dataset.nascimento);
    localStorage.setItem('altura', artigo.dataset.altura);
    localStorage.setItem('dados-original', artigo.dataset);
    localStorage.setItem('dados', JSON.stringify(artigo.dataset));

    console.log(acha_cookie('nome_completo'));
    console.log(localStorage.getItem('id'));
    console.log(JSON.parse(localStorage.getItem('dados')).altura);

    window.location = `outra.html?id=${artigo.dataset.id}&nome_completo=${artigo.dataset.nome_completo}`;
}

const acha_cookie = (chave) => {
    const lista_de_cookies = document.cookie.split("; ");
    const procurado = lista_de_cookies.find(
        (e) => e.startsWith(chave));
    return procurado.split("=")[1];
}

const pegar_coisas = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}


const filtrarJogadores = async (tipo) => {
    document.getElementById('jogadores-container').innerHTML = '';
    document.getElementById('carregando').style.display = 'block';

    let apiUrl;

    if (tipo === 'MASCULINO') {
        apiUrl = urlmasc;
    } else if (tipo === 'FEMININO') {
        apiUrl = urlfem;
    } else if (tipo === 'TODOS') {
        try {
            // Chamadas separadas para masculino e feminino
            const entradaFem = await pegar_coisas(urlfem);
            for (atleta of entradaFem) {
                preenche(atleta);
            }

            const entradaMasc = await pegar_coisas(urlmasc);
            for (atleta of entradaMasc) {
                preenche(atleta);
            }
        } finally {
            
            document.getElementById('carregando').style.display = 'none';
        }

        return;
    }

    // Caso específico (MASCULINO ou FEMININO)
    try {
        const entrada = await pegar_coisas(apiUrl);

        for (atleta of entrada) {
            preenche(atleta);
        }

    } catch (error) {
        console.error('Erro ao carregar jogadores:', error);
    } finally {
        
        document.getElementById('carregando').style.display = 'none';
    }
}

document.getElementById('carregando').style.display = 'none';

document.getElementById('btnSair').addEventListener('click', () => {
    window.location.href = 'index.html';
});
