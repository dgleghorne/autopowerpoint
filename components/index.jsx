'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios'
import Utils from './Utils.jsx'
const FileDownload = require('react-file-download');

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        var today = new Date()
        today = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()

        this.state = {
          fileName: "myPowerpoint2",
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
          songs: [],
          slideText: "Any song, my song"
        }
    }

    componentDidMount(){
      $('#dateInput').datepicker({format: 'dd-mm-yyyy', orientation: 'bottom auto', autoclose: true, todayHighlight: true})
      $(function() {
        $('[data-toggle="tooltip"]').tooltip()
      })
    }

    handleChangeDate(e){
      this.setState({
        date: e.target.value
      })
    }

    handleChangeSpeaker(e){
      this.setState({
        speaker: e.target.value
      })
    }

    handleChangeTitle(e){
      this.setState({
        title: e.target.value
      })
    }

    handleChangeMorning(e){
      this.setState({
        morning: e.target.value
      })
    }

    handleChangeNoOfSongs(e){
      this.setState({
        noOfSongs: e.target.value
      })
    }

    handleChangeReading1(e){
      this.setState({
        reading1: e.target.value
      })
    }

    handleChangeReader1(e){
      this.setState({
        reader1: e.target.value
      })
    }

    handleChangePageNo1(e){
      this.setState({
        pageNo1: e.target.value
      })
    }

    handleChangeReading2(e){
      this.setState({
        reading2: e.target.value
      })
    }

    handleChangeReader2(e){
      this.setState({
        reader2: e.target.value
      })
    }

    handleChangePageNo2(e){
      this.setState({
        pageNo2: e.target.value
      })
    }

    generatePowerpoint(){
      let that = this
      axios.post('/generatePowerpoint', {
        fileName: this.state.fileName,
        slideText: this.state.slideText
      }).then(function(response){
        console.log(response);
      })
      .catch(function(error){
        console.log(error);
      })
    }

    downloadPowerpoint(){
      var that = this
      var filename = that.state.fileName + '.pptx'
      axios.get('/downloadpowerpoint', {
        params:{
          fileName: filename
        }
      }).then(function(response){
        console.log(response);
        console.log(filename);
        FileDownload(response.data, filename);
      })
      .catch(function(error){
        console.log(error);
        console.log(filename);
      })
    }

    returnPowerpoint(){
      this.generatePowerpoint()
      this.downloadPowerpoint()
    }


    // <form className="form-inline" method="POST" action='/generatePowerpoint'>
    //     <input type='hidden' name='fileName' value={this.state.fileName}/>
    //     <input type='hidden' name='slideText' value={this.state.slideText}/>
    //     <button type="submit" className="btn btn-primary btn-block" id="generatePowerpoint">Generate</button>
    // </form>

    render() {
        return (
            <div className="container-fluid">

              <div className="row">
                <h2>Create Powerpoint</h2>
                <div className="col-md-4">
                  <label htmlFor="dateInput">Date</label>
                  <div className='input-group date'>
                    <input type='text'className="form-control" id="dateInput" value={this.state.date} onChange={this.handleChangeDate.bind(this)}></input>
                    <div className="input-group-addon">
                      <span className="glyphicon glyphicon-calendar"></span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className= "row">
                    <label htmlFor="morningInput">AM/PM</label>
                      <div className="radio" id="morningInput">
                        <label><input type="radio" name="optradio"></input>AM</label>
                        <span>  </span>
                        <label><input type="radio" name="optradio"></input>PM</label>
                      </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <label htmlFor="speakerInput">Speaker</label>
                  <input type='text'className="form-control" id="speakerInput" onChange={this.handleChangeSpeaker.bind(this)}></input>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="titleInput">Title</label>
                  <input type='text'className="form-control" id="titleInput" onChange={this.handleChangeTitle.bind(this)}></input>
                </div>
                <div className="col-md-4">
                  <label htmlFor="noOfSongsInput">Songs</label>
                  <select className="form-control" id="noOfSongsInput" onChange={this.handleChangeNoOfSongs.bind(this)}>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>

              <div className= "row">
                <div className="col-md-4">
                  <label htmlFor="reading1Input">Reading 1</label>
                  <input type='text'className="form-control" id="reading1Input" onChange={this.handleChangeReading1.bind(this)}></input>
                </div>
                <div className="col-md-4">
                  <label htmlFor="reader1Input">Reader 1</label>
                  <input type='text'className="form-control" id="reader1Input" onChange={this.handleChangeReader1.bind(this)}></input>
                </div>
                <div className="col-md-4">
                  <label htmlFor="pageNo1Input">Reading 1 Page Number</label>
                  <input type='text'className="form-control" id="pageNo1Input" onChange={this.handleChangePageNo1.bind(this)}></input>
                </div>
              </div>

              <div className= "row">
                <div className="col-md-4">
                  <label htmlFor="reading2Input">Reading 2</label>
                  <input type='text'className="form-control" id="reading2Input" onChange={this.handleChangeReading2.bind(this)}></input>
                </div>
                <div className="col-md-4">
                  <label htmlFor="reader2Input">Reader 2</label>
                  <input type='text'className="form-control" id="reader2Input" onChange={this.handleChangeReader2.bind(this)}></input>
                </div>
                <div className="col-md-4">
                  <label htmlFor="pageNo2Input">Reading 2 Page Number</label>
                  <input type='text'className="form-control" id="pageNo2Input" onChange={this.handleChangePageNo2.bind(this)}></input>
                </div>
              </div>

              <br/>
              <div className="row">
                <div className="creationForm">
                    <button type="submit" className="btn btn-primary btn-block" id="generatePowerpoint" onClick={this.returnPowerpoint.bind(this)}>Generate</button>
                </div>
              </div>
            </div>
        );
    }
}

ReactDom.render(<Index/>, document.getElementById('app'));
