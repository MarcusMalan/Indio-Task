import React from 'react';

let Type = function(id, typeName, numericType) {
  return {
    id: id,
    typeName: typeName
  };
};

const TypeDropdown = React.createClass({
  displayName: 'TypeDropdown',
  proptypes: {
    selectedType: React.PropTypes.string,
    changeHandler: React.PropTypes.function
  },
  types: [new Type(1,'Yes/No', true),new Type(2,'Text',true),new Type(3,'Number', true)],
  _getOptions() {
    const options = this.types.map(function(type) {
      return(<option key={type.id} value={type.typeName}>{type.typeName}</option>);
    });
    return(options);
  },
  render() {
    return(
    <select value={this.props.selectedType} onChange={this.props.changeHandler}>
      {this._getOptions()}</select>
    );
  }

});
export default TypeDropdown;
