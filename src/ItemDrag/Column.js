import React from 'react';
import styled from 'styled-components';
import Module from './modules';
import { DragDropContext } from 'react-beautiful-dnd';

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

    onDragEnd_C = result => {

        const data = this.props.data;

        const { destination, source, draggableId } = result;
        if (!destination) {
            return;            
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            // console.log("Nothing moved")
            return;
        }

        // console.log("onDragEnd_A Left Side", source, destination, draggableId);

        var source_module = parseInt(source.droppableId, 10),
            target_module = parseInt(destination.droppableId, 10),
            source_item_index = source.index,
            target_item_index = destination.index,
            source_item_id = draggableId;

        console.log("Source Module" , source_module);
        console.log("Target Module" , target_module);
        console.log("Source Item Index" , source_item_index);
        console.log("Source Item Id" , draggableId);

        this.setState(data);
    }

    render(){
        const modules = this.props.modules
        const columnIndex = this.props.columnIndex;

        return(
            <DragDropContext
                onDragEnd = {this.onDragEnd_C}
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