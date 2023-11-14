const urlmasc = "https://botafogo-atletas.mange.li/masculino";
const urlfem = "https://botafogo-atletas.mange.li/feminino";

const body = document.body;
body.style.display = 'flex';
body.style.gap = '.5em';
body.style.flexWrap = 'wrap';

const preenche = (atleta) => {
    const container = document.createElement('article');
    const titulo = document.createElement('h3');
    const imagem = document.createElement('img');

    container.dataset.id = atleta.id;
    container.dataset.altura = atleta.altura;
    container.dataset.nome_completo = atleta.nome_completo;
    container.dataset.nascimento = atleta.nascimento;
    container.dataset.tipo = atleta.tipo; // Adição do tipo de jogador

    container.style.width = '15em';
    container.style.backgroundColor = 'grey';
    container.style.textAlign = 'center';
    container.style.margin = 'auto';

    titulo.innerText = atleta.nome;
    imagem.src = atleta.imagem;
    imagem.alt = `Imagem de ${atleta.nome}`;
    container.appendChild(titulo);
    container.appendChild(imagem);

    container.onclick = handleClick;

    document.getElementById('jogadores-container').appendChild(container);
}

const handleClick = (e) => {
    const artigo = e.target.closest('article');
    // Restante do código permanece igual
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
    // Limpar jogadores existentes
    document.getElementById('jogadores-container').innerHTML = '';

 // Exibir o elemento de carregando
 document.getElementById('carregando').style.display = 'block';


    // Obter jogadores do servidor
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
        } catch (error) {
            console.error('Erro ao carregar jogadores:', error);
        } finally {
            // Ocultar o elemento de carregando
            document.getElementById('carregando').style.display = 'none';
        }

        return; // Não precisa continuar após as chamadas separadas
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
        // Ocultar o elemento de carregando
        document.getElementById('carregando').style.display = 'none';
    }
}
