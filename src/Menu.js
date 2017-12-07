import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import  MainSearch  from './Home'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


export default class MenuBar extends Component {
  constructor(props){
    super(props);
  
    this.state = { activeItem: 'Home' }
  }

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Router>
      <div>
        <Menu pointing secondary>
          <Menu.Item as={ Link } to='/home' name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
          <Menu.Item as={ Link } to='/friends' name='Empty' active={activeItem === 'Empty'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item name='Logout' active={activeItem === 'Logout'} onClick={this.handleItemClick} />
          </Menu.Menu>
        </Menu>

        <Segment>
          <Route path="/home" component={MainSearch}/>
        </Segment>
      </div>
      </Router>
    )
  }
}