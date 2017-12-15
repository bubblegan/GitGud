import React, { Component } from 'react'
import { Dropdown, Button } from 'semantic-ui-react'
import RepoResultListWithData from './components/RepoResultsList';

import { LANGUAGES_OPTIONS, TOPIC_OPTIONS, STARS_OPTIONS } from './optionsKeyword';


export default class MainSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'Javascript',
      selectedTopics: [],
      minStars: 10000,
      queryString: '',
      viewType: 'view1',
    };

    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleChangeStars = this.handleChangeStars.bind(this);
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
    this.handleChangeTopics = this.handleChangeTopics.bind(this);
    this.handleChangeView =  this.handleChangeView.bind(this);
  }

  handleSearchClick(e) {
    e.preventDefault();
    let topicQuery = '';
    if (this.state.selectedTopics.length > 0) {
      const topicArray = this.state.selectedTopics.map((topic) => { return `topic:${topic}` });
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

  handleChangeView(e, {value}){
    if(this.state.viewType === 'view1')
      this.setState({ viewType : 'view2'})
    else if(this.state.viewType === 'view2')
      this.setState({ viewType : 'view1'})
  }

  render() {

    const RepoResults = this.state.queryString ?   <RepoResultListWithData queryString={this.state.queryString} viewType={this.state.viewType} /> : null;

    return (
      <div>
        <div>
          <Dropdown defaultValue='Javascript' search selection options={LANGUAGES_OPTIONS} onChange={this.handleChangeLanguage} />
          <Dropdown defaultValue='10000' search selection options={STARS_OPTIONS} style={{ marginLeft: 1 + 'em' }} onChange={this.handleChangeStars} />
          <Dropdown placeholder='Select Topics' multiple search selection style={{ marginLeft: 1 + 'em' }} onChange={this.handleChangeTopics} options={TOPIC_OPTIONS} />
          <Button primary as='button' onClick={this.handleSearchClick} style={{ marginLeft: 1 + 'em' }}> Search </Button>
          <Button primary as='button' onClick={this.handleChangeView} style={{ marginLeft: 1 + 'em' }}> Change View </Button>
        </div>
        <div style={{ paddingTop: 2 + '%' }}>
          {RepoResults}
        </div>
      </div>
    )
  }
}


