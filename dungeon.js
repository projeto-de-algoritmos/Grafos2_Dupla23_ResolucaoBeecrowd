class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(element) {
    this.items.push(element);
  }
  dequeue() {
    if (this.isEmpty())
      return "Underflow";
    return this.items.shift();
  }
  isEmpty() {
    return this.items.length == 0;
  }
  printQueue() {
    var str = "";
    for (var i = 0; i < this.items.length; i++)
      str += this.items[i] + " ";
    return str;
  }
}

/* 
  grafo: grafo em um array 2D.
    .: caminho possivel
    #: caminho bloqueado
    E: saida
  startingPointV: ponto inicial vertical
  startingPointH: ponto inicial horizontal
  maxDistance: distancia máxima aceita entre entrada e saída
*/
function findDungeonExitDistance(grafo = null, startingPointV = 0, startingPointH = 0, maxDistance = null) {
  const minHorizontal = 0;
  const minVertical = 0;
  const maxHorizontal = grafo[minHorizontal].length - 1;
  const maxVertical = grafo.length - 1;

  // Gera um array 2D referente ao estado de visita de uma certa localização
  var visited = [];
  for (let i = 0; i <= maxVertical; i++) {
    visited[i] = [];
    for (let j = 0; j <= maxHorizontal; j++) {
      visited[i][j] = false;
    }
  };

  // Verifica se a posição inicial é valida
  if (
    grafo[startingPointV][startingPointH] === '#' || 
    startingPointH < minHorizontal ||
    startingPointH > maxHorizontal ||
    startingPointV < minVertical ||
    startingPointV > maxVertical
  ) {
    console.log('Posição inicial inválida');
    return;
  }

  let distance = 0;

  let count = 1;
  let countNext = 0;

  const hQueue = new Queue();
  const vQueue = new Queue();

  hQueue.enqueue(startingPointH);
  vQueue.enqueue(startingPointV);
  visited[startingPointV][startingPointH] = true;

  // hQueue e vQueue possuem sempre a mesma quantidade
  while (!hQueue.isEmpty()) {
    let h = hQueue.dequeue();
    let v = vQueue.dequeue();

    // Movimentação ocorrera para cima (0), baixo (1), esquerda (2) e direita (3)
    for (let i = 0; i < 4; i++) {
      let movimentacaoH, movimentacaoV;
      switch (i) {
        // CIMA
        case 0:
          if (v === minVertical) continue
          movimentacaoH = h;
          movimentacaoV = v - 1;
          break;
        // BAIXO
        case 1:
          if (v === maxVertical) continue
          movimentacaoH = h;
          movimentacaoV = v + 1;
          break;
        // ESQUERDA
        case 2:
          if (h === minHorizontal) continue
          movimentacaoH = h - 1;
          movimentacaoV = v;
          break;
        // DIREITA
        case 3:
          if (h === maxHorizontal) continue
          movimentacaoH = h + 1;
          movimentacaoV = v;
          break;
      }

      if (!visited[movimentacaoV][movimentacaoH]) {
        // Verifica se o proximo caminho é a saida
        if (grafo[movimentacaoV][movimentacaoH] === "E") {
          console.log('Achou a saida. Distancia: ', ++distance);
          return true;
        }
        // Verifica se é uma pedra
        if (grafo[movimentacaoV][movimentacaoH] !== '#') {
          hQueue.enqueue(movimentacaoH);
          vQueue.enqueue(movimentacaoV);
          visited[movimentacaoV][movimentacaoH] = true;
          countNext++;
        }
      }
    }
    count--;
    if (count === 0) {
      count = countNext;
      countNext = 0;
      distance++;
      if (maxDistance && (distance + 1) > maxDistance) {
        console.log("Nenhuma saida encontrada para a distancia máxima informada");
        return false;
      }
    }
  };
  console.log('Nenhuma saida foi encontrada');
  return false;
};

const grafo = [
  ['.', '.', '.', '.', '.'],
  ['.', '#', '#', '#', '.'],
  ['#', '#', '.', '.', '.'],
  ['.', '#', '.', '#', '.'],
  ['E', '#', '#', '.', '.'],
  ['.', '.', '.', '.', '.'],
]

findDungeonExitDistance(grafo, 0, 4);