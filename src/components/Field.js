import React, { Component } from 'react';

class Field extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  handleChange(evt) {    
    this.setState({value: evt.target.value});
  }

  handleOnBlur() {
    let cleanValue = this.state.value;
    if (cleanValue === "") cleanValue = 0;
    cleanValue = Number(this.state.value).toFixed(2);

    this.setState({ value: cleanValue });
    this.props.handleChange(this.props.title, cleanValue, this.props.categoryTitle)
  }


  render() {
    return(

      <form key={this.key}>
        <div className="form-group row">
          {/* Form's title, in upper case */}
          <div className="col-sm-9">
            <label htmlFor={this.props.title} className="col-form-label label-title">
              {this.props.title}
            </label>
            {/* Underneath the title, a description */}
            <div className="label-description">
              {this.props.description}
            </div>
          </div>

          {/* On the right side, the input for users to put $ amounts */}
          <div className="col-sm-3">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <div className="input-group-text" id="inputGroup-sizing-sm">$</div>
              </div>
              <input
                type="number" 
                name={this.props.title}
                id={this.props.title}
                onChange={this.handleChange}
                className="form-control"
                value={this.state.value}
                onBlur={this.handleOnBlur}
              />
            </div>
          </div>

        </div>
        <hr />
      </form>


    )
  }
}

export default Field;
