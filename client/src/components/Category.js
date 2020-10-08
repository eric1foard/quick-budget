// *************************************************************************************************
// Category.js - Displays the Categories' titles and subtotals.  Box is parent, Type are children.
// *************************************************************************************************

// Dependencies
import React, { Component } from 'react';

// Project Components
import Type from './Type';
// import NewField from './NewField';  - will be added back in later, once the app is ready to have users add their own Types


class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // addingNewField: false, - will be added back in later, once the app is ready to have users add their own Types
    }
    this.handleChange       = this.handleChange.bind(this);
    // this.toggleAddNewField  = this.toggleAddNewField.bind(this); - will be added back in later, once the app is ready to have users add their own Types
    // this.handleSaveNew      = this.handleSaveNew.bind(this); - will be added back in later, once the app is ready to have users add their own Types
  }

  // Middleman function passing values between Type's value and Budget
  handleChange(name, value, categoryTitle) {
    this.props.handleUpdate(name, value, categoryTitle);
  }

  // Will be added back in later, once the app is ready to have users add their own Types
  // toggleAddNewField() {
  //   this.state.addingNewField === true ? this.setState({addingNewField: false}) : this.setState({addingNewField: true});
  // }

  // Will be added back in later, once the app is ready to have users add their own Types
  // handleSaveNew(obj) {
  //   this.props.handleSaveNew(obj, this.props.categoryTitle);
  // }


  render() {
  
    // Determines if this is income/expense, for corresponding css styling
    const categoryTitleClasses = `row category-title-${this.props.boxType}` 

    // Bootstrap's accordion collapse uses these values
    const dataId = this.props.categoryTitle.split(" ").join("-")
    const dataTarget = `#${dataId}`;

    return (
      <div id="accordion">
        <li className="list-group-item">

          {/* Category's title, in upper case */}
          <div className={categoryTitleClasses}>
            
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
        
          {/* Under each Category, we now map through all Types and their Values */}
          <div id={dataId} className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
            {this.props.types.map(field =>
              <Type 
                key={field.typeKey}
                title={field.title}
                description={field.description}
                value={field.value}
                handleChange={this.handleChange}
                categoryTitle={this.props.categoryTitle}
              />
            )}

            {/* Will be added back in later, once the app is ready to have users add their own Types */}
            {/* <div>
              <NewField 
                addingNewField={this.state.addingNewField}
                toggleAddNewField={this.toggleAddNewField}
                sendNewFieldInfo={this.handleSaveNew}
              />
            </div> */}
          </div>

        </li>
      </div>
    )
  }
}

export default Category;