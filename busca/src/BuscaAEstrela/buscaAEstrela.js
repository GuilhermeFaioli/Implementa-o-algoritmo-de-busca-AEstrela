import React, { Component } from 'react'
import Node from "./Node/Node"
import './buscaAEstrela.css'
import { AEstrela, getNodesInShortestPathOrder, custoFinal } from '../algoritmo/AEstrela';
import 'bootstrap/dist/css/bootstrap.css';

//Valores referentes a linha e coluna inicial e final, valores de custo por bioma do campo, e a matriz dando numeros referentes ao biomas
let START_NODE_ROW = 27;
let START_NODE_COL = 23;
const GREEN_AMULET_NODE_ROW = 32;
const GREEN_AMULET_NODE_COL = 5;
const RED_AMULET_NODE_ROW = 1;
const RED_AMULET_NODE_COL = 24;
const BLUE_AMULET_NODE_ROW = 17;
const BLUE_AMULET_NODE_COL = 39;
let FINISH_NODE_ROW = 1;
let FINISH_NODE_COL = 2;
const grama = 10;
const areia = 20;
const floresta = 100;
const montanha = 150;
const agua = 180;
/*
    1 - grama: custo 10
    2 - areia: custo 20
    3 - floresta: custo 100
    4 - montanha: custo 150
    5 - agua: custo 180
*/

