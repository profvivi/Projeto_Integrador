window.addEventListener('DOMContentLoaded', () => {
    
    // Captura de Elementos do DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const menuNav = document.querySelector('.menu-nav');
    const btnContraste = document.getElementById('btn-contraste');
    const btnAumentar = document.getElementById('btn-aumentar');
    const btnDiminuir = document.getElementById('btn-diminuir');
    const btnNormal = document.getElementById('btn-normal');
    const elementoHtml = document.documentElement;

    /* ==========================================================
       1. CONTROLE INTEGRADO E BLINDADO DO MENU HAMBÚRGUER
       ========================================================== */
    if (menuToggle && menuNav) {
        
        // Remove qualquer atributo que force ocultação inicial
        menuNav.style.removeProperty('display');

        menuToggle.addEventListener('click', (evento) => {
            evento.preventDefault();
            evento.stopPropagation(); 

            // Verifica o estado lido por leitores de tela
            const estaAberto = menuToggle.getAttribute('aria-expanded') === 'true';
            
            if (estaAberto) {
                menuToggle.setAttribute('aria-expanded', 'false');
                // Altera diretamente o atributo inline de maior peso do navegador
                menuNav.style.setProperty('display', 'none', 'important');
            } else {
                menuToggle.setAttribute('aria-expanded', 'true');
                // Altera diretamente o atributo inline de maior peso do navegador
                menuNav.style.setProperty('display', 'block', 'important');
            }
        });

        // Fecha se o usuário clicar no corpo da página (fora do menu)
        document.addEventListener('click', (evento) => {
            if (!menuNav.contains(evento.target) && !menuToggle.contains(evento.target)) {
                menuToggle.setAttribute('aria-expanded', 'false');
                menuNav.style.setProperty('display', 'none', 'important');
            }
        });

        // Acessibilidade por Teclado: Fecha com a tecla ESC
        document.addEventListener('keydown', (evento) => {
            if (evento.key === 'Escape') {
                menuToggle.setAttribute('aria-expanded', 'false');
                menuNav.style.setProperty('display', 'none', 'important');
                menuToggle.focus();
            }
        });
    }

    /* ==========================================================
       2. REGRAS DE ALTERNAÇÃO DE ALTO CONTRASTE
       ========================================================== */
    function alternarContraste() {
        document.body.classList.toggle('alto-contraste');
        const modoAtivo = document.body.classList.contains('alto-contraste');
        localStorage.setItem('altoContraste', modoAtivo);
    }

    if (btnContraste) {
        btnContraste.addEventListener('click', alternarContraste);
    }

    if (localStorage.getItem('altoContraste') === 'true') {
        document.body.classList.add('alto-contraste');
    }

    /* ==========================================================
       3. FERRAMENTA DE ZOOM DE ACESSIBILIDADE VISUAL
       ========================================================== */
    let tamanhoAtual = 100; 
    const tamanhoMaximo = 150;
    const tamanhoMinimo = 85; 
    const passo = 10;          

    if (btnAumentar && btnDiminuir && btnNormal) {
        btnAumentar.addEventListener('click', () => {
            if (tamanhoAtual < tamanhoMaximo) {
                tamanhoAtual += passo;
                elementoHtml.style.fontSize = `${tamanhoAtual}%`;
            }
        });

        btnDiminuir.addEventListener('click', () => {
            if (tamanhoAtual > tamanhoMinimo) {
                tamanhoAtual -= passo;
                elementoHtml.style.fontSize = `${tamanhoAtual}%`;
            }
        });

        btnNormal.addEventListener('click', () => {
            tamanhoAtual = 100;
            elementoHtml.style.fontSize = `${tamanhoAtual}%`;
        });
    }
});




