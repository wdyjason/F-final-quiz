import React, { Component } from 'react';
import './App.scss';
import StudentTag from './StudentTag';
import {fetchData, fetchCreateData} from './utils';

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
          console.log(res)
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
  
  render() {
    const {students, team, newName} = this.state;
    return (
      <div data-testid="app" className="App">
        <div className="team-area">
          <h1>分组列表</h1>
        </div>
        <div className="student-area">
         <h1>学员列表</h1>
         <div className="student-area-main">
         {
            students.map(e => {
              return(<StudentTag key={`student_${e.id}_key`} student={e} />)
            })
          }
          <input value={newName} className="add-student"  onKeyPress={(event) => this.enterSubmit(event)} onChange={(event) => this.changeHandle(event)}/>
         </div>
        </div>
      </div>
    );
  }
}

export default App;