//Matriz representando as posições exatas
const matriz = [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [3, 1, 1, 3, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 4, 4, 4, 4, 4],
    [3, 1, 1, 3, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4],
    [3, 1, 3, 3, 1, 3, 1, 3, 1, 3, 1, 1, 3, 1, 1, 1, 1, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4],
    [3, 1, 1, 1, 1, 3, 1, 3, 1, 3, 1, 1, 3, 1, 1, 1, 1, 4, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4],
    [3, 1, 3, 3, 1, 3, 1, 3, 1, 3, 1, 3, 3, 3, 1, 1, 1, 4, 2, 4, 4, 4, 2, 2, 2, 2, 2, 4, 4, 4, 4, 5, 4, 2, 2, 2, 2, 4, 5, 4, 4, 4],
    [3, 1, 3, 3, 1, 3, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4],
    [3, 1, 3, 3, 3, 3, 1, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 5, 4, 1, 4],
    [3, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 1, 5, 1, 1, 1, 1, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 5, 4, 4, 4, 4, 4, 4, 5, 4, 1, 4],
    [3, 3, 3, 3, 1, 3, 3, 3, 1, 1, 1, 5, 5, 5, 1, 1, 1, 4, 2, 4, 4, 4, 4, 4, 2, 4, 4, 4, 2, 4, 4, 5, 4, 4, 4, 4, 4, 4, 5, 4, 1, 4],
    [3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 1, 1, 4, 4, 4, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 5, 1, 1, 4, 4, 1, 1, 5, 1, 1, 4],
    [3, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 4],
    [3, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 4],
    [3, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 4],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 3, 1, 3, 1, 3, 3, 1, 3, 1, 4],
    [3, 1, 3, 3, 3, 3, 3, 1, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 3, 1, 3, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 5, 1, 4, 2, 2, 2, 2, 2, 2, 2, 2, 4],
    [3, 1, 3, 1, 1, 3, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 5, 1, 3, 1, 1, 1, 1, 3, 1, 5, 5, 5, 5, 5, 1, 4, 2, 4, 2, 2, 4, 2, 2, 2, 4],
    [3, 1, 3, 1, 1, 3, 1, 1, 1, 5, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4],
    [3, 1, 3, 1, 1, 3, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 4, 1, 4, 2, 2, 2, 2, 2, 2, 2, 2, 4],
    [3, 1, 3, 1, 1, 3, 1, 1, 1, 5, 1, 3, 3, 3, 3, 1, 1, 5, 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 4, 1, 4, 2, 4, 4, 4, 4, 2, 4, 4, 4],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 4, 1, 4, 1, 4, 2, 2, 2, 2, 2, 2, 2, 2, 4],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 5, 5, 5, 5, 1, 1, 5, 5, 5, 5, 1, 4, 1, 4, 1, 4, 4, 4, 2, 2, 4, 4, 4, 4, 4],
    [3, 3, 3, 3, 3, 3, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 4, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
    [3, 3, 3, 3, 3, 3, 1, 1, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 1, 3, 3, 3, 1, 1, 1, 1, 5, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
    [3, 1, 3, 1, 3, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 3, 3, 3, 1, 3, 3, 3, 1, 1, 1, 1, 5, 1, 4, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 1, 1, 1, 3, 1, 1, 1, 3, 3, 3, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 4],
    [4, 1, 1, 1, 3, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 3, 3, 3, 1, 3, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 4],
    [4, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 3, 3, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 5, 5, 5, 1, 5, 5, 5, 5, 1, 4, 1, 4, 4, 4, 4, 4],
    [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 5, 4, 4, 4, 4, 4, 4, 1, 4],
    [4, 2, 2, 2, 2, 2, 2, 2, 4, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 5, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 2, 4, 4, 2, 2, 2, 2, 4, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 4, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 5, 5, 5, 4],
    [4, 2, 4, 4, 2, 2, 2, 2, 4, 1, 1, 1, 1, 4, 1, 3, 1, 1, 5, 5, 1, 1, 3, 1, 1, 4, 1, 1, 5, 5, 4, 5, 5, 5, 5, 5, 4, 4, 5, 5, 5, 4],
    [4, 2, 2, 2, 2, 2, 2, 2, 4, 1, 1, 4, 1, 4, 1, 1, 1, 1, 5, 5, 1, 1, 3, 1, 1, 4, 1, 1, 5, 5, 5, 5, 4, 4, 5, 5, 4, 4, 5, 5, 5, 4],
    [4, 2, 2, 2, 2, 2, 2, 2, 4, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 5, 5, 5, 5, 4, 4, 5, 5, 4, 4, 5, 5, 5, 4],
    [4, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 1, 1, 3, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 4, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 5, 5, 5, 4],
    [4, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 1, 1, 3, 1, 5, 5, 5, 1, 1, 3, 1, 1, 1, 4, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 5, 5, 5, 4],
    [4, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 1, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 4, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4],
    [4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
]

class BuscaAEstrela extends Component {
    constructor(props) {
        super(props)
        this.state = {
            grid: [],
            mouseIsPressed: false
        }
    }

    componentDidMount() {
        //Cria grid de objetos
        const grid = getInitialGrid()
        this.setState({ grid })
    }

    //Função que ira criar animações no layout
    animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder, numbers, custoPercorrido, custoInicial) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder, numbers, custoPercorrido, custoInicial);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited'
            }, 10 * i);
        }
    }

    //Função que ira criar animações do menor caminho
    animateShortestPath(nodesInShortestPathOrder, numbers, custoPercorrido, custoInicial) {
        let count = 0
        let custo = -custoInicial
        for (let i = 0; i < numbers.length; i++) {
            let number = numbers[i]
            for (let j = 0; j < nodesInShortestPathOrder[i].length; j++) {
                setTimeout(() => {
                    
                    const node = nodesInShortestPathOrder[i][j];
                    custo = custo + custoPercorrido[i][j]
                    document.getElementById("custoPercorrido").innerHTML = "Custo total: " + custo;
                    switch (number) {
                        case 1:
                            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path'
                            break
                        case 2:
                            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-pathGreen'
                            break
                        case 3:
                            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-pathBlue'
                            break
                        case 4:
                            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-pathRed'
                            break
                    }
                }, 50 * (count));
                count++
            }
        }
    }

    visualizeAEstrela() {
        const { grid } = this.state;
        
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        //Node Objetivo
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        //Node amuleto Verde
        const GreenNode = grid[GREEN_AMULET_NODE_ROW][GREEN_AMULET_NODE_COL];
        //Node amuleto Azul
        const BlueNode = grid[BLUE_AMULET_NODE_ROW][BLUE_AMULET_NODE_COL];
        //Node amuleto Vermelho
        const RedNode = grid[RED_AMULET_NODE_ROW][RED_AMULET_NODE_COL];
        // Nós visitados
        let visitedNodesInOrder = [];
        //Recebe o menor caminho achado na busca
        let nodesInShortestPathOrder = [];

        // Vetor de cores
        let colorArray = [];
        // Custo de cada caminho
        let costs = [];
        // Ordem dos nós objetivos
        let order;
        let custo = 0
        let custoPercorrido = []
        costs.push(startNode.heuristicaGreen + GreenNode.heuristicaRed + RedNode.heuristicaBlue + BlueNode.heuristica);
        costs.push(startNode.heuristicaGreen + GreenNode.heuristicaBlue + BlueNode.heuristicaRed + RedNode.heuristica);
        costs.push(startNode.heuristicaRed + RedNode.heuristicaGreen + GreenNode.heuristicaBlue + BlueNode.heuristica);
        costs.push(startNode.heuristicaRed + RedNode.heuristicaBlue + BlueNode.heuristicaGreen + GreenNode.heuristica);
        costs.push(startNode.heuristicaBlue + BlueNode.heuristicaRed + RedNode.heuristicaGreen + GreenNode.heuristica);
        costs.push(startNode.heuristicaBlue + BlueNode.heuristicaGreen + GreenNode.heuristicaRed + RedNode.heuristica);

        // Indice do menor custo
        const i = costs.indexOf(Math.min.apply(null, costs));
        console.log(costs);
        switch (i) {
            case 0: order = [startNode, GreenNode, RedNode, BlueNode, finishNode]; colorArray = [2, 4, 3, 1]; break;
            case 1: order = [startNode, GreenNode, BlueNode, RedNode, finishNode]; colorArray = [2, 3, 4, 1]; break;
            case 2: order = [startNode, RedNode, GreenNode, BlueNode, finishNode]; colorArray = [4, 2, 3, 1]; break;
            case 3: order = [startNode, RedNode, BlueNode, GreenNode, finishNode]; colorArray = [4, 3, 2, 1]; break;
            case 4: order = [startNode, BlueNode, RedNode, GreenNode, finishNode]; colorArray = [3, 4, 2, 1]; break;
            case 5: order = [startNode, BlueNode, GreenNode, RedNode, finishNode]; colorArray = [3, 2, 4, 1]; break;
        }
        let aux = 0
        while (order.length > 1) {

            const start = order.shift();
            const dest = order[0];
            let finish;

            switch (dest) {
                case GreenNode: finish = 'green'; break;
                case RedNode: finish = 'red'; break;
                case BlueNode: finish = 'blue'; break;
                case finishNode: finish = 'finish'; break;
            }

            const [visited, shortestPath, custoAux, custoPercorridoAux] = AEstrela(grid, start, dest, finish);
            custo = custo + custoAux
            custoPercorrido.push(custoPercorridoAux)
            for (const v of visited) {
                visitedNodesInOrder.push(v);
            }
                    
            nodesInShortestPathOrder.push(shortestPath);
            let total = 0
            total = custoPercorridoAux.reduce((total, currentElement) => total + currentElement)

            switch (colorArray[aux]) {
                case 1:
                    document.getElementById("custoPercorridoLaranja").innerHTML = "Custo do caminho Laranja: " + total;
                    break
                case 2:
                    document.getElementById("custoPercorridoVerde").innerHTML = "Custo do caminho Verde: " + (total - startNode.custo);
                    break
                case 3:
                    document.getElementById("custoPercorridoAzul").innerHTML = "Custo do caminho Azul: " + total;
                    break
                case 4:
                    document.getElementById("custoPercorridoVermelho").innerHTML = "Custo do caminho Vermelho: " + total;
                    break
            }
            aux++

        }

        document.getElementById("custoPercorrido").innerHTML = "Custo total: ";

        this.animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder, colorArray, custoPercorrido, startNode.custo);
    }

    alterarPosicao() {

        // No inicial
        const aux1 = START_NODE_ROW
        const aux2 = START_NODE_COL
        let select = document.getElementById('linhaInicio');
        let valueLinha = select.options[select.selectedIndex].value;
        START_NODE_ROW = parseInt(valueLinha)
        select = document.getElementById('colunaInicio');
        valueLinha = select.options[select.selectedIndex].value;
        START_NODE_COL = parseInt(valueLinha)

        // No final
        select = document.getElementById('linhaFinal');
        valueLinha = select.options[select.selectedIndex].value;
        FINISH_NODE_ROW = parseInt(valueLinha)
        select = document.getElementById('colunaFinal');
        valueLinha = select.options[select.selectedIndex].value;
        FINISH_NODE_COL = parseInt(valueLinha)

        //Cria grid de objetos
        const grid = getInitialGrid()
        this.setState({ grid })
    }

    //View principal
    render() {
        const { grid, mouseIsPressed } = this.state;
        return (
            <>
                <button type="button" class="btn btn-primary" onClick={() => this.visualizeAEstrela()}>
                    Visualize o algoritmo A*
                </button>

                <button type="button" class="btn btn-primary" onClick={() => window.location.reload()}>
                    Limpar campo
                </button>
        
                <br />
                <br />
                <label>Posição Inicial (onde o link começa)</label>

                <div class="row">
                    <div class="col">
                    <label class="lbl" htmlFor="linhaInicio">Linha: </label>
                    <select class="sel" id="linhaInicio">
                        <option value="0">1</option>
                        <option value="1">2</option>
                        <option value="2">3</option>
                        <option value="3">4</option>
                        <option value="4">5</option>
                        <option value="5">6</option>
                        <option value="6">7</option>
                        <option value="7">8</option>
                        <option value="8">9</option>
                        <option value="9">10</option>
                        <option value="10">11</option>
                        <option value="11">12</option>
                        <option value="12">13</option>
                        <option value="13">14</option>
                        <option value="14">15</option>
                        <option value="15">16</option>
                        <option value="16">17</option>
                        <option value="17">18</option>
                        <option value="18">19</option>
                        <option value="19">20</option>
                        <option value="20">21</option>
                        <option value="21">22</option>
                        <option value="22">23</option>
                        <option value="23">24</option>
                        <option value="24">25</option>
                        <option value="25">26</option>
                        <option value="26">27</option>
                        <option value="27" selected>28</option>
                        <option value="28">29</option>
                        <option value="29">30</option>
                        <option value="30">31</option>
                        <option value="31">32</option>
                        <option value="32">33</option>
                        <option value="33">34</option>
                        <option value="34">35</option>
                        <option value="35">36</option>
                        <option value="36">37</option>
                        <option value="37">38</option>
                        <option value="38">39</option>
                        <option value="39">40</option>
                        <option value="40">41</option>
                        <option value="41">42</option>
                    </select>

                    <label class="lbl" htmlFor="colunaInicio">Coluna: </label>
                        <select class="sel" id="colunaInicio">
                            <option value="0">1</option>
                            <option value="1">2</option>
                            <option value="2">3</option>
                            <option value="3">4</option>
                            <option value="4">5</option>
                            <option value="5">6</option>
                            <option value="6">7</option>
                            <option value="7">8</option>
                            <option value="8">9</option>
                            <option value="9">10</option>
                            <option value="10">11</option>
                            <option value="11">12</option>
                            <option value="12">13</option>
                            <option value="13">14</option>
                            <option value="14">15</option>
                            <option value="15">16</option>
                            <option value="16">17</option>
                            <option value="17">18</option>
                            <option value="18">19</option>
                            <option value="19">20</option>
                            <option value="20">21</option>
                            <option value="21">22</option>
                            <option value="22">23</option>
                            <option value="23" selected>24</option>
                            <option value="24">25</option>
                            <option value="25">26</option>
                            <option value="26">27</option>
                            <option value="27">28</option>
                            <option value="28">29</option>
                            <option value="29">30</option>
                            <option value="30">31</option>
                            <option value="31">32</option>
                            <option value="32">33</option>
                            <option value="33">34</option>
                            <option value="34">35</option>
                            <option value="35">36</option>
                            <option value="36">37</option>
                            <option value="37">38</option>
                            <option value="38">39</option>
                            <option value="39">40</option>
                            <option value="40">41</option>
                            <option value="41">42</option>
                        </select>

                    </div>
                </div>    

                <label>Posição Final (onde está a Master Sword)</label>

                <div class="row">
                    <div class="col">
                        <label class="lbl" htmlFor="linhaFinal">Linha: </label>
                            <select class="sel" id="linhaFinal">
                                <option value="0">1</option>
                                <option value="1" selected>2</option>
                                <option value="2">3</option>
                                <option value="3">4</option>
                                <option value="4">5</option>
                                <option value="5">6</option>
                                <option value="6">7</option>
                                <option value="7">8</option>
                                <option value="8">9</option>
                                <option value="9">10</option>
                                <option value="10">11</option>
                                <option value="11">12</option>
                                <option value="12">13</option>
                                <option value="13">14</option>
                                <option value="14">15</option>
                                <option value="15">16</option>
                                <option value="16">17</option>
                                <option value="17">18</option>
                                <option value="18">19</option>
                                <option value="19">20</option>
                                <option value="20">21</option>
                                <option value="21">22</option>
                                <option value="22">23</option>
                                <option value="23">24</option>
                                <option value="24">25</option>
                                <option value="25">26</option>
                                <option value="26">27</option>
                                <option value="27">28</option>
                                <option value="28">29</option>
                                <option value="29">30</option>
                                <option value="30">31</option>
                                <option value="31">32</option>
                                <option value="32">33</option>
                                <option value="33">34</option>
                                <option value="34">35</option>
                                <option value="35">36</option>
                                <option value="36">37</option>
                                <option value="37">38</option>
                                <option value="38">39</option>
                                <option value="39">40</option>
                                <option value="40">41</option>
                                <option value="41">42</option>
                            </select>                
                        <label class="lbl" htmlFor="colunaFinal">Coluna: </label>
                        <select class="sel" id="colunaFinal">
                            <option value="0">1</option>
                            <option value="1">2</option>
                            <option value="2" selected>3</option>
                            <option value="3">4</option>
                            <option value="4">5</option>
                            <option value="5">6</option>
                            <option value="6">7</option>
                            <option value="7">8</option>
                            <option value="8">9</option>
                            <option value="9">10</option>
                            <option value="10">11</option>
                            <option value="11">12</option>
                            <option value="12">13</option>
                            <option value="13">14</option>
                            <option value="14">15</option>
                            <option value="15">16</option>
                            <option value="16">17</option>
                            <option value="17">18</option>
                            <option value="18">19</option>
                            <option value="19">20</option>
                            <option value="20">21</option>
                            <option value="21">22</option>
                            <option value="22">23</option>
                            <option value="23">24</option>
                            <option value="24">25</option>
                            <option value="25">26</option>
                            <option value="26">27</option>
                            <option value="27">28</option>
                            <option value="28">29</option>
                            <option value="29">30</option>
                            <option value="30">31</option>
                            <option value="31">32</option>
                            <option value="32">33</option>
                            <option value="33">34</option>
                            <option value="34">35</option>
                            <option value="35">36</option>
                            <option value="36">37</option>
                            <option value="37">38</option>
                            <option value="38">39</option>
                            <option value="39">40</option>
                            <option value="40">41</option>
                            <option value="41">42</option>
                        </select>
                    </div>
                </div>

                <button class="btn btn-primary" onClick={() => this.alterarPosicao()}>
                    Alterar posições
                </button>
                <br />
                <br />
                <label>Legenda:</label>
                <br />
                
                <div className="Inicio"></div> <label>Link</label> <br />
                <div className="Fim"></div> <label>Master Sword</label> <br />
                <div className="AmuletoVerde"></div> <label>Amuleto Verde</label> <br />
                <div className="AmuletoAzul"></div> <label>Amuleto Azul</label> <br />
                <div className="AmuletoVermelho"></div> <label>Amuleto Vermelho</label> <br />
                <label id="custoPercorridoAzul"></label>
                <br />
                <label id="custoPercorridoVerde"></label>
                <br />
                <label id="custoPercorridoVermelho"></label>
                <br />
                <label id="custoPercorridoLaranja"></label>
                <br />
                <label id="custoPercorrido"></label>
                <br />
                
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const { row, col, isFinish, isStart, heuristica, custo, isGreenAmulet, isRedAmulet, isBlueAmulet, campo } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            col={col}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                            isGreenAmulet={isGreenAmulet}
                                            isRedAmulet={isRedAmulet}
                                            isBlueAmulet={isBlueAmulet}
                                            campo={campo}
                                            heuristica={heuristica}
                                            custo={custo}
                                            mouseIsPressed={mouseIsPressed}
                                            //Remover
                                            onMouseUp={() => this.handleMouseUp()}
                                            row={row}></Node>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        )
    }

}

