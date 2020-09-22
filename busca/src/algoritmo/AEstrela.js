
 
export function AEstrela(grid, startNode, finishNode, GreenNode, RedNode, BlueNode) {
    let greenAmulet = false;
    let redAmulet = false;
    let blueAmulet = false;
    //Cria lista de nodes visitados em odem
    const visitedNodesInOrder = [];
    //Inicia a distancia do node inicial como 0
    startNode.distance = 0;
    //Coloca todo o grid(matriz de objetos) de node como array, ao invez de matriz, esse array se torna o array de nodes que ainda não foram visitados
    const unvisitedNodes = getAllNodes(grid);
    //Loop enquanto há elementos não visitados, o programa não chega no objetivo ou ele fica preso em algum lugar com distancia infinita
    while (!!unvisitedNodes.length) {
        //Ordena os nodes do array não visitado em ordem crescente de distancia(custo + heuristica). Na primeira vez que programa roda o node inicial tem distancia 0 e os demais tem distancia infinita, fazendo com que ele fique em primeiro
        sortNodesByDistance(unvisitedNodes, greenAmulet, redAmulet, blueAmulet);
        //Remove primeiro elemento do array, o elemento com menor distancia(custo + heuristica) espandido ate esse momento
        const closestNode = unvisitedNodes.shift();
        //Loop para caso ele encontre distancia(custo) infinito, isso não é para acontencer, todos os nodes devem ter custo calculado quando a função updateUnvisitedNeighbors é chamada, o primeiro node tem distancia 0
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        //O node mais proximo com menor distancia(custo + heuristica) é colocado na lista de visitados
        visitedNodesInOrder.push(closestNode);
        //Para o loop caso o node objetivo tenha sido atingido
        if (closestNode === GreenNode){
            greenAmulet = true; 
        }
        if (closestNode === RedNode){
            redAmulet = true;
        }
        if (closestNode === BlueNode){
            blueAmulet = true;
        }
        if (closestNode === finishNode) return visitedNodesInOrder;
        //Atualiza os proximos nos a serem espandidos, dando falor de distancia(custo + heuristica) para eles, e assim no proximo loop eles serão ordenados na frente dos outros nodes em ordem de distancia(custo + heuristica)
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function sortNodesByDistance(unvisitedNodes, greenAmulet, redAmulet, blueAmulet) {
    //Ordena o array em ordem de distancia(custo + heuristica) crescente
    /*if(greenAmulet === false && redAmulet == false && blueAmulet === false) {
        unvisitedNodes.sort((nodeA, nodeB) => {
            let menorValor = nodeA.heuristicaBlue;
            let objetivoInicial = "amuleto azul";
            if(menorValor > nodeA.heuristicaGreen) {
                menorValor = nodeA.heuristicaGreen;
                objetivoInicial = "amuleto verde";
            }
            if(menorValor > nodeA.heuristicaRed){
                menorValor = nodeA.heuristicaRed;
                objetivoInicial = "amuleto vermelho";
            }
            if(objetivoInicial === "amuleto azul") {
                return ((nodeA.distance + nodeA.heuristicaBlue) - (nodeB.distance + nodeB.heuristicaBlue))
            } else if(objetivoInicial === "amuleto verde") {
                return ((nodeA.distance + nodeA.heuristicaGreen) - (nodeB.distance + nodeB.heuristicaGreen))
            } else {
                return ((nodeA.distance + nodeA.heuristicaRed) - (nodeB.distance + nodeB.heuristicaRed))
            }
        });
    } else if(greenAmulet === false && redAmulet === false) {
        unvisitedNodes.sort((nodeA, nodeB) => {
            if(nodeA.heuristicaGreen > nodeA.heuristicaRed) {
                return ((nodeA.distance + nodeA.heuristicaRed) - (nodeB.distance + nodeB.heuristicaRed))
            } else {
                return ((nodeA.distance + nodeA.heuristicaGreen) - (nodeB.distance + nodeB.heuristicaGreen))
            }
        });
    } else if(greenAmulet === false && blueAmulet === false) {
        unvisitedNodes.sort((nodeA, nodeB) => {
            if(nodeA.heuristicaGreen > nodeA.heuristicaBlue) {
                return ((nodeA.distance + nodeA.heuristicaBlue) - (nodeB.distance + nodeB.heuristicaBlue))
            } else {
                return ((nodeA.distance + nodeA.heuristicaGreen) - (nodeB.distance + nodeB.heuristicaGreen))
            }
        });
    } else if(redAmulet === false && blueAmulet === false) {
        unvisitedNodes.sort((nodeA, nodeB) => {
            if(nodeA.heuristicaRed > nodeA.heuristicaBlue) {
                return ((nodeA.distance + nodeA.heuristicaBlue) - (nodeB.distance + nodeB.heuristicaBlue))
            } else {
                return ((nodeA.distance + nodeA.heuristicaRed) - (nodeB.distance + nodeB.heuristicaRed))
            }
        });
    } else if(blueAmulet === false) {
        unvisitedNodes.sort((nodeA, nodeB) => ((nodeA.distance + nodeA.heuristicaBlue) - (nodeB.distance + nodeB.heuristicaBlue)));
    } else if(redAmulet === false) {
        unvisitedNodes.sort((nodeA, nodeB) => ((nodeA.distance + nodeA.heuristicaRed) - (nodeB.distance + nodeB.heuristicaRed)));
    } else if(greenAmulet === false) {
        unvisitedNodes.sort((nodeA, nodeB) => ((nodeA.distance + nodeA.heuristicaGreen) - (nodeB.distance + nodeB.heuristicaGreen)));
    } else {
        unvisitedNodes.sort((nodeA, nodeB) => (nodeA.distance + nodeA.heuristica) - (nodeB.distance + nodeB.heuristica));
    }*/
    unvisitedNodes.sort((nodeA, nodeB) => (nodeA.distance + nodeA.heuristica) - (nodeB.distance + nodeB.heuristica));
  }

function updateUnvisitedNeighbors(node, grid) {
    //Função que verifica se os proximos nodes podem ser expandidos (são validos) e filtra os nodes que ja foram visitados, apos isso retorna esses nodes
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid)
    for (const neighbor of unvisitedNeighbors) {
        //da uma distancia aos nodes vizinhos com base no custo
        neighbor.distance = node.distance + node.custo
        //Guarda o node que deu origem aos vizinhos como node anterior, dentro do node expandido
        neighbor.previousNode = node
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = []
    const { col, row } = node
    //Verifica posições validas na matriz ao redor do node que ira expandir, para verificar quais posiçoes de expansão são validas. 
    if (row > 0) neighbors.push(grid[row - 1][col])
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
    if (col > 0) neighbors.push(grid[row][col - 1])
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
    //Filtra nodes já visitados e retorna lista de nodes vizinhos validos para a expanção
    return neighbors.filter(neighbor => !neighbor.isVisited)
}

function getAllNodes(grid) {
    const nodes = []
    //Coloca todos os nodes da matriz de nodes em um array e retorna esse array
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node)
        }
    }
    return nodes;
}

