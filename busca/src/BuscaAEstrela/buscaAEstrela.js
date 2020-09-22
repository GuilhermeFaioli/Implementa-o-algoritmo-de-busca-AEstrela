import React, { Component } from 'react'
import Node from "./Node/Node"
import './buscaAEstrela.css'
import { AEstrela, getNodesInShortestPathOrder, custoFinal } from '../algoritmo/AEstrela';

//Valores referentes a linha e coluna inicial e final, valores de custo por bioma do campo, e a matriz dando numeros referentes ao biomas
const START_NODE_ROW = 27;
const START_NODE_COL = 23;
const GREEN_AMULET_NODE_ROW = 32;
const GREEN_AMULET_NODE_COL = 5;
const RED_AMULET_NODE_ROW = 1;
const RED_AMULET_NODE_COL = 24;
const BLUE_AMULET_NODE_ROW = 17;
const BLUE_AMULET_NODE_COL = 39;
const FINISH_NODE_ROW = 1;
const FINISH_NODE_COL = 2;
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

    //Função inutil, remover
    handleMouseUp() {
        this.setState({ mouseIsPressed: false });
    }

    //Função que ira criar animações no layout
    animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
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
    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-shortest-path'
            }, 50 * i);
        }
    }

    visualizeAEstrela() {
        const { grid } = this.state;
        //Node inicial
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        //Node Objetivo
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        //Node amuleto Verde
        const GreenNode = grid[GREEN_AMULET_NODE_ROW][GREEN_AMULET_NODE_COL];
        //Node amuleto Azul
        const BlueNode = grid[BLUE_AMULET_NODE_ROW][BLUE_AMULET_NODE_COL];
        //Node amuleto Vermelho
        const RedNode = grid[RED_AMULET_NODE_ROW][RED_AMULET_NODE_COL];
        let visitedNodesInOrder
        //Recebe o menor caminho achado na busca
        let nodesInShortestPathOrder
        //Função que ira criar animações no layout
        //Inicia a busca a* e recebe os nodes visitados(todos nodes expandidos) em ordem ate o objetivo
        if(heuristicaGreen(START_NODE_ROW, START_NODE_COL) < heuristicaBlue(START_NODE_ROW, START_NODE_COL) && heuristicaGreen(START_NODE_ROW, START_NODE_COL) < heuristicaRed(START_NODE_ROW, START_NODE_COL)) {
            visitedNodesInOrder = AEstrela(grid, startNode, GreenNode)
            nodesInShortestPathOrder = getNodesInShortestPathOrder(GreenNode);
            this.animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder);
            if(heuristicaBlue(GREEN_AMULET_NODE_ROW, GREEN_AMULET_NODE_COL) < heuristicaRed(GREEN_AMULET_NODE_ROW, GREEN_AMULET_NODE_COL)) {
                visitedNodesInOrder = AEstrela(grid, GreenNode, BlueNode)
                nodesInShortestPathOrder = getNodesInShortestPathOrder(BlueNode);
                this.animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder);
                visitedNodesInOrder = AEstrela(grid, BlueNode, RedNode)
                nodesInShortestPathOrder = getNodesInShortestPathOrder(RedNode);
                this.animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder);
                visitedNodesInOrder = AEstrela(grid, RedNode, finishNode)
                nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
                this.animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder);

            } else {
                visitedNodesInOrder = AEstrela(grid, GreenNode, RedNode)
                nodesInShortestPathOrder = getNodesInShortestPathOrder(RedNode);
                this.animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder);
                visitedNodesInOrder = AEstrela(grid, RedNode, BlueNode)
                nodesInShortestPathOrder = getNodesInShortestPathOrder(BlueNode);
                this.animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder);
                visitedNodesInOrder = AEstrela(grid, BlueNode, finishNode)
                nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
                this.animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder);
            }
        } else if(heuristicaBlue(START_NODE_ROW, START_NODE_COL) < heuristicaGreen(START_NODE_ROW, START_NODE_COL) && heuristicaBlue(START_NODE_ROW, START_NODE_COL) < heuristicaRed(START_NODE_ROW, START_NODE_COL)){
            visitedNodesInOrder = AEstrela(grid, startNode, BlueNode)
            nodesInShortestPathOrder = getNodesInShortestPathOrder(BlueNode);
            this.animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder);
            if(heuristicaGreen(BLUE_AMULET_NODE_ROW, BLUE_AMULET_NODE_COL) < heuristicaRed(BLUE_AMULET_NODE_ROW, BLUE_AMULET_NODE_COL)) {
                visitedNodesInOrder = AEstrela(grid, BlueNode, GreenNode)
                nodesInShortestPathOrder = getNodesInShortestPathOrder(GreenNode);
                this.animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder);
                visitedNodesInOrder = AEstrela(grid, GreenNode, RedNode)
                nodesInShortestPathOrder = getNodesInShortestPathOrder(RedNode);
                this.animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder);
                visitedNodesInOrder = AEstrela(grid, RedNode, finishNode)
                nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
                this.animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder);

            } else {
                visitedNodesInOrder = AEstrela(grid, BlueNode, RedNode)
                nodesInShortestPathOrder = getNodesInShortestPathOrder(RedNode);
                this.animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder);
                visitedNodesInOrder = AEstrela(grid, RedNode, GreenNode)
                nodesInShortestPathOrder = getNodesInShortestPathOrder(GreenNode);
                this.animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder);
                visitedNodesInOrder = AEstrela(grid, GreenNode, finishNode)
                nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
                this.animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder);
            }
        } else if(heuristicaRed(START_NODE_ROW, START_NODE_COL) < heuristicaGreen(START_NODE_ROW, START_NODE_COL) && heuristicaRed(START_NODE_ROW, START_NODE_COL) < heuristicaBlue(START_NODE_ROW, START_NODE_COL)){
            visitedNodesInOrder = AEstrela(grid, startNode, RedNode)
            nodesInShortestPathOrder = getNodesInShortestPathOrder(RedNode);
            this.animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder);
            if(heuristicaGreen(RED_AMULET_NODE_ROW, RED_AMULET_NODE_COL) < heuristicaBlue(RED_AMULET_NODE_ROW, RED_AMULET_NODE_COL)) {
                visitedNodesInOrder = AEstrela(grid, RedNode, GreenNode)
                nodesInShortestPathOrder = getNodesInShortestPathOrder(GreenNode);
                this.animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder);
                visitedNodesInOrder = AEstrela(grid, GreenNode, BlueNode)
                nodesInShortestPathOrder = getNodesInShortestPathOrder(BlueNode);
                this.animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder);
                visitedNodesInOrder = AEstrela(grid, BlueNode, finishNode)
                nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
                this.animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder);

            } else {
                visitedNodesInOrder = AEstrela(grid, RedNode, BlueNode)
                nodesInShortestPathOrder = getNodesInShortestPathOrder(BlueNode);
                this.animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder);
                visitedNodesInOrder = AEstrela(grid, BlueNode, GreenNode)
                nodesInShortestPathOrder = getNodesInShortestPathOrder(GreenNode);
                this.animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder);
                visitedNodesInOrder = AEstrela(grid, GreenNode, finishNode)
                nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
                this.animateAEstrela(visitedNodesInOrder, nodesInShortestPathOrder);
            }
        }
        
        
        document.getElementById("custoTotalTxt").innerHTML="Custo total: "+custoFinal(finishNode)
    }

    //View principal
    render() {
        const { grid, mouseIsPressed } = this.state;
        return (
            <>
                <button onClick={() => this.visualizeAEstrela()}>
                    Visualize o algoritmo A*
                </button>
                <br />
                <text id="custoTotalTxt"></text>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const { row, col, isFinish, isStart, heuristica, custo, isGreenAmulet, isRedAmulet, isBlueAmulet, campo} = node;
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
            currentRow.push(createNode(col, row, heuristica(row, col), calculaCusto(row, col), heuristicaGreen(row, col), heuristicaRed(row, col), heuristicaBlue(row, col)))
        }
        grid.push(currentRow);
    }
    return grid;
}

