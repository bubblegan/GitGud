import React, { Component } from 'react'

import StartOfMonth from 'date-fns/start_of_month'
import StartOfQuarter from 'date-fns/start_of_quarter'
import StartOfYear from 'date-fns/start_of_year'
import Format from 'date-fns/format'

import { Dropdown, Button } from 'semantic-ui-react'
import RepoResultListWithData from './components/RepoResultsList';

import { LANGUAGES_OPTIONS, TOPIC_OPTIONS, STARS_OPTIONS, TRENDING_OPTION } from './optionsKeyword';


export default class MainSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'Javascript',
      selectedTopics: [],
      trendingSince: '',
      minStars: 10000,
      queryString: '',
      viewType: 'view1',
    };

    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleChangeStars = this.handleChangeStars.bind(this);
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
    this.handleChangeTopics = this.handleChangeTopics.bind(this);
    this.handleChangeView = this.handleChangeView.bind(this);
    this.handleChangeTrending = this.handleChangeTrending.bind(this);
  }

  handleSearchClick(e) {
    e.preventDefault();
    let topicQuery = '';
    let trendingQuery = '';
    let languageQuery = '';
    let starsQuery = `stars:>${this.state.minStars}`;

    if (this.state.selectedTopics.length > 0) {
      const topicArray = this.state.selectedTopics.map((topic) => { return `topic:${topic}` });
      topicQuery = topicArray.join(" ");
    }
    if (this.state.trendingSince) {
      let today = new Date();
      let trendingStarWithAtLeast = 100;
      
      switch (this.state.trendingSince) {
        case 'month':
          topicQuery = 'created:>' + Format(StartOfMonth(today), 'YYYY-MM-DD');
          break;
        case 'quater':
          topicQuery = 'created:>' + Format(StartOfQuarter(today), 'YYYY-MM-DD');
          trendingStarWithAtLeast = 200          
          break;
        case 'year':
          topicQuery = 'created:>' + Format(StartOfYear(today), 'YYYY-MM-DD');
          trendingStarWithAtLeast = 500
          break;
        default:
          break;
      }
      starsQuery = `stars:>${trendingStarWithAtLeast}`;
    }

    if(this.state.selectedLanguage !== 'All') 
      languageQuery = `language:${this.state.selectedLanguage}`;

    this.setState({
      queryString: `
        ${languageQuery}
        ${topicQuery} 
        ${trendingQuery}
        sort:stars 
        ${starsQuery}
        `
    });
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

  handleChangeTrending(e, { value }) {
      this.setState({ trendingSince: value });
  }

  handleChangeView(e, { value }) {

    switch (this.state.viewType) {
      case 'view1':
        this.setState({ viewType: 'view2' })
        break;
      case 'view2':
        this.setState({ viewType: 'view1' })
        break;
      default:
        break;
    }
  }

  render() {

    const RepoResults = this.state.queryString ? <RepoResultListWithData queryString={this.state.queryString} viewType={this.state.viewType} /> : null;

    return (
      <div>
        <div>
          <Dropdown defaultValue='Javascript' search selection options={LANGUAGES_OPTIONS} onChange={this.handleChangeLanguage} />
          <Dropdown defaultValue='10000' search selection options={STARS_OPTIONS} style={{ marginLeft: 1 + 'em' }} onChange={this.handleChangeStars} />
          <Dropdown placeholder='Trending!' search selection style={{ marginLeft: 1 + 'em' }} onChange={this.handleChangeTrending} options={TRENDING_OPTION} />
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


