import React from 'react';
import styled from 'styled-components';
import Item from './Items';
import { Droppable, Draggable } from 'react-beautiful-dnd';

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

export default class Module extends React.Component{
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
                        ref={provided.innerRef}
                    >
                        <ModuleTitle {...provided.dragHandleProps}>
                            Module:{moduleKey} {type} ==> {columnIndex}, {moduleIndex} 
                        </ModuleTitle>
                        <Droppable droppableId={droppableId} type="items" direction="vertical">
                            {(provided) => (
                                <ItemContainer
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {
                                        items.map((item, itemIndex) => {
                                            return <Item 
                                                key={itemIndex} 
                                                item={item} 
                                                columnIndex={columnIndex} 
                                                moduleIndex={moduleIndex} 
                                                itemIndex={itemIndex}
                                            />
                                        })
                                    }
                                    {provided.placeholder}
                                </ItemContainer>
                            )}
                        </Droppable>
                    </ModuleContainer>
                )}
            </Draggable>
        )
    }
}