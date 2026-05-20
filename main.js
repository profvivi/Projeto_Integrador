const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');
const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownContainer = document.querySelector('.dropdown');
const voiceBtn = document.getElementById('voiceBtn');
const statusAlert = document.getElementById('statusAlert');

// Função auxiliar para fechar o dropdown com segurança
function closeDropdown() {
    dropdownBtn.setAttribute('aria-expanded', 'false');
    dropdownContainer.classList.remove('open');
}

// 1. Controle do Menu Hambúrguer (Mobile)
hamburgerBtn.addEventListener('click', () => {
    const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
    showStatus(!isExpanded ? "Menu aberto" : "Menu fechado");
});

// 2. Controle do Menu Suspenso (Dropdown)
dropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
    dropdownBtn.setAttribute('aria-expanded', !isExpanded);
    dropdownContainer.classList.toggle('open');
});

// Fecha o dropdown se clicar em qualquer outro lugar fora dele
document.addEventListener('click', (e) => {
    if (!dropdownContainer.contains(e.target)) {
        closeDropdown();
    }
});

// Correção: Fecha ao apertar a tecla ESC com a sintaxe correta
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDropdown();
        dropdownBtn.focus();
    }
});

// Acessibilidade por Teclado: Fecha o dropdown automaticamente se o foco sair do último link
const dropdownLinks = dropdownContainer.querySelectorAll('.dropdown-content a');
if (dropdownLinks.length > 0) {
    const lastLink = dropdownLinks[dropdownLinks.length - 1];
    lastLink.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && !e.shiftKey) {
            closeDropdown();
        }
    });
}

// 3. Comando de Voz (Web Speech API)
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;

    voiceBtn.addEventListener('click', () => {
        recognition.start();
        showStatus("Ouvindo... Diga o nome de uma página.");
    });

    recognition.onresult = (event) => {
        const comando = event.results.transcript.toLowerCase();
        showStatus(`Você disse: "${comando}"`);

        if (comando.includes('menu') || comando.includes('abrir')) {
            if (window.innerWidth <= 768) {
                hamburgerBtn.click();
                return;
            }
        }

        if (comando.includes('produtos')) {
            dropdownBtn.click();
            dropdownBtn.focus();
            return;
        }

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


