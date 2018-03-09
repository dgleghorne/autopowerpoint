'use strict';

import React from 'react';
import ReactDom from 'react-dom';

export default class Readingspanel extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChangeReading1(e){
      this.props.handleChangeReading1Parent(e.target.value)
    }

    handleChangeReader1(e){
      this.props.handleChangeReader1Parent(e.target.value)
    }

    handleChangePageNo1(e){
      this.props.handleChangePageNo1Parent(e.target.value)
    }

    handleChangeReading2(e){
      this.props.handleChangeReading2Parent(e.target.value)
    }

    handleChangeReader2(e){
      this.props.handleChangeReader2Parent(e.target.value)
    }

    handleChangePageNo2(e){
      this.props.handleChangePageNo2Parent(e.target.value)
    }

    render() {
      return(
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Readings</h3>
          </div>
            <div className="panel-body">
              <div className= "row">
                <div className="col-md-4">
                  <label htmlFor="reading1Input">Reading 1</label>
                  <input type='text'className="form-control" value={this.props.reading1} id="reading1Input" onChange={this.handleChangeReading1.bind(this)}></input>
                </div>
                <div className="col-md-4">
                  <label htmlFor="reader1Input">Reader 1</label>
                  <input type='text'className="form-control" value={this.props.reader1} id="reader1Input" onChange={this.handleChangeReader1.bind(this)}></input>
                </div>
                <div className="col-md-4">
                  <label htmlFor="pageNo1Input">Reading 1 Page Number</label>
                  <input type='text'className="form-control" value={this.props.pageNo1} id="pageNo1Input" onChange={this.handleChangePageNo1.bind(this)}></input>
                </div>
              </div>
              <br/>
              <div className= "row">
                <div className="col-md-4">
                  <label htmlFor="reading2Input">Reading 2</label>
                  <input type='text'className="form-control"  value={this.props.reading2} id="reading2Input" onChange={this.handleChangeReading2.bind(this)}></input>
                </div>
                <div className="col-md-4">
                  <label htmlFor="reader2Input">Reader 2</label>
                  <input type='text'className="form-control" value={this.props.reader2} id="reader2Input" onChange={this.handleChangeReader2.bind(this)}></input>
                </div>
                <div className="col-md-4">
                  <label htmlFor="pageNo2Input">Reading 2 Page Number</label>
                  <input type='text'className="form-control" value={this.props.pageNo2} id="pageNo2Input" onChange={this.handleChangePageNo2.bind(this)}></input>
                </div>
              </div>
            </div>
        </div>
      )
    }
}
