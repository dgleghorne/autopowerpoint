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
        this.state = {
          fileName: "Powerpoint " + today + '.pptx',
          date: today,
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
          errorStyle: ""
        }
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

    generatePowerpoint(){
      let that = this
      axios.post('/generatePowerpoint', {
        fileName: this.state.fileName,
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
        songsArray: JSON.stringify(this.state.selectedSongsArray)
      }).then(function(response){
        console.log(response);
      })
      .catch(function(error){
        console.log(error);
      })
    }

    downloadPowerpoint(){
      var that = this
      var filename = that.state.fileName

      // downloader.get('./public/presentations/' + filename, filename)
      // .then(function (filename) {
      //   console.log("File " + filename + " has been downloaded!");
      // });

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

      // axios.get('/downloadpowerpoint/', {
      //   params:{
      //     filename: filename
      //   }
      // }).then(function(response){
      //   console.log(response);
      //   console.log(filename);
      //   FileDownload(response.data, filename);
      // })
      // .catch(function(error){
      //   console.log(error);
      //   console.log(filename);
      // })
    }

    returnPowerpoint(){
      console.log(this.state.selectedSongsArray.length)
      console.log(this.state.noOfSongs)
      if(this.state.selectedSongsArray.length < this.state.noOfSongs){
        this.setState({
          errorMsg: "Error: You have not selected enough songs.  Please try again",
          errorStyle: "alert alert-danger"
        })
      } else{
        this.generatePowerpoint()
        //this.downloadPowerpoint()
      }
    }

    render() {
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
                  <Songspanel handleChangeNoOfSongsParent={this.handleChangeNoOfSongsParent.bind(this)} noOfSongs={this.state.noOfSongs} handleChangeSelectedSongsArrayParent={this.handleChangeSelectedSongsArrayParent.bind(this)}/>
                </div>
              <br/>
              <div className="row">
                <div className="col-md-3 col-md-offset-9">
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
                  <a href="/download/myPowerpointII">Download link</a>
                </div>
              </div>
            </div>
        );
    }
}

ReactDom.render(<Index/>, document.getElementById('app'));
