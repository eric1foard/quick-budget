import React, { Component } from 'react';

import Form from './Form';
import './Box.css';

class Box extends Component {
  constructor(props) {
    super(props);
    this.updateBox = this.updateBox.bind(this);
    this.handleSaveNew = this.handleSaveNew.bind(this);
    this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
  }

  // updateBox receives info from Form's handleChange function
  //  ...and sends the name of the field and the number to App.js,
  //  ...where updateTotals crunches the numbers.
  updateBox(name, num, category) {
    this.props.handleUpdate(name, num, category);
  }

  // Helper function to capitlize the first letter when needed.
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  handleSaveNew(obj, category) {
    this.props.handleSaveNew(obj, category);
  }


  render() {
    const boxTitle = this.capitalizeFirstLetter(this.props.boxData.title); // For clarity below
    const dataId = this.props.boxData.title.split(" ").join("-")
    const dataTarget = `#${dataId}`;
    
    // These are used for defining the class dynamically, used to style in the css file.
    const boxType = this.props.boxData.title; 
    const cardHeaderClasses = `card-header card-header-${boxType}`
    const cardFooterClasses = `card-footer card-footer-${boxType}`

    return(
      <div>
        <div className="card w-75">

          {/* Header displays title, and is given classes for styling */}
          <div className={cardHeaderClasses}>
            <div className="btn-link-heading">
              {boxTitle}
            </div>
          </div>

          {/* Maps through each item in income/expenses, passing this information to Form.js component */}
          
            <ul className="list-group list-group-flush">
              {this.props.boxData.categories.map(category =>
                <Form 
                  boxType={boxType}
                  categoryTitle={category.title}
                  subtotal={category.subtotal}
                  fields={category.fields}
                  handleUpdate={this.updateBox}
                  key={category.id}
                  id={category.id}
                  handleSaveNew={this.handleSaveNew}
                />
              )}
            </ul>


          {/* Footer displays the total of the income/expenses fields */}
          <div className={cardFooterClasses}>
            Total Monthly {boxTitle}: ${this.props.total.toFixed(2)}
          </div>

        </div>
      </div>
    )
  }
}

export default Box;
