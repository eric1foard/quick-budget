// *************************************************************************************************************
// Box.js - Container component, one for income and one for expenses. Budget is parent, Category are children.
// *************************************************************************************************************

// Dependencies
import React, { Component } from 'react';

// Project Components
import Category from './Category';


class Box extends Component {
  constructor(props) {
    super(props);
    this.updateBox = this.updateBox.bind(this);
    // this.handleSaveNew = this.handleSaveNew.bind(this);  - Will be added back in later, once the app is ready to have users add their own Types
  }

  // Middleman function passing values between Type's value and Budget
  updateBox(name, num, category) {
    this.props.handleUpdate(name, num, category);
  }

  // Will be added back in later, once the app is ready to have users add their own Types
  // handleSaveNew(obj, category) {
  //   this.props.handleSaveNew(obj, category);
  // }


  render() {
    
    // These are used for defining the class dynamically, used to style in the css file.
    const boxType = this.props.boxType; 
    const cardHeaderClasses = `card-header card-header-${boxType}`
    const cardFooterClasses = `card-footer card-footer-${boxType}`

    return(
      <div>
        <div className="card w-75">

          {/* Header displays title "Income" or "Expenses" */}
          <div className={cardHeaderClasses}>
            <div className="btn-link-heading">
              {this.props.title}
            </div>
          </div>

          {/* Maps through each Category within income/expenses */}
            <ul className="list-group list-group-flush">
              {this.props.boxData.categories.map(category =>
                <Category 
                  boxType={boxType}
                  categoryTitle={category.title}
                  subtotal={category.subtotal}
                  types={category.types}
                  handleUpdate={this.updateBox}
                  key={category.categoryKey}
                  id={category.id}
                  handleSaveNew={this.handleSaveNew}
                />
              )}
            </ul>


          {/* Footer displays at the bottom of Box, showing the total income/expenses */}
          <div className={cardFooterClasses}>
            Total Monthly {this.props.title}: ${parseFloat(this.props.total).toFixed(2)}
          </div>

        </div>
      </div>
    )
  }
}

export default Box;
