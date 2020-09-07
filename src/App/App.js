import React, { Component } from 'react';
import './App.scss';
import StudentTag from './StudentTag';
import {fetchData, fetchCreateData} from './utils';
import TeamRow from './TeamRow';

class App extends Component {

  constructor() {
    super();
    this.state = {
      team: [],
      students: [],
      newName: '+ 添加学员',
    };
  }

  componentDidMount() {
    const requestUrl = `http://localhost:8080/api/students`
    fetchData(requestUrl, 'GET').then(res => {
      this.setState({
        students: res,
      })
    }).catch(e => {
      console.log(e)
    })
  }

  enterSubmit = (e) => {
    let keyCode = null;  
    const requestUrl = `http://localhost:8080/api/student?name=${this.state.newName}`

    if(e.which)  
        keyCode = e.which;  
    else if(e.keyCode)   
        keyCode = e.keyCode;  
          
    if(keyCode === 13)   
    {  
        fetchCreateData(requestUrl, 'POST').then(res => {
          this.componentDidMount()
          this.setState({
            newName: '+ 添加学员'
          })
        }).catch(e => {
          console.log(e)
        })
    }  
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
    const setVal = [...this.state.team]
    setVal[index].teamName = e.target.value
    this.setState({
      team: setVal
    })
  }

  dividedTeam = () => {
    const requestUrl = `http://localhost:8080/api/team`
    fetchData(requestUrl, 'GET').then(res => {
      this.setState({
        team: res,
      })
    }).catch(e => {
      console.log(e)
    })
  } 
  
  render() {
    const {students, team, newName} = this.state;
    return (
      <div data-testid="app" className="App">
        <div className="team-area">
         <header>
          <h1>分组列表</h1>
          <button type="button" onClick={this.dividedTeam}>分组学员</button>
         </header>
         <div className="tem-area-main">
           {
             team.map((e, _index) => {
               return(<TeamRow key={`key_${e.teamName}`} teamData={e} teamName={e.teamName} itemIndex={_index} changeNameHandle={this.changeNameHandle}/>)
             })
           }
         </div>
        </div>
        <div className="student-area">
         <h1>学员列表</h1>
         <div className="student-area-main">
         {
            students.map(e => {
              return(<StudentTag key={`student_${e.id}_key`} student={e} />)
            })
          }
          <input value={newName} className="add-student"  onKeyPress={(event) => this.enterSubmit(event)} onChange={(event) => this.changeHandle(event)} onFocus={this.clearName} onBlur={this.setDefaultVal}/>
         </div>
        </div>
      </div>
    );
  }
}

export default App;
