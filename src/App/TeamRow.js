import React, { Component } from 'react';
import StudentTag from './StudentTag';

class TeamRow extends Component {
    
    render() {
        const {teamData, changeNameHandle, teamName, itemIndex, enterSubmit} = this.props
        return(
        <div>
            <div>
                <input value={teamName} onChange={(event) => changeNameHandle(event, itemIndex)} onKeyPress={(event) => enterSubmit(event, 'changeTName', itemIndex)}/>
            </div>
            <main>
                {
                    teamData.teamMates.map(e => {
                        return(<StudentTag key={`key_in_row_${e.id}`} student={e} />)
                    })
                }
            </main>
        </div>
        )
    }
}

export default TeamRow;