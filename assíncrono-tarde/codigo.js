const url = "https://botafogo-atletas.mange.li";
const numero_jogador = 54;


const body = document.body;
body.style.display = 'flex';
body.style.gap = '5em';

const preenche = (atleta) => {
    const container = document.createElement('article');
    const titulo = document.createElement('h3');
    const imagem = document.createElement('img');
    const descricao = document.createElement('p');

    container.dataset.id = atleta.id;
    container.dataset.id = atleta.altura;
    container.dataset.id = atleta.nome_completo;
    container.dataset.id = atleta.nascimento;

    container.style.width = '15em';
    container.style.backgroundColor = 'gray';
    container.style.textAlign = 'center';
    container.style.margin = 'auto';


    titulo.innerText = atleta.nome;
    imagem.src = atleta.imagem;
    imagem.alt = `Imagem de ${atleta.nome}`;
    descricao.innerHTML = atleta.descricao;

    container.appendChild(titulo);
    container.appendChild(imagem);
    container.appendChild(descricao);

    container.onclick = handleClick;

    document.body.appendChild(container);
}

const handleClick = (e) => {
    const artigo = (e.target.closest('article'));
    document.cookie = `id=${artigo.id}`; 
}

const pegar_coisas = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;

}

pegar_coisas(`${url}/all`).then(
    (entrada) => {
        for (atleta of entrada) { preenche(atleta) }
    }
);

console.log("assíncrono");