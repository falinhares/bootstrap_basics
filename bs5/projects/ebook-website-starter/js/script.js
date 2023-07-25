//Fazer a navbar ficar escura com o scroll
function userScroll() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-dark');
            navbar.classList.add('navbar-sticky');
        } else {
            navbar.classList.remove('bg-dark');
            navbar.classList.remove('navbar-sticky');
        }
    });
}

//Ativa a função ao carregar a tela
document.addEventListener('DOMContentLoaded', userScroll);