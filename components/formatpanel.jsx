'use strict';

import React from 'react';
import ReactDom from 'react-dom';

export default class Formatpanel extends React.Component {
    constructor(props) {
        super(props);
    }


    handleChangeBackgroundColour(e){
      this.props.handleChangeBackgroundColour(e.target.id)
      let selectboxes = document.getElementsByClassName("selectbox")
      for (var i = 0; i < selectboxes.length; i++) {
        selectboxes[i].style.border = "1px solid #dddddd"
      }
      document.getElementById(e.target.id + "Parent").style.border = "1px solid #333"
    }

    handleChangeTextColour(e){
      this.props.handleChangeTextColour(e.target.value)
    }

    handleChangeInterstitial(e){
      this.props.handleChangeInterstitial(e.target.value)
    }

    handleChangeWelcomeSlide(e){
      this.props.handleChangeWelcomeSlide(e.target.value)
    }

    render() {
      return(
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Formatting</h3>
          </div>
          <div className="panel-body">
            <div className="col-md-3">
              <label htmlFor="backgroundColourInput">Background Colour</label>
              <br/>
              <div className="selectbox" id="darkBlueParent" style={{ border: "1px solid #dddddd", display: "inline-block", cursor: "pointer"}}><span id="darkBlue" style={{backgroundColor:"darkBlue", padding: "10px",  border: "2px solid #fff",  display: "inline-block", verticalAlign: "middle"}} onClick={this.handleChangeBackgroundColour.bind(this)}></span></div>
              <div className="selectbox" id="lightSkyBlueParent" style={{ border: "1px solid #dddddd", display: "inline-block", cursor: "pointer"}}><span id="lightSkyBlue" style={{backgroundColor:"lightSkyBlue", padding: "10px",  border: "2px solid #fff",  display: "inline-block", verticalAlign: "middle"}} onClick={this.handleChangeBackgroundColour.bind(this)}></span></div>
              <div className="selectbox" id="whiteParent" style={{ border: "1px solid #333", display: "inline-block", cursor: "pointer"}}><span id="white" style={{backgroundColor:"white", padding: "10px",  border: "2px solid #fff",  display: "inline-block", verticalAlign: "middle"}} onClick={this.handleChangeBackgroundColour.bind(this)}></span></div>
            </div>
            <div className="col-md-3">
              <label htmlFor="textColourInput">Text Colour</label>
              <select id="textColourInput" className="form-control" style={{background: this.props.backgroundColour, color: this.props.textColour}} value={this.props.textColour} onChange={this.handleChangeTextColour.bind(this)}>
                <option value="white" style={{background: this.props.backgroundColour, color: "white"}}>White</option>
                <option value="black" style={{background: this.props.backgroundColour, color: "black"}}>Black</option>
                <option value="yellow" style={{background: this.props.backgroundColour, color: "yellow"}} >Yellow</option>
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="interstitialInput">Interstitial</label>
              <select id="interstitialInput" className="form-control"  value={this.props.interstitial} onChange={this.handleChangeInterstitial.bind(this)}>
                <option value="blueCrossBackground">Blue Cross Background</option>
                <option value="colouredCrossBackground">Coloured Cross Background</option>
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="welcomeSlideInput">Welcome Slide</label>
              <select id="welcomeSlideInput" className="form-control"  value={this.props.welcomeSlide} onChange={this.handleChangeWelcomeSlide.bind(this)}>
                <option value="churchPicture">Church Picture</option>
                <option value="colouredCross">Coloured Cross</option>
              </select>
            </div>
          </div>
        </div>
      )
    }

}
