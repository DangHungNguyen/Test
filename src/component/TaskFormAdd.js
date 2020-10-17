import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'

class TaskFormAdd extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: '',
      name: '',
      description: '',
      priority: 'normal',
      dueDate: new Date
    }
  }
  handleChangeValue = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleSubmit = event => {
    event.preventDefault();
    
    this.props.onSubmit(this.state);
    this.handleClear();
  }
  componentWillMount(){
    if(this.props.newTasks){
        this.setState({
            id: this.props.newTasks.id,
            name: this.props.newTasks.name,
            description: this.props.newTasks.description,
            priority: this.props.newTasks.priority,
        });
    }
}
componentWillReceiveProps(nextProps){
  if(nextProps.newTasks && nextProps){
      this.setState({
          id: nextProps.newTasks.id,
          name: nextProps.newTasks.name,
          description: nextProps.newTasks.description,
          priority: nextProps.newTasks.priority,
          //dueDate: nextProps.newTasks.dueDate
      });
  }else if(!nextProps.newTasks){
      this.setState({
          id: '',
          name: '',
          description: '',
          priority: 'normal',
          dueDate: new Date(),
      });
  }
}
  handleClear = () => {
    this.setState({
      name: '',
      description: '',
      priority: 'normal',
      dueDate: new Date(),
    });
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.name} 
            name="name"
            onChange={this.handleChangeValue}
            className="form-control" 
            placeholder="Add new task ..." 
            />
          <br/>
          <label>description</label>
          <textarea 
            value={this.state.description}
            onChange={this.handleChangeValue}
            name="description" 
            className="form-control" 
            rows="5" style={{ height: '200px'}}>
          </textarea>
          <br/>
          <div className="flex_container">
            <div className="input-group-dueDate">
                <label>due date</label>
                <DatePicker
                  className="date_picker"
                  selected={this.state.dueDate}
                  onChange={date => this.setState({dueDate: date})}
                  minDate={this.state.dueDate}
                  dateFormat="d MMMM yyyy"
                />
            </div>
            <div className="input-group-priority">
                <label>priority</label>
                  <select 
                    className="form-control"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.handleChangeValue}
                  >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
            </div>
          </div>
          <br/>
          <br/>
          <button type="submit" className="btn btn-success" style={{width: '100%'}}>Add</button>
      </form>
    );
  }
}
export default TaskFormAdd;