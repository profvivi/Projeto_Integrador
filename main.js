// Garante que o script rode apenas após o HTML carregar completamente
window.addEventListener('DOMContentLoaded', () => {
    
    // 1. SELEÇÃO DE ELEMENTOS (Modificado para garantir compatibilidade)
    const menuToggle = document.querySelector('.menu-toggle');
    const menuNav = document.querySelector('.menu-nav');
    const btnContraste = document.getElementById('btn-contraste');
    const btnAumentar = document.getElementById('btn-aumentar');
    const btnDiminuir = document.getElementById('btn-diminuir');
    const btnNormal = document.getElementById('btn-normal');
    const elementoHtml = document.documentElement;

    // DIAGNÓSTICO RÁPIDO: Mostra no console se o JS achou o botão hambúrguer
    if (!menuToggle || !menuNav) {
        console.error("ERRO: O JavaScript não encontrou o botão hambúrguer (.menu-toggle) ou a lista (.menu-nav). Verifique as classes no seu HTML.");
    } else {
        console.log("Sucesso: Elementos do menu responsivo encontrados pelo JavaScript.");
    }

    /* ==========================================================
       2. CONTROLE DO MENU RESPONSIVO (ABRIR E FECHAR)
       ========================================================== */
    if (menuToggle && menuNav) {
        menuToggle.addEventListener('click', (evento) => {
            // Previne qualquer comportamento padrão do navegador
            evento.preventDefault();

            // Verifica se o menu já está aberto
            const estaAberto = menuToggle.getAttribute('aria-expanded') === 'true';
            
            // Inverte o estado da acessibilidade (se era true vira false, se era false vira true)
            menuToggle.setAttribute('aria-expanded', !estaAberto);
            
            // Adiciona ou remove a classe que exibe o menu no CSS
            menuNav.classList.toggle('ativo');

            console.log("Botão hambúrguer clicado. Menu aberto?", !estaAberto);
        });

        // ACESSIBILIDADE DE TECLADO: Fecha o menu se o usuário apertar a tecla "ESC"
        document.addEventListener('keydown', (evento) => {
            if (evento.key === 'Escape' && menuNav.classList.contains('ativo')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                menuNav.classList.remove('ativo');
                menuToggle.focus(); // Devolve o foco ao botão
            }
        });
    }

    /* ==========================================================
       3. CONTROLE DE ALTO CONTRASTE
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
       4. CONTROLE DE TAMANHO DA FONTE (ZOOM)
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




