import React from 'react';
import './App.css';
import Tabs from './Tabs.js';
import Tab from './Tab.js';
import CreateForm from './CreateForm.js';
import PreviewForm from './PreviewForm.js';

const App = React.createClass({
  getInitialState() {
    return {fields : []};
  },
  changeForm(fields) {
    this.setState();
  },
  changeInputHandler() {
    let form = this;
    return(function(fields) {
      form.setState({fields: fields})
    });
  },
  render() {
    return (
       <div>
        <Tabs selected={0}>
          <Tab label="Create">
            <div>
              <CreateForm fields={this.state.fields} changeHandler={this.changeInputHandler()}></CreateForm>
            </div>
          </Tab>
          <Tab label="Preview">
            <div><PreviewForm fields={this.state.fields}></PreviewForm></div>
          </Tab>
          <Tab label="Export">
            <div>{JSON.stringify(this.state.fields)}</div>
          </Tab>
        </Tabs>
      </div>
    );
  }
});

export default App;
