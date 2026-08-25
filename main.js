window.addEventListener('DOMContentLoaded', () => {
    
    const menuToggle = document.querySelector('.menu-toggle');
    const menuNav = document.querySelector('.menu-nav');
    const btnContraste = document.getElementById('btn-contraste');
    const btnAumentar = document.getElementById('btn-aumentar');
    const btnDiminuir = document.getElementById('btn-diminuir');
    const btnNormal = document.getElementById('btn-normal');
    const elementoHtml = document.documentElement;

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

        
        const linksMenu = menuNav.querySelectorAll('a');
        linksMenu.forEach(link => {
            link.addEventListener('click', (evento) => {
                const destinoHref = link.getAttribute('href');
                
                if (destinoHref.startsWith('#') && destinoHref !== '#') {
                    evento.preventDefault();
                    fecharMenu();
                                     
                    setTimeout(() => {
                        const alvoElemento = document.querySelector(destinoHref);
                        if (alvoElemento) {
                            alvoElemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 150);
                }
            });
        });
       
        document.addEventListener('click', (evento) => {
            if (!menuNav.contains(evento.target) && !menuToggle.contains(evento.target)) {
                fecharMenu();
            }
        });
    }

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
