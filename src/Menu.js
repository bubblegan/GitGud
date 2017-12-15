import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import  RepoSearch  from './Home'
import  ProfileSearch from './Profile'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


export default class MenuBar extends Component {
  constructor(props){
    super(props);
  
    this.state = { activeItem: 'Search Repo' }
  }

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Router>
      <div>
        <Menu pointing secondary>
          <Menu.Item as={ Link } to='/' name='Search Repo' active={activeItem === 'Search Repo'} onClick={this.handleItemClick} />
          <Menu.Item as={ Link } to='/profile' name='Search Profile' active={activeItem === 'Search Profile'} onClick={this.handleItemClick} />          
        </Menu>

        <Segment>
          <Route exact path="/" component={RepoSearch}/>
          <Route path="/profile" component={ProfileSearch}/>          
        </Segment>
      </div>
      </Router>
    )
  }
}