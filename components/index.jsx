'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios'
import Utils from './Utils.jsx'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
const FileDownload = require('react-file-download');

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        var today = new Date()
        today = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()

        var songTypeArray = [
          {id: 1, type:"IPH"}, {id: 2, type:"Psalms"}, {id: 3, type:"Paraphrases"}, {id: 4, type:"Other"}
        ]

        this.state = {
          fileName: "myPowerpointII",
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
          slideText: "Any song, my song",
          songTypeSelection: 'na',
          selectedSongTitle: 'na',
          selectedSongsArray: [],
          songTitleArray: [],
          songTypeArray: songTypeArray
        }
    }

    // componentDidMount(){
    //   $(function () {
    //     $('#datetimepicker1').datetimepicker();
    //   });
    // }

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

    handleChangeSongType(e){
      let that = this
        var typeSelection = e.target.value
        //Get song type data
        var directory;
        switch (typeSelection) {
            case 'IPH':
                directory = "./public/songs/IPH/";
                break;
            case 'Psalms':
                directory = "./public/songs/Psalms/";
                break;
            case "Paraphrases":
                directory = "./public/songs/Paraphrases/";
                break;
            case "Other":
                directory = "./public/songs/Other/";
                break;
        }
        var firstlineStrings = []
        $.ajax({
          url: '/getAllFileNamesFromDirectory',
          data: {
            directory: directory,
            type: 'GET',
            cache: false,
            success: (data) => {
              console.log("DATA", data)
              that.setState({
                result: data
              })
            }
          }
        })
        let titleArray = []
        this.setState({
          songTypeSelection: typeSelection,
          songTitleArray: titleArray
        })
        // var titleArray = firstlineStrings.map(function(string, index) {
        //   return {id:index, title: string}
        // })
        //var temp = [{id:1, title: "test"}, {id:2, title: "test2"}]


    }



    getAllFileNamesFromDirectory(directory){
      let that = this
      let result
      // let result = axios.get('/getAllFileNamesFromDirectory', {
      //   params:{
      //     directory: directory
      //   }
      // }).then(function(response){
      //   console.log("response", response)
      //   callback(response)
      // })
      // .catch(function(error){
      //   console.log("error", error);
      //   result = []
      // })

      console.log("RESULT", that.state.result)
    }

    handleChangeSongTitle(e){
      this.setState({
        selectedSongTitle: e.target.value
      })
    }

    addSongToList(){
      var songArray = this.state.selectedSongsArray
      if(songArray.length > this.state.noOfSongs){
        //error message
      }else {
        songArray.push(this.state.song)
      }
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

    editButtonFormatter(cell, row){
      return '<button type="button" class="btn btn-danger">Remove <span class="glyphicon glyphicon-trash"></span></button>'
    }


    //var rows = [{id:1, name: "Name"}, {id:2, name: "Nom"}]

    render() {
      var rows = this.state.selectedSongsArray
        return (
            <div className="container-fluid">
              <div className="row">
                <h2>Create Powerpoint</h2>
              </div>
              <div className="row">
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
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="panel panel-primary">
                    <div className="panel-heading">
                      <h3 className="panel-title">Title</h3>
                    </div>
                      <div className="panel-body">
                        <div className="col-md-4">
                          <label htmlFor="speakerInput">Speaker</label>
                          <input type='text'className="form-control" id="speakerInput" onChange={this.handleChangeSpeaker.bind(this)}></input>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="titleInput">Title</label>
                          <input type='text'className="form-control" id="titleInput" onChange={this.handleChangeTitle.bind(this)}></input>
                        </div>
                      </div>
                  </div>
                </div>

                <div className="row">
                  <div className="panel panel-primary">
                    <div className="panel-heading">
                      <h3 className="panel-title">Readings</h3>
                    </div>
                      <div className="panel-body">
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
                        <br/>
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
                      </div>
                  </div>
                </div>

                <div className="row">
                  <div className="panel panel-primary">
                    <div className="panel-heading">
                      <h3 className="panel-title">Songs</h3>
                    </div>
                      <div className="panel-body">
                        <div className="row">
                          <div className="col-md-4">
                            <label htmlFor="noOfSongsInput">Number of Songs</label>
                            <select className="form-control" id="noOfSongsInput" value={this.state.noOfSongs} onChange={this.handleChangeNoOfSongs.bind(this)}>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                          </div>
                          <div className="col-md-3">
                            <label htmlFor="addNewSong"></label>
                            <button type="submit" className="btn btn-primary btn-block" id="addNewSong" onClick={this.addSongToList.bind(this)}>Add New Song to DB <span className="glyphicon glyphicon-circle-arrow-up"></span></button>
                          </div>
                        </div>
                      <br/>
                        <div className="row">
                          <div className="col-md-3">
                            <label htmlFor="songTypeInput">Type</label>
                            <select className="form-control" id="songTypeInput" value={this.state.songTypeSelection} onChange={this.handleChangeSongType.bind(this)}>
                              <option value="na">--Please select song type--</option>
                                {
                                  this.state.songTypeArray.map(function(song) {
                                    return <option key={song.id}
                                      value={song.type}>{song.type}</option>;
                                  })
                                }
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="songTitleInput">Title</label>
                            <select className="form-control" id="songTitleInput" value={this.state.selectedSongTitle} onChange={this.handleChangeSongTitle.bind(this)}>
                              <option value="na">--Select Song Type First--</option>
                                {
                                  this.state.songTitleArray.map(function(song) {
                                    return <option key={song.id}
                                      value={song.title}>{song.title}</option>;
                                  })
                                }
                            </select>
                          </div>
                          <div className="col-md-3">
                            <label htmlFor="addSong"></label>
                            <button type="submit" className="btn btn-success btn-block" id="addSong" onClick={this.addSongToList.bind(this)}>Add to presentation <span className="glyphicon glyphicon-plus-sign"></span></button>
                          </div>
                        </div>
                        <br/>
                        <div className="row">
                          <div className="col-md-12">
                            <BootstrapTable data={rows} striped hover>
                              <TableHeaderColumn width="10%" isKey dataField='id'>Song No.</TableHeaderColumn>
                              <TableHeaderColumn width="70%" dataField='name'>Title</TableHeaderColumn>
                              <TableHeaderColumn width="20%" dataField='button' dataFormat={this.editButtonFormatter}><span className="glyphicon glyphicon-cog"></span></TableHeaderColumn>
                            </BootstrapTable>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              <br/>
              <div className="row">
                <div className="col-md-3 col-md-offset-9">
                  <div className="creationForm">
                      <button type="submit" className="btn btn-primary btn-block" id="generatePowerpoint" onClick={this.returnPowerpoint.bind(this)}>Generate</button>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

ReactDom.render(<Index/>, document.getElementById('app'));
