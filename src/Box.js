import React, { Component } from 'react';

import Form from './Form';
import './Box.css';

class Box extends Component {

  constructor(props) {
    super(props);
    this.updateBox = this.updateBox.bind(this);
    this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
  }

  updateBox(name, num) {
    this.props.updateTotals(name, num);
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  render() {
    const boxTitle = this.capitalizeFirstLetter(this.props.boxData.title);
    const dataTarget = `#${this.props.boxData.title}`

    return(
      <div>
        <div id="accordion">
          <div className="card w-75">
            <div className="card-header" id="headingOne">
              <button class="btn btn-link" data-toggle="collapse" data-target={dataTarget} aria-expanded="true" aria-controls="collapseOne">
                {boxTitle}
              </button>
            </div>
            <div id={this.props.boxData.title} class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
              {this.props.boxData.fields.map(field =>
                <Form 
                  formLabel={field}
                  updateBox={this.updateBox}
                />
              )}
            </div>
            <div className="card-footer">
              Total {boxTitle}: {this.props.total}
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Box;
