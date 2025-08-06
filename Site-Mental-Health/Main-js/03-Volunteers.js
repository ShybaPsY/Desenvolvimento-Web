document.addEventListener('DOMContentLoaded', () => {
    const botoesSaibaMais = document.querySelectorAll('.btn-saiba-mais');
    const modalDetalhes = document.querySelector('.modal-detalhes-profissionais');
    const botaoFechar = modalDetalhes.querySelector('.modal-fechar');

    const profissionais = [
        {
            nome: 'Dra. Maria Silva',
            especialidade: 'Psicóloga Clínica',
            areasEspecializacao: 'Terapia Cognitivo-Comportamental, Transtornos Psicológicos, Gestão de Estresse',
            abordagemTerapeutica: 'Trabalho com técnicas personalizadas focadas na compreensão individual e desenvolvimento de estratégias de enfrentamento.',
            experiencia: 'Mais de 10 anos de experiência em clínica particular, atendendo pacientes com diversos perfis e necessidades psicológicas.'
        },
        {
            nome: 'Dr. João Santos',
            especialidade: 'Psiquiatra',
            areasEspecializacao: 'Saúde Mental Adulto e Adolescente, Transtornos do Humor, Tratamento Farmacológico',
            abordagemTerapeutica: 'Combino tratamento medicamentoso com acompanhamento psicológico integrado, buscando o bem-estar integral do paciente.',
            experiencia: 'Especialista em diagnóstico e tratamento de condições psiquiátricas complexas, com foco em personalização do tratamento.'
        },
        {
            nome: 'Dra. Ana Oliveira',
            especialidade: 'Terapeuta',
            areasEspecializacao: 'Terapia Familiar, Relações Interpessoais, Mediação de Conflitos',
            abordagemTerapeutica: 'Foco em dinâmicas familiares, comunicação assertiva e resolução de conflitos internos e externos.',
            experiencia: 'Ampla experiência em terapia familiar e individual, com ênfase em reconstrução de vínculos e estratégias de comunicação.'
        }
    ];

    botoesSaibaMais.forEach((botao, index) => {
        botao.addEventListener('click', () => {
            const profissional = profissionais[index];
            
            // Restruturar o cabeçalho do modal
            const modalHeader = modalDetalhes.querySelector('.modal-header');
            modalHeader.innerHTML = `
                <div class="avatar-container">
                    <div class="icon-container" style="background-color: #36b9cc; width: 80px; height: 80px; border-radius: 50%; display: flex; justify-content: center; align-items: center;">
                        <i class="fas fa-user-md" style="font-size: 35px; color: white;"></i>
                    </div>
                </div>
                <div class="header-info">
                    <h3 class="nome-profissional">${profissional.nome}</h3>
                    <p class="especialidade-profissional">${profissional.especialidade}</p>
                </div>
            `;
            
            modalDetalhes.querySelector('.areas-especializacao').textContent = profissional.areasEspecializacao;
            modalDetalhes.querySelector('.abordagem-terapeutica').textContent = profissional.abordagemTerapeutica;
            modalDetalhes.querySelector('.experiencia-profissional').textContent = profissional.experiencia;

            modalDetalhes.style.display = 'block';
        });
    });

    botaoFechar.addEventListener('click', () => {
        modalDetalhes.style.display = 'none';
    });

    // Fechar
    modalDetalhes.addEventListener('click', (event) => {
        if (event.target === modalDetalhes) {
            modalDetalhes.style.display = 'none';
        }
    });
});