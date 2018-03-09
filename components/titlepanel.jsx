'use strict';

import React from 'react';
import ReactDom from 'react-dom';

export default class Titlepanel extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChangeSpeaker(e){
      this.props.handleChangeSpeakerParent(e.target.value)
    }

    handleChangeTitle(e){
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
                <input type='text'className="form-control" value={this.props.speaker} id="speakerInput" onChange={this.handleChangeSpeaker.bind(this)}></input>
              </div>
              <div className="col-md-4">
                <label htmlFor="titleInput">Title</label>
                <input type='text'className="form-control" value={this.props.title} id="titleInput" onChange={this.handleChangeTitle.bind(this)}></input>
              </div>
            </div>
        </div>
      )
    }
}
