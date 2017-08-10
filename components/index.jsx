'use strict';

import React from 'react';
import ReactDom from 'react-dom';
// var GeneratePowerpoint = require('../routes/generatePowerpoint.js');
import Utils from './Utils.jsx'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          fileName: "myPowerpoint",
          slideText: "Any song, my song"
        }
    }

  // generate(){
  //       console.log("I'm here!!")
  //  // var gp = new GeneratePowerpoint()
  //  // GeneratePowerpoint.generate(this.state.fileName, this.state.slideText)
  //  //    Utils.generate(this.state.fileName, this.state.slideText)
  //
  // }

    render() {
        return (
            <div className="container-fluid">
              <h2>Create Powerpoint</h2>
                <div className="creationForm">
                    <form className="form-inline" method="POST" action='/generatepowerpoint/'>
                        <input type='hidden' name='fileName' value={this.state.fileName}/>
                        <input type='hidden' name='slideText' value={this.state.slideText}/>
                        <button type="submit" className="btn btn-primary btn-block" id="generatePowerpoint">Generate</button>
                    </form>
                    <a href="/presentations/myPowerpoint">Link to power point</a>
                    <a href="/stylesheets/style.css">Link to power point</a>
                  {/*<button className='btn btn-primary' type='button' id='GeneratePowerpoint' onClick={this.generate.bind(this)}>Generate Powerpoint</button>*/}
                </div>
            </div>
        );
    }
}

ReactDom.render(<Index/>, document.getElementById('app'));
