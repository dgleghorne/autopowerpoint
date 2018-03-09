'use strict';

import React from 'react';
import ReactDom from 'react-dom';

export default class Datepanel extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChangeDate(e){
      this.props.handleChangeDateParent(e.target.value)
    }

    handleChangeMorning(e){
      this.props.handleChangeMorningParent(e.target.value)
    }

    // <div className="col-md-4">
    //   <div className= "row">
    //     <label htmlFor="morningInput">AM/PM</label>
    //       <div className="radio" id="morningInput">
    //         <label><input type="radio" name="optradio"></input>AM</label>
    //         <span>  </span>
    //         <label><input type="radio" name="optradio"></input>PM</label>
    //       </div>
    //   </div>
    // </div>

    render() {
      return(
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Date</h3>
          </div>
          <div className="panel-body">
            <div className="col-md-4">
              <label htmlFor="dateInput">Date</label>
              <div className='input-group date' id="datetimepicker1">
                <input type='text'className="form-control" id="dateInput" value={this.props.date} onChange={this.handleChangeDate.bind(this)}></input>
                <div className="input-group-addon">
                  <span className="glyphicon glyphicon-calendar"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

}