export function getNodesInShortestPathOrder(finishNode) {
    //Cria um array em ordem do  menor caminho a ser seguido ao objetivo
    const nodesInShortestPathOrder = []
    //Coloca o node objetivo como node atual
    let currentNode = finishNode
    while (currentNode !== null) {
        //Adiciona o node atual no inicio do array de menor caminho a ser seguido
        nodesInShortestPathOrder.unshift(currentNode)
        //Coloca o node anterior a expansão salvo como node atual, esse processo se repete ate que não tenha mais node anterior (ate chegar no node inicial)
        currentNode = currentNode.previousNode
    }
    //Retorna array com o menor caminho a ser seguido encontrado pela busca a*
    return nodesInShortestPathOrder
}

export function custoFinal(finishNode) {
    //Cria um variavel incremental q guarda os custos totais do caminho
    let custoTotal = 0
    //Coloca o node objetivo como node atual
    let currentNode = finishNode
    while (currentNode !== null) {
        //Adiciona o node atual no inicio do array de menor caminho a ser seguido
        custoTotal = custoTotal + currentNode.custo
        //Coloca o node anterior a expansão salvo como node atual, esse processo se repete ate que não tenha mais node anterior (ate chegar no node inicial)
        currentNode = currentNode.previousNode
    }
    //Retorna array com o menor caminho a ser seguido encontrado pela busca a*
    return custoTotal
}

