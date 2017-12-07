import React, { Component } from 'react'
import { Dropdown, Button } from 'semantic-ui-react'

import { SEARCH_REPO_WITH_LANGUAGES} from './queries';
import { LANGUAGES_OPTIONS , TOPIC_OPTIONS, STARS_OPTIONS } from './optionsKeyword';
import { graphql } from 'react-apollo';


const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ResultList({ loading, search }) {
  if (loading) {
    return <p> loading.... </p>;
  } else if (search) {
    const nodeList = search.nodes.map((item) => {
      return (
        <div className='card' key={item.name}>
          <div className="content">
          <img className="right floated mini ui image" src={item.owner.avatarUrl} alt="avatar"/>
            <a className="header" href={item.url} target="_blank">{item.name} </a>
            <div className="meta">
              <a href={item.owner.url} target="_blank" >{item.owner.login}</a>
            </div>
            <div className="description">
              <p>{item.description}</p>
            </div>
          </div>
          <div className="extra content">
            <span> {numberWithCommas(item.stargazers.totalCount)} <i className="star icon"></i> </span>
            <span className="right floated"> {numberWithCommas(item.watchers.totalCount)} Watchers </span>
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
      selectedLanguage: 'Javascript',
      selectedTopics: [],      
      minStars: 10000,
      queryString: '',
    };

    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleChangeStars = this.handleChangeStars.bind(this);
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
    this.handleChangeTopics = this.handleChangeTopics.bind(this);   
  }

  handleSearchClick(e) {
    e.preventDefault();
    let topicQuery = '';
    if(this.state.selectedTopics.length > 0)
    {
      const topicArray = this.state.selectedTopics.map((topic) => {return `topic:${topic}` });
      topicQuery = topicArray.join(" ");
    }
    this.setState({ queryString: `language:${this.state.selectedLanguage} ${topicQuery} sort:stars stars:>${this.state.minStars}` });
  }

  handleChangeLanguage(e, { value }) {
    this.setState({ selectedLanguage: value });
  }

  handleChangeStars(e, { value }) {
    this.setState({ minStars: value });
  }

  handleChangeTopics(e, { value }) {
    this.setState({ selectedTopics: value });
  }

  render() {
    return (
      <div>
        <div>
          <Dropdown defaultValue='Javascript' search selection options={LANGUAGES_OPTIONS} onChange={this.handleChangeLanguage} />
          <Dropdown defaultValue='10000' search selection options={STARS_OPTIONS} style={{ marginLeft: 1 + 'em' }} onChange={this.handleChangeStars} />
          <Dropdown placeholder='Select Topics' multiple search selection style={{ marginLeft: 1 + 'em' }} onChange={this.handleChangeTopics}  options={TOPIC_OPTIONS} />          
          <Button primary as='button' onClick={this.handleSearchClick} style={{ marginLeft: 1 + 'em' }}> Search </Button>
        </div>
        <div style={{ paddingTop: 2 + '%' }}>
          <ResultListWithData queryString={this.state.queryString} />
        </div>
      </div>
    )
  }
}


