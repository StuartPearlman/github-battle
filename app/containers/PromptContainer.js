import React from 'react';
import Prompt from '../components/Prompt';

const PromptContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      username: ''
    }
  },
  handleUpdateUser: function(event) {
    this.setState({
      username: event.target.value
    });
  },
  handleSubmitUser: function(event) {
    event.preventDefault();
    const { username } = this.state;

    this.setState({
      username: ''
    });

    const { playerOne } = this.props.routeParams;

    if (playerOne) {
      this.context.router.push({
        pathname: '/battle',
        query: {
          playerOne,
          playerTwo: username
        }
      });
    } else {
      this.context.router.push(`/playerTwo/${ username }`);
    }
  },
  render: function() {
    return (
      <Prompt
        onSubmitUser={ this.handleSubmitUser }
        onUpdateUser={ this.handleUpdateUser }
        header={ this.props.route.header }
        username={ this.state.username } />
    );
  }
});

export default PromptContainer;
