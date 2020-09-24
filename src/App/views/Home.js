import React, { Component } from 'react';
import TraineeTag from '../components/TraineeTag';
import TrainerTag from '../components/TrainerTag';
import {fetchData, fetchCreateData} from '../utils';
import GroupRow from '../components/GroupRow';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      team: [],
      students: [],
      newName: '+ 添加学员',
      teamNames: [],
      trainers: [],
      trainerName: '+ 添加讲师',
    };
  }

  componentDidMount() {
    // this.getTrainee();
    // this.getGroup();
    this.getTrainers();
   
  }

  getTrainee = () => {
    const requestUrl = `http://localhost:8080/api/students`
    fetchData(requestUrl, 'GET').then(res => {
      this.setState({
        students: res,
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
    if (pattern === 'addTrainee') {
      this.addTrainee()
    }
    if (pattern === 'changeTName') {
      this.changeTName(index)
    }

    if (pattern === 'addTrainer') {
      this.addTrainer()
    }

  }

  addTrainee = () => {
    if (this.state.newName === '' || this.state.newName === '+ 添加学员') {
      alert('非法的学员名！')
      return
    }
    const requestUrl = `http://localhost:8080/api/student?name=${this.state.newName}`
    fetchCreateData(requestUrl, 'POST').then(res => {
      this.getTrainee();
      this.getGroup();
      this.setState({
        newName: '+ 添加学员'
      })
    }).catch(e => {
      console.log(e)
    })
  }

  changeTName = (index) => {
    if (this.state.teamNames[index] === '') {
      alert('组名不能为空！')
      return
    }
    const requestUrl = `http://localhost:8080/api/team/${index + 1}?name=${this.state.teamNames[index]}`
    fetchCreateData(requestUrl, 'POST').then(res => {
      this.componentDidMount()
    }).catch(e => {
      console.log(e)
    })
  }

  addTrainer = () => {
    const requestUrl = `http://localhost:8080/trainers`
    const sendData = { name: this.state.trainerName};
    fetchCreateData(requestUrl, 'POST', sendData).then(res => {
      // this.getTrainee();
      // this.getGroup();
      this.getTrainers();
      this.setState({
        trainerName : '+ 添加讲师'
      })
    }).catch(e => {
      console.log(e)
    })
  }

  changeHandle = (e, type) => {
   if (type === 'trainee') {
    this.setState({
      newName: e.target.value
    })
   }

   if (type === 'trainer') {
    this.setState({
      trainerName: e.target.value
    })
   }
  }

  clearInput = (type) => {
   if (type === 'trainee') {
    this.setState({
      newName: ''
    })
   }
   
   if (type === 'trainer') {
    this.setState({
      trainerName: ''
    })
   }
  
  }

  setDefaultVal = (type) => {
   if (type === 'trainee') {
    this.setState({
      newName: '+ 添加学员'
    })
   }

   if (type === 'trainer') {
    this.setState({
      trainerName: '+ 添加讲师'
    })
   }
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
    const {students, team, newName, teamNames, trainers, trainerName } = this.state;
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
          onChange={(event) => this.changeHandle(event, 'trainer')} onFocus={() => this.clearInput('trainer')} onBlur={() => this.setDefaultVal('trainer')}/>
          </div>
        </section>
        <div className="trainee-area">
         <h1>学员列表</h1>
         <div className="trainee-area-main">
         {
            students.map(e => {
              return(<TraineeTag key={`student_${e.id}_key`} student={e} />)
            })
          }
          <input value={newName} className="add-trainee"  onKeyPress={(event) => this.enterSubmit(event, 'addTrainee')} 
          onChange={(event) => this.changeHandle(event, 'trainee')} onFocus={() => this.clearInput('trainee')} onBlur={() => this.setDefaultVal('trainee')}/>
          
         </div>
        </div>
      </div>
    );
  }
}

export default Home;
