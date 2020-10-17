import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'

class TaskItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showForm: false,
      isChecked: false,
      id: '',
      name: '',
      description: '',
      priority: '',
      dueDate: new Date(),
    }
  }
  handleRemove = () => {
    this.props.onRemove(this.props.task.id, this.state.isChecked);
  }
  handleClick = () => {
    this.setState({
      isShowForm: !this.state.isShowForm,
    });
    
    this.props.onUpdate(this.props.task.id);
  }
  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state);
    this.setState({
      isShowForm: false
    });
  }
  handleChecked = e => {
    this.setState({
      isChecked: e.target.checked
    });
    this.props.onFilter(this.props.task.id, this.state.isChecked);
  }
  handleChangeValue = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
        [name]: value
    });
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
            priority: '',
            dueDate: new Date(),
        });
    }
  }

  render(){
    const isChecked = this.state.isChecked;
    return(
        <div className="list_item">
          <div className="list_item_input">
            <input 
              type="checkbox"
              checked={isChecked}
              onChange={this.handleChecked}
              />
            <span>&nbsp;{this.props.task.name}</span>
            <div className="btn-group-action">
                <button 
                  type="button"
                  className="btn btn-info"
                  onClick={this.handleClick}
                  >Detail
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={this.handleRemove}
                  >Remove
                </button>
            </div>
          </div>
          {this.state.isShowForm ? (
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={this.state.name}
                name="name"
                onChange={this.handleChangeValue}
                className="form-control" 
                placeholder="Update the task ..." 
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
              <button type="submit" className="btn btn-success" style={{width: '100%'}}>Update</button>
          </form>
          ) : ''}
        </div>
    );
  }
}
export default TaskItem;