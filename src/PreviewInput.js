import React from 'react';

const PreviewInput = React.createClass({
  getInitialState: function() {
      return {
        value: ''
      }
  },
  displayName: 'PreviewInput',
  propTypes: {
    id: React.PropTypes.number,
    question: React.PropTypes.string,
    parentValue: React.PropTypes.string,
    isRoot: React.PropTypes.bool,
    isVisible: React.PropTypes.bool,
    type: React.PropTypes.string,
    conditionType: React.PropTypes.string,
    conditionValue: React.PropTypes.string,
    children: React.PropTypes.array,
  },
  _getInput() {
    if(this.props.type === 'Number') {
      return(<input className='previewInput' type='number' value={this.state.value} onChange={this._changeHandler}></input>);
    } else if(this.props.type === 'Text') {
      return(<input className='previewInput' type='text' value={this.state.value} onChange={this._changeHandler}></input>);
    } else if(this.props.type === 'Yes/No') {
      return(<div className='radioContainer'>
        <label className='radioLabel'>Yes <input type='radio' onChange={this._changeHandler} value='Yes' checked={this.state.value === 'Yes'}></input></label>&nbsp;
        <label className='radioLabel'>No <input type='radio' value='No' onChange={this._changeHandler} checked={this.state.value === 'No'}></input></label>
      </div>);
    }
  },
  _changeHandler(event) {
    this.setState({value: event.target.value});
  },
  _addSubInputs() {
    const inputs = this.props.children.map(function(child) {
      return (
        <PreviewInput
          id={child.id}
          key={child.id}
          question={child.question}
          parentValue={this.state.value}
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
  _getIsVisible() {
    if(this.props.conditionType === 'Equals') {
      return this.props.parentValue === this.props.conditionValue;
    } else if(this.props.conditionType === 'Greater than') {
      return (parseInt(this.props.parentValue) > parseInt(this.props.conditionValue));
    } else if(this.props.conditionType === 'Less than') {
      return (parseInt(this.props.parentValue) < parseInt(this.props.conditionValue));
    }
  },
  render() {
    if(this._getIsVisible() || this.props.isRoot) {
      return (
        <div className='fieldContainer'  key={this.props.id}>
          <div className='fieldPreview'>
            <label className='previewLabel'>
              {this.props.question} {this._getInput()}
            </label>

          </div>
          {this._addSubInputs()}
        </div>
      );
    } else {
      return(null);
    }
  }
});

export default PreviewInput
