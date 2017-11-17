'use strict';

import React from 'react';
import ReactDom from 'react-dom';

export default class Datepanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          date: this.formatDate(props.today)
        }
    }

    formatDate(date){
      let splitDate = date.split('-')
      let d = new Date(splitDate[2]+'-'+splitDate[1]+'-'+splitDate[0])
      let dateNo = splitDate[0]
      let weekDayNo = d.getDay()
      let month = splitDate[1]
      let year = splitDate[2]
      var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
      var months = ["","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      let weekDay = days[weekDayNo]
      let monthWord = months[month]
      let ordinal = "th"
      if(dateNo == 1){
        ordinal = "st"
      }
      if(dateNo == 2){
        ordinal = "nd"
      }
      if(dateNo == 3){
        ordinal = "rd"
      }
      return weekDay + " " + dateNo + ordinal + " " + monthWord + " " + year
    }

    handleChangeDate(e){
      this.setState({
        date: e.target.value
      })
      this.props.handleChangeDateParent(e.target.value)
    }

    handleChangeMorning(e){
      this.setState({
        morning: e.target.value
      })
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
      this.formatDate(this.state.date)
      return(
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Date</h3>
          </div>
          <div className="panel-body">
            <div className="col-md-4">
              <label htmlFor="dateInput">Date</label>
              <div className='input-group date' id="datetimepicker1">
                <input type='text'className="form-control" id="dateInput" value={this.state.date} onChange={this.handleChangeDate.bind(this)}></input>
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
