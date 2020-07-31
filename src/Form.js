import React, { Component } from 'react';

import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  // When a user types into the form, the name and number are sent to Box,
  //  ...which then passes the info to App. The field's value is updated in state,
  //  ...and the totals and summary are updated.
  handleChange(evt) {
    this.props.handleUpdate(evt.target.name, evt.target.value, this.props.categoryTitle);
  }

  render() {
    let dataTarget = `#${this.props.categoryTitle}`
    
    return (
      <div id="accordion">
        <li className="list-group-item">

            <div className="row">
              {/* Form's title, in upper case */}
              <div className="col-sm-9">
                <label htmlFor={this.props.categoryTitle} className="col-form-label label-title">
                  <button className="btn btn-link" data-toggle="collapse" data-target={dataTarget} aria-expanded="true" aria-controls="collapseOne">
                    {this.props.categoryTitle.toUpperCase()}
                  </button>
                </label>
              </div>
              
              {/* Displays subtotal for this category */}
              <div className="col-sm-3">
                {this.props.subtotal}
              </div>
            
            </div>
          
          <div id={this.props.categoryTitle} className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
            {this.props.fields.map(field =>
              <li className="list-group-item">
                <form>
                  
                  <div className="form-group row">
                    {/* Form's title, in upper case */}
                    <div className="col-sm-9">
                      <label htmlFor={field.title} className="col-form-label label-title">
                        {field.title}
                      </label>
                      {/* Underneath the title, a description */}
                      <div className="label-description">
                        {field.description}
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
                          name={field.title}
                          id={field.title}
                          onChange={this.handleChange}
                          className="form-control"
                          value={field.value}
                        />
                      </div>
                    </div>
                  
                  </div>
                </form>
              </li>
            )}
          </div>

        </li>
      </div>

          
      
    )
  }
}

export default Form;