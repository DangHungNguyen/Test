import React from 'react';
import './App.css';
import TaskList from './component/TaskList';
import TaskFormAdd from './component/TaskFormAdd';
import TaskItemAll from './component/TaskItemAll';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      keyword: '',
      newTasks: null,
      taskChecked: [],
    };
  }
  s4(){
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  };
  genDataID(){
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
  };
  componentDidMount(){
    if(localStorage.getItem('tasks')){
      this.setState({
        tasks: JSON.parse(localStorage.getItem('tasks'))
      });
    }
  }
  handleSearch = keyword => {
    this.setState({
      keyword: keyword.toLowerCase()
    });
  }
  handleRemove = (id, isChecked) => {
    if(isChecked) {
      const newTasks = this.state.tasks.filter(task => task.id !== id);
      this.setState({
        tasks: newTasks
      });
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    }
  }
  handleOnSubmit = data => {
    const { tasks } = this.state;
    
    if(data.id === ''){
      data.id = this.genDataID();
      tasks.push(data);
    }else if(data.id !== '' && data.isChecked){
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    
    this.setState({
      tasks: tasks,
      newTasks: null,
      checked: data.isChecked
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  findIndex = id => {
    var tasks = this.state.tasks;
    var result = -1;

    tasks.forEach((task, index) => {
      if(task.id === id){
        result = index
      }
    });
    return result;
  }
  handleUpdate = id => {
    const tasks = this.state.tasks;
    const index = this.findIndex(id);
    const newTasks = tasks[index];

    this.setState({
      newTasks: newTasks
    });
  }
  handleFilter = (id, checked) => {
    if(!checked){
      const ids = this.state.taskChecked.push(id);
      console.log(ids);
    }
  }
  render(){
    var { tasks, keyword, newTasks, checked } = this.state;
    if(keyword){
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }
    return(
      <div className="container">
        <div className="container__layout flex_container">
          <div className="container__taskForm">
            <h2>new task</h2>
            <TaskFormAdd onSubmit={this.handleOnSubmit} />
          </div>
          <div className="container__list">
            <h2>to do list</h2>
            <TaskList 
              tasks={tasks} 
              onSearch={this.handleSearch}
              onRemove={this.handleRemove}
              onUpdate={this.handleUpdate}
              onSubmit={this.handleOnSubmit}
              newTasks={newTasks}
              onFilter={this.handleFilter}
            />
            <br/>
            <br/>
            { checked && <TaskItemAll /> }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
