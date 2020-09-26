import { createNode } from "../BuscaAEstrela/buscaAEstrela";

export function AEstrela(grid, startNode, finishNode, finish) {

    //Cria lista de nodes visitados em odem
    const visitedNodesInOrder = [];

    let newGrid = copyGrid(grid);
    
    //Inicia a distancia do nó inicial como 0
    newGrid[startNode.row][startNode.col].distance = 0;

    // nó final passa a ter a referencia do novo grid
    finishNode = newGrid[finishNode.row][finishNode.col];
    
    //Coloca todo o grid(matriz de objetos) de node como array, ao invez de matriz, esse array se torna o array de nodes que ainda não foram visitados
    let unvisitedNodes = getAllNodes(newGrid);
    
    //Loop enquanto há elementos não visitados, o programa não chega no objetivo ou ele fica preso em algum lugar com distancia infinita
    while (!!unvisitedNodes.length) {

        //Ordena os nodes do array não visitado em ordem crescente de distancia(custo + heuristica). Na primeira vez que programa roda o node inicial tem distancia 0 e os demais tem distancia infinita, fazendo com que ele fique em primeiro
        sortNodesByDistance(unvisitedNodes, finish);
        
        //Remove primeiro elemento do array, o elemento com menor distancia(custo + heuristica) espandido ate esse momento
        const closestNode = unvisitedNodes.shift();
        
        //Loop para caso ele encontre distancia(custo) infinito, isso não é para acontencer, todos os nodes devem ter custo calculado quando a função updateUnvisitedNeighbors é chamada, o primeiro node tem distancia 0
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;

        //O node mais proximo com menor distancia(custo + heuristica) é colocado na lista de visitados
        visitedNodesInOrder.push(closestNode);
        //Para o loop caso o node objetivo tenha sido atingido
        if (closestNode === finishNode) {
            // Retorna os nós visitados e o caminho mais curto
            return [visitedNodesInOrder, getNodesInShortestPathOrder(finishNode)];
        }
        //Atualiza os proximos nos a serem expandidos, dando valor de distancia(custo + heuristica) para eles, e assim no proximo loop eles serão ordenados na frente dos outros nodes em ordem de distancia(custo + heuristica)
        updateUnvisitedNeighbors(closestNode, newGrid, finish);
    }
}

function copyGrid(grid) {
    const newGrid = []
    for (let row = 0; row < 42; row++) {
        const currentRow = []
        for (let col = 0; col < 42; col++) {
            const node = createNode(
                col,
                row,
                grid[row][col].heuristica,
                grid[row][col].custo,
                grid[row][col].heuristicaGreen,
                grid[row][col].heuristicaRed,
                grid[row][col].heuristicaBlue,
                grid[row][col].campo,
            );
            currentRow.push(node);
        }
        newGrid.push(currentRow);
    }
    return newGrid;
}

function sortNodesByDistance(unvisitedNodes, finish) {
    switch (finish) {
        case 'finish': unvisitedNodes.sort((nodeA, nodeB) => (nodeA.distance + nodeA.heuristica) - (nodeB.distance + nodeB.heuristica)); break;
        case 'green': unvisitedNodes.sort((nodeA, nodeB) => (nodeA.distance + nodeA.heuristicaGreen) - (nodeB.distance + nodeB.heuristicaGreen)); break;
        case 'red': unvisitedNodes.sort((nodeA, nodeB) => (nodeA.distance + nodeA.heuristicaRed) - (nodeB.distance + nodeB.heuristicaRed)); break;
        case 'blue': unvisitedNodes.sort((nodeA, nodeB) => (nodeA.distance + nodeA.heuristicaBlue) - (nodeB.distance + nodeB.heuristicaBlue)); break;
    }
}

function updateUnvisitedNeighbors(node, grid) {
    //Função que verifica se os proximos nodes podem ser expandidos (são validos) e filtra os nodes que ja foram visitados, apos isso retorna esses nodes
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid)
    for (const neighbor of unvisitedNeighbors) {
        //da uma distancia aos nodes vizinhos com base no custo
        neighbor.distance = node.distance + node.custo
        // Guarda o node que deu origem aos vizinhos como node anterior, dentro do node expandido
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
            nodes.push(node);
        }
    }
    return nodes;
}

export function getNodesInShortestPathOrder(finishNode) {
    //Cria um array em ordem do  menor caminho a ser seguido ao objetivo
    const nodesInShortestPathOrder = [];
    //Coloca o node objetivo como node atual
    let currentNode = finishNode;
    while (currentNode !== null) {
        //Adiciona o node atual no inicio do array de menor caminho a ser seguido
        nodesInShortestPathOrder.unshift(currentNode)
        //Coloca o node anterior a expansão salvo como node atual, esse processo se repete ate que não tenha mais node anterior (ate chegar no node inicial)
        currentNode = currentNode.previousNode;
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

