const combinacoes =[
  [0,1,2], // linha 1
  [3,4,5], // linha 2
  [6,7,8], // linha 3
  [0,3,6], // coluna 1
  [1,4,7], // coluna 2
  [2,5,8], // coluna 3
  [0,4,8], // diagonal esqueda direita
  [2,4,6] // diagonal direita esquerda
]

const grid = document.querySelector('.grid');
const makeDivs = () => {
  for (let index = 0; index < 9; index += 1) {
    const div = document.createElement('div');
    div.classList.add('celula');
    div.id = index;
    div.addEventListener('click', jogar);
    grid.appendChild(div);
  }
}

const jogar = (event) => {
  const alvo = event.target;
  const jogador = document.getElementById('player').textContent.includes('X') ? 'O' : 'X';
  document.getElementById('player').textContent = `Vez do jogador ${jogador}`;
  alvo.textContent = jogador;
  alvo.removeEventListener('click', jogar);
  verificarVencedor(jogador);
}

const verificarVencedor = (jogador) => {
  const divs = Array.from(document.querySelectorAll('.celula'));
  const vencedor = combinacoes.find((combinacao) => {
    return combinacao.every((posicao) => divs[posicao].textContent === jogador);
  });

  if (vencedor) {
    document.getElementById('player').textContent = `Jogador ${jogador} ganhou!`;
    divs.forEach((div) => div.removeEventListener('click', jogar));
  } else {
    verificarEmpate();
  }
}

const limparCelulas = () => {
  const divs = Array.from(document.querySelectorAll('.celula'));
  divs.forEach(div => {
    div.textContent = '';
    div.addEventListener('click', jogar);
  });
  document.getElementById('player').textContent = 'Vez do jogador X';
}

const verificarEmpate = () => {
  const divs = Array.from(document.querySelectorAll('.celula'));
  const todasPreenchidas = divs.every((div) => div.textContent !== '');

  if (todasPreenchidas) {
    document.getElementById('player').textContent = 'Empatou';
  }
}

document.getElementById('reset').addEventListener('click', limparCelulas);
makeDivs();