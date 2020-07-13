import React, { Component } from 'react';

class Summary extends Component {
  render() {
    let num = this.props.totalIncome - this.props.totalExpenses
    return(
      <h3>Overall Total: {num}</h3> 
    )
  }
}

export default Summary;