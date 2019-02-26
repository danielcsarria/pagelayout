import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const ItemContainer = styled.div`
    margin: 8px;
    border: 1px solid green;
    border-radius: 2px;
    background-white;
`;

const Items = styled.div`
    padding:8px;
    min-height: 20px;
    background-color: white;
`;

export default class Item extends React.Component{


    render(){

        const draggableId = this.props.item.id;
        const index = this.props.itemIndex;

        return(
            <Draggable draggableId={draggableId} index={index}>
                {(provided) => (
                    <ItemContainer
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref = {provided.innerRef}
                    >
                        <Items>
                            {this.props.item.headline} ==> {this.props.columnIndex}, {this.props.moduleIndex}, {this.props.itemIndex} 
                        </Items>
                    </ItemContainer>
                )}
            </Draggable>
        )
    }
}