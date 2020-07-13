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
        {this.props.boxData.map(b =>
          <div>
            <div className="card">
              <div className="card-header">
                {b.title}
              </div>
              {b.fields.map(field =>
                <Form 
                  formLabel={field}
                  updateBox={this.updateBox}
                  boxName={b}
                />
              )}
            </div>
            <div>
              Total {b.title}: {this.state.total}
            </div>
          </div>
        )}
      </div>



      

    )
  }
}

export default Box;