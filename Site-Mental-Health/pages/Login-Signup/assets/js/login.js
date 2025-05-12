const btnCadastro = document.querySelector("#btn-cadastro")
btnCadastro.addEventListener("click", function() {
    window.location.href="cadastro.html";
    }
)


document.addEventListener('DOMContentLoaded', function() {

    const loginForm     = document.querySelector('form');
    const emailInput    = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const btnLogin      = document.getElementById('btn-login');
    const btnCadastro   = document.getElementById('btn-cadastro');
    
    // Usuários/login válidos
    const validUsers = [

        //{ email: 'usuario@exemplo.com', password: '123456' }, 
        //{ email: 'usuario@exemplo.com', password: '123456' },
        { email: 'teste@exemplo.com', password: 'senha123' }
    ];
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        validateLogin();
    });
    
    function validateLogin() {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!email || !password) {
            showError('Por favor, preencha todos os campos.');
            return;
        }
        
        // são válidas ?
        const isValid = validUsers.some(user => 
            user.email === email && user.password === password
        );
        
        if (isValid) {
 
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('userEmail', email);
            
            window.location.href = '../Painel-cliente/index.html';// Redirecionar >> painel de cliente
        } else {
            showError('E-mail ou senha inválidos.');
        }
    }
});