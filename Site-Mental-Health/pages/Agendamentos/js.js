document.getElementById("formAgendamento").addEventListener("submit", function(event) {
    event.preventDefault();
    let nome = document.getElementById("nome").value;
    let nomePsico = document.getElementById("nomePsico").value;
    let data = document.getElementById("data").value;
    let hora = document.getElementById("hora").value;
    
    const dataFormatada = new Date(data).toLocaleDateString('pt-BR'); //
    
    if(nome && nomePsico && data && hora) {
        alert(`\nConsulta agendada com sucesso !\n\nPaciente   : ${nome}\nPsicólogo : ${nomePsico}\nData         : ${dataFormatada}\nHorário    : ${hora}`);
        document.getElementById("formAgendamento").reset();
    } else {
        alert("Por favor, preencha todos os campos obrigatórios.");
    }
});