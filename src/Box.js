import React, { Component } from 'react';

import Form from './Form';

class Box extends Component {
  render() {
    return(
      <div>
        {this.props.boxData.map(f =>
          <div className="card">
            <div className="card-header">
              {f.title}
            </div>
    
            {f.fields.map(field =>
              <Form 
                formLabel={field}
              />
            )}
  
          </div>
        )}
      </div>



      

    )
  }
}

export default Box;