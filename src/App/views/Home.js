import React, { Component } from 'react';
import TraineeTag from '../components/TraineeTag';
import TrainerTag from '../components/TrainerTag';
import {fetchData, fetchCreateData} from '../utils';
import GroupRow from '../components/GroupRow';
import './Home.scss';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      group: [],
      trainees: [],
      groupNames: [],
      trainers: [],
      trainerName: '+ 添加讲师',
    };
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData =  () => {
    this.getTrainee();
    this.getGroup();
    this.getTrainers();
  }

  getTrainee = () => {
    const requestUrl = `http://localhost:8080/trainees?grouped=false`
    fetchData(requestUrl, 'GET').then(res => {
      this.setState({
        trainees: res,
      })
    }).catch(e => {
      console.log(e)
    })
  }

  getGroup = () => {
    const requestTeamUrl = `http://localhost:8080/groups`
    fetchData(requestTeamUrl, 'GET').then(res => {
      const tNames = res.map(e => {
        return e.name
      })
      this.setState({
        group: res,
        groupNames: tNames
      })
    }).catch(e => {
      console.log(e)
    })
  }

  getTrainers = () => {
    const requestTrainersUrl = `http://localhost:8080/trainers?grouped=false`
    fetchData(requestTrainersUrl, 'GET').then(res => {
      this.setState({
        trainers: res
      })
    }).catch(e => {
      console.log(e)
    })
  }

  enterSubmit = (e, pattern, index) => {
    let keyCode = null;  
   
    if(e.which)  
        keyCode = e.which;  
    else if(e.keyCode)   
        keyCode = e.keyCode;  
          
    if(keyCode === 13)   
    {  
       this.doPatterns(pattern, index)
    }  
  }

  doPatterns = (pattern, index) => {
    if (pattern === 'changeTName') {
      this.changeTName(index)
    }

    if (pattern === 'addTrainer') {
      this.addTrainer()
    }

  }

  addTrainee = () => {
    this.props.history.push('/trainees/add');
  }

  // changeTName = (index) => {
  //   if (this.state.teamNames[index] === '') {
  //     alert('组名不能为空！')
  //     return
  //   }
  //   const requestUrl = `http://localhost:8080/api/team/${index + 1}?name=${this.state.teamNames[index]}`
  //   fetchCreateData(requestUrl, 'POST').then(res => {
  //   }).catch(e => {
  //     console.log(e)
  //   })
  // }
 
  addTrainer = () => {
    const requestUrl = `http://localhost:8080/trainers`
    const sendData = { name: this.state.trainerName};
    fetchCreateData(requestUrl, 'POST', sendData).then(res => {
      this.getTrainee();
      // this.getGroup();
      this.getTrainers();
      this.setState({
        trainerName : '+ 添加讲师'
      })
    }).catch(e => {
      console.log(e)
    })
  }

  changeHandle = (e) => {
    this.setState({
      trainerName: e.target.value
    })
  }

  clearInput = () => {
    this.setState({
      trainerName: ''
    })
  }

  setDefaultVal = () => {
    this.setState({
      trainerName: '+ 添加讲师'
    })
  }

  changeNameHandle= (e, index) => {
    const setVal = [...this.state.teamNames]
    setVal[index] = e.target.value
    this.setState({
      teamNames: setVal
    })
  }

  autoGrouping = () => {
    const requestUrl = `http://localhost:8080/groups/auto-grouping`
    fetchData(requestUrl, 'POST').then(res => {
      const tNames = res.map(e => {
        return e.teamName
      })
      this.setState({
        group: res,
        groupNames: tNames
      })
      this.refreshData();
    }).catch(e => {
      console.log(e)
    })
  } 
  
  render() {
    const {trainees, group, groupNames, trainers, trainerName } = this.state;
    // console.log(this.state);
    return (
      <div data-testid="app" className="App">
        <section className="group-area">
         <header>
          <h1>分组列表</h1>
          <button type="button" onClick={this.autoGrouping}>分组学员</button>
         </header>
         <div className="group-area-main">
           {
             group.map((e, index) => {
               return(<GroupRow key={`key_${e.id}`} groupData={e} groupName={groupNames[index]} 
               itemIndex={index} changeNameHandle={this.changeNameHandle} enterSubmit={this.enterSubmit}/>)
             })
           }
         </div>
        </section>
        <section className="trainer-area">
           <h1>讲师列表</h1>
           <div className="trainer-area-main">
           {
            trainers.map(e => {
              return(<TrainerTag key={`trainer_${e.id}_key`} trainersData={e} />)
            })
          }
           <input value={trainerName} className="add-trainer"  onKeyPress={(event) => this.enterSubmit(event, 'addTrainer')} 
          onChange={(event) => this.changeHandle(event)} onFocus={this.clearInput} onBlur={this.setDefaultVal}/>
          </div>
        </section>
        <div className="trainee-area">
         <h1>学员列表</h1>
         <section className="trainee-area-main">
         {
            trainees.map(e => {
              return(<TraineeTag key={`student_${e.id}_key`} traineeData={e} />)
            })
          }
          <button type="button"className="add-trainee" onClick={this.addTrainee}>+ 添加学员</button>
          
         </section>
        </div>
      </div>
    );
  }
}

export default Home;
