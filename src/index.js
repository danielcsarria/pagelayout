import React from 'react';
import ReactDOM from 'react-dom';
import data from './data/juan.json';
import styled from 'styled-components';
import Column from './ItemDrag/Column';
import Column2 from './ColumnDrag/Column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

class ItemDrag extends React.Component {

    
    render(){
        return(
            
            data.modules.map((modules, columnIndex) => {
                // console.log(modules, columnIndex);
                return <Column key={columnIndex} columnIndex={columnIndex} modules={modules} />
            })
           
        )
    }

}

const ColContainer = styled.div`

`;

class ColumnDrag extends React.Component {

    onDragEnd = result => {
        //here goes this code
    }

    render(){
        return(
            
            <DragDropContext onDragEnd={this.onDragEnd} >
                <Droppable droppableId="all-columns" direction="vertical" type="column">
                    {(provided) => (
                        <ColContainer
                            {...provided.droppableProps}
                            ref = {provided.innerRef}
                        >
                            {data.modules.map((modules, columnIndex) => {
                                return <Column2 key={columnIndex} columnIndex={columnIndex} modules={modules} />
                            })}
                            {provided.placeholder}
                        </ColContainer>
                    )}
                </Droppable>
            </DragDropContext>
           
        )
    }

}

ReactDOM.render(<ColumnDrag />, document.getElementById('column-drag'));
ReactDOM.render(<ItemDrag />, document.getElementById('item-drag'));
