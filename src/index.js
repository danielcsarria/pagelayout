import React from 'react';
import ReactDOM from 'react-dom';
import data from './data/juan.json';
// import styled from 'styled-components';
import Column from './Column';

// this is a change


class App extends React.Component {

    
    render(){
        return(
            
            data.modules.map((modules, columnIndex) => {
                // console.log(modules, columnIndex);
                return <Column key={columnIndex} columnIndex={columnIndex} modules={modules} />
            })
           
        )
    }

}

ReactDOM.render(<App />, document.getElementById('root'));