const calculaCusto = (row, col) => {
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

const heuristica = (row, col) => {
    let x0, y0, x1, y1, dx, dy, m, h = 0;

    // Ponto de partida
    x0 = col;
    y0 = row;

    // Ponto de destino
    x1 = FINISH_NODE_COL;
    y1 = FINISH_NODE_ROW;

    dx = x1 - x0;
    dy = y1 - y0;

    // alpha: estimativa do custo de cada estado
    // 11-15: resultado bom
    let alpha = 15;

    // Iterar sobre linhas
    if (Math.abs(dx) < Math.abs(dy)) {

        // Linha passa a ser eixo X
        x0 = row;
        y0 = col;

        // Linha passa a ser eixo X
        x1 = FINISH_NODE_ROW;
        y1 = FINISH_NODE_COL;

        dx = x1 - x0;
        dy = y1 - y0;

        // pontos na mesma linha
        if (dx == 0) {
            if (dy > 0) {
                for (let y = y0; y < y1; y++) {
                    h += alpha;
                }
            } else {
                for (let y = y1; y < y0; y++) {
                    h += alpha;
                }
            }
            // pontos na mesma coluna
        } else if (dy == 0) {
            if (dx > 0) {
                for (let x = x0; x < x1; x++) {
                    h += alpha;
                }
            } else {
                for (let x = x1; x < x0; x++) {
                    h += alpha;
                }
            }
        } else {
            // Pontos nao estao nem na mesma linha e nem na mesma coluna
            if (dx < 0) {
                x0 = FINISH_NODE_ROW;
                y0 = FINISH_NODE_COL;

                x1 = row;
                y1 = col;
            }

            m = (y1 - y0) / (x1 - x0);
            let y = y0;
            for (let x = x0; x < x1; x++) {
                h += alpha;
                y += m;
            }
        }
    } else {
        // pontos na mesma coluna
        if (dx == 0) {
            if (dy > 0) {
                for (let y = y0; y < y1; y++) {
                    h += alpha;
                }
            } else {
                for (let y = y1; y < y0; y++) {
                    h += alpha;
                }
            }
            // pontos na mesma linha
        } else if (dy == 0) {
            if (dx > 0) {
                for (let x = x0; x < x1; x++) {
                    h += alpha;
                }
            } else {
                for (let x = x1; x < x0; x++) {
                    h += alpha;
                }
            }
        } else {

            if (dx < 0) {
                x0 = FINISH_NODE_COL;
                y0 = FINISH_NODE_ROW;

                x1 = col;
                y1 = row;
            }

            m = (y1 - y0) / (x1 - x0);
            let y = y0;
            for (let x = x0; x < x1; x++) {
                h += alpha;
                y += m;
            }
        }
    }

    return h;
}

const heuristicaGreen = (row, col) => {
    let x0, y0, x1, y1, dx, dy, m, h = 0;

    // Ponto de partida
    x0 = col;
    y0 = row;

    // Ponto de destino
    x1 = GREEN_AMULET_NODE_COL;
    y1 = GREEN_AMULET_NODE_ROW;

    dx = x1 - x0;
    dy = y1 - y0;

    // alpha: estimativa do custo de cada estado
    // 11-15: resultado bom
    let alpha = 15;

    // Iterar sobre linhas
    if (Math.abs(dx) < Math.abs(dy)) {

        // Linha passa a ser eixo X
        x0 = row;
        y0 = col;

        // Linha passa a ser eixo X
        x1 = GREEN_AMULET_NODE_ROW;
        y1 = GREEN_AMULET_NODE_COL;

        dx = x1 - x0;
        dy = y1 - y0;

        // pontos na mesma linha
        if (dx == 0) {
            if (dy > 0) {
                for (let y = y0; y < y1; y++) {
                    h += alpha;
                }
            } else {
                for (let y = y1; y < y0; y++) {
                    h += alpha;
                }
            }
            // pontos na mesma coluna
        } else if (dy == 0) {
            if (dx > 0) {
                for (let x = x0; x < x1; x++) {
                    h += alpha;
                }
            } else {
                for (let x = x1; x < x0; x++) {
                    h += alpha;
                }
            }
        } else {
            // Pontos nao estao nem na mesma linha e nem na mesma coluna
            if (dx < 0) {
                x0 = GREEN_AMULET_NODE_ROW;
                y0 = GREEN_AMULET_NODE_COL;

                x1 = row;
                y1 = col;
            }

            m = (y1 - y0) / (x1 - x0);
            let y = y0;
            for (let x = x0; x < x1; x++) {
                h += alpha;
                y += m;
            }
        }
    } else {
        // pontos na mesma coluna
        if (dx == 0) {
            if (dy > 0) {
                for (let y = y0; y < y1; y++) {
                    h += alpha;
                }
            } else {
                for (let y = y1; y < y0; y++) {
                    h += alpha;
                }
            }
            // pontos na mesma linha
        } else if (dy == 0) {
            if (dx > 0) {
                for (let x = x0; x < x1; x++) {
                    h += alpha;
                }
            } else {
                for (let x = x1; x < x0; x++) {
                    h += alpha;
                }
            }
        } else {

            if (dx < 0) {
                x0 = GREEN_AMULET_NODE_COL;
                y0 = GREEN_AMULET_NODE_ROW;

                x1 = col;
                y1 = row;
            }

            m = (y1 - y0) / (x1 - x0);
            let y = y0;
            for (let x = x0; x < x1; x++) {
                h += alpha;
                y += m;
            }
        }
    }

    return h;
}

const heuristicaRed = (row, col) => {
    let x0, y0, x1, y1, dx, dy, m, h = 0;

    // Ponto de partida
    x0 = col;
    y0 = row;

    // Ponto de destino
    x1 = RED_AMULET_NODE_COL;
    y1 = RED_AMULET_NODE_ROW;

    dx = x1 - x0;
    dy = y1 - y0;

    // alpha: estimativa do custo de cada estado
    // 11-15: resultado bom
    let alpha = 15;

    // Iterar sobre linhas
    if (Math.abs(dx) < Math.abs(dy)) {

        // Linha passa a ser eixo X
        x0 = row;
        y0 = col;

        // Linha passa a ser eixo X
        x1 = RED_AMULET_NODE_ROW;
        y1 = RED_AMULET_NODE_COL;

        dx = x1 - x0;
        dy = y1 - y0;

        // pontos na mesma linha
        if (dx == 0) {
            if (dy > 0) {
                for (let y = y0; y < y1; y++) {
                    h += alpha;
                }
            } else {
                for (let y = y1; y < y0; y++) {
                    h += alpha;
                }
            }
            // pontos na mesma coluna
        } else if (dy == 0) {
            if (dx > 0) {
                for (let x = x0; x < x1; x++) {
                    h += alpha;
                }
            } else {
                for (let x = x1; x < x0; x++) {
                    h += alpha;
                }
            }
        } else {
            // Pontos nao estao nem na mesma linha e nem na mesma coluna
            if (dx < 0) {
                x0 = RED_AMULET_NODE_ROW;
                y0 = RED_AMULET_NODE_COL;

                x1 = row;
                y1 = col;
            }

            m = (y1 - y0) / (x1 - x0);
            let y = y0;
            for (let x = x0; x < x1; x++) {
                h += alpha;
                y += m;
            }
        }
    } else {
        // pontos na mesma coluna
        if (dx == 0) {
            if (dy > 0) {
                for (let y = y0; y < y1; y++) {
                    h += alpha;
                }
            } else {
                for (let y = y1; y < y0; y++) {
                    h += alpha;
                }
            }
            // pontos na mesma linha
        } else if (dy == 0) {
            if (dx > 0) {
                for (let x = x0; x < x1; x++) {
                    h += alpha;
                }
            } else {
                for (let x = x1; x < x0; x++) {
                    h += alpha;
                }
            }
        } else {

            if (dx < 0) {
                x0 = RED_AMULET_NODE_COL;
                y0 = RED_AMULET_NODE_ROW;

                x1 = col;
                y1 = row;
            }

            m = (y1 - y0) / (x1 - x0);
            let y = y0;
            for (let x = x0; x < x1; x++) {
                h += alpha;
                y += m;
            }
        }
    }

    return h;
}

const heuristicaBlue = (row, col) => {
    let x0, y0, x1, y1, dx, dy, m, h = 0;

    // Ponto de partida
    x0 = col;
    y0 = row;

    // Ponto de destino
    x1 = BLUE_AMULET_NODE_COL;
    y1 = BLUE_AMULET_NODE_ROW;

    dx = x1 - x0;
    dy = y1 - y0;

    // alpha: estimativa do custo de cada estado
    // 11-15: resultado bom
    let alpha = 15;

    // Iterar sobre linhas
    if (Math.abs(dx) < Math.abs(dy)) {

        // Linha passa a ser eixo X
        x0 = row;
        y0 = col;

        // Linha passa a ser eixo X
        x1 = BLUE_AMULET_NODE_ROW;
        y1 = BLUE_AMULET_NODE_COL;

        dx = x1 - x0;
        dy = y1 - y0;

        // pontos na mesma linha
        if (dx == 0) {
            if (dy > 0) {
                for (let y = y0; y < y1; y++) {
                    h += alpha;
                }
            } else {
                for (let y = y1; y < y0; y++) {
                    h += alpha;
                }
            }
            // pontos na mesma coluna
        } else if (dy == 0) {
            if (dx > 0) {
                for (let x = x0; x < x1; x++) {
                    h += alpha;
                }
            } else {
                for (let x = x1; x < x0; x++) {
                    h += alpha;
                }
            }
        } else {
            // Pontos nao estao nem na mesma linha e nem na mesma coluna
            if (dx < 0) {
                x0 = BLUE_AMULET_NODE_ROW;
                y0 = BLUE_AMULET_NODE_COL;

                x1 = row;
                y1 = col;
            }

            m = (y1 - y0) / (x1 - x0);
            let y = y0;
            for (let x = x0; x < x1; x++) {
                h += alpha;
                y += m;
            }
        }
    } else {
        // pontos na mesma coluna
        if (dx == 0) {
            if (dy > 0) {
                for (let y = y0; y < y1; y++) {
                    h += alpha;
                }
            } else {
                for (let y = y1; y < y0; y++) {
                    h += alpha;
                }
            }
            // pontos na mesma linha
        } else if (dy == 0) {
            if (dx > 0) {
                for (let x = x0; x < x1; x++) {
                    h += alpha;
                }
            } else {
                for (let x = x1; x < x0; x++) {
                    h += alpha;
                }
            }
        } else {

            if (dx < 0) {
                x0 = BLUE_AMULET_NODE_COL;
                y0 = BLUE_AMULET_NODE_ROW;

                x1 = col;
                y1 = row;
            }

            m = (y1 - y0) / (x1 - x0);
            let y = y0;
            for (let x = x0; x < x1; x++) {
                h += alpha;
                y += m;
            }
        }
    }

    return h;
}

//Cria o node (Objeto) com seus valores respectivos
const createNode = (col, row, heuristica, custo, heuristicaGreen, heuristicaRed, heuristicaBlue) => {
    return {
        col,
        row,
        heuristica,
        heuristicaGreen,
        heuristicaRed,
        heuristicaBlue,
        custo,
        campo: matriz[row][col],
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