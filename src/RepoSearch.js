import React, { Component } from 'react'

import StartOfMonth from 'date-fns/start_of_month'
import StartOfQuarter from 'date-fns/start_of_quarter'
import StartOfYear from 'date-fns/start_of_year'
import AddMonths from 'date-fns/add_months'
import AddQuarters from 'date-fns/add_quarters'
import AddYears from 'date-fns/add_quarters'
import Format from 'date-fns/format'

import { Dropdown, Button, Input, Form } from 'semantic-ui-react'
import RepoResultsListWithData from './components/RepoResultsListWithData';
import ProfileStarredRepoResultsListWithData from './components/ProfileRepoResultsListWithData';

import {
  LANGUAGES_OPTIONS,
  MAX_STARS_OPTIONS,
  MIN_STARS_OPTIONS,
  TRENDING_OPTION,
  REPO_SEARCH_OPTIONS,
  VIEW_OPTION,
  VIEW_TYPE_FORK,
  MONTH_VALUE,
  YEAR_VALUE,
  QUATER_VALUE,
  LAST_MONTH_VALUE,
  LAST_YEAR_VALUE,
  LAST_QUATER_VALUE,
  OWNED_REPO,
} from './constant/optionsKeyword';

const DEFAULT_MIN_STARS = 10000;
const DEFAULT_MAX_STARS = 500000;
const DEFAULT_TRENDING_STARS = 200;
const DEFAULT_SELECTED_LANGUAGE = 'All';
const SEARCH_TRENDING = 'trending';
const SEARCH_NORMAL = 'normal';
const SEARCH_PROFILE = 'profile';

