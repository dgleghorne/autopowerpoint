import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios'
import Toggle from 'react-bootstrap-toggle';
import "react-bootstrap-toggle/dist/bootstrap2-toggle.css";
import Modal from 'react-modal';

export default class AddEditSong extends React.Component {
  constructor(props) {
      super(props);
      var songTypeArray = [
         {id: 1, type:"IPH"},
         {id: 2, type:"Psalms"},
         {id: 3, type:"Paraphrases"},
         {id: 4, type:"Other"}
      ]
      this.state = {
        title: "",
        CCLI: "CCLI 128675",
        chorus: "",
        verses: [],
        position: "",
        verseContents: [""],
        songArray: [],
        songTypeSelection: 'na',
        selectedSong: 'na',
        songTypeArray: songTypeArray,
        errorMsg: "",
        errorStyle: "",
        successMsg: "",
        succesStyle: "",
        selectedSongId: "",
          modalIsOpen: false,
          modalMessage: ""
      }
  }

  returnAllSongsByType(e){
    var that = this
    var typeSelection = e.target.value
    //Get song type data
    var type;
    switch (typeSelection) {
        case 'IPH':
            type ='IPH'
            break;
        case 'Psalms':
            type = "Psalms";
            break;
        case "Paraphrases":
            type = "Paraphrases";
            break;
        case "Other":
            type = "Other";
            break;
    }
    let songArray = []
    $.ajax({
      url: '/songs/find/titles/' + type,
        type: 'GET',
        cache: false,
        success: (data) => {
          console.log(data)
          songArray = data.map((obj, i) => {
                        obj.id = i
                        obj.title = obj.title
                        return obj;
                      })
          that.setState({
            songArray: songArray,
            songTypeSelection: type
          })
        }
    })
  }

  changeTitle(e){
    this.setState({
      title: e.target.value
    })
  }

  changeFilename(e){
    this.setState({
      filename: e.target.value
    })
  }

  changeChorus(e){
    this.setState({
      chorus: e.target.value
    })
  }

  changeCCLI(e){
    this.setState({
      CCLI: e.target.value
    })
  }

  changeVerse(i, e){
    let verses = this.state.verseContents
    verses[i] = e.target.value
    this.setState({
      verseContents: verses
    })
  }

  changePosition(e){
    this.setState({
        position: e === true ? "before" : ""
    })
  }

  getVerseContents(verses){
    let verseContents = []
      verses.forEach((verse, i) =>{
      let thisVerseContents = ""
      verse.lines.forEach((line) => {
        thisVerseContents += line + '\n'
      })
      verseContents.push(thisVerseContents)
    })

    this.setState({
      verseContents: verseContents
    })
  }

  deleteVerse(i, e){
    let verses = this.state.verseContents
    verses.splice(i, 1)
    this.setState({
      verseContents: verses
    })
  }

  addNewVerse(i, e){
    let verses = this.state.verseContents
    verses.splice(i+1, 0, "")
    this.setState({
      verseContents: verses
    })
  }

  displayVerseBoxes(){
    let outputLines = []
    this.state.verseContents.forEach((verse, i) => {
      outputLines.push(<div className="row"><div className="col-md-8"><textarea className="form-control" rows="5" id={"verse" + i} value={this.state.verseContents[i]} onChange={this.changeVerse.bind(this, i)}></textarea></div> <div className="col-md-2"><button type="button" className="btn btn-danger" onClick={this.deleteVerse.bind(this, i)}>Delete Verse</button></div><div className="col-md-2"><button type="button" className="btn btn-success" onClick={this.addNewVerse.bind(this, i)}>Add New Verse</button></div></div>)
    })

    return (
      <div>
        {outputLines}
      </div>
    )
  }

