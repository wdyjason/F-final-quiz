import React, { Component } from 'react';
import TraineeTag from './TraineeTag';

class groupRow extends Component {
    
    render() {
        const {teamData, changeNameHandle, teamName, itemIndex, enterSubmit} = this.props
        return(
        <div className="group-row">
            <div>
                <input value={teamName} onChange={(event) => changeNameHandle(event, itemIndex)} onKeyPress={(event) => enterSubmit(event, 'changeTName', itemIndex)}/>
            </div>
            <main className="group-Row-main">
                {
                    teamData.teamMates.map(e => {
                        return(<TraineeTag key={`key_in_row_${e.id}`} student={e} />)
                    })
                }
            </main>
        </div>
        )
    }
}

export default groupRow;