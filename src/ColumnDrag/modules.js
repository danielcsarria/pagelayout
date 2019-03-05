import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const ModuleContainer = styled.div`
    margin: 8px;
    border: 1px solid red;
    border-radius: 2px;
    background-color:white;
`;

const ModuleTitle = styled.h4`
    padding: 8px;
`;



export default class Module2 extends React.Component{
    render(){
        const moduleKey = this.props.moduleKey;
        const moduleIndex = this.props.moduleIndex;
        const modules = this.props.modules;
 
        const module = modules[moduleKey];
        const title = module.title;

        return(
            <Draggable draggableId={moduleKey} index={moduleIndex}>
                {(provided) => (
                    <ModuleContainer
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref = {provided.innerRef}
                    >
                        <ModuleTitle>
                            <div>{title} ::  </div>
                            <div>{moduleKey}</div>
                        </ModuleTitle>
                    </ModuleContainer>
                )}
            </Draggable>
        )
    }
} 