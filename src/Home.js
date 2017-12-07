import React, { Component } from 'react'
import { Dropdown, Button } from 'semantic-ui-react'

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


function ResultList({ loading, search }) {
  
  if (loading) {
    return <p> loading.... </p>;
  } else if (search) {
    const nodeList = search.nodes.map((item) => {
      return <li key={item.name}>{item.name} With Stars {item.stargazers.totalCount}</li>;
    });
    return (
      <ul>{nodeList}</ul>
    );
  }
  return (null);
}

const queryLanguage = gql`query TopSearchLanguage($queryString : String!){
  search(query: $queryString ,type : REPOSITORY, first: 20) {
    repositoryCount
    pageInfo {
      hasNextPage
    }
    nodes {
      ... on Repository {
        name
        url
        stargazers {
          totalCount
        }
        primaryLanguage {
          name
        }
      }
    }
}
}`

const ResultListWithData = graphql(queryLanguage,
  {
    props: ({ data: { loading, search } }) => ({
      loading,
      search,
    }),
    options: ({ queryString }) => ({ variables: { queryString } }),
  })(ResultList);

export default class MainSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      languages:
      [{ text: 'Javascript', value: 'Javascript' },
      { text: 'Python', value: 'Python' },
      { text: 'C#', value: 'C#' },
      { text: 'Ruby', value: 'Ruby' },
      { text: 'HTML', value: 'HTML' },
      { text: 'CSS', value: 'CSS' },
      ],
      selectedLanguage: 'Python',
      queryString: 'language:javascript sort:stars stars:>10000'
    };

    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSearchClick(e) {
    e.preventDefault();
    this.setState({ queryString : `language:${this.state.selectedLanguage} sort:stars stars:>10000`});
  }

  handleChange(e, { value }) {
    this.setState({ selectedLanguage: value });

  }


  render() {
    const { languages } = this.state;

    return (
      <div>
        <div>
          <Dropdown placeholder='Select Language' search selection options={languages} onChange={this.handleChange} />
          <Button primary as='button' onClick={this.handleSearchClick} style={{ marginLeft: 1 + 'em' }}> Search </Button>
        </div>
        <div>
          <ResultListWithData queryString={this.state.queryString}/>
        </div>
      </div>
    )
  }
}


