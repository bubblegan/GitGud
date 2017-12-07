import React, { Component } from 'react'
import { Dropdown, Button } from 'semantic-ui-react'

import { SEARCH_REPO_WITH_LANGUAGES } from './queries';
import { graphql } from 'react-apollo';


function ResultList({ loading, search }) {


  if (loading) {
    return <p> loading.... </p>;
  } else if (search) {
    const nodeList = search.nodes.map((item) => {
      return (
        <div className='card' key={item.name}>
          <div className="content">
          <img class="right floated mini ui image" src={item.owner.avatarUrl}/>
            <a className="header">{item.name} </a>
            <div class="meta">
              {item.owner.login}
            </div>
            <div class="description">
              {item.description}
            </div>
          </div>
          <div className="extra content">
            <a> {item.stargazers.totalCount} Stars </a>
          </div>
        </div>
      )
    });
    return (
      <div className="ui cards">{nodeList}</div>
    );
  }


  return (null);
}



const ResultListWithData = graphql(SEARCH_REPO_WITH_LANGUAGES,
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
    this.setState({ queryString: `language:${this.state.selectedLanguage} sort:stars stars:>10000` });
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
        <div style={{ paddingTop: 2 + '%' }}>
          <ResultListWithData queryString={this.state.queryString} />
        </div>
      </div>
    )
  }
}


