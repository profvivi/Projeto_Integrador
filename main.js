// Gerenciamento da Web Speech API para comandos de voz
const voiceBtn = document.getElementById('voiceBtn');
const statusAlert = document.getElementById('statusAlert');

// Verifica se o navegador atual suporta reconhecimento de voz
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;

    // Ativa o microfone ao clicar no botão
    voiceBtn.addEventListener('click', () => {
        recognition.start();
        showStatus("Ouvindo... Diga 'Início', 'Produtos', 'Sobre' ou 'Contato'.");
    });

    // Processa o resultado do comando de voz falado
    recognition.onresult = (event) => {
        const comando = event.results.transcript.toLowerCase();
        showStatus(`Você disse: "${comando}"`);

        const links = document.querySelectorAll('.nav-menu a');
        let encontrado = false;

        // Varre os links para encontrar a palavra-chave dita
        links.forEach(link => {
            if (comando.includes(link.textContent.toLowerCase())) {
                link.focus(); // Move o foco do teclado/leitor de tela
                link.click(); // Executa a ação do link
                encontrado = true;
            }
        });

        if (!encontrado) {
            showStatus("Comando não reconhecido. Tente novamente.");
        }
    };

    // Trata falhas ou silêncio no microfone
    recognition.onerror = () => {
        showStatus("Erro ao reconhecer voz ou microfone recusado.");
    };
} else {
    // Esconde o recurso de voz caso o navegador não ofereça suporte
    voiceBtn.style.display = 'none';
}

// Controla a exibição das notificações na tela (essencial para deficientes auditivos)
function showStatus(text) {
    statusAlert.textContent = text;
    statusAlert.style.display = 'block';
    setTimeout(() => {
        statusAlert.style.display = 'none';
    }, 4000);
}

