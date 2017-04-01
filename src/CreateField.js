import React from 'react';
import { Button } from 'react-native';
import ConditionDropdown from './ConditionDropdown.js';
import TypeDropdown from './TypeDropdown.js';

let FieldObject = function(newId, isRoot, changeHandler, removeInputHandler) {
  return {
    id: newId,
    question: '',
    type: 'Yes/No',
    conditionType: 'Equals',
    conditionValue: 'Yes',
    isRoot: isRoot,
    children: [],
    changeHandler: changeHandler,
    removeInputHandler: removeInputHandler
  };
};

const CreateField = React.createClass({
  getInitialState: function() {
      return this.props;
  },
  displayName: 'CreateField',
  propTypes: {
    id: React.PropTypes.number,
    question: React.PropTypes.string,
    isRoot: React.PropTypes.bool,
    parentType: React.PropTypes.string,
    type: React.PropTypes.string,
    conditionType: React.PropTypes.string,
    conditionValue: React.PropTypes.string,
    children: React.PropTypes.array
  },
  addInput() {
    let currentState = this.state;
    currentState.children.push(new FieldObject(currentState.children.length + 1, false, this._changeHandler(), this._removeInputHandler()));
    this.setState(currentState);
    this.state.changeHandler(currentState);
  },
  _removeInputHandler() {
    let parent = this;
    return (function(child) {
      let newChildren = parent.state.children;
      newChildren[child.id - 1] = {};
      parent.setState({children : newChildren})
      parent.state.changeHandler(parent.state);
    });
  },
  _handleQuestionChange(event) {
    let newState = Object.assign({}, this.state);
    newState.question = event.target.value;
    this.setState(newState);
    this.state.changeHandler(newState);
  },
  _handleTypeChange() {
    let field = this;
    return(function(event){
      let newState = Object.assign({}, field.state);
      newState.type = event.target.value;
      field.setState(newState);
      field.state.changeHandler(newState);
    })
  },
  _handleConditionTypeChange() {
    let field = this;
    return(function(event){
      let newState = Object.assign({}, field.state);
      newState.conditionType = event.target.value;
      field.setState(newState);
      field.state.changeHandler(newState);
    })
  },
  _handleConditionValueChange() {
    let field = this;
    return(function(event) {
      let newState = Object.assign({}, field.state);
      newState.conditionValue = event.target.value;
      field.setState(newState);
      field.state.changeHandler(newState);
    })
  },
  _changeHandler() {
    let parent = this;
    return (function(child) {
      let newChildren = parent.state.children;
      newChildren[child.id - 1] = child;
      let newState = Object.assign({}, parent.state);
      newState.children = newChildren;
      parent.setState(newState);
      parent.state.changeHandler(newState);
    });
  },
  _removeInput() {
    this.state.removeInputHandler(this.state);
  },
  _addSubInputs() {
    const inputs = this.state.children.map(function(child) {
      if(Object.keys(child).length === 0) {
        return('');
      } else {
        return (
          <CreateField
            id={child.id}
            key={child.id}
            question={child.question}
            type={child.type}
            parentType={this.state.type}
            conditionType={child.conditionType}
            conditionValue={child.conditionValue}
            children={child.children}
            changeHandler={child.changeHandler}
            removeInputHandler={child.removeInputHandler}
            isRoot={child.isRoot}/>
        );
      }
    }, this);

    return (
        inputs
    );
  },
  render() {
    return (
      <div className='fieldContainer' key={this.state.id}>
        <div className='field'>
          {!this.state.isRoot && <ConditionDropdown inputType={this.props.parentType} selectedCondition={this.state.conditionType} conditionValue={this.state.conditionValue}
              conditionTypeChangeHandler={this._handleConditionTypeChange()} conditionValueChangeHandler={this._handleConditionValueChange()}></ConditionDropdown>}
          <label>
            Question: <input type="text" value={this.state.question} onChange={this._handleQuestionChange}/>
          </label>
          <label>
            Type: <TypeDropdown selectedType={this.state.type} changeHandler={this._handleTypeChange()}></TypeDropdown>
          </label>
          <div className='buttonContainer'>
            <Button
              onPress={this._removeInput}
              value={this.state.id}
              title="Delete"
              color="red"
            />
            <Button
              onPress={this.addInput}
              title="Add sub-input"
              color="#337ab7"
            />
          </div>
        </div>
        {this._addSubInputs()}
      </div>
    );
  }
});

export default CreateField;
