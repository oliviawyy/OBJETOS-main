/* Seleciona os elementos do DOM usando o método querySelector, que retorna o primeiro elemento 
que corresponde ao seletor CSS especificado */


const sliderElement = document.querySelector('.app-pwd__slider'); // Elemento do controle deslizante
const buttonElement = document.querySelector('.app-pwd__button'); // Botão de gerar senha
const clearButton = document.querySelector('.app-pwd__button--clear'); //Botão para limpar o histórico de senhas
const sizePassword = document.querySelector('.app-pwd__size');      // Elemento que mostra o tamanho da senha
const password = document.querySelector('.app-pwd__output');      // Elemento que exibe a senha gerada
const containerPassword = document.querySelector('.app-pwd__result'); // Container da senha gerada
const welcomeElement = document.querySelector('.app-pwd__welcome'); // Elemento de saudação
const datetimeElement = document.querySelector('.app-pwd__datetime'); // Elemento de data e hora

/* Objeto que contém os conjuntos de caracteres possíveis para a geração de senha
cada propriedade representa um tipo diferente de caractere */
const charsets = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', // Letras maiúsculas
  lowercase: 'abcdefghijklmnopqrstuvwxyz', // Letras minúsculas
  numbers: '0123456789',                   // Números
  special: '!@#$%^&*'                     // Caracteres especiais
}



/* Variáveis para armazenar a senha atual e o histórico de senhas */
let novaSenha = '';       // armazena a senha atual gerada
let historicoSenhas = []; // array para armazenar as últimas 3 senhas geradas


/* Função que retorna uma saudação baseada na hora atual do dia
utiliza metodo getHours() do objeto Date para obter a j=hora atual (0-23) */
const getSaudacao = () => {

    const hora = new Date().getHours();


  /**
   * Regras da saudação:
   * 00:00 - 11:59 -> Bom dia
   * 12:00 - 17:59 -> Boa tarde
   * 18:00 - 23:59 -> Boa noite
   */

    if (hora < 12) return 'Bom dia';
    if (hora < 18) return 'Boa tarde';
    return 'Boa noite';
};


/* Função que formata a data e hora atual em um formato legível
Utiliza vários métodos do objeto Date para obter os componentes da data */
const formatarDataHora = () => {

  // cria um objeto com a data e hora atual
  const agora = new Date();
  

  // Array com os nomes os dias da semana
  const diasSemana = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
  ];

console.log(diasSemana[agora.getDay()])


/** Obtém o dia da semana */
const diaSemana = diasSemana[agora.getDay()];



/** Dados da data */
const dia = agora.getDate().toString().padStart(2,'0');
const mes = (agora.getMonth() + 1).toString().padStart(2,'0');
const ano = agora.getFullYear();

/**
 * Hora como número (para lógica, se necessário no futuro)
 * Aqui usamos apenas para formatação
 */
const hora = agora.getHours().toString().padStart(2,'0');
const minuto = agora.getMinutes().toString().padStart(2,'0');
const segundo = agora.getSeconds().toString().padStart(2,'0');

