import React, { Component } from 'react';

class TrainerTag extends Component {
    
    render() {
        const {id, name} = this.props.trainersData
        return(
        <div>{`${id}. ${name}`}</div>
        )
    }
}

export default TrainerTag;