'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { CirclePicker } from 'react-color';

export default class Formatpanel extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChangeBackgroundColour(e){
      this.props.handleChangeBackgroundColour(e)
    }

    handleChangeTextColour(e){
      this.props.handleChangeTextColour(e)
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
              {/*<div className="selectbox" id="darkBlueParent" style={{ border: "1px solid #dddddd", display: "inline-block", cursor: "pointer"}}><span id="darkBlue" style={{backgroundColor:"darkBlue", padding: "10px",  border: "2px solid #fff",  display: "inline-block", verticalAlign: "middle"}} onClick={this.handleChangeBackgroundColour.bind(this)}></span></div>*/}
              {/*<div className="selectbox" id="lightSkyBlueParent" style={{ border: "1px solid #dddddd", display: "inline-block", cursor: "pointer"}}><span id="lightSkyBlue" style={{backgroundColor:"lightSkyBlue", padding: "10px",  border: "2px solid #fff",  display: "inline-block", verticalAlign: "middle"}} onClick={this.handleChangeBackgroundColour.bind(this)}></span></div>*/}
              {/*<div className="selectbox" id="whiteParent" style={{ border: "1px solid #333", display: "inline-block", cursor: "pointer"}}><span id="white" style={{backgroundColor:"white", padding: "10px",  border: "2px solid #fff",  display: "inline-block", verticalAlign: "middle"}} onClick={this.handleChangeBackgroundColour.bind(this)}></span></div>*/}
            <CirclePicker
                color={ this.props.backgroundColour }
                onChangeComplete={ this.handleChangeBackgroundColour.bind(this)}
                colors = {["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#ffffff", "#607d8b"]}
            />
            </div>
            <div className="col-md-3">
              <label htmlFor="textColourInput">Text Colour</label>
              <input type='text'className="form-control"  value="Preview Text" id="textColourInput" readOnly style={{background: this.props.backgroundColour, color: this.props.textColour}}></input>
              <CirclePicker
                color={ this.props.textColour }
                onChangeComplete={ this.handleChangeTextColour.bind(this)}
                colors = {["#000000", "#ffffff", "#C00000", "#ff0000", "#FFC000", "#ffff00", "#92D050", "#00B050", "#00B0F0", "#0070C0", "#002060", "#7030A0"]}
              />
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
