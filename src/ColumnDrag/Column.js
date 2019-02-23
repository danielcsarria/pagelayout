import React from 'react';
import styled from 'styled-components';
import Module2 from './modules';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import {CollapsibleComponent, CollapsibleHead, CollapsibleContent} from 'react-collapsible-component';


const Container = styled.div`
    margin: 8px;
    border: 1px solid blue;
    border-radius: 2px;
    background-color: white;

    display: flex;
    flex-direction: column;
`;

const Title = styled.h3`
    padding: 8px;
`;

const ModuleList = styled.div`
    padding: 8px;
    background-color:white;
    height: inherit;
    flex-grow: 1;
    min-height: 200px;
`;

export default class Column2 extends React.Component{

    render(){
        const modules = this.props.modules
        const columnIndex = this.props.columnIndex;
        const droppableId = String(columnIndex);

        var title = "";

        if(columnIndex === 0){
            title = "Feature";
        } else {
            title = columnIndex
        }

        return(
            <CollapsibleComponent>
                <Draggable draggableId={droppableId} index={columnIndex}>
                    {(provided) => (
                        <Container
                            {...provided.draggableProps}
                            ref = {provided.innerRef}
                        >
                            <CollapsibleHead isExpanded={true}>
                                <Title {...provided.dragHandleProps} >
                                    Column: {title}
                                </Title>
                            </CollapsibleHead>
                            <CollapsibleContent isExpanded={true}>
                                <Droppable droppableId={droppableId} type="module">
                                    {(provided) => (
                                        <ModuleList
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {
                                                Object.keys(modules).map((moduleKey, moduleIndex) => {
                                                    return <Module2 
                                                        key={moduleKey} 
                                                        columnIndex={columnIndex}
                                                        moduleKey={moduleKey}
                                                        moduleIndex={moduleIndex} 
                                                        modules={modules}                                 
                                                    />
                                                })
                                            }
                                            {provided.placeholder}
                                        </ModuleList>
                                    )}
                                </Droppable>
                            </CollapsibleContent>
                        </Container>
                    )}
                </Draggable>
            </CollapsibleComponent>
        )
    }
}