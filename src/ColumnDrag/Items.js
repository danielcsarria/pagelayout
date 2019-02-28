import React from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
    margin: 8px;
    border: 1px solid green;
    border-radius: 2px;
    background-white;
`;

const Items = styled.div`
    padding:8px;
    min-height: 20px;
    background-color: white;
`;

export default class Item2 extends React.Component{
    render(){
        return(
            <ItemContainer>
                <Items>
                    {this.props.item.headline} ==> {this.props.columnIndex}, {this.props.moduleIndex}, {this.props.itemIndex} 
                </Items>
            </ItemContainer>
        )
    }
}