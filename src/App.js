import React, { Component } from 'react';
import MenuBar from './Menu';
import client from './apolloClient';

import { ApolloProvider } from 'react-apollo';


class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="ui container">
            <MenuBar />
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
