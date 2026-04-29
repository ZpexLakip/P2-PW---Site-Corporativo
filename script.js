function enviarForm(){
    let orcamentos = JSON.parse(localStorage.getItem("orcamentos")) || [];
    const formOrcamento = document.getElementById("form-conteudo")

    event.preventDefault()
        
    const orcamento ={
        nome: document.getElementById("f-nome").value,
        telefone: document.getElementById("f-tel").value,
        email: document.getElementById("f-email").value,
        cep: document.getElementById("f-cep").value,
        rua: document.getElementById("f-rua").value,
        bairro: document.getElementById("f-bairro").value,
        cidade: document.getElementById("f-cidade").value,
        numero: document.getElementById("f-num").value,
        volume: document.getElementById("f-volume").value,
        tipo: document.getElementById("f-tipo").value,
        servico: document.getElementById("f-servico").value,
        descricao: document.getElementById("f-msg").value
    }
        
    orcamentos.push(orcamento)
    localStorage.setItem("orcamentos", JSON.stringify(orcamentos))

    console.log("Orcamento Salvo: ", orcamento);
    console.log("Todos os Orcamentos: ", orcamentos);

    alert("Foi")
}