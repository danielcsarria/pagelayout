import React from 'react';
import styled from 'styled-components';
import Module2 from './modules';
import { Draggable, Droppable } from 'react-beautiful-dnd';

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

    onDragEnd = result => {

    }

    render(){
        const modules = this.props.modules
        const columnIndex = this.props.columnIndex;
        const droppableId = String(columnIndex);
        return(
            <Draggable draggableId={droppableId} index={columnIndex}>
                {(provided) => (
                    <Container
                        {...provided.draggableProps}
                        ref = {provided.innerRef}
                    >
                        <Title {...provided.dragHandleProps} >
                            Column: {columnIndex}
                        </Title>
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
                    </Container>
                )}
            </Draggable>
        )
    }
}