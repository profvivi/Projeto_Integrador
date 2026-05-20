document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuNav = document.querySelector('.menu-nav');
    const btnContraste = document.getElementById('btn-contraste');

    // 1. Controle do Menu Responsivo Acessível
    menuToggle.addEventListener('click', () => {
        const estaAberto = menuToggle.getAttribute('aria-expanded') === 'true';
        
        // Alterna o estado do atributo ARIA
        menuToggle.setAttribute('aria-expanded', !estaAberto);
        
        // Abre ou fecha visualmente o menu
        menuNav.classList.toggle('ativo');
    });

    // 2. Controle de Alto Contraste (Baixa Visão)
    btnContraste.addEventListener('click', () => {
        document.body.classList.toggle('alto-contraste');
        
        // Salva a preferência do usuário no navegador
        const modoAtivo = document.body.classList.contains('alto-contraste');
        localStorage.setItem('altoContraste', modoAtivo);
    });

    // Recupera a preferência salva ao carregar a página
    if (localStorage.getItem('altoContraste') === 'true') {
        document.body.classList.add('alto-contraste');
    }
});



