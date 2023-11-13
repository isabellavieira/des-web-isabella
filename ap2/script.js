// Função para calcular o hash MD5
function calcularMD5(senha) {
    // Use a biblioteca CryptoJS para calcular o hash MD5
    return CryptoJS.MD5(senha).toString();
}

// Função para verificar a senha
function verificarSenha() {
    var senhaDigitada = document.getElementById("campo-senha").value;
    var senhaCorreta = "5d41402abc4b2a76b9719d911017c592"; // Hash MD5 da senha "ola"

    var hashSenhaDigitada = calcularMD5(senhaDigitada);

    if (hashSenhaDigitada === senhaCorreta) {
        document.getElementById("senha-correta").innerText = "Senha correta!";
    } else {
        document.getElementById("senha-correta").innerText = "Senha incorreta!";
    }
}

// Adiciona um evento de clique ao botão
document.getElementById("botao-entrar").addEventListener("click", verificarSenha);
