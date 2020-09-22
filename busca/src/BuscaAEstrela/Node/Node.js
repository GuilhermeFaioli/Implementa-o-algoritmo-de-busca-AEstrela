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
            isGreenAmulet,
            isRedAmulet,
            isBlueAmulet,
            campo,
        } = this.props
        let extraClassName = isFinish
            ? 'node-finish'
                : isStart
                ? 'node-start'
                    : isGreenAmulet
                    ? 'green-node'
                        : isBlueAmulet
                        ? 'blue-node'
                            : isRedAmulet
                            ? 'red-node'
                                : campo === 1 ? 'campo-grama'
                                    : campo === 2 ? 'campo-areia'
                                        : campo === 3 ? 'campo-floresta'
                                            : campo === 4 ? 'campo-montanha'
                                                : campo === 5 ? 'campo-agua'
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