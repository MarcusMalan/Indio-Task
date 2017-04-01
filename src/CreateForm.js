import React from 'react';
import { Button } from 'react-native';
import CreateField from './CreateField.js';

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

const CreateForm = React.createClass({
  getInitialState: function() {
      return this.props;
  },
  displayName: 'CreateForm',
  propTypes: {
    fields: React.PropTypes.array
  },
  addInput() {
    let fields = this.state.fields;
    fields.push(new FieldObject(fields.length + 1, true, this._changeHandler(), this._removeInputHandler()));
    this.setState({fields: fields});
    this.state.changeHandler(fields);
  },
  _changeHandler() {
    let parent = this;
    return(function(child) {
      let updatedFields = parent.state.fields
      updatedFields[child.id - 1] = child;
      parent.setState({fields: updatedFields})
      parent.state.changeHandler(updatedFields);
    });
  },
  _removeInputHandler() {
    let parent = this;
    return (function(child) {
      let updatedFields = parent.state.fields;
      updatedFields[child.id - 1] = {};
      let newState = Object.assign({}, parent.state);
      newState.fields = updatedFields;
      parent.setState(newState)
      parent.state.changeHandler(updatedFields);
    });
  },
  _renderInputs() {
    let inputs = this.state.fields.map(function(field) {
      if(Object.keys(field).length === 0) {
        return('');
      } else {
        return (
          <CreateField key={field.id}
            id={field.id}
            question={field.question}
            type={field.type}
            conditionType={field.conditionType}
            conditionValue={field.conditionValue}
            children={field.children}
            changeHandler={field.changeHandler}
            removeInputHandler={field.removeInputHandler}
            isRoot={field.isRoot}/>
        );
      }
    }, this);

    return (
        inputs
    );
  },
  render() {
    return (
      <div>
        {this._renderInputs(this)}
        <Button
          onPress={this.addInput}
          title="Create Field"
          color="#337ab7"
        />
      </div>
    );
  }
});

export default CreateForm;
