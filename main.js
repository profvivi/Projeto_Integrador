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
       1. CONTROLE DO MENU HAMBÚRGUER COM SUPORTE A ÂNCORAS
       ========================================================== */
    if (menuToggle && menuNav) {
        
        const fecharMenu = () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuNav.classList.remove('aberto');
        };

        const abrirMenu = () => {
            menuToggle.setAttribute('aria-expanded', 'true');
            menuNav.classList.add('aberto');
        };

        menuToggle.addEventListener('click', (evento) => {
            evento.preventDefault();
            evento.stopPropagation(); 
            const estaAberto = menuToggle.getAttribute('aria-expanded') === 'true';
            estaAberto ? fecharMenu() : abrirMenu();
        });

        // Correção de Ouro: Executa a rolagem suave após fechar a caixinha do menu mobile
        const linksMenu = menuNav.querySelectorAll('a');
        linksMenu.forEach(link => {
            link.addEventListener('click', (evento) => {
                const destinoHref = link.getAttribute('href');
                
                // Se for um link interno (âncora)
                if (destinoHref.startsWith('#') && destinoHref !== '#') {
                    evento.preventDefault();
                    fecharMenu();
                    
                    // Espera 150 milissegundos para o menu sumir da tela e rola até o alvo correto
                    setTimeout(() => {
                        const alvoElemento = document.querySelector(destinoHref);
                        if (alvoElemento) {
                            alvoElemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 150);
                }
            });
        });

        // Fecha se o usuário clicar fora do menu
        document.addEventListener('click', (evento) => {
            if (!menuNav.contains(evento.target) && !menuToggle.contains(evento.target)) {
                fecharMenu();
            }
        });
    }

    /* ==========================================================
       2. REGRAS DE ALTERNAÇÃO DE ALTO CONTRASTE (CORRIGIDO)
       ========================================================== */
    if (btnContraste) {
        btnContraste.addEventListener('click', () => {
            document.body.classList.toggle('alto-contraste');
            const modoAtivo = document.body.classList.contains('alto-contraste');
            localStorage.setItem('altoContraste', modoAtivo);
        });
    }

    if (localStorage.getItem('altoContraste') === 'true') {
        document.body.classList.add('alto-contraste');
    }

    /* ==========================================================
       3. ZOOM DE ACESSIBILIDADE VIA VARIÁVEL CSS
       ========================================================== */
    const tamanhoMaximo = 150;
    const tamanhoMinimo = 85; 
    const passo = 10;          
    
    let tamanhoAtual = parseInt(localStorage.getItem('tamanhoFonte')) || 100;
    elementoHtml.style.setProperty('--tamanho-zoom', `${tamanhoAtual}%`);

    const atualizarTamanhoFonte = (novoTamanho) => {
        tamanhoAtual = novoTamanho;
        elementoHtml.style.setProperty('--tamanho-zoom', `${tamanhoAtual}%`);
        localStorage.setItem('tamanhoFonte', tamanhoAtual);
    };

    if (btnAumentar && btnDiminuir && btnNormal) {
        btnAumentar.addEventListener('click', (e) => {
            e.preventDefault();
            if (tamanhoAtual < tamanhoMaximo) {
                atualizarTamanhoFonte(tamanhoAtual + passo);
            }
        });

        btnDiminuir.addEventListener('click', (e) => {
            e.preventDefault();
            if (tamanhoAtual > tamanhoMinimo) {
                atualizarTamanhoFonte(tamanhoAtual - passo);
            }
        });

        btnNormal.addEventListener('click', (e) => {
            e.preventDefault();
            atualizarTamanhoFonte(100);
        });
    }
});
