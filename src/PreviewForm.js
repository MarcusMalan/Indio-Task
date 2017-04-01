import React from 'react';
import PreviewInput from './PreviewInput.js';

const PreviewForm = React.createClass({
  getInitialState: function() {
      return this.props;
  },
  displayName: 'PreviewForm',
  propTypes: {
    fields: React.PropTypes.array
  },
  _renderInputs() {
    let inputs = this.state.fields.map(function(child) {
      return (
        <PreviewInput key={child.id}
          id={child.id}
          question={child.question}
          parentValue={null}
          type={child.type}
          conditionType={child.conditionType}
          conditionValue={child.conditionValue}
          children={child.children}
          isRoot={child.isRoot}/>
      );
    }, this);

    return (
        inputs
    );
  },
  render() {
    return (
      <div>
        {this._renderInputs(this)}
      </div>
    );
  }
});

export default PreviewForm;
