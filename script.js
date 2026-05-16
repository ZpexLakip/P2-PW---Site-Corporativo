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
    
    // Validação de campos obrigatórios
    const nome = document.getElementById("f-nome").value.trim();
    const tel = document.getElementById("f-tel").value.trim();
    const cep = document.getElementById("f-cep").value.trim();
    const servico = document.getElementById("f-servico").value.trim();
    
    if (!nome || !tel || !cep || !servico) {
        const erroElement = document.getElementById("form-erro");
        if (erroElement) {
            erroElement.style.display = 'block';
        }
        return;
    }

    event.preventDefault();
        
    const orcamento = {
        nome: nome,
        telefone: tel,
        email: document.getElementById("f-email").value,
        cep: cep,
        rua: document.getElementById("f-rua").value,
        bairro: document.getElementById("f-bairro").value,
        cidade: document.getElementById("f-cidade").value,
        numero: document.getElementById("f-num").value,
        volume: document.getElementById("f-volume").value,
        tipo: document.getElementById("f-tipo").value,
        servico: servico,
        descricao: document.getElementById("f-msg").value
    };

    orcamentos.push(orcamento);
    localStorage.setItem("orcamentos", JSON.stringify(orcamentos));

    console.log("Orçamento Salvo: ", orcamento);
    console.log("Todos os Orçamentos: ", orcamentos);

    // Adicionar à tabela
    const tabela = document.getElementById("leads-body");
    if (tabela) {
        const novaLinha = tabela.insertRow(-1);
        novaLinha.insertCell(0).textContent = orcamento.nome;
        novaLinha.insertCell(1).textContent = orcamento.telefone;
        novaLinha.insertCell(2).textContent = orcamento.rua;
        novaLinha.insertCell(3).textContent = orcamento.volume;
        novaLinha.insertCell(4).textContent = orcamento.servico;
        novaLinha.insertCell(5).textContent = orcamento.descricao;
        novaLinha.insertCell(6).textContent = new Date().toDateString();
    }

    // Mostrar mensagem de sucesso
    const formConteudo = document.getElementById("form-conteudo");
    const formSucesso = document.getElementById("form-sucesso");
    if (formConteudo && formSucesso) {
        formConteudo.style.display = 'none';
        formSucesso.style.display = 'block';
    }
}
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validação de email com listener
document.addEventListener("DOMContentLoaded", function() {
    const emailInput = document.getElementById("f-email");
    
    if (emailInput) {
        emailInput.addEventListener("blur", function () {
            const email = emailInput.value;
            if (email !== "" && !validarEmail(email)) {
                alert("Digite um email válido!");
            }
        });
    }
    
    // Carregar leads salvos
    carregarLeads();
});

function carregarLeads() {
    const tabela = document.getElementById("leads-body");
    if (!tabela) return;
    
    const orcamentos = JSON.parse(localStorage.getItem("orcamentos")) || [];
    tabela.innerHTML = "";
    
    orcamentos.forEach(orcamento => {
        const novaLinha = tabela.insertRow(-1);
        novaLinha.insertCell(0).textContent = orcamento.nome;
        novaLinha.insertCell(1).textContent = orcamento.telefone;
        novaLinha.insertCell(2).textContent = orcamento.rua;
        novaLinha.insertCell(3).textContent = orcamento.volume;
        novaLinha.insertCell(4).textContent = orcamento.servico;
        novaLinha.insertCell(5).textContent = orcamento.descricao;
        novaLinha.insertCell(6).textContent = new Date(orcamento.data || Date.now()).toDateString();
    });
}
async function limparLeads(){
    const tabela = document.getElementById("leads-body")
    tabela.innerHTML = ""
    localStorage.removeItem("orcamentos")
}

function novaReq() {
    // Resetar formulário
    document.getElementById("f-nome").value = "";
    document.getElementById("f-tel").value = "";
    document.getElementById("f-email").value = "";
    document.getElementById("f-cep").value = "";
    document.getElementById("f-rua").value = "";
    document.getElementById("f-bairro").value = "";
    document.getElementById("f-cidade").value = "";
    document.getElementById("f-num").value = "";
    document.getElementById("f-volume").value = "";
    document.getElementById("f-tipo").value = "";
    document.getElementById("f-servico").value = "";
    document.getElementById("f-msg").value = "";
    document.getElementById("form-erro").style.display = 'none';
    
    // Mostrar formulário novamente
    const formConteudo = document.getElementById("form-conteudo");
    const formSucesso = document.getElementById("form-sucesso");
    if (formConteudo && formSucesso) {
        formConteudo.style.display = 'block';
        formSucesso.style.display = 'none';
    }
}

/* --- INÍCIO DA VALIDAÇÃO DE TELEFONE --- */
const campoTelefone = document.getElementById('f-tel');

if (campoTelefone) {
    campoTelefone.maxLength = 15; // Limita o tamanho para (99) 99999-9999
    
    campoTelefone.addEventListener('input', function(event) {
        let valor = event.target.value.replace(/\D/g, ""); // Tira tudo que não for número
        let formatado = "";
        
        if (valor.length > 0) {
            formatado = "(" + valor.substring(0, 2);
        }
        if (valor.length > 2) {
            formatado += ") " + valor.substring(2, 7);
        }
        if (valor.length > 7) {
            formatado += "-" + valor.substring(7, 11);
        }
        
        event.target.value = formatado;
    });
}
/* --- FIM DA VALIDAÇÃO DE TELEFONE --- */
