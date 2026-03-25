const inputTarefa = document.getElementById('input-tarefa');
const botaoAdicionar = document.getElementById('botao-adicionar');
const listaTarefas = document.getElementById("lista-tarefas");

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
    listadeTarefas.innerHTML = ""; // limpa a lista para evitar duplicação.
    for(let i = 0; i < tarefas.length; i++) {
        const li = document.createElement("li"); 
        li.innerText = tarefas[i];
    }
}