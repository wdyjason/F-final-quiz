import React, { Component } from 'react';

class TraineeTag extends Component {
    
    render() {
        const {id, name} = this.props.traineeData
        return(
        <div className="trainee-tag">{`${id}. ${name}`}</div>
        )
    }
}

export default TraineeTag;