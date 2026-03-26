const inputTarefa = document.getElementById('input-tarefa');
const botaoAdicionar = document.getElementById('botao-adicionar');
const listaTarefas = document.getElementById("lista-tarefas");
const botaoRemoverTudo = document.getElementById("botao-remover-tudo");
const botaoConcluidos = document.getElementById("Concluidos");

// cirando lista vazia.
let tarefas = [];

// função para salvar tarefas.
function salvarTarefas() {
    /*
        LocalStorage -> armazenamento local do navegador.
        setItem -> salva no armazenament o conteúdo recebido.
        JSON.stringify -> Pega a lista de tarefas, converte para texto(string) e armazena esse texto.
    */
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// função para mostrar tarefas na tela.
function mostrarTarefas() {
    listaTarefas.innerHTML = ""; // limpa a lista para evitar duplicação.
    for(let i = 0; i < tarefas.length; i++) {
        const li = document.createElement("li"); 
        li.innerText = tarefas[i].texto;

        const botaoRemover = document.createElement("button");
        botaoRemover.innerText = "🗑️";
        botaoRemover.className = "botao-remover";

        botaoRemover.addEventListener("click", () => {
            removerTarefa(i);
          
        })

        li.appendChild(botaoRemover); // adiciona o botão de remover à tarefa.
        listaTarefas.appendChild(li); // adiciona a tarefa à lista na tela.
    }
}


function removerTarefa(posicaoTarefa){
    // splice -> (posicaoInicial, quantidade de itens)
    tarefas.splice(posicaoTarefa, 1); // remove a tarefa da lista.

    //depois de remover, chamo a função de salvar no localStorage
    salvarTarefas();
    mostrarTarefas();
}

//função para adicionar tarefa.
function adicionarTarefa() {
    const valorTarefa = inputTarefa.value;
    if (valorTarefa === "") {
        alert ("Digite uma tarefa!");
        return; //não deixa que a tarefa vazia apareca na tela
    }
    if (tarefas.includes(valorTarefa)) {
        alert("Essa tarefa já existe na sua lista!");
        return; // Interrompe a função aqui para não adicionar
    }
    if (tarefas.some(t => t.texto === valorTarefa)) {
        alert("Essa tarefa já existe na sua lista!");
        return;
    }

    // AGORA ADICIONA UM OBJETO:
    tarefas.push({ 
        texto: valorTarefa, 
        concluida: false 
    });
    tarefas.push(valorTarefa); // adiciona a tarefa à lista.
    inputTarefa.value = ""; // limpa o campo de input.

    salvarTarefas(); // salva a lista atualizada no localStorage.
    mostrarTarefas(); // atualiza a lista na tela.
}

// função para carregar tarefas salavas no localStorage
function carregarTarefas() {

    // pega as tarefas e armazena na variavel 'tarefasSalvas'
    const tarefasSalvas = localStorage.getItem("tarefas"); 

    // se houver tarefas salvas
    // então converte a tarefa e mosta na tela.
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas); // converte o texto(string) de volta para uma lista.

        mostrarTarefas();
    }
}

botaoAdicionar.addEventListener("click", adicionarTarefa);
carregarTarefas(); // carrega as tarefas salvas quando a página é carregada. 

function removerTudo() {
    tarefas = []; // limpa a lista de tarefas.
    salvarTarefas();
    mostrarTarefas(); // atualiza a lista na tela.

}

botaoRemoverTudo.addEventListener("click", removerTudo);

inputTarefa.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});

