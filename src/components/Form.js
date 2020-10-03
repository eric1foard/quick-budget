import React, { Component } from 'react';

import NewField from './NewField'


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingNewField: false,
    }
    this.handleChange       = this.handleChange.bind(this);
    this.toggleAddNewField  = this.toggleAddNewField.bind(this);
    this.handleSaveNew      = this.handleSaveNew.bind(this);
  }

  // When a user types into the form, the name and number are sent to Box,
  //  ...which then passes the info to App. The field's value is updated in state,
  //  ...and the totals and summary are updated.
  handleChange(evt) {
    if (evt.target.value === "") evt.target.value = 0; // If empty string, turns it to $0
    this.props.handleUpdate(evt.target.name, evt.target.value, this.props.categoryTitle);
  }

  toggleAddNewField() {
    this.state.addingNewField === true ? this.setState({addingNewField: false}) : this.setState({addingNewField: true});
  }

  handleSaveNew(obj) {
    this.props.handleSaveNew(obj, this.props.categoryTitle);
  }




  render() {
    const boxType = this.props.boxType;
    const categoryTitleClasses = `row category-title-${boxType}`

    const dataId = this.props.categoryTitle.split(" ").join("-")
    const dataTarget = `#${dataId}`;

    // console.log('dataId', dataId)
    // console.log('dataTarget', dataTarget)

    return (
      <div id="accordion">
        <li className="list-group-item">

            <div className={categoryTitleClasses}>
              {/* Form's title, in upper case */}
              <div className="col-sm-9">
                <label htmlFor={this.props.categoryTitle} className="col-form-label label-title">
                  <button className="btn btn-link-category" data-toggle="collapse" data-target={dataTarget} aria-expanded="true" aria-controls="collapseOne">
                    {this.props.categoryTitle.toUpperCase()}
                  </button>
                </label>
              </div>
              
              {/* Displays subtotal for this category */}
              <div className="col-sm-3">
                <div className="subtotal">
                  ${parseFloat(this.props.subtotal).toFixed(2)}
                </div>
              </div>
            
            </div>
          
          <hr />
          <div id={dataId} className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
            {this.props.fields.map(field =>
              <form key={field.typeKey}>
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
                        // Regarding value - this approach does not allow 0's from the left of number, which is good. Handling this elsewhere allowed input to show the 0's, hence doing it here.
                        // TODO: However, this approach allows the user to enter long decimals, and populates decimals with 10's place only without a 0 to follow. (CB 10/2)
                        value={Number(field.value).toString()} 
                      />
                    </div>
                  </div>

                </div>
                <hr />
              </form>
            )}
            <div>
              <NewField 
                addingNewField={this.state.addingNewField}
                toggleAddNewField={this.toggleAddNewField}
                sendNewFieldInfo={this.handleSaveNew}
              />
            </div>
          </div>
        </li>

      </div>

          
      
    )
  }
}

export default Form;