'use strict';

import React from 'react';
import ReactDom from 'react-dom';

export default class Songspanel extends React.Component {
    constructor(props) {
        super(props);

        var songTypeArray = [
          {id: 1, type:"IPH"}, {id: 2, type:"Psalms"}, {id: 3, type:"Paraphrases"}, {id: 4, type:"Other"}
        ]

        this.state = {
          songTypeSelection: 'na',
          selectedSong: 'na',
          selectedSongsArray: [],
          songArray: [],
          songTypeArray: songTypeArray,
          noOfSongs: props.noOfSongs,
          idNo: 0
        }
    }

    addSongToList(){
      var songArray = this.state.selectedSongsArray
      let length = songArray.length
      let noOfSongs = this.state.noOfSongs
      let idNo = this.state.idNo
      idNo++
      let selectedSong = JSON.parse(this.state.selectedSong)
      var song = {id: idNo, name: selectedSong.title, filename: selectedSong.filename}
      if(length >= noOfSongs){
        //error message
      }else {
        songArray.push(song)
        this.setState({
          selectedSongsArray: songArray,
          idNo: idNo++
        })
        this.props.handleChangeSelectedSongsArrayParent(this.state.selectedSongsArray)
      }
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
        let songArray = []
        $.ajax({
          url: '/getAllFileNamesFromDirectory',
            directory: directory,
            type: 'GET',
            cache: false,
            success: (data) => {
              console.log("DATA", data)
              songArray = data.map((obj, i) => {
                            obj.id = i
                            obj.title = obj.title + " - " + obj.firstLine
                            obj.filename = obj.filename
                            return obj;
                          })
              console.log(songArray)
              that.setState({
                songTypeSelection: typeSelection,
                songArray: songArray
              })
            }

        })

    }

    handleChangeSongTitle(e){
      console.log("etv", e.target.value)
      this.setState({
        selectedSong: e.target.value
      })
    }

    handleChangeNoOfSongs(e){
      this.setState({
        noOfSongs: e.target.value
      })
      this.props.handleChangeNoOfSongsParent(e.target.value)
    }

    editButtonFormatter(cell, row){
      return <button type="button" className="btn btn-danger" >Remove <span className="glyphicon glyphicon-trash"></span></button>
    }

    render() {
      var rows = this.state.selectedSongsArray
      return(
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
                  <select className="form-control" id="songTitleInput" value={this.state.selectedSong} onChange={this.handleChangeSongTitle.bind(this)}>
                    <option value="na">--Select Song Type First--</option>
                      {
                        this.state.songArray.map(function(song) {
                          return <option key={song.id}
                            value={JSON.stringify(song)}>{song.title}</option>;
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
      )
    }
}
