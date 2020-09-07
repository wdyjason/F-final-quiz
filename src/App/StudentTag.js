import React, { Component } from 'react';

class StudentTag extends Component {
    
    render() {
        const {id, name} = this.props.student
        return(
        <div>{`${id}. ${name}`}</div>
        )
    }
}

export default StudentTag;