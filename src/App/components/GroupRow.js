import React, { Component } from 'react';
import TraineeTag from './TraineeTag';
import TrainerTag from './TrainerTag';

class groupRow extends Component {
    
    render() {
        const {groupData, changeNameHandle, groupName, itemIndex, enterSubmit} = this.props
        return(
        <div className="group-row">
            <div className="group-row-header">
                <input className="group-name" value={groupName} onChange={(event) => changeNameHandle(event, itemIndex)} onKeyPress={(event) => enterSubmit(event, 'changeTName', itemIndex)}/>
                {
                    groupData.trainers.map(e => {
                        return(<TrainerTag key={`trainer_in_row_${e.id}_key`} trainersData={e} />)
                      })
                }

            </div>
            <main className="group-row-main">
                {
                    groupData.trainees.map(e => {
                        return(<TraineeTag key={`key_in_row_${e.id}`} traineeData={e} />)
                    })
                }
            </main>
        </div>
        )
    }
}

export default groupRow;