import React, { Component } from 'react';

class Form extends Component {
  render() {
    return(
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <form>
            <div className="form-group row">
              <label for="colFormLabel" className="col-sm-2 col-form-label">{this.props.formLabel}</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="colFormLabel" placeholder="" />
              </div>
            </div>
          </form>
        </li>
      </ul>
    )
  }
}

export default Form;