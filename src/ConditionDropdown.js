import React from 'react';
let Condition = function(id, conditionName, numericCondition) {
  return {
    id: id,
    conditionName: conditionName,
    isNumericCondition: numericCondition
  }
}

const ConditionDropdown = React.createClass({
  displayName: 'ConditionDropdown',
  proptypes: {
    selectedCondition: React.PropTypes.string,
    conditionValue: React.PropTypes.string,
    inputType: React.PropTypes.string
  },
  conditions: [new Condition(1,'Equals', false),new Condition(2,'Greater than', true),new Condition(3,'Less than', true)],
  _getOptions() {
    let options = []
    this.conditions.forEach(function(condition) {
      if (this._isTypeNumeric() || !condition.isNumericCondition) {
        options.push(<option key={condition.id} value={condition.conditionName}>{condition.conditionName}</option>)
      }
    }, this)
    return(options);
  },
  _isTypeNumeric() {
    return this.props.inputType === 'Number'
  },
  _getConditionInput() {
    if(this.props.inputType === 'Number') {
      return(<input type='number' value={this.props.conditionValue} onChange={this.props.conditionValueChangeHandler}></input>);
    } else if(this.props.inputType === 'Text') {
      return(<input type='text' value={this.props.conditionValue} onChange={this.props.conditionValueChangeHandler}></input>);
    } else if(this.props.inputType === 'Yes/No') {
      return(<select defaultValue={this.props.conditionValue} onChange={this.props.conditionValueChangeHandler}><option>Yes</option><option>No</option></select>);
    }
  },
  render() {
    return(
    <label>Condition
      <select value={this.props.selectedCondition} onChange={this.props.conditionTypeChangeHandler}>
        {this._getOptions()}
      </select>
      {this._getConditionInput()}
    </label>
    );
  }
});

export default ConditionDropdown;