/** Retorna apenas a data e hora (sem saudação) */
return `${diaSemana}, ${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
};



/* Função que atualiza o cabeçalho com a saudação e a data/hora atual */
const atualizarHeader = () => {
  welcomeElement.textContent = `${getSaudacao()}!`;
  datetimeElement.textContent = formatarDataHora();
}

/* Atualizar header a cada segundo */
setInterval(atualizarHeader, 1000);

/* Inicializar header */
atualizarHeader();

/* Exibe inicialmente o valor do slider*/
sizePassword.textContent = sliderElement.value;


/* Atualiza o valor exibido do tamanho da senha conforme o slider é movimentado */
sliderElement.addEventListener('input', (e) => {
  sizePassword.textContent = e.target.value;
});

/* Função principal para gerar a senha */
const generatePassword = () => {
  let selectedCharsets = ''; // string para armazenar os caracteres selecionados

  // obter os checkbox selecionados
  const uppercaseChecked = document.querySelector('.uppercase-check').checked;
  const lowercaseChecked = document.querySelector('.lowercase-check').checked;
  const numbersChecked = document.querySelector('.numbers-check').checked;
  const specialChecked = document.querySelector('.special-check').checked;

  // construir o charset baseado nas opções selecionadas
  if (uppercaseChecked) selectedCharsets += charsets.uppercase;
  if (lowercaseChecked) selectedCharsets += charsets.lowercase;
  if (numbersChecked) selectedCharsets += charsets.numbers;
  if (specialChecked) selectedCharsets += charsets.special;

  // se nenhuma opcao estiver selecionada, selecionar todas
  if (!selectedCharsets){
    selectedCharsets = Object.values(charsets).join('');
    console.log(selectedCharsets);
    document.querySelector('.uppercase-check').checked = true;
    document.querySelector('.lowercase-check').checked = true;
    document.querySelector('.numbers-check').checked = true;
    document.querySelector('.special-check').checked = true;

      // incializa uma string vazia para armazenar a senha gerada
    let pass= '';

    // usa o operador de incremento (++) para aumentar o contador
    /* Loop que itera pelo número de caracteres definido no slider
 Usa o operador de incremento (++) para aumentar o contador */

    for (let i = 0; i < sliderElement.value; ++i) {}
    /* Adiciona um caractere aleatório à senha:
    1. Math.random() gera um número decimal entre 0 e 1
    2. Multiplicado pelo comprimento do charset para obter um índice válido
    3. Math.floor() arredonda para baixo para obter um índice inteiro
    4. charAt() retorna o caractere na posição do índice calculado */

    pass += selectedCharsets.charAt(Math.floor(Math.random() * selectedCharsets.length));
  }
};

/* Função para copiar a senha gerada para a área de transferência */
const copyPassword = () => {
  alert('Senha copiada para a área de transferência!'); //exibe um alerta de sucesso
  navigator.clipboard.writeText(novaSenha); // copia a senha usando a API Clipboard
}

// adicionar os event listeners para os eventos de clique
buttonElement.addEventListener('click', generatePassword); // gera nova senha
containerPassword.addEventListener('click', copyPassword); // copia a senha


// funcao para limpar os dados e esconder os containers
const clearData = () => {
  //limpa historico de senhas
  historicoSenhas = [];
  novaSenha = '';

  containerPassword.classList.add('hide');
  const historico = document.querySelector('.app-pwd__history');
  if (historico) {
    historico.style.display = 'none';
  }

  // reseta os checkboxes para o estado inicial (marcados)
  document.querySelector('.uppercase-check').checked = true;
  document.querySelector('.lowercase-check').checked = true;
  document.querySelector('.numbers-check').checked = true;
  document.querySelector('.special-check').checked = true;

  // reseta o slider para o valor inicial
  sliderElement.value = 8;
  sizePassword.textContent= '8';

};

// adiciona o event listener para o botão de limpar
clearButton.addEventListener('click', clearData);

// String que armazenará todos os caracteres possíveis para a senha

  /* Obter os checkboxes selecionados */
  



  /* Construir o charset baseado nas opções selecionadas */


  /* Se nenhuma opção estiver selecionada, selecionar todas */
 

  // Inicializa uma string vazia para armazenar a senha gerada
 


  

  
  /* Remove a classe 'hide' para exibir o container da senha */
  containerPassword.classList.remove('hide');
  

  /* Insere a senha gerada no elemento HTML */
  password.textContent = pass;

 
  /*  Armazena a senha atual na variável global para uso posterior (ex: copiar) */
  novaSenha = pass;
  
  /* Gerenciamento do histórico de senhas:
  unshift() adiciona a nova senha no início do array */
  historicoSenhas.unshift(pass);
 

  /*  Limita o histórico a 3 senhas:
  Se o array tiver mais de 3 itens, pop() remove o último */
  if (historicoSenhas.length > 3) {
    historicoSenhas.pop();
  }
 
  /* Atualizar a lista de histórico na interface: */
  const historico = document.querySelector('.app-pwd__history');
  if (historico){

  
 
    /* Remover a classe 'hide' para exibir o histórico */
    historico.style.display = 'block';
  
    /* Cria elementos <li> para cada senha no histórico:
    1. map() transforma cada senha em um elemento HTML
    2. join('') concatena todos os elementos em uma única string */
    historico.querySelector('.app-pwd__history-list').innerHTML = historicoSenhas
      .map(senha => `<li class="app-pwd__history-item">${senha}</li>`)
      .join('');  
  
  }


  // Exibe um alerta de sucesso
 // Copia a senha usando a API Clipboard


/* Adicionar os event listeners para os eventos de clique */
 // Gera nova senha
  // Copia a senha

/* Função para limpar os dados e esconder os containers */

  // Limpa o histórico de senhas
 

  /* Esconder os containers */
 

  /* Reseta os checkboxes para o estado inicial (marcados) */


  /* Reseta o slider para o valor inicial */
  

/* Adiciona o event listener para o botão de limpar */