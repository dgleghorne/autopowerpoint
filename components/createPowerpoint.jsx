import React from 'react';
import ReactDom from 'react-dom';
import Datepanel from './datepanel.jsx'
import Titlepanel from './titlepanel.jsx'
import Readingspanel from './readingspanel.jsx'
import Songspanel from './songspanel.jsx'
import axios from 'axios'
import Utils from './Utils.jsx'
const FileDownload = require('js-file-download'); //May not be necessary
const downloader = require('file-downloader')  //May not be necessary

export default class CreatePowerpoint extends React.Component {
  constructor(props) {
      super(props);
      this.state ={
        errorMsg: "",
        errorStyle: "",
        downloadMessage: false,
        fileName: ""
      }
  }

  resetForm(){
    console.log("RESET FORM child")
    this.props.resetForm()
    this.setState({
      errorMsg: "",
      errorStyle: "",
      downloadMessage: false,
      fileName: ""
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
      speaker: this.props.speaker,
      title: this.props.title,
      morning: this.props.morning,
      noOfSongs: this.props.noOfSongs,
      reading1: this.props.reading1,
      reader1: this.props.reader1,
      pageNo1: this.props.pageNo1,
      reading2: this.props.reading2,
      reader2: this.props.reader2,
      pageNo2: this.props.pageNo2,
      songsArray: JSON.stringify(that.props.selectedSongsDetailsArray)
    }).then(function(response){
      that.setState({
        downloadMessage: true
      })
    })
    .catch(function(error){
      that.setState({
        errorMsg: "Error: Failure to generate Powerpoint",
        errorStyle: "alert alert-danger"
      })
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
        that.setState({
          errorMsg: "Error: Failure to download Powerpoint",
          errorStyle: "alert alert-danger"
        })
      }
    })
  }

  returnPowerpoint(){
    if(this.props.selectedSongsArray.length < this.props.noOfSongs){
      this.setState({
        errorMsg: "Error: You have not selected enough songs.  Please try again",
        errorStyle: "alert alert-danger"
      })
    } else{
      this.generatePowerpoint()
    }
  }

  render(){
    let downloadLink = null
    if(this.state.downloadMessage){
      downloadLink = <h3 className="alert alert-success" role="alert">Powerpoint has been generated.  <a href={"/download/" + this.state.fileName}>Download Powerpoint Here</a></h3>
    }
    return(
      <div className="container-fluid">
        <div className="row">
          <h2>Create Powerpoint</h2>
        </div>
          <div className="row">
            <Datepanel
              handleChangeDateParent={this.props.handleChangeDateParent.bind(this)} date={this.props.date}
              handleChangeMorningParent={this.props.handleChangeMorningParent.bind(this)} morning={this.props.morning}
            />
          </div>

          <div className="row">
            <Titlepanel
              handleChangeSpeakerParent={this.props.handleChangeSpeakerParent.bind(this)} speaker={this.props.speaker}
              handleChangeTitleParent={this.props.handleChangeTitleParent.bind(this)} title={this.props.title}
            />
          </div>

          <div className="row">
            <Readingspanel
              handleChangeReader1Parent={this.props.handleChangeReader1Parent.bind(this)} reader1={this.props.reader1}
              handleChangeReading1Parent={this.props.handleChangeReading1Parent.bind(this)} reading1={this.props.reading1}
              handleChangePageNo1Parent={this.props.handleChangePageNo1Parent.bind(this)} pageNo1={this.props.pageNo1}
              handleChangeReader2Parent={this.props.handleChangeReader2Parent.bind(this)} reader2={this.props.reader2}
              handleChangeReading2Parent={this.props.handleChangeReading2Parent.bind(this)} reading2={this.props.reading2}
              handleChangePageNo2Parent={this.props.handleChangePageNo2Parent.bind(this)} pageNo2={this.props.pageNo2}
            />
          </div>

          <div className="row">
            <Songspanel
              handleChangeNoOfSongsParent={this.props.handleChangeNoOfSongsParent.bind(this)} noOfSongs={this.props.noOfSongs}
              selectedSongsDetailsArray={this.props.selectedSongsDetailsArray}
              handleChangeSelectedSongsArrayParent={this.props.handleChangeSelectedSongsArrayParent.bind(this)} selectedSongsArray={this.props.selectedSongsArray}
              handleChangeSongsDetailsArrayParent={this.props.handleChangeSongsDetailsArrayParent.bind(this)}
            />
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
      )
  }
}
