'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import CreatePowerpoint from './createPowerpoint.jsx'
import AddEditSong from './addEditSong.jsx'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        // var today = this.getToday()

        this.state = {
          date: new Date(),
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
          selectedSongsDetailsArray: [],
          screen: "CreatePowerpoint",
          backgroundColour: "#ffffff",
          textColour: "#000000",
          interstitial: "colouredCrossBackground",
          welcomeSlide: "colouredCross"
        }
    }

    // getToday(){
    //   var today = new Date()
    //   today = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
    //   return this.formatDate(today)
    // }

    resetForm(){
      console.log("RESET FORM Parent")
      var today = this.getToday()
      this.setState({
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
        selectedSongsDetailsArray: [],
        screen: "CreatePowerpoint",
        backgroundColour: "darkBlue",
        textColour: "white",
        interstitial: "colouredCrossBackground",
        welcomeSlide: "colouredCross"
      })
    }

    formatDate(date){
        let month = date.getMonth()
        let year = date.getFullYear()
        let dayInMonth = date.getDate()
        let dayInWeek = date.getDay()

        return this.convertDayToString(dayInWeek) + " " + dayInMonth + this.returnOrdinalModifier(dayInMonth) + " " + this.convertMonthToString(month) + " " + year
    }

    returnOrdinalModifier(day){
        switch (day) {
            case 1: return "st"
            case 21: return "st"
            case 31: return "st"
            case 2: return "nd"
            case 22: return "nd"
            case 3: return "rd"
            case 23: return "rd"
            default: return "th"
        }
    }

    convertDayToString(dayValue){
        switch (dayValue) {
            case 0: return "Sunday"
            case 1: return "Monday"
            case 2: return "Tuesday"
            case 3: return "Wednesday"
            case 4: return "Thursday"
            case 5: return "Friday"
            case 6: return "Saturday"
        }
    }

    convertMonthToString(month){
        switch (month) {
            case 0: return "January"
            case 1: return "February"
            case 2: return "March"
            case 3: return "April"
            case 4: return "May"
            case 5: return "June"
            case 6: return "July"
            case 7: return "August"
            case 8: return "September"
            case 9: return "October"
            case 10: return "November"
            case 11: return "December"
        }
    }

    handleChangeSpeakerParent(speaker){
      this.setState({
        speaker: speaker
      })
    }

    handleChangeDateParent(date){
      this.setState({
        date: date
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

    handleChangeBackgroundColour(value){
      this.setState({
        backgroundColour: value.hex
      })
    }

    handleChangeTextColour(value){
      this.setState({
        textColour: value.hex
      })
    }

    handleChangeInterstitial(value){
      this.setState({
        interstitial: value
      })
    }

    handleChangeWelcomeSlide(value){
      this.setState({
        welcomeSlide: value
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

    setScreen(e){
      let screenName =  e.target.text.replace(/\s/g, '')
      this.setState({
        screen: screenName
      })
    }

    render() {
        return (
            <div className="container-fluid">
              <div className="row">
                <ul className="nav nav-tabs">
                  <li role="presentation" className={this.state.screen == "CreatePowerpoint" ? "active" : ""} onClick={this.setScreen.bind(this)}><a>Create Powerpoint</a></li>
                  <li role="presentation" className={this.state.screen == "Add/EditSong" ? "active" : ""} onClick={this.setScreen.bind(this)}><a>Add/Edit Song</a></li>
                  {/*<li role="presentation" className={this.state.screen == "Announcements" ? "active" : ""} onClick={this.setScreen.bind(this)}><a>Announcements</a></li>*/}
                </ul>
              </div>
              <div className="row">
                {this.state.screen == "CreatePowerpoint" ? <CreatePowerpoint
                  resetForm={this.resetForm.bind(this)}
                  date={this.state.date}
                  title={this.state.title}
                  morning={this.state.morning}
                  speaker={this.state.speaker}
                  reading1={this.state.reading1}
                  reader1={this.state.reader1}
                  pageNo1={this.state.pageNo1}
                  reading2={this.state.reading2}
                  reader2={this.state.reader2}
                  pageNo2={this.state.pageNo2}
                  noOfSongs={this.state.noOfSongs}
                  selectedSongsArray={this.state.selectedSongsArray}
                  selectedSongsDetailsArray={this.state.selectedSongsDetailsArray}
                  backgroundColour={this.state.backgroundColour}
                  textColour={this.state.textColour}
                  interstitial={this.state.interstitial}
                  welcomeSlide={this.state.welcomeSlide}
                  handleChangeDateParent={this.handleChangeDateParent.bind(this)}
                  handleChangeMorningParent={this.handleChangeMorningParent.bind(this)}
                  handleChangeSpeakerParent={this.handleChangeSpeakerParent.bind(this)}
                  handleChangeTitleParent={this.handleChangeTitleParent.bind(this)}
                  handleChangeReader1Parent={this.handleChangeReader1Parent.bind(this)}
                  handleChangeReading1Parent={this.handleChangeReading1Parent.bind(this)}
                  handleChangePageNo1Parent={this.handleChangePageNo1Parent.bind(this)}
                  handleChangeReader2Parent={this.handleChangeReader2Parent.bind(this)}
                  handleChangeReading2Parent={this.handleChangeReading2Parent.bind(this)}
                  handleChangePageNo2Parent={this.handleChangePageNo2Parent.bind(this)}
                  handleChangeNoOfSongsParent={this.handleChangeNoOfSongsParent.bind(this)}
                  handleChangeSelectedSongsArrayParent={this.handleChangeSelectedSongsArrayParent.bind(this)}
                  handleChangeSongsDetailsArrayParent={this.handleChangeSongsDetailsArrayParent.bind(this)}
                  handleChangeBackgroundColour={this.handleChangeBackgroundColour.bind(this)}
                  handleChangeTextColour={this.handleChangeTextColour.bind(this)}
                  handleChangeInterstitial={this.handleChangeInterstitial.bind(this)}
                  handleChangeWelcomeSlide={this.handleChangeWelcomeSlide.bind(this)}
                  formatDate={this.formatDate.bind(this)}
                  /> : null}
                  {this.state.screen == "Add/EditSong" ? <AddEditSong/> : null }
                  {this.state.screen == "Announcements" ? <p>Announcements</p> : null }
              </div>
            </div>
        );
    }
}

ReactDom.render(<Index/>, document.getElementById('app'));
