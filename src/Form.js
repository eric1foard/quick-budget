import React, { Component } from 'react';

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      num: "0"
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
    // console.log(this.props.boxName);
    this.props.updateBox(evt.target.name, evt.target.value);
  }

  render() {
    return(
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <form>
            <div className="form-group row">
              <label htmlFor={this.props.formLabel} className="col-sm-2 col-form-label">{this.props.formLabel}</label>
              <div className="col-sm-10">
                <input 
                  type="number" 
                  name={this.props.formLabel}
                  id={this.props.formLabel}
                  value={this.state.value}
                  onChange={this.handleChange}
                  className="form-control"
                />
              </div>
            </div>
          </form>
        </li>
      </ul>
    )
  }
}

export default Form;