import React from 'react';

export default class TaskItemAll extends React.PureComponent{
    render(){
        return(
            <div className="container_bulk_action">
              <span>Bulk Action:</span>
              <div className="btn-action">
                  <button type="submit" className="btn btn-info">Done</button>
                  <button type="submit" className="btn btn-danger">Remove</button>
                </div>
            </div>
        )
    }
}