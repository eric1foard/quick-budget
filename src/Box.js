import React, { Component } from 'react';

import Form from './Form';

class Box extends Component {

  constructor(props) {
    super(props);
    this.updateBox = this.updateBox.bind(this);
    this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
  }

  updateBox(name, num) {
    this.props.updateTotals(name, num);
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  
  render() {
    const dataTarget=`#${this.props.boxData.title}`

    return(
      <div>
        <div id="accordion">
          <div className="card">
            <div className="card-header" id="headingOne">
              <button class="btn btn-link" data-toggle="collapse" data-target={dataTarget} aria-expanded="true" aria-controls="collapseOne">
                {this.capitalizeFirstLetter(this.props.boxData.title)}
              </button>
            </div>
            <div id={this.props.boxData.title} class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
              {this.props.boxData.fields.map(field =>
                <Form 
                  formLabel={field}
                  updateBox={this.updateBox}
                />
              )}
            </div>
            Total {this.props.boxData.title}: {this.props.total}
          </div>

        </div>
      </div>
    )
  }
}

export default Box;

// <div id="accordion">
//   <div class="card">
//     <div class="card-header" id="headingOne">
//       <h5 class="mb-0">
//         <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
//           Collapsible Group Item #1
//         </button>
//       </h5>
//     </div>

//     <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
//       <div class="card-body">
//         Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
//       </div>
//     </div>
//   </div>
//   <div class="card">
//     <div class="card-header" id="headingTwo">
//       <h5 class="mb-0">
//         <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
//           Collapsible Group Item #2
//         </button>
//       </h5>
//     </div>
//     <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
//       <div class="card-body">
//         Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
//       </div>
//     </div>
//   </div>
//   <div class="card">
//     <div class="card-header" id="headingThree">
//       <h5 class="mb-0">
//         <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
//           Collapsible Group Item #3
//         </button>
//       </h5>
//     </div>
//     <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
//       <div class="card-body">
//         Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
//       </div>
//     </div>
//   </div>
// </div>