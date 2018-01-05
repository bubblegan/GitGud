import React, { Component } from 'react'

import StartOfMonth from 'date-fns/start_of_month'
import StartOfQuarter from 'date-fns/start_of_quarter'
import StartOfYear from 'date-fns/start_of_year'
import AddMonths from 'date-fns/add_months'
import AddQuarters from 'date-fns/add_quarters'
import AddYears from 'date-fns/add_quarters'
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
  LAST_MONTH_VALUE,
  LAST_YEAR_VALUE,
  LAST_QUATER_VALUE,
} from './optionsKeyword';

const DEFAULT_MIN_STARS = 10000;
const DEFAULT_MAX_STARS = 500000;
const DEFAULT_TRENDING_STARS = 200;
const DEFAULT_SELECTED_LANGUAGE = 'Javascript';
const SEARCH_TRENDING = 'trending';
const SEARCH_NORMAL = 'normal';

export default class RepoSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: DEFAULT_SELECTED_LANGUAGE ,
      selectedTopics: [],
      trendingSince: MONTH_VALUE,
      minStars: DEFAULT_MIN_STARS,
      maxStars: DEFAULT_MAX_STARS,
      searchType: SEARCH_NORMAL,
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
    if (this.state.searchType === SEARCH_TRENDING) {
      let today = new Date();
      let lastMonth = AddMonths(today, -1);
      let lastQuater = AddQuarters(today, -1);
      let lastYear = AddYears(today , -1);

      switch (this.state.trendingSince) {
        case MONTH_VALUE:
          topicQuery = 'created:>' + Format(StartOfMonth(today), 'YYYY-MM-DD');
          break;
        case QUATER_VALUE:
          topicQuery = 'created:>' + Format(StartOfQuarter(today), 'YYYY-MM-DD');
          break;
        case YEAR_VALUE:
          topicQuery = 'created:>' + Format(StartOfYear(today), 'YYYY-MM-DD');
          break;
        case LAST_MONTH_VALUE:
          topicQuery = 'created:>' + Format(StartOfMonth(lastMonth), 'YYYY-MM-DD');
          break;
        case LAST_QUATER_VALUE:
          topicQuery = 'created:>' + Format(StartOfQuarter(lastQuater), 'YYYY-MM-DD');
          break;
        case LAST_YEAR_VALUE:
          topicQuery = 'created:>' + Format(StartOfYear(lastYear), 'YYYY-MM-DD');
          break;  
        default:
          break;
      }
      starsQuery = `stars:>${DEFAULT_TRENDING_STARS}`;
    }

    if (this.state.selectedLanguage !== 'All')
      languageQuery = `language:${this.state.selectedLanguage}`;

    let queryString = `
            ${languageQuery}
            ${topicQuery} 
            ${trendingQuery}
            sort:stars 
            ${starsQuery}
            ${this.state.additionalInfo}
    `;

    this.setState({
      queryString: queryString
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

  //Change of Trendings dropdown
  handleChangeTrending(e, {value}) {
    this.setState({ trendingSince: value });
  }

  //Change Search Type Between Trending and Normal
  handleChangeSearchType(searchType){
    if(searchType === SEARCH_NORMAL){
      this.setState({minStars : DEFAULT_MIN_STARS, maxStars : DEFAULT_MAX_STARS});
    }
    this.setState({ searchType: searchType});
  }

  //Change View of RepoResults, Eg, Forks, Created At...
  handleChangeView(e, { value }) {
    this.setState({ viewType: value });
  }

  //Change of additional info input for keyword search
  handleChangeAdditionInfo(e, { value }) {
    this.setState({ additionalInfo: value });
  }


  render() {

    const RepoResults = this.state.queryString ? <RepoResultListWithData queryString={this.state.queryString} viewType={this.state.viewType} /> : null;
    const MinStarsDropdown = <Dropdown defaultValue={DEFAULT_MIN_STARS} search selection options={MIN_STARS_OPTIONS} onChange={this.handleChangeMinStars} />;
    const MaxStarsDropdown = <Dropdown defaultValue={DEFAULT_MAX_STARS} search selection options={MAX_STARS_OPTIONS} onChange={this.handleChangeMaxStars} />;
    let TrendingButton = null;
    let MinStarForms = null;
    let MaxStarForms = null;
    let TrendingForms = null;

    if(this.state.searchType ===  SEARCH_TRENDING){
      TrendingButton = (<Button.Group>
                <Button  onClick={this.handleChangeSearchType.bind(this, SEARCH_NORMAL)}>Normal</Button>
                  <Button.Or />
                <Button positive  onClick={this.handleChangeSearchType.bind(this, SEARCH_TRENDING)}>Trending</Button>
              </Button.Group>);
      TrendingForms = (
          <Form.Field>
            <label> Trending Since</label>
            <Dropdown placeholder='Trending?'  defaultValue={MONTH_VALUE} search selection onChange={this.handleChangeTrending} options={TRENDING_OPTION} />          
          </Form.Field>
      );               
    }
    else if(this.state.searchType === SEARCH_NORMAL){
      TrendingButton = (<Button.Group>
                <Button positive onClick={this.handleChangeSearchType.bind(this, SEARCH_NORMAL)}>Normal</Button>
                  <Button.Or />
                <Button  onClick={this.handleChangeSearchType.bind(this, SEARCH_TRENDING)}>Trending</Button>
              </Button.Group>);
      MinStarForms = (
        <Form.Field>
          <label> Min Stars </label>
          {MinStarsDropdown}
        </Form.Field>
      );
      MaxStarForms = (
        <Form.Field>
          <label> Max Stars </label>
          {MaxStarsDropdown}
        </Form.Field>
      );
    }

    return (
      <div>
        <div className='row'>
          {TrendingButton}
          <Dropdown button className='icon' floating labeled icon='unhide' style={{ marginLeft: 1 + 'em' }} onChange={this.handleChangeView} options={VIEW_OPTION} search text='Select View' />                                      
        </div>
        <div className='ui column stackable grid' style={{ marginTop: 1 + '%' }}>
          <div className='column'>
            <Form>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label> Languages </label>
                  <Dropdown defaultValue={DEFAULT_SELECTED_LANGUAGE}  search selection options={LANGUAGES_OPTIONS} onChange={this.handleChangeLanguage} />
                </Form.Field>
                {MinStarForms}
                {MaxStarForms}
                {TrendingForms}
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
        <div style={{ paddingTop: 2 + '%' }}>
          {RepoResults}
        </div>
      </div>
    )
  }
}


