import React, { Component } from 'react'

import StartOfMonth from 'date-fns/start_of_month'
import StartOfQuarter from 'date-fns/start_of_quarter'
import StartOfYear from 'date-fns/start_of_year'
import Format from 'date-fns/format'

import { Dropdown, Button, Input, Form } from 'semantic-ui-react'
import RepoResultListWithData from './components/RepoResultsList';

import {
  LANGUAGES_OPTIONS,
  MAX_STARS_OPTIONS,
  MIN_STARS_OPTIONS,
  TRENDING_OPTION,
  VIEW_OPTION,
  VIEW_TYPE_FORK,
  MONTH_VALUE,
  YEAR_VALUE,
  QUATER_VALUE,
} from './optionsKeyword';

export default class MainSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'Javascript',
      selectedTopics: [],
      trendingSince: '',
      minStars: 10000,
      maxStars: 500000,
      queryString: '',
      viewType: VIEW_TYPE_FORK,
      additionalInfo: '',
    };

    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleChangeMinStars = this.handleChangeMinStars.bind(this);
    this.handleChangeMaxStars = this.handleChangeMaxStars.bind(this);
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
    this.handleChangeView = this.handleChangeView.bind(this);
    this.handleChangeTrending = this.handleChangeTrending.bind(this);
    this.handleChangeAdditionInfo = this.handleChangeAdditionInfo.bind(this);
  }

  handleSearchClick(e) {
    e.preventDefault();

    let topicQuery = '';
    let trendingQuery = '';
    let languageQuery = '';
    let starsQuery = `stars:${this.state.minStars}..${this.state.maxStars}`;

    if (this.state.selectedTopics.length > 0) {
      const topicArray = this.state.selectedTopics.map((topic) => { return `topic:${topic}` });
      topicQuery = topicArray.join(" ");
    }

    //Overwrite Stars if Trending
    if (this.state.trendingSince) {
      let today = new Date();
      let trendingStarWithAtLeast = 100;

      switch (this.state.trendingSince) {
        case MONTH_VALUE:
          topicQuery = 'created:>' + Format(StartOfMonth(today), 'YYYY-MM-DD');
          break;
        case QUATER_VALUE:
          topicQuery = 'created:>' + Format(StartOfQuarter(today), 'YYYY-MM-DD');
          trendingStarWithAtLeast = 200
          break;
        case YEAR_VALUE:
          topicQuery = 'created:>' + Format(StartOfYear(today), 'YYYY-MM-DD');
          trendingStarWithAtLeast = 500
          break;
        default:
          break;
      }
      starsQuery = `stars:>${trendingStarWithAtLeast}`;
    }

    if (this.state.selectedLanguage !== 'All')
      languageQuery = `language:${this.state.selectedLanguage}`;

    this.setState({
      queryString: `
        ${languageQuery}
        ${topicQuery} 
        ${trendingQuery}
        sort:stars 
        ${starsQuery}
        ${this.state.additionalInfo}
        `
    });
  }

  handleChangeLanguage(e, { value }) {
    this.setState({ selectedLanguage: value });
  }

  handleChangeMinStars(e, { value }) {
    this.setState({ minStars: value });
  }

  handleChangeMaxStars(e, { value }) {
    this.setState({ maxStars: value });
  }

  handleChangeTrending(e, { value }) {
    this.setState({ trendingSince: value });
  }

  handleChangeView(e, { value }) {
    this.setState({ viewType: value });
  }

  handleChangeAdditionInfo(e, { value }) {
    this.setState({ additionalInfo: value });
  }

  render() {

    const RepoResults = this.state.queryString ? <RepoResultListWithData queryString={this.state.queryString} viewType={this.state.viewType} /> : null;
    const MinStarsDropdown = this.state.trendingSince ? null : <Dropdown defaultValue='10000' search selection options={MIN_STARS_OPTIONS} onChange={this.handleChangeMinStars} />;
    const MaxStarsDropdown = this.state.trendingSince ? null : <Dropdown defaultValue='500000' search selection options={MAX_STARS_OPTIONS} onChange={this.handleChangeMaxStars} />;
    
    return (
      <div>
        <div className='ui column stackable grid' style={{ marginTop: 1 + '%' }}>
          <div className='column'>
            <Form>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label> Languages </label>
                  <Dropdown defaultValue='Javascript' search selection options={LANGUAGES_OPTIONS} onChange={this.handleChangeLanguage} />
                </Form.Field>
                <Form.Field>
                  <label> Min Stars </label>
                  {MinStarsDropdown}
                </Form.Field>
                <Form.Field>
                  <label> Max Stars </label>
                  {MaxStarsDropdown}
                </Form.Field>
                <Form.Field>
                  <label>Add In Some Keyword Here!</label>
                  <Input placeholder='Additional Info' onChange={this.handleChangeAdditionInfo} >
                    <input maxLength="30" />
                  </Input>
                </Form.Field>
                <Form.Field>
                  <Button primary as='button' onClick={this.handleSearchClick} style={{  marginTop: 23 + 'px' }}> Search </Button>                
                </Form.Field>
              </Form.Group>
            </Form>
          </div>
        </div>
        <div className='row'>
          <Dropdown placeholder='Trending?' search selection  onChange={this.handleChangeTrending} options={TRENDING_OPTION} />
          <Dropdown button className='icon' floating labeled icon='unhide' style={{ marginLeft: 1 + 'em' }} onChange={this.handleChangeView} options={VIEW_OPTION} search text='Select View' />                            
        </div>
        <div style={{ paddingTop: 2 + '%' }}>
          {RepoResults}
        </div>
      </div>
    )
  }
}


