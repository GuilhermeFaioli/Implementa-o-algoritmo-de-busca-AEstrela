import React, { Component } from 'react'

import './Node.css'

export default class Node extends Component {
    
    render(){
        const {
            col,
            isFinish,
            isStart,
            onMouseUp,
            row,
        } = this.props
        const extraClassName = isFinish
            ? 'node-finish'
            : isStart
            ? 'node-start'
            : ''
        //Cria o grid com base nos objetos recebidos
        return (
            <div
                id={`node-${row}-${col}`}
                className={`node ${extraClassName}`}
                //Inutil, remover
                onMouseUp={() => onMouseUp()}></div>
        )
    }
}