//Cria a matriz de objetos, dando a cada objeto seu valor de heuristica e custo, alem do posição de linha e coluna de cada node na matriz
const getInitialGrid = () => {
    const grid = []
    //matriz 42x42
    for (let row = 0; row < 42; row++) {
        const currentRow = []
        for (let col = 0; col < 42; col++) {
            //Chama funções necessarias para criar cada node
            currentRow.push(createNode(col, row,
                heuristica(row, col, FINISH_NODE_ROW, FINISH_NODE_COL),
                calculaCusto(row, col),
                heuristica(row, col, GREEN_AMULET_NODE_ROW, GREEN_AMULET_NODE_COL),
                heuristica(row, col, RED_AMULET_NODE_ROW, RED_AMULET_NODE_COL),
                heuristica(row, col, BLUE_AMULET_NODE_ROW, BLUE_AMULET_NODE_COL),
                matriz[row][col]))
        }
        grid.push(currentRow);
    }
    return grid;
}

export function calculaCusto(row, col) {
    //Calculo do custo com base nos numeros da matriz e o valor de custo de cada bioma
    if (matriz[row][col] === 1) {
        return grama
    } else if (matriz[row][col] === 2) {
        return areia
    } else if (matriz[row][col] === 3) {
        return floresta
    } else if (matriz[row][col] === 4) {
        return montanha
    } else if (matriz[row][col] === 5) {
        return agua
    } else {
        return 999
    }
}

const heuristica = (row, col, finish_row, finish_col) => {
    return Math.sqrt(Math.pow(finish_row - row, 2) + Math.pow((finish_col - col), 2))*19;
}

//Cria o node (Objeto) com seus valores respectivos
export function createNode(col, row, heuristica, custo, heuristicaGreen, heuristicaRed, heuristicaBlue, campo) {
    return {
        col,
        row,
        heuristica,
        heuristicaGreen,
        heuristicaRed,
        heuristicaBlue,
        custo,
        campo: campo,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        isGreenAmulet: row === GREEN_AMULET_NODE_ROW && col === GREEN_AMULET_NODE_COL,
        isRedAmulet: row === RED_AMULET_NODE_ROW && col === RED_AMULET_NODE_COL,
        isBlueAmulet: row === BLUE_AMULET_NODE_ROW && col === BLUE_AMULET_NODE_COL,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
    }
}

export default BuscaAEstrela