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

ReactDOM.render(<ItemDrag />, document.getElementById('item-drag'));


const ColContainer = styled.div`

`;

class ColumnDrag extends React.Component {

    onDragEnd_A = result => {
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

        console.log("onDragEnd_A Left Side", source, destination, draggableId);

        var source_column = parseInt(source.droppableId, 10),
            target_column = parseInt(destination.droppableId, 10),
            source_module_index = source.index,
            target_module_index = destination.index,
            source_module_id = draggableId,
            target_module_id = Object.keys(data.modules[target_column])[target_module_index];

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

        // console.log("target_module_id", target_module_id);
        // console.log("source modules", data.modules[source_column]);

        if (source_column == target_column) {
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
        return(
            
            <DragDropContext onDragEnd={this.onDragEnd_A} >
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
