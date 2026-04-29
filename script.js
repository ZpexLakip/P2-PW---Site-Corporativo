async function buscarCep(){
    const cep = document.getElementById("f-cep").value
    const viacep = 'https://viacep.com.br/ws/'+ cep + '/json/'
    
    try{ 
        const response = await fetch(viacep)
        if (response.ok){
        let data = await response.json()
            document.getElementById("cep-erro").textContent = ''
            document.getElementById("f-rua").value = data.logradouro
            document.getElementById("f-bairro").value = data.bairro
            document.getElementById("f-cidade").value = data.localidade
        } 
    } catch(error){
    document.getElementById("cep-erro").textContent = 'CEP não encontrado. Verifique e tente novamente.'
    alert(error)
    return
    }
}

async function enviarForm(){
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

    console.log("Orçamento Salvo: ", orcamento);
    console.log("Todos os Orçamentos: ", orcamentos);

    alert("Orçamento Concluído")
}