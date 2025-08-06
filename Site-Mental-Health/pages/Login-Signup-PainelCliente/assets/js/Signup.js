// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function () {

    // Seleciona o formulário
    const form = document.getElementById('signupForm');

    // --- APLICAÇÃO DAS MÁSCARAS ---
    function applyMasks() {
        const mobileInput = document.getElementById('mobile');
        const cpfInput = document.getElementById('cpf');
        const birthdateInput = document.getElementById('birthdate');
        const phoneInput = document.getElementById('phone');
        const cepInput = document.getElementById('cep');
        const emergencyPhoneInput = document.getElementById('emergency_contact_phone');

        if (mobileInput) VMasker(mobileInput).maskPattern('(99) 99999-9999');
        if (cpfInput) VMasker(cpfInput).maskPattern('999.999.999-99');
        if (birthdateInput) VMasker(birthdateInput).maskPattern('99/99/9999');
        if (phoneInput) VMasker(phoneInput).maskPattern('(99) 9999-9999');
        if (cepInput) VMasker(cepInput).maskPattern('99999-999');
        if (emergencyPhoneInput) VMasker(emergencyPhoneInput).maskPattern('(99) 99999-9999'); // Ou (99) 9999-9999 se preferir
    }

    applyMasks();

    // --- FUNÇÕES DE VALIDAÇÃO CUSTOMIZADAS ---

    // Validação de CPF (algoritmo básico)
    function validateCPF(cpf) {
        cpf = cpf.replace(/[.\-]/g, ''); // Remove pontos e traço
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; // Verifica tamanho e se todos os dígitos são iguais

        let sum = 0;
        let remainder;

        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    // Validação de Data de Nascimento (deve ser no passado)
    function validateBirthdate(dateString) {
        const parts = dateString.split('/');
        if (parts.length !== 3) return false;
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Mês é 0-indexado
        const year = parseInt(parts[2], 10);

        const birthDate = new Date(year, month, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Zera a hora para comparar apenas a data

        // Verifica se a data é válida (ex: 31/02 não é válido) e se é anterior a hoje
        return birthDate.getFullYear() === year && birthDate.getMonth() === month && birthDate.getDate() === day && birthDate < today;
    }

    // Validação de Senha (mínimo 6 caracteres)
    function validatePassword(password) {
        return password.length >= 6;
    }

    // Validação de Confirmação de Senha
    function validateConfirmPassword(password, confirmPassword) {
        return password === confirmPassword;
    }

    // Validação de Descrição (mínimo 10 caracteres)
    function validateDescription(description) {
        return description.trim().length >= 10;
    }

     // Validação de Telefone (simples, verifica se tem números suficientes após máscara)
     function validatePhone(phone) {
        const digits = phone.replace(/\D/g, '');
        return digits.length >= 10; // Considera 10 para fixo e 11 para celular
    }

    // --- NOVA LÓGICA DE VALIDAÇÃO INTEGRADA AO BOOTSTRAP ---
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        let customValidationOk = true;

        // Limpa validações customizadas anteriores e feedback visual
        form.querySelectorAll('.is-invalid, .is-valid').forEach(el => {
             el.classList.remove('is-invalid', 'is-valid');
             if (el.setCustomValidity) el.setCustomValidity(''); // Reset custom validity message
             const feedback = el.nextElementSibling;
             if (feedback && feedback.classList.contains('invalid-feedback')) {
                 feedback.style.display = 'none'; // Hide feedback message
             }
             // Special handling for checkbox terms
             if (el.id === 'terms') {
                 const checkFeedback = el.closest('.form-check').querySelector('.invalid-feedback');
                 if (checkFeedback) checkFeedback.style.display = 'none';
             }
        });

        // Executa validações customizadas e define mensagens se necessário
        Array.from(form.elements).forEach(input => {
            if (input.setCustomValidity) input.setCustomValidity(''); // Limpa validade customizada prévia

            const feedbackElement = input.nextElementSibling && input.nextElementSibling.classList.contains('invalid-feedback')
                                    ? input.nextElementSibling
                                    : (input.id === 'terms' ? input.closest('.form-check').querySelector('.invalid-feedback') : null);

            if (input.value.trim() || input.required || input.type === 'checkbox') { 
                let errorMessage = '';
                switch (input.id) {
                    case 'email':
                        const emailRegex = /^\S+@\S+\.\S+$/;
                        if (input.value && !emailRegex.test(input.value)) {
                             errorMessage = 'Por favor, informe um e-mail válido.';
                        }
                        break;
                    case 'cpf':
                        if (input.value && !validateCPF(input.value)) {
                            errorMessage = 'Por favor, informe um CPF válido.';
                        }
                        break;
                    case 'birthdate':
                        if (input.value && !validateBirthdate(input.value)) {
                            errorMessage = 'Informe uma data de nascimento válida (anterior a hoje).';
                        }
                        break;
                    case 'mobile':
                         if (input.value && !validatePhone(input.value)) {
                            errorMessage = 'Informe um celular válido com DDD (11 dígitos).';
                        }
                        break;
                     case 'phone':
                        if (input.value.trim() && !validatePhone(input.value)) {
                            errorMessage = 'Informe um telefone fixo válido com DDD (10 dígitos).';
                        }
                        break;
                    case 'emergency_contact_phone':
                         if (input.value.trim() && !validatePhone(input.value)) {
                            errorMessage = 'Informe um telefone válido com DDD.';
                        }
                        break;
                    case 'cep':
                         if (input.value && input.value.replace(/\D/g, '').length !== 8) {
                             errorMessage = 'Informe um CEP válido (8 dígitos).';
                         }
                         break;
                    case 'description':
                        if (input.value && !validateDescription(input.value)) {
                            errorMessage = 'A descrição deve ter no mínimo 10 caracteres.';
                        }
                        break;
                    case 'password':
                        if (input.value && !validatePassword(input.value)) {
                            errorMessage = 'A senha deve ter no mínimo 6 caracteres.';
                        }
                        break;
                    case 'confirmPassword':
                        const passwordInput = document.getElementById('password');
                        if (input.value && !validateConfirmPassword(passwordInput.value, input.value)) {
                            errorMessage = 'As senhas não coincidem.';
                        }
                        break;
                    case 'terms':
                        if (!input.checked) {
                            errorMessage = 'Você deve aceitar os termos para continuar.';
                        }
                        break;
                }

                if (errorMessage) {
                    input.setCustomValidity(errorMessage); // Define a mensagem customizada para checkValidity()
                    if (feedbackElement) {
                        feedbackElement.textContent = errorMessage; // Atualiza o texto do div.invalid-feedback
                        // Não precisa forçar display aqui, 'was-validated' cuidará disso
                    }
                    customValidationOk = false; // Marca que houve erro customizado
                }
            }
        });

        // Adiciona a classe para ativar os estilos de validação do Bootstrap
        // Isso mostrará feedback para campos 'required' nativos e campos com setCustomValidity
        form.classList.add('was-validated');

        // Verifica a validade geral do formulário (incluindo validações nativas e customizadas via setCustomValidity)
        if (form.checkValidity() === true && customValidationOk === true) { 
            console.log('Formulário válido! Enviando...');
            alert('Cadastro realizado com sucesso! (Simulação)');
            form.classList.remove('was-validated');
            form.reset();
             // Remove classes de validação após reset
            form.querySelectorAll('.is-invalid, .is-valid').forEach(el => {
                el.classList.remove('is-invalid', 'is-valid');
                 if (el.setCustomValidity) el.setCustomValidity('');
                 const feedback = el.nextElementSibling;
                 if (feedback && feedback.classList.contains('invalid-feedback')) {
                     feedback.style.display = 'none';
                 }
                 if (el.id === 'terms') {
                     const checkFeedback = el.closest('.form-check').querySelector('.invalid-feedback');
                     if (checkFeedback) checkFeedback.style.display = 'none';
                 }
            });
        } else {
            console.log('Formulário inválido. Verifique os campos.');
            // Foca no primeiro campo inválido para melhor UX
            const firstInvalidField = form.querySelector(':invalid'); // Usa :invalid que pega nativos e customizados
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
        }
    }, false);

    // Adiciona validação dinâmica para confirmação de senha enquanto digita
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    if (passwordInput && confirmPasswordInput) {
        const confirmFeedback = confirmPasswordInput.nextElementSibling;

        function validateConfirmOnInput() {
             if (!confirmPasswordInput.value) { // Se vazio, deixa o required cuidar na submissão
                 confirmPasswordInput.setCustomValidity('');
                 confirmPasswordInput.classList.remove('is-invalid', 'is-valid');
                 if (confirmFeedback) confirmFeedback.style.display = 'none';
                 return;
             }
            if (passwordInput.value !== confirmPasswordInput.value) {
                const msg = 'As senhas não coincidem.';
                confirmPasswordInput.setCustomValidity(msg);
                // Bootstrap não adiciona is-invalid/is-valid no input, mas podemos forçar se quisermos feedback imediato
                confirmPasswordInput.classList.add('is-invalid'); 
                confirmPasswordInput.classList.remove('is-valid');
                if (confirmFeedback) {
                    confirmFeedback.textContent = msg;
                    confirmFeedback.style.display = 'block';
                }
            } else {
                confirmPasswordInput.setCustomValidity(''); // Limpa validade customizada
                confirmPasswordInput.classList.remove('is-invalid');
                confirmPasswordInput.classList.add('is-valid');
                 if (confirmFeedback) {
                    confirmFeedback.style.display = 'none';
                }
            }
        }

        confirmPasswordInput.addEventListener('input', validateConfirmOnInput);
        passwordInput.addEventListener('input', validateConfirmOnInput); // Revalida confirmação quando senha principal muda
    }

});

