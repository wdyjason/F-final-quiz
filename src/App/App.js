import React, { Component } from 'react';
import './App.scss';
import TraineeTag from './components/TraineeTag';
import {fetchData, fetchCreateData} from './utils';
import GroupRow from './components/GroupRow';

class App extends Component {

  constructor() {
    super();
    this.state = {
      team: [],
      students: [],
      newName: '+ 添加学员',
      teamNames: [],
    };
  }

  componentDidMount() {
    this.getTrainee();
    this.getGroup();
   
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
    if (pattern === 'addStu') {
      this.addStudent()
    }
    if (pattern === 'changeTName') {
      this.changeTName(index)
    }
  }

  addStudent = () => {
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

  changeHandle = (e) => {
    this.setState({
      newName: e.target.value
    })
  }

  clearName = () => {
    this.setState({
      newName: ''
    })
  }

  setDefaultVal = () => {
    this.setState({
      newName: '+ 添加学员'
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
    const {students, team, newName, teamNames} = this.state;
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
        <div className="student-area">
         <h1>学员列表</h1>
         <div className="student-area-main">
         {
            students.map(e => {
              return(<TraineeTag key={`student_${e.id}_key`} student={e} />)
            })
          }
          <input value={newName} className="add-student"  onKeyPress={(event) => this.enterSubmit(event, 'addStu')} 
          onChange={(event) => this.changeHandle(event)} onFocus={this.clearName} onBlur={this.setDefaultVal}/>
          
         </div>
        </div>
      </div>
    );
  }
}

export default App;
