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
      team: [],
      trainees: [],
      teamNames: [],
      trainers: [],
      trainerName: '+ 添加讲师',
    };
  }

  componentDidMount() {
    this.getTrainee();
    // this.getGroup();
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
    const requestTeamUrl = `http://localhost:8080/api/team`
    fetchData(requestTeamUrl, 'GET').then(res => {
      const tNames = res.map(e => {
        return e.teamName
      })
      this.setState({
        team: res,
        teamNames: tNames
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

  changeTName = (index) => {
    if (this.state.teamNames[index] === '') {
      alert('组名不能为空！')
      return
    }
    const requestUrl = `http://localhost:8080/api/team/${index + 1}?name=${this.state.teamNames[index]}`
    fetchCreateData(requestUrl, 'POST').then(res => {
    }).catch(e => {
      console.log(e)
    })
  }

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

  dividedTeam = () => {
    const requestUrl = `http://localhost:8080/api/team/split`
    fetchData(requestUrl, 'POST').then(res => {
      const tNames = res.map(e => {
        return e.teamName
      })
      this.setState({
        team: res,
        teamNames: tNames
      })
    }).catch(e => {
      console.log(e)
    })
  } 
  
  render() {
    const {trainees, team, teamNames, trainers, trainerName } = this.state;
    return (
      <div data-testid="app" className="App">
        <div className="team-area">
         <header>
          <h1>分组列表</h1>
          <button type="button" onClick={this.dividedTeam}>分组学员</button>
         </header>
         <div className="tem-area-main">
           {
             team.map((e, index) => {
               return(<GroupRow key={`key_${e.teamName}`} teamData={e} teamName={teamNames[index]} 
               itemIndex={index} changeNameHandle={this.changeNameHandle} enterSubmit={this.enterSubmit}/>)
             })
           }
         </div>
        </div>
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
         <div className="trainee-area-main">
         {
            trainees.map(e => {
              return(<TraineeTag key={`student_${e.id}_key`} student={e} />)
            })
          }
          <button type="button"className="add-trainee" onClick={this.addTrainee}>+ 添加学员</button>
          
         </div>
        </div>
      </div>
    );
  }
}

export default Home;
