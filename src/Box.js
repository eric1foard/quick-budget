import React, { Component } from 'react';

import Form from './Form';
import NewField from './NewField'
import './Box.css';

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingNewField: false,
    }
    this.updateBox = this.updateBox.bind(this);
    this.toggleAddNewField = this.toggleAddNewField.bind(this);
    this.handleSaveNew = this.handleSaveNew.bind(this);
    this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
  }

  // updateBox receives info from Form's handleChange function
  //  ...and sends the name of the field and the number to App.js,
  //  ...where updateTotals crunches the numbers.
  updateBox(name, num, category) {
    this.props.handleUpdate(name, num, category);
  }

  toggleAddNewField() {
    this.state.addingNewField === true ? this.setState({addingNewField: false}) : this.setState({addingNewField: true});
  }

  handleSaveNew(obj) {
    this.props.handleSaveNew(obj);
  }

  // Helper function to capitlize the first letter when needed.
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  render() {
    const boxTitle = this.capitalizeFirstLetter(this.props.boxData.title); // For clarity below
    const dataTarget = `#${this.props.boxData.title}`; // Lets dataTarget change dynamically for income/expenses
    
    // These are used for defining the class dynamically, used to style in the css file.
    const boxType = this.props.boxData.title; 
    const cardHeaderClasses = `card-header card-header-${boxType}`
    const cardFooterClasses = `card-footer card-footer-${boxType}`

    return(
      <div>
        {/* Uses collapsable bootstrap accordion */}
        <div id="accordionBox">
          <div className="card w-75">

            {/* Header displays title, and is given classes for styling */}
            <div className={cardHeaderClasses} id="headingOne">
              <button className="btn btn-link" data-toggle="collapse" data-target={dataTarget} aria-expanded="true" aria-controls="collapseOne">
                {boxTitle}
              </button>
            </div>

            {/* Maps through each item in income/expenses, passing this information to Form.js component */}
            <div id={this.props.boxData.title} className="collapse show" aria-labelledby="headingOne" data-parent="#accordionBox">
              <ul className="list-group list-group-flush">
                {this.props.boxData.categories.map(category =>
                  <Form 
                    categoryTitle={category.title}
                    subtotal={category.subtotal}
                    fields={category.fields}
                    handleUpdate={this.updateBox}
                  />
                )}
              </ul>
              <div>
                <NewField 
                  addingNewField={this.state.addingNewField}
                  toggleAddNewField={this.toggleAddNewField}
                  sendNewFieldInfo={this.handleSaveNew}
                />
              </div>
            </div>

            {/* Footer displays the total of the income/expenses fields */}
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