export default class RepoSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: DEFAULT_SELECTED_LANGUAGE,
      trendingSince: MONTH_VALUE,
      minStars: DEFAULT_MIN_STARS,
      maxStars: DEFAULT_MAX_STARS,
      searchType: SEARCH_NORMAL,
      repoIsForked: false,
      profileName: '',
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
    this.handleChangeRepoType = this.handleChangeRepoType.bind(this);
    this.handleChangeProfile = this.handleChangeProfile.bind(this);
  }

  //Function to generate the query base on the state.
  generateQuery() {
    let trendingQuery = '';
    let languageQuery = '';
    let queryString = '';
    let starsQuery = `stars:${this.state.minStars}..${this.state.maxStars}`;;

    //If search by profile, return profile name.
    if (this.state.searchType === SEARCH_PROFILE) {
      return this.state.profileName;
    } else if(this.state.searchType === SEARCH_TRENDING) {
      let today = new Date();
      let lastMonth = AddMonths(today, -1);
      let lastQuater = AddQuarters(today, -1);
      let lastYear = AddYears(today, -1);

      switch (this.state.trendingSince) {
        case MONTH_VALUE:
          trendingQuery = 'created:>' + Format(StartOfMonth(today), 'YYYY-MM-DD');
          break;
        case QUATER_VALUE:
          trendingQuery = 'created:>' + Format(StartOfQuarter(today), 'YYYY-MM-DD');
          break;
        case YEAR_VALUE:
          trendingQuery = 'created:>' + Format(StartOfYear(today), 'YYYY-MM-DD');
          break;
        case LAST_MONTH_VALUE:
          trendingQuery = 'created:>' + Format(StartOfMonth(lastMonth), 'YYYY-MM-DD');
          break;
        case LAST_QUATER_VALUE:
          trendingQuery = 'created:>' + Format(StartOfQuarter(lastQuater), 'YYYY-MM-DD');
          break;
        case LAST_YEAR_VALUE:
          trendingQuery = 'created:>' + Format(StartOfYear(lastYear), 'YYYY-MM-DD');
          break;
        default:
          break;
      }
      starsQuery = `stars:>${DEFAULT_TRENDING_STARS}`;
    }

    //Language Query
    if (this.state.selectedLanguage !== DEFAULT_SELECTED_LANGUAGE)
      languageQuery = `language:${this.state.selectedLanguage}`;
    
    queryString = `
      ${languageQuery}
      ${trendingQuery}
      sort:stars 
      ${starsQuery}
      ${this.state.additionalInfo}
    `;

    return queryString;
  }

  handleSearchClick(e) {
    e.preventDefault();

    let queryString = this.generateQuery();

    this.setState({
      queryString
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
  handleChangeTrending(e, { value }) {
    this.setState({ trendingSince: value });
  }

  //Change Search Type Between Trending and Normal
  handleChangeSearchType(searchType) {
    if (searchType === SEARCH_NORMAL) {
      this.setState({ minStars: DEFAULT_MIN_STARS, maxStars: DEFAULT_MAX_STARS });
    }
    if(searchType === SEARCH_PROFILE){
      this.setState({repoIsForked: false});
    }
    this.setState({ queryString: '' });
    this.setState({ searchType: searchType });
  }

  //Change View of RepoResults, Eg, Forks, Created At...
  handleChangeView(e, { value }) {
    this.setState({ viewType: value });
  }

  //Change of additional info input for keyword search
  handleChangeAdditionInfo(e, { value }) {
    this.setState({ additionalInfo: value });
  }

  handleChangeProfile(e, { value }) {
    this.setState({ profileName: value });
  }

  handleChangeRepoType(e, { value }) {
    let isForked = value === OWNED_REPO ? false : true;
    this.setState({ repoIsForked: isForked });
  }


  render() {

    let RepoResults = null;
    const MinStarsDropdown = <Dropdown defaultValue={DEFAULT_MIN_STARS} search selection options={MIN_STARS_OPTIONS} onChange={this.handleChangeMinStars} />;
    const MaxStarsDropdown = <Dropdown defaultValue={DEFAULT_MAX_STARS} search selection options={MAX_STARS_OPTIONS} onChange={this.handleChangeMaxStars} />;
    let MinStarForms = null;
    let MaxStarForms = null;
    let TrendingForms = null;
    let ProfileForms = null;
    let RepoForms = null;
    let LanguageForms = null;
    let KeywordForms = null;

    let SearchTypeButton = (<Button.Group>
      <Button positive={this.state.searchType === SEARCH_NORMAL} onClick={this.handleChangeSearchType.bind(this, SEARCH_NORMAL)}>Normal</Button>
      <Button.Or />
      <Button positive={this.state.searchType === SEARCH_TRENDING} onClick={this.handleChangeSearchType.bind(this, SEARCH_TRENDING)}>Trending</Button>
      <Button.Or />
      <Button positive={this.state.searchType === SEARCH_PROFILE} onClick={this.handleChangeSearchType.bind(this, SEARCH_PROFILE)}>Profile</Button>
    </Button.Group>);

    if (this.state.searchType !== SEARCH_PROFILE) {
      RepoResults = this.state.queryString ? <RepoResultsListWithData queryString={this.state.queryString} viewType={this.state.viewType} /> : null;
      LanguageForms = (<Form.Field>
        <label> Languages </label>
        <Dropdown defaultValue={DEFAULT_SELECTED_LANGUAGE} search selection options={LANGUAGES_OPTIONS} onChange={this.handleChangeLanguage} />
      </Form.Field>);
      KeywordForms = (<Form.Field>
        <label>Add In Some Keyword Here!</label>
        <Input placeholder='Additional Info' onChange={this.handleChangeAdditionInfo} >
          <input maxLength="30" />
        </Input>
      </Form.Field>);
    }
    if (this.state.searchType === SEARCH_TRENDING) {
      TrendingForms = (
        <Form.Field>
          <label> Trending Since</label>
          <Dropdown placeholder='Trending?' defaultValue={MONTH_VALUE} search selection onChange={this.handleChangeTrending} options={TRENDING_OPTION} />
        </Form.Field>
      );
    }
    else if (this.state.searchType === SEARCH_NORMAL) {
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
    else if (this.state.searchType === SEARCH_PROFILE) {
      RepoResults = this.state.queryString ? <ProfileStarredRepoResultsListWithData isForked={this.state.repoIsForked} queryString={this.state.queryString} viewType={this.state.viewType} /> : null;
      ProfileForms = (
        <Form.Field>
          <label>User Profile</label>
          <Input placeholder='Login ID or Email' onChange={this.handleChangeProfile} >
            <input maxLength='50' />
          </Input>
        </Form.Field>);
      RepoForms = (
        <Form.Field>
          <label>Repo Type</label>
          <Dropdown defaultValue={OWNED_REPO} search selection options={REPO_SEARCH_OPTIONS} onChange={this.handleChangeRepoType} />
        </Form.Field>);
    }

    return (
      <div>
        <div className='row' style={{ paddingBottom: 1 + 'em', paddingTop: 3 + '%', background: 'white', zIndex: 2, position: 'sticky', top: 0, boxShadow: "0 2px 2px -2px grey" }} >
          {SearchTypeButton}
          <Dropdown button className='icon' floating labeled icon='unhide' style={{ marginLeft: 1 + 'em' }} onChange={this.handleChangeView} options={VIEW_OPTION} search text='Select View' />
        </div>
        <div className='ui column stackable grid' style={{ marginTop: 1 + '%' }}>
          <div className='column'>
            <Form>
              <Form.Group widths='equal'>
                {LanguageForms}
                {MinStarForms}
                {MaxStarForms}
                {ProfileForms}
                {TrendingForms}
                {RepoForms}
                {KeywordForms}
                <Form.Field>
                  <Button primary as='button' onClick={this.handleSearchClick} style={{ marginTop: 23 + 'px' }}> Search </Button>
                </Form.Field>
              </Form.Group>
            </Form>
          </div>
        </div>
        <div style={{ paddingTop: 2 + '%', marginLeft: 3 + 'px' }}>
          {RepoResults}
        </div>
      </div>
    )
  }
}


