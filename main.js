window.addEventListener('DOMContentLoaded', () => {
    
    // Seleção de elementos do DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const menuNav = document.querySelector('.menu-nav');
    const btnContraste = document.getElementById('btn-contraste');
    const btnAumentar = document.getElementById('btn-aumentar');
    const btnDiminuir = document.getElementById('btn-diminuir');
    const btnNormal = document.getElementById('btn-normal');
    const elementoHtml = document.documentElement;

    // Console Check para desenvolvimento
    if (!menuToggle || !menuNav) {
        console.error("Aviso: Elementos do menu não encontrados. Cheque suas classes HTML.");
    }

    /* ==========================================================
       1. CONTROLE DO MENU RESPONSIVO (INJEÇÃO DIRETA NO DOM)
       ========================================================== */
    if (menuToggle && menuNav) {
        menuToggle.addEventListener('click', (evento) => {
            evento.preventDefault();
            evento.stopPropagation(); // Trava efeitos colaterais do reset.css

            const estaAberto = menuToggle.getAttribute('aria-expanded') === 'true';
            
            if (estaAberto) {
                // Procedimento para fechar o menu
                menuToggle.setAttribute('aria-expanded', 'false');
                menuNav.classList.remove('ativo');
                // Força o fechamento direto no elemento (ignora arquivos CSS externos)
                menuNav.style.setProperty('display', 'none', 'important');
            } else {
                // Procedimento para abrir o menu
                menuToggle.setAttribute('aria-expanded', 'true');
                menuNav.classList.add('ativo');
                // Força a exibição direta no elemento (ignora arquivos CSS externos)
                menuNav.style.setProperty('display', 'block', 'important');
            }
        });

        // Fecha o menu de forma automática se o usuário clicar no resto do site
        document.addEventListener('click', (evento) => {
            if (!menuNav.contains(evento.target) && !menuToggle.contains(evento.target)) {
                menuToggle.setAttribute('aria-expanded', 'false');
                menuNav.classList.remove('ativo');
                menuNav.style.setProperty('display', 'none', 'important');
            }
        });

        // Fecha se apertar a tecla ESC (Acessibilidade)
        document.addEventListener('keydown', (evento) => {
            if (evento.key === 'Escape' && menuNav.classList.contains('ativo')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                menuNav.classList.remove('ativo');
                menuNav.style.setProperty('display', 'none', 'important');
                menuToggle.focus();
            }
        });
    }

    /* ==========================================================
       2. CONTROLE DE ALTO CONTRASTE
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
       3. CONTROLE DE TAMANHO DA FONTE (ZOOM)
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




