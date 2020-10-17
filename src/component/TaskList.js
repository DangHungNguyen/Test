import React from 'react';
import TaskItem from './TaskItem';

class TaskList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      keyword: ''
    }
  }
  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.props.onSearch(name === 'keyword' ? value : this.state.keyword);
    this.setState({
        [name]: value
    });
  }
  render(){
    const { tasks, onRemove, onUpdate, onSubmit, newTasks, onFilter } = this.props;
    return(
      <div className="container_listItem">
        <input 
          type="text"
          value={this.state.keyword}
          onChange={this.handleChange}
          name="keyword" 
          className="form-control" 
          placeholder="Search ..." />
        <br/>
        {
          tasks.map((task, index) => {
            return <TaskItem 
                      key={task.id}
                      task={task}
                      index={index}
                      onRemove={onRemove}
                      onUpdate={onUpdate}
                      onSubmit={onSubmit}
                      newTasks={newTasks}
                      onFilter={onFilter}
                  />
          })
        }
      </div>
    );
  }
}

export default TaskList;