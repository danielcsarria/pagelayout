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

    

    onDragEnd_C = result => {

        const data = this.props.data.modules;

        const { destination, source, draggableId } = result;

        if (!destination) {
            return;            
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            console.log("Nothing moved")
            return;
        }

        console.log("onDragEnd_C Left Side", source, destination, draggableId);

        var source_column = parseInt(source.droppableId, 10),
            target_column = parseInt(destination.droppableId, 10),
            source_module_index = source.index,
            target_module_index = destination.index,
            source_module_id = draggableId;
            // target_module_id = Object.keys(data.modules[target_column])[target_module_index];

        const fillOutModules = function(keys) {
            // console.log("-> ", source_column, target_column);
            var modules = {};
            keys.forEach(key => {
                modules[key] = typeof data.modules[source_column][key] != "undefined" ? 
                                data.modules[source_column][key] : 
                                data.modules[target_column][key];
            });
            return modules;
        }

        console.log("Modules", modules)

        // console.log("target_module_id", target_module_id);
        // console.log("source modules", data.modules[source_column]);

        if (source_column === target_column) {
            var keys = Object.keys(data.modules[source_column]);

            if (target_module_index > source_module_index) {
                ++target_module_index;
            } else {
                ++source_module_index;
            }

            keys.splice(target_module_index, 0, source_module_id);
            keys.splice(source_module_index, 1)

            var modules = fillOutModules(keys);
            data.modules[source_column] = modules;

            // console.log("keys", keys);
            // console.log("modules", modules);

            // this.setState(data.modules[source_column]);

        } else {
            var source_keys = Object.keys(data.modules[source_column]),
                target_keys = Object.keys(data.modules[target_column]);

            target_keys.splice(target_module_index, 0, source_module_id);
            data.modules[target_column] = fillOutModules(target_keys);
            // this.setState(data.modules[target_column]);

            source_keys.splice(source_module_index, 1);
            data.modules[source_column] = fillOutModules(source_keys);
            // this.setState(data.modules[source_column]);

        }

        this.setState(data);
        
    }

    render(){
        const modules = this.props.modules
        const columnIndex = this.props.columnIndex;

        const droppableId = String(columnIndex);

        return(
            <DragDropContext
                onDragEnd = {this.onDragEnd_C}
            >
                <Container>
                    <Title>
                        Column: {columnIndex}
                    </Title>
                    <Droppable droppableId="all-modules" type="module">
                        {(provided) => (
                            <ModuleList
                                {...provided.droppableProps}
                                ref = {provided.innerRef}
                            >
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
                                {provided.placeholder}
                            </ModuleList>
                        )}
                    </Droppable>
                </Container>
            </DragDropContext>
        )
    }
}