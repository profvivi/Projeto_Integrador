// Elementos de Controle do Menu
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');
const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownContainer = document.querySelector('.dropdown');
const voiceBtn = document.getElementById('voiceBtn');
const statusAlert = document.getElementById('statusAlert');

// 1. Controle do Menu Hambúrguer (Mobile)
hamburgerBtn.addEventListener('click', () => {
    const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
    
    // Alerta visual de estado (importante para surdos)
    showStatus(!isExpanded ? "Menu aberto" : "Menu fechado");
});

// 2. Controle do Menu Suspenso (Dropdown) por Clique e Teclado
dropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
    dropdownBtn.setAttribute('aria-expanded', !isExpanded);
    dropdownContainer.classList.toggle('open');
});

// Fecha o dropdown se o usuário clicar fora dele ou apertar ESC
document.addEventListener('click', () => {
    dropdownBtn.setAttribute('aria-expanded', 'false');
    dropdownContainer.classList.remove('open');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        dropdownBtn.setAttribute('aria-expanded', 'false');
        dropdownContainer.classList.remove('remove');
        dropdownBtn.focus();
    }
});

// 3. Gerenciamento do Comando de Voz (Web Speech API)
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;

    voiceBtn.addEventListener('click', () => {
        recognition.start();
        showStatus("Ouvindo... Diga o nome de uma página (ex: 'Produtos').");
    });

    recognition.onresult = (event) => {
        const comando = event.results.transcript.toLowerCase();
        showStatus(`Você disse: "${comando}"`);

        // Comandos especiais para abrir menus via voz
        if (comando.includes('menu') || comando.includes('abrir')) {
            if (window.innerWidth <= 768) {
                hamburgerBtn.click();
                return;
            }
        }

        if (comando.includes('produtos')) {
            dropdownBtn.click(); // Abre o menu suspenso por voz
            dropdownBtn.focus();
            return;
        }

        // Busca links normais e submenus
        const links = document.querySelectorAll('.nav-menu a, .dropdown-content a');
        let encontrado = false;

        links.forEach(link => {
            if (comando.includes(link.textContent.toLowerCase())) {
                link.focus();
                link.click();
                encontrado = true;
            }
        });

        if (!encontrado) showStatus("Comando não reconhecido.");
    };

    recognition.onerror = () => showStatus("Erro ao reconhecer voz.");
} else {
    voiceBtn.style.display = 'none';
}

function showStatus(text) {
    statusAlert.textContent = text;
    statusAlert.style.display = 'block';
    setTimeout(() => statusAlert.style.display = 'none', 4000);
}

