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
    const dataTarget = `#${this.props.boxData.title}`;
    const boxType = this.props.boxData.title;
    const cardHeaderClasses = `card-header card-header-${boxType}`
    const cardFooterClasses = `card-footer card-footer-${boxType}`

    return(
      <div>
        <div id="accordion">
          <div className="card w-75">
            <div className={cardHeaderClasses} id="headingOne">
              <button className="btn btn-link" data-toggle="collapse" data-target={dataTarget} aria-expanded="true" aria-controls="collapseOne">
                {boxTitle}
              </button>
            </div>
            <div id={this.props.boxData.title} className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
              {this.props.boxData.fields.map(field =>
                <Form 
                  formLabel={field.fieldTitle}
                  formDescription={field.fieldDescription}
                  updateBox={this.updateBox}
                />
              )}
            </div>
            <div className={cardFooterClasses}>
              Total Monthly {boxTitle}: ${this.props.total.toFixed(2)}
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Box;
