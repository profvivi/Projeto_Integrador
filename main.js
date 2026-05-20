window.addEventListener('DOMContentLoaded', () => {
    
    // Seleção de elementos do DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const menuNav = document.querySelector('.menu-nav');
    const btnContraste = document.getElementById('btn-contraste');
    const btnAumentar = document.getElementById('btn-aumentar');
    const btnDiminuir = document.getElementById('btn-diminuir');
    const btnNormal = document.getElementById('btn-normal');
    const elementoHtml = document.documentElement;

    /* ==========================================================
       1. CONTROLE DE ALTO CONTRASTE
       ========================================================== */
    function alternarContraste() {
        document.body.classList.toggle('alto-contraste');
        const modoAtivo = document.body.classList.contains('alto-contraste');
        localStorage.setItem('altoContraste', modoAtivo);
    }

    if (btnContraste) {
        btnContraste.addEventListener('click', alternarContraste);
    }

    // Carrega a preferência de contraste salva pelo usuário
    if (localStorage.getItem('altoContraste') === 'true') {
        document.body.classList.add('alto-contraste');
    }

    /* ==========================================================
       2. CONTROLE DE TAMANHO DA FONTE (ZOOM PROPORCIONAL)
       ========================================================== */
    let tamanhoAtual = 100; 
    const tamanhoMaximo = 150; // Limite máximo de 150%
    const tamanhoMinimo = 85;  // Limite mínimo de 85%
    const passo = 10;          // Altera de 10% em 10%

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

    /* ==========================================================
       3. CONTROLE DO MENU RESPONSIVO
       ========================================================== */
    if (menuToggle && menuNav) {
        menuToggle.addEventListener('click', () => {
            const estaAberto = menuToggle.getAttribute('aria-expanded') === 'true';
            
            // Atualiza acessibilidade para leitores de tela
            menuToggle.setAttribute('aria-expanded', !estaAberto);
            
            // Abre ou fecha o menu visualmente no mobile
            menuNav.classList.toggle('ativo');
        });

        // ACESSIBILIDADE EXTRA: Fecha o menu se o usuário apertar a tecla "ESC"
        document.addEventListener('keydown', (evento) => {
            if (evento.key === 'Escape' && menuNav.classList.contains('ativo')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                menuNav.classList.remove('ativo');
                menuToggle.focus(); // Devolve o foco ao botão do menu
            }
        });
    }
});




