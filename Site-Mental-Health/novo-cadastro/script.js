
/* ========================================
   CONTROLE DE INTERAÇÃO DO USUÁRIO
======================================== */
const camposTocados = new Set();

/* ========================================
   MÁSCARAS DE FORMATAÇÃO
======================================== */

// Máscara para CPF
function mascaraCpf(evento) {
    var cpf = evento.target.value;
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    evento.target.value = cpf;
}

// Máscara para Telefone
function mascaraTelefone(evento) {
    var tel = evento.target.value;
    tel = tel.replace(/\D/g, "")
    tel = tel.replace(/^(\d)/, "($1")
    tel = tel.replace(/(.{3})(\d)/, "$1)$2")
    if (tel.length == 9) {
        tel = tel.replace(/(.{1})$/, "-$1")
    } else if (tel.length == 10) {
        tel = tel.replace(/(.{2})$/, "-$1")
    } else if (tel.length == 11) {
        tel = tel.replace(/(.{3})$/, "-$1")
    } else if (tel.length == 12) {
        tel = tel.replace(/(.{4})$/, "-$1")
    } else if (tel.length > 12) {
        tel = tel.replace(/(.{4})$/, "-$1")
    }
    evento.target.value = tel;
}

// Máscara para CEP
function mascaraCep(evento) {
    var cep = evento.target.value;
    cep = cep.replace(/\D/g, "")
    cep = cep.replace(/^(\d{2})(\d)/, "$1.$2")
    cep = cep.replace(/.(\d{3})(\d)/, ".$1-$2")
    evento.target.value = cep;
}

/* ========================================
   FUNÇÕES DE VALIDAÇÃO
======================================== */

// Validação do CPF
function validarCpf(valorCpf) {
    var cpf = valorCpf;
    var ok = 1;
    var add;
    if (cpf != "") {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999")
            ok = 0;
        if (ok == 1) {
            add = 0;
            for (let i = 0; i < 9; i++)
                add += parseInt(cpf.charAt(i)) * (10 - i);
            let rev = 11 - (add % 11);
            if (rev == 10 || rev == 11)
                rev = 0;
            if (rev != parseInt(cpf.charAt(9)))
                ok = 0;
            if (ok == 1) {
                add = 0;
                for (let i = 0; i < 10; i++)
                    add += parseInt(cpf.charAt(i)) * (11 - i);
                rev = 11 - (add % 11);
                if (rev == 10 || rev == 11)
                    rev = 0;
                if (rev != parseInt(cpf.charAt(10)))
                    ok = 0;
            }
        }
        return ok == 1;
    }
    return false;
}

