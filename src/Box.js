import React, { Component } from 'react';

import Form from './Form';

class Box extends Component {

  constructor(props) {
    super(props);
    this.updateBox = this.updateBox.bind(this);
  }

  updateBox(name, num) {
    this.props.updateTotals(name, num);
  }

  render() {
    return(
      <div>
        <div id="accordion">
          <div className="card">
            <div className="card-header" id="headingOne">
              <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                {this.props.boxData.title}
              </button>
            </div>
            {this.props.boxData.fields.map(field =>
              <Form 
                formLabel={field}
                updateBox={this.updateBox}
              />
            )}
            Total {this.props.boxData.title}: {this.props.total}
          </div>

        </div>
      </div>



      

    )
  }
}

export default Box;