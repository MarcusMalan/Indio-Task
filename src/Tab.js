import React from 'react';

const Tab = React.createClass({
  displayName: 'Tab',
  propTypes: {
    label: React.PropTypes.string.isRequired,
    children: React.PropTypes.element.isRequired
  },
  render() {
    return (
        <div>
        {this.props.children}
      </div>
    );
  }
});

export default Tab;
