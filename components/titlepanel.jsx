'use strict';

import React from 'react';
import ReactDom from 'react-dom';

export default class Titlepanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          speaker: "<Insert Speaker's Name Here>",
          title: "<Insert Title Here>"
        }
    }

    handleChangeSpeaker(e){
      this.setState({
        speaker: e.target.value
      })
      this.props.handleChangeSpeakerParent(e.target.value)

    }

    handleChangeTitle(e){
      this.setState({
        title: e.target.value
      })
      this.props.handleChangeTitleParent(e.target.value)
    }

    render() {
      return(
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
      )
    }
}
