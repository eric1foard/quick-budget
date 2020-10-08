import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';

// The goal of this component is to create a reusable way to plug a component into any other component
// ...that will notify the user if they navigate away without saving changes.


// There are two possible ways a user may leave the page without saving:
  // 1) The user's browser exits/refreshes the page.
  // 2) The user navigates elsewhere within the App using react-browser-router

class UnsavedChangesAlert extends Component {

  // Handling Case 1:
  // These methods handle the browser - if the user exits or closes the window/tab,
  // ... an alert will appear.  The text is automatically decided by the browser.
  componentDidMount() {
    window.addEventListener('beforeunload', this.handleLeavePage);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleLeavePage);
  }

  // Note that the conditional means that the alert is only displayed if the user has in fact made changes
  handleLeavePage = e => {
    if (this.props.unsavedChanges === true) {
      e.returnValue = '';
    } 
  }


  render() {
    return(
      // Handling Case 2:
      // This uses react-router-dom's Prompt to notify the user
      <Prompt 
        when={this.props.unsavedChanges}
        message="There are unsaved changes, do you wish to discard them?"
      />
    )
  }
}

export default UnsavedChangesAlert;
