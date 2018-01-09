import React, { Component } from 'react';
import RepoSearch from './RepoSearch';
import client from './apolloClient';

import { ApolloProvider } from 'react-apollo';


class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="ui container" style={{marginTop : 3 + '%'}}>
            <RepoSearch />
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
