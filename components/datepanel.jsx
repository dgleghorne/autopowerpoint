'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css';
import Toggle from 'react-bootstrap-toggle';
import "react-bootstrap-toggle/dist/bootstrap2-toggle.css";


export default class Datepanel extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChangeDate(e){
      this.props.handleChangeDateParent(e)
    }

    handleChangeMorning(e){
      this.props.handleChangeMorningParent(e)
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
        let inputStyle = {width: '100%', clear: 'left', borderRadius: '4px 0px 0px 4px', cursor: 'pointer', backgroundColor: "white"}
      return(
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Date</h3>
          </div>
          <div className="panel-body">
            <div className="col-md-3">
              <label htmlFor="dateInput">Date</label>
              <div className='row'>
                  <div className="col-md-10" style={{paddingRight: 0}}>
                      <DayPickerInput
                          inputProps={{className: "form-control", readOnly: true, style: inputStyle, id: "dateInput"}}
                          formatDate={this.props.formatDate.bind(this)}
                          value={this.props.date}
                          onDayChange={this.handleChangeDate.bind(this)}
                          dayPickerProps={{selectedDays:this.props.date, firstDayOfWeek: 1}}
                      />
                  </div>
                  <div className="col-md-2" style={{paddingLeft: 0, height: '38px'}}>
                      <div className="datePickerInputGroupAddon" style={{height: '38px'}}>
                          <span className="glyphicon glyphicon-calendar"></span>
                      </div>
                  </div>
                </div>
            </div>
            <div className="col-md-3">
                <label htmlFor="morningToggle">AM/PM</label>
                <div className='row'>
                    <div className="col-md-12">
                        <Toggle
                            on="AM"
                            off="PM"
                            active={this.props.morning}
                            onClick={this.handleChangeMorning.bind(this)}
                        />
                    </div>
                </div>
           </div>
          </div>
        </div>
      )
    }

}