// Validação de email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validação de idade
function validarIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const diferencaMes = hoje.getMonth() - nascimento.getMonth();
    
    if (diferencaMes < 0 || (diferencaMes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    
    return idade >= 16 && idade <= 120;
}

// Validação de caracteres mínimos
function validarTamanhoMinimo(valor, minimo) {
    return valor.trim().length >= minimo;
}

/* ========================================
   GERENCIAMENTO DE VALIDAÇÃO DOS CAMPOS
======================================== */

// Função para marcar campo como tocado
function marcarCampoComoTocado(campo) {
    camposTocados.add(campo.id);
    campo.classList.add('touched');
}

// Função para validar um campo específico
function validarCampo(campo) {
    if (!camposTocados.has(campo.id)) {
        return; // Só valida se o campo foi tocado
    }

    let ehValido = true;
    
    // Remove classes de validação anteriores
    campo.classList.remove('is-valid', 'is-invalid');
    
    // Validações específicas por campo
    switch(campo.id) {
        case 'nomeCompleto':
            ehValido = validarTamanhoMinimo(campo.value, 10);
            break;
        case 'email':
            ehValido = validarEmail(campo.value);
            break;
        case 'cpf':
            ehValido = campo.value.trim() && validarCpf(campo.value);
            break;
        case 'rg':
        case 'telefone':
        case 'celular':
        case 'cep':
        case 'logradouro':
        case 'numero':
        case 'cidade':
        case 'estado':
            ehValido = campo.value.trim() !== '';
            break;
        case 'complemento':
            // Campo complemento fica verde quando preenchido (não é obrigatório)
            if (campo.value.trim() !== '') {
                ehValido = true;
            } else {
                // Se está vazio, não mostra nem verde nem vermelho
                return;
            }
            break;
        default:
            return; // Não aplica validação visual para outros campos
    }
    
    // Aplica as classes de validação
    if (ehValido) {
        campo.classList.add('is-valid');
    } else {
        campo.classList.add('is-invalid');
    }
}

/* ========================================
   FUNÇÕES UTILITÁRIAS
======================================== */

// Função para limpar formulário
function limparFormulario() {
    document.getElementById('formularioCadastro').reset();
    
    // Remove todas as classes de validação e touched
    const inputs = document.querySelectorAll('.form-control, .form-select');
    inputs.forEach(input => {
        input.classList.remove('is-valid', 'is-invalid', 'touched');
    });
    
    // Limpa o controle de campos tocados
    camposTocados.clear();
}

// Função para baixar dados (placeholder)
function baixarDados() {
    const dadosFormulario = new FormData(document.getElementById('formularioCadastro'));
    const dados = {};
    for (let [chave, valor] of dadosFormulario.entries()) {
        dados[chave] = valor;
    }
    
    // Simula download - aqui você pode implementar a funcionalidade real
    console.log('Dados para download:', dados);
    mostrarToast('sucesso');
}

// Função para mostrar notificações
function mostrarToast(tipo) {
    const elementoToast = document.getElementById('toast' + tipo.charAt(0).toUpperCase() + tipo.slice(1));
    const toast = new bootstrap.Toast(elementoToast);
    toast.show();
}

/* ========================================
   INICIALIZAÇÃO E EVENTOS
======================================== */

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formularioCadastro');
    
    // Lista de todos os campos que precisam de validação
    const camposParaValidar = [
        'nomeCompleto', 'genero', 'email', 'cpf', 'rg', 'dataNascimento',
        'telefone', 'celular', 'cep', 'logradouro', 'numero', 'complemento', 'bairro', 'cidade', 'estado'
    ];
    
    // Adiciona event listeners para cada campo
    camposParaValidar.forEach(idCampo => {
        const campo = document.getElementById(idCampo);
        
        // Marca como tocado quando o usuário interage
        campo.addEventListener('focus', function() {
            marcarCampoComoTocado(this);
        });
        
        // Valida quando perde o foco (apenas se foi tocado)
        campo.addEventListener('blur', function() {
            validarCampo(this);
        });
        
        // Para campos com máscara, valida também durante a digitação
        campo.addEventListener('input', function() {
            if (camposTocados.has(this.id)) {
                validarCampo(this);
            }
        });
    });
    
    // Aplicação de máscaras específicas
    document.getElementById('cpf').addEventListener('input', mascaraCpf);
    document.getElementById('telefone').addEventListener('input', mascaraTelefone);
    document.getElementById('celular').addEventListener('input', mascaraTelefone);
    document.getElementById('cep').addEventListener('input', mascaraCep);
    
    // Submissão do formulário
    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();
        evento.stopPropagation();
        
        // Marca todos os campos como tocados para mostrar erros
        camposParaValidar.forEach(idCampo => {
            const campo = document.getElementById(idCampo);
            marcarCampoComoTocado(campo);
            validarCampo(campo);
        });
        
        // Verifica se há campos inválidos (apenas os obrigatórios para submissão)
        const camposObrigatoriosParaSubmissao = [
            'nomeCompleto', 'genero', 'email', 'cpf', 'rg', 'dataNascimento',
            'telefone', 'celular', 'cep', 'logradouro', 'numero', 'bairro', 'cidade', 'estado'
        ];
        
        let ehValido = true;
        
        // Validação lógica para submissão
        camposObrigatoriosParaSubmissao.forEach(idCampo => {
            const campo = document.getElementById(idCampo);
            let campoValido = true;
            
            switch(idCampo) {
                case 'nomeCompleto':
                    campoValido = validarTamanhoMinimo(campo.value, 10);
                    break;
                case 'email':
                    campoValido = validarEmail(campo.value);
                    break;
                case 'cpf':
                    campoValido = campo.value.trim() && validarCpf(campo.value);
                    break;
                case 'dataNascimento':
                    campoValido = campo.value && validarIdade(campo.value);
                    break;
                default:
                    campoValido = campo.value.trim() !== '';
            }
            
            if (!campoValido) {
                ehValido = false;
            }
        });
        
        // Mostra resultado da validação
        if (ehValido) {
            mostrarToast('sucesso');
            console.log('Formulário válido! Dados:', new FormData(formulario));
        } else {
            mostrarToast('erro');
        }
    });
});