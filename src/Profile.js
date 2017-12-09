import React, { Component } from 'react'
import ProfileResultListWithData from './components/ProfileResult'
import { Input, Button } from 'semantic-ui-react'

export default class ProfileSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryName: '',
      queryString: 'BubbleGan',
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    
  }

  handleSearch(e, { value }) {
    this.setState({ queryName: value });
  }

  handleSearchClick(e, { value }) {
    this.setState({ queryString: `${this.state.queryName}` });    
  }


  render() {
    return (
      <div>
        <div>
          <Input placeholder='Search...' onChange={this.handleSearch} />
          <Button primary as='button' onClick={this.handleSearchClick} style={{ marginLeft: 1 + 'em' }}> Search </Button>
        </div>
        <div style={{ paddingTop: 2 + '%' }}>
          <ProfileResultListWithData queryString={this.state.queryString} />
        </div>
      </div>
    )
  }
}