import React from 'react';
import styled from 'styled-components';
import Item2 from './Items';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const ModuleContainer = styled.div`
    margin: 8px;
    border: 1px solid red;
    border-radius: 2px;
    background-color:white;
`;

const ItemContainer = styled.div`
    height: inherit;
    padding: 8px;
`;

const ModuleTitle = styled.h4`
    padding: 8px;
`;



// const ModuleList = styled.div`
//     padding: 8px;
// `;

export default class Module2 extends React.Component{
    render(){
        const columnIndex = this.props.columnIndex;   
        const moduleKey = this.props.moduleKey;
        const moduleIndex = this.props.moduleIndex;
        const modules = this.props.modules;
 
        const module = modules[moduleKey];
        const type = module.type;
        const items = module.items;

        const droppableId = String(moduleIndex);

        return(
            <Draggable draggableId={moduleKey} index={moduleIndex}>
                {(provided) => (
                    <ModuleContainer
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref = {provided.innerRef}
                    >
                        <ModuleTitle>
                            Module:{moduleKey} {type} ==> {columnIndex}, {moduleIndex} 
                        </ModuleTitle>
                            <ItemContainer>
                                {
                                    // items.map((item, itemIndex) => {
                                    //     return <Item2 
                                    //         key={itemIndex} 
                                    //         item={item} 
                                    //         columnIndex={columnIndex} 
                                    //         moduleIndex={moduleIndex} 
                                    //         itemIndex={itemIndex}
                                    //     />
                                    // })
                                }
                            </ItemContainer>
                    </ModuleContainer>
                )}
            </Draggable>
        )
    }
}