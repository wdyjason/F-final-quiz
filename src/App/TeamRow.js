import React, { Component } from 'react';
import StudentTag from './StudentTag';

class TeamRow extends Component {
    
    render() {
        const {teamData, changeNameHandle, teamName, itemIndex} = this.props
        return(
        <div>
            <div>
                <input value={teamName} onChange={(event) => changeNameHandle(event, itemIndex)}/>
            </div>
            <main>
                {
                    teamData.teamMates.map(e => {
                        return(<StudentTag student={e} />)
                    })
                }
            </main>
        </div>
        )
    }
}

export default TeamRow;