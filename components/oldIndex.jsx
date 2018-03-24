'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios'
import Utils from './Utils.jsx'
import Datepanel from './datepanel.jsx'
import Titlepanel from './titlepanel.jsx'
import Readingspanel from './readingspanel.jsx'
import Songspanel from './songspanel.jsx'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
const FileDownload = require('js-file-download');
const downloader = require('file-downloader')

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        var today = new Date()
        today = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
        let formattedDate = this.formatDate(today)

        this.state = {
          date: formattedDate,
          speaker: "<Insert Speaker's Name Here>",
          title: "<Insert Title Here>",
          morning: true,
          noOfSongs: 4,
          reading1: "<Insert Bible Reading Here>",
          reader1: "<Insert Reader Here>",
          pageNo1: "<Insert Page No Here>",
          reading2: "<Insert Bible Reading Here>",
          reader2: "<Insert Reader Here>",
          pageNo2: "<Insert Page No Here>",
          selectedSongsArray: [],
          errorMsg: "",
          errorStyle: "",
          downloadMessage: false,
          fileName: "",
          selectedSongsDetailsArray: []
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

    resetForm(){
      location.reload()
    }

    handleChangeDateParent(date){
      this.setState({
        date: date
      })
    }

    handleChangeSpeakerParent(speaker){
      this.setState({
        speaker: speaker
      })
    }

    handleChangeTitleParent(title){
      this.setState({
        title: title
      })
    }

    handleChangeMorningParent(morning){
      this.setState({
        morning: morning
      })
    }

    handleChangeNoOfSongsParent(number){
      this.setState({
        noOfSongs: number
      })
    }

    handleChangeReading1Parent(value){
      this.setState({
        reading1: value
      })
    }

    handleChangeReader1Parent(value){
      this.setState({
        reader1: value
      })
    }

    handleChangePageNo1Parent(value){
      this.setState({
        pageNo1: value
      })
    }

    handleChangeReading2Parent(value){
      this.setState({
        reading2: value
      })
    }

    handleChangeReader2Parent(value){
      this.setState({
        reader2: value
      })
    }

    handleChangePageNo2Parent(value){
      this.setState({
        pageNo2: value
      })
    }

    handleChangeSelectedSongsArrayParent(selectedSongsArray){
      this.setState({
        selectedSongsArray: selectedSongsArray
      })
    }

    handleChangeSongsDetailsArrayParent(selectedSongsDetailsArray){
      this.setState({
        selectedSongsDetailsArray: selectedSongsDetailsArray
      })
    }

    generatePowerpoint(){
      let that = this
      var d = new Date();
      var fileName = "Powerpoint " + d.getTime();
      that.setState({
        fileName: fileName
      })
      axios.post('/generatePowerpoint', {
        fileName: fileName,
        date: this.state.date,
        speaker: this.state.speaker,
        title: this.state.title,
        morning: this.state.morning,
        noOfSongs: this.state.noOfSongs,
        reading1: this.state.reading1,
        reader1: this.state.reader1,
        pageNo1: this.state.pageNo1,
        reading2: this.state.reading1,
        reader2: this.state.reader2,
        pageNo2: this.state.pageNo2,
        songsArray: JSON.stringify(that.state.selectedSongsDetailsArray)
      }).then(function(response){
        //console.log(response);
      })
      .catch(function(error){
        //console.log(error);
      })
    }

    downloadPowerpoint(){
      var that = this
      var filename = that.state.fileName
      $.ajax({
        url: '/download/' + filename,
        type: 'GET',
        cache: false,
        success: (data) => {
          console.log(data);
          console.log(filename);
        },
        error: (err) => {
          console.log(error);
          console.log(filename);
        }
      })
    }

    returnPowerpoint(){
      if(this.state.selectedSongsArray.length < this.state.noOfSongs){
        this.setState({
          errorMsg: "Error: You have not selected enough songs.  Please try again",
          errorStyle: "alert alert-danger"
        })
      } else{
        this.generatePowerpoint()
        this.setState({
          downloadMessage: true
        })
      }
    }

    render() {
      let downloadLink = null
      if(this.state.downloadMessage){
        downloadLink = <h3 className="alert alert-success" role="alert">Powerpoint has been generated.  <a href={"/download/" + this.state.fileName}>Download Powerpoint Here</a></h3>
      }

        return (
            <div className="container-fluid">
              <div className="row">
                <h2>Create Powerpoint</h2>
              </div>
                <div className="row">
                  <Datepanel handleChangeDateParent={this.handleChangeDateParent.bind(this)} handleChangeMorningParent={this.handleChangeMorningParent.bind(this)} today={this.state.date}/>
                </div>

                <div className="row">
                  <Titlepanel handleChangeSpeakerParent={this.handleChangeSpeakerParent.bind(this)} handleChangeTitleParent={this.handleChangeTitleParent.bind(this)}/>
                </div>

                <div className="row">
                  <Readingspanel handleChangeReader1Parent={this.handleChangeReader1Parent.bind(this)} handleChangeReading1Parent={this.handleChangeReading1Parent.bind(this)} handleChangePageNo1Parent={this.handleChangePageNo1Parent.bind(this)} handleChangeReader2Parent={this.handleChangeReader2Parent.bind(this)} handleChangeReading2Parent={this.handleChangeReading2Parent.bind(this)} handleChangePageNo2Parent={this.handleChangePageNo2Parent.bind(this)}/>
                </div>

                <div className="row">
                  <Songspanel handleChangeNoOfSongsParent={this.handleChangeNoOfSongsParent.bind(this)} noOfSongs={this.state.noOfSongs} selectedSongsDetailsArray={this.state.selectedSongsDetailsArray}handleChangeSelectedSongsArrayParent={this.handleChangeSelectedSongsArrayParent.bind(this)} handleChangeSongsDetailsArrayParent={this.handleChangeSongsDetailsArrayParent.bind(this)}/>
                </div>
              <br/>
              <div className="row">
                <div className="col-md-3 col-md-offset-6">
                  <div className="creationForm">
                    <button type="submit" className="btn btn-default btn-block" id="resetForm" onClick={this.resetForm.bind(this)}>Reset</button>
                  </div>
                </div>
                <div className="col-md-3 ">
                  <div className="creationForm">
                    <button type="submit" className="btn btn-primary btn-block" id="generatePowerpoint" onClick={this.returnPowerpoint.bind(this)}>Generate</button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <h3 className={this.state.errorStyle} role="alert">{this.state.errorMsg}</h3>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  {downloadLink}
                </div>
              </div>
            </div>
        );
    }
}

//ReactDom.render(<Index/>, document.getElementById('app'));