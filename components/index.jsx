'use strict';

import React from 'react';
import ReactDom from 'react-dom';
var GeneratePowerpoint = require('../routes/generatePowerpoint.js');
var fs = require('fs')


export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          fileName: "myPowerpoint",
          slideText: "Any song, my song"
        }
    }

  generate(fileName, text){
   var gp = new GeneratePowerpoint()
   gp.generate(fileName, text)
  }

    render() {
        return (
            <div className="container-fluid">
              <h2>Create Powerpoint</h2>
                <div className="creationForm">
                  <button className='btn btn-primary' type='button' id='GeneratePowerpoint' onClick={this.generate(this.state.fileName, this.state.slideText)}>Generate Powerpoint</button>
                </div>
            </div>
        );
    }
}

ReactDom.render(<Index/>, document.getElementById('app'));
