import React from 'react';
import styled from 'styled-components';
import Module from './modules';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
    margin: 8px;
    border: 1px solid blue;
    border-radius: 2px;
    background-color: white;
`;

const Title = styled.h3`
    padding: 8px;
`;

const ModuleList = styled.div`
    padding: 8px;
    background-color:white;
`;

export default class Column extends React.Component{

    onDragEnd = result => {

    }

    render(){
        const modules = this.props.modules
        const columnIndex = this.props.columnIndex;
         const droppableId = String(columnIndex);
        return(
            <DragDropContext
                onDragEnd = {this.onDragEnd}
            >
                <Container>
                    <Title>
                        Column: {columnIndex}
                    </Title>
                        <ModuleList>
                            {
                                Object.keys(modules).map((moduleKey, moduleIndex) => {
                                    return <Module 
                                        key={moduleKey} 
                                        columnIndex={columnIndex}
                                        moduleKey={moduleKey}
                                        moduleIndex={moduleIndex} 
                                        modules={modules}                                 
                                    />
                                })
                            }
                        </ModuleList>
                </Container>
            </DragDropContext>
        )
    }
}