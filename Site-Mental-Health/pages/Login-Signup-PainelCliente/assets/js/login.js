document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const btnCadastro = document.getElementById('btn-cadastro');
    
    const validUsers = [
        { email: 'teste@exemplo.com', password: 'senha123' }
    ];
    
    //  Botao cadastro
    btnCadastro.addEventListener("click", () => {
        window.location.href = "02-Signup.html";
    });
    
    // Login valido
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!email || !password) 
        {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        else
        {
            const userFound = validUsers.some(user => 
                user.email === email && user.password === password
            );
            
            if (userFound)
            {
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('userEmail', email);

                window.location.href = '04-Painel-cliente.html';
            } 
            else 
            {
                alert('E-mail ou senha inválidos.');
            }
        }
        
    });
});