  convertToLineObject(verse){
    let lineArray = verse.toString().replace('\r', '').split('\n');
    lineArray.forEach((line, i) => {
      if(line.length == 0){
        lineArray.splice(i, 1)
      }
    })
    return {
      "lines": lineArray
    }
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

  handleChangeSongTitle(e){
    this.setState({
      selectedSong: e.target.value
    })
    let that = this
    let url = '/songs/find/' + e.target.value
    console.log("url",url);
    $.ajax({
        url: url,
          type: 'GET',
          cache: false,
          success: (data) => {
            console.log("DATA", data)
            that.setState({
              title: data[0].title,
              chorus: data[0].chorus,
              verses: data[0].verses,
              CCLI: data[0].CCLI,
              position: data[0].position,
              selectedSongId: data[0].id
            })
            this.getVerseContents(data[0].verses)
          }
      })
  }

  noSongSelected(){
    if(this.state.selectedSong == 'na'){
      console.log("selectedSong")
      if( this.state.title == ""){
        console.log("title")
        return true
      }
    } else {
      return false
    }
  }

  saveSong(){
    if(this.noSongSelected()){
      this.setState({
        errorMsg: "Error: No values selected.  Please try again",
        errorStyle: "alert alert-danger"
      })
    } else {
      let verses = []
      this.state.verseContents.forEach((verse) => {
        verses.push(this.convertToLineObject(verse))
      })
      let that = this

      axios.post('/songs/update/'+ that.state.selectedSong, {
        title: that.state.title,
        CCLI: that.state.CCLI,
        chorus: that.state.chorus,
        verses: verses,
        type: that.state.songTypeSelection,
        position: that.state.position
      }).then(function(response){
        console.log(response.status);
        let status = that.state.selectedSong == 'na' ? "added" : "updated"
        that.setState({
          succesStyle: "alert alert-success",
          successMsg: "Song " + that.state.title + " has been " + status
        })
      })
      .catch(function(error){
        console.log(error);
        that.setState({
          errorMsg: "Error: Update has failed.  Please try again",
          errorStyle: "alert alert-danger"
        })
      })
    }
  }

  openModal() {
      this.setState({modalIsOpen: true});
  }

  closeModal() {
      this.setState({
          modalIsOpen: false,
          modalMessage: ""
      });
  }

  deleteSongFromDB(){
      let that = this
      let url = '/songs/remove/id' + this.state.selectedSongId
      let deletedSongTitle = this.state.title
      console.log("url",url);
      $.ajax({
          url: url,
          type: 'DELETE',
          cache: false,
          success: (data) => {
              console.log("DATA", data)
              that.setState({
                  title: "",
                  CCLI: "CCLI 128675",
                  chorus: "",
                  verses: [],
                  position: "",
                  verseContents: [""],
                  songArray: [],
                  songTypeSelection: 'na',
                  selectedSong: 'na',
                  songTypeArray: songTypeArray,
                  errorMsg: "",
                  errorStyle: "",
                  successMsg: "",
                  succesStyle: "",
                  selectedSongId: "",
                  modalMessage: deletedSongTitle + " has been deleted from the database"
              })
          },
          error: (err) => {
              that.setState({
                  modalMessage: deletedSongTitle + " has failed to delete from the database"
              })
          }
      })
  }


//value={this.state.songTypeSelection} onChange={this.handleChangeSongType.bind(this)}
//                <button className="btn btn-primary" type="button" onClick={this.returnSongs.bind(this)}>Update</button>

  render(){

      const modalStyles = {
          content : {
              top                   : '50%',
              left                  : '50%',
              right                 : '70%',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)',
              border: "0px",
              background: ""

          }
      };

    return(
      <div className="container-fluid">
        <div className="row">
          <h2>Add/Edit Song</h2>
        </div>
        <div className="row">
          <div className="panel panel-primary">
              <div className="panel-heading">
                  <h3 className="panel-title">Select Song</h3>
              </div>
              <div className="panel-body">
                  <div className="col-md-3">
                      <label htmlFor="songTypeInput">Type</label>
                      <select className="form-control" id="songTypeInput" value={this.state.songTypeSelection} onChange={this.returnAllSongsByType.bind(this)}>
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
                      <label htmlFor="songTitleInput">Title (leave at default to add a new song)</label>
                      <select className="form-control" id="songTitleInput"value={this.state.selectedSong} onChange={this.handleChangeSongTitle.bind(this)}>
                          <option value="na">--Select Song Type First--</option>
                          {
                              this.state.songArray.sort(this.compareSongs).map(function(song) {
                                  return <option key={song.id}
                                                 value={song.title}>{song.title}</option>;
                              })
                          }
                      </select>
                  </div>
                  <div className="col-md-3 ">
                      <label htmlFor="deleteSongButton">Delete Song</label>
                      <button className="btn btn-danger btn-block" id="deleteSongButton" onClick={this.openModal.bind(this)} disabled={this.state.selectedSongId === ""}>Delete This Song</button>
                  </div>
              </div>
          </div>
        </div>
        <div className="row">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Edit Song</h3>
                </div>
                <div className="panel-body">
                    <div className="col-md-12">
                        <label htmlFor="title">New Title:</label>
                        <textarea className="form-control" rows="1" id="title" value={this.state.title} onChange={this.changeTitle.bind(this)}></textarea>
                        <label htmlFor="verse0">Verses:</label>
                        {this.displayVerseBoxes()}
                        <label htmlFor="chorus">Chorus:</label>
                        <div className="row">
                            <div className="col-md-8">
                              <textarea className="form-control" rows="5" id="chorus" value={this.state.chorus} onChange={this.changeChorus.bind(this)}></textarea>
                            </div>
                            <div className="col-md-4">
                              <label htmlFor="chorusPositionToggle">Chorus Frequency (will always show after each verse)</label>
                              <div className='row'>
                                <div className="col-md-12">
                                    <Toggle
                                        on="Show Before First Verse Too"
                                        off="Show After Each Verse Only"
                                        active={this.state.position === "before" ? true : false}
                                        onClick={this.changePosition.bind(this)}
                                    />
                                </div>
                              </div>
                            </div>
                        </div>
                        <label htmlFor="CCLI">CCLI:</label>
                        <textarea className="form-control" rows="1" id="CCLI" value={this.state.CCLI} onChange={this.changeCCLI.bind(this)}></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
          <div className="col-md-offset-11">
              <button type="button" className="btn btn-primary" onClick={this.saveSong.bind(this)}>Save</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h3 className={this.state.errorStyle} role="alert">{this.state.errorMsg}</h3>
            <h3 className={this.state.succesStyle} role="alert">{this.state.successMsg}</h3>
          </div>
        </div>
          <div>
              <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal.bind(this)}
                style={modalStyles}
                contentLabel="Example Modal"
              >
                  <div className="panel panel-primary">
                      <div className="panel-heading">
                          <h3 className="panel-title">Deletion Confirmation</h3>
                      </div>
                      <div className="panel-body">
                          {this.state.modalMessage === "" ?
                              <div>
                                  <div className="row">
                                      <div className="col-md-offset-1 col-md-11">
                                          <p>Do you want to delete this song from the database?</p>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-md-offset-2 col-md-3">
                                          <button type="button" className="btn btn-danger"
                                                  onClick={this.deleteSongFromDB.bind(this)}>Delete
                                          </button>
                                      </div>
                                      <div className="col-md-offset-1 col-md-3">
                                          <button type="button" className="btn btn-primary"
                                                  onClick={this.closeModal.bind(this)}>Cancel
                                          </button>
                                      </div>
                                  </div>
                              </div> :
                              <div>
                                  <div className="row">
                                      <div className="col-md-offset-1 col-md-11">
                                          <p>{this.state.modalMessage}</p>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-md-offset-4 col-md-3">
                                          <button type="button" className="btn btn-primary"
                                                  onClick={this.closeModal.bind(this)}>Close
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          }
                      </div>
                  </div>

              </Modal>
          </div>
      </div>
    )
  }
}
