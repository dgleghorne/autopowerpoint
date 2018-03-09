'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


export default class Songspanel extends React.Component {
    constructor(props) {
        super(props);

        var songTypeArray = [
           {id: 1, type:"IPH"},
          //  {id: 2, type:"Psalms"},
          //  {id: 3, type:"Paraphrases"},
           {id: 4, type:"Other"}
        ]

        this.state = {
          songTypeSelection: 'na',
          selectedSong: 'na',
          songArray: [],
          songTypeArray: songTypeArray,
          idNo: 0,
          newSongTextarea: ""
        }
    }

    addSongToList(){
      var songArray = this.props.selectedSongsArray
      let length = songArray.length
      let noOfSongs = this.props.noOfSongs
      let idNo = this.state.idNo
      idNo++
      let selectedSong = JSON.parse(this.state.selectedSong)
      var song = {id: idNo, title: selectedSong.title}
      if(length >= noOfSongs){
        //error message
      }else {
        songArray.push(song)
        this.setState({
          idNo: idNo++
        })
        this.props.handleChangeSelectedSongsArrayParent(songArray)
        this.getSongDetails(song)
      }
    }

    getSongDetails(song){
      let that = this
      let selectedSongsArray = this.props.selectedSongsArray
      let selectedSongsDetailsArray = this.props.selectedSongsDetailsArray
      console.log("selectedSongsDetailsArray INITIAL", selectedSongsDetailsArray )
      console.log(song)
      $.ajax({
          url: '/songs/find/' + song.title,
            type: 'GET',
            cache: false,
            success: (data) => {
              console.log("DATA", data[0])
              console.log("selectedSongsDetailsArray BEFORE", selectedSongsDetailsArray )
              selectedSongsDetailsArray.push(data[0])
              console.log("selectedSongsDetailsArray AFTER", selectedSongsDetailsArray )
            }
        })
      this.props.handleChangeSongsDetailsArrayParent(selectedSongsDetailsArray)
    }

    handleChangeSongType(e){
      let that = this
        var typeSelection = e.target.value
        //Get song type data
        var directory;
        switch (typeSelection) {
            case 'IPH':
                directory ='IPH'
                break;
            case 'Psalms':
                directory = "Psalms";
                break;
            case "Paraphrases":
                directory = "Paraphrases";
                break;
            case "Other":
                directory = "Other";
                break;
        }
        let songArray = []
        $.ajax({
          url: '/songs/find/titles/' + directory,
            type: 'GET',
            cache: false,
            success: (data) => {
              console.log("DATA", data)
              console.log("directory", directory)
              songArray = data.map((obj, i) => {
                            obj.id = i
                            obj.title = obj.title
                            return obj;
                          })
              that.setState({
                songTypeSelection: typeSelection,
                songArray: songArray
              })
            }
        })
    }

    handleChangeSongTitle(e){
      this.setState({
        selectedSong: e.target.value
      })
    }

    handleChangeNewSongTextarea(e){
      this.setState({
        newSongTextarea: e.target.value
      })
    }

    handleChangeNoOfSongs(e){
      this.props.handleChangeNoOfSongsParent(e.target.value)
    }

    removeSong(e){
      console.log("REMOVE", e.target.value)
    }

    editButtonFormatter(cell, row){
      return <button type="button" className="btn btn-danger">Remove <span className="glyphicon glyphicon-trash"></span></button>
    }

    compareSongs(a, b){
      if(a.title.includes('IPH')){
        return a.title.replace('IPH ', '').split('-')[0] - b.title.replace('IPH ', '').split('-')[0]
      } else if (a.title.includes('Psalm')){
        return a.title.replace('Psalm ', '').split(' ')[0] - b.title.replace('Psalm ', '').split(' ')[0]
      } else if(a.title.includes('Paraphrase')){
        return a.title.replace('Paraphrase ', '').split(' ')[0] - b.title.replace('Paraphrase ', '').split(' ')[0]
      } else {
        return (a.title.toUpperCase() < b.title.toUpperCase()) ? -1 : (a.title.toUpperCase() > b.title.toUpperCase()) ? 1 : 0;
      }
    }

    render() {
      var rows = this.props.selectedSongsArray
      return(
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Songs</h3>
          </div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="noOfSongsInput">Number of Songs</label>
                <select className="form-control" id="noOfSongsInput" value={this.props.noOfSongs} onChange={this.handleChangeNoOfSongs.bind(this)}>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              {/*<div className="col-md-3">
                <label htmlFor="addNewSong"></label>
                <button type="submit" className="btn btn-primary btn-block" id="addNewSong" data-toggle="modal" data-target="#newSongModal">Add New Song to DB <span className="glyphicon glyphicon-circle-arrow-up"></span></button>
              </div>*/}
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
                      this.state.songArray.sort(this.compareSongs).map(function(song) {
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
                  <TableHeaderColumn width="70%" dataField='title'>Title</TableHeaderColumn>
                  {/*<TableHeaderColumn width="20%" dataField='button' dataFormat={this.editButtonFormatter}><span className="glyphicon glyphicon-cog"></span></TableHeaderColumn>*/}
                </BootstrapTable>
              </div>
            </div>
          </div>
        </div>
      )
    }
}
