import React, { Component } from "react";
import { Menu, Dropdown, Progress } from "semantic-ui-react";
import { graphql } from 'react-apollo';
import RepoSearch from "./Home";
import ProfileSearch from "./Profile";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { PROFILE_LIMIT_DETAIL } from './queries';


function ProfileDetail({ loading, viewer, rateLimit }) {
  if (loading) {
    return <p>loading...</p>;
  } else {

    let percentage = (rateLimit.remaining / 5000) * 100;

    return (
      <div style={{padding : 2 + "px"}}>
        <p> Hi, {viewer.login}. Your Query Left : {rateLimit.remaining} / 5000</p>
        <Progress progress percent={percentage.toFixed(2)} color="blue" />
      </div>
    );
  }
}

const ProfileDetailWithData = graphql(PROFILE_LIMIT_DETAIL,
  {
    props({ data: { loading, viewer, rateLimit } }) {
      return {
        loading,
        viewer,
        rateLimit
      }
    },
  })(ProfileDetail);


export default class MenuBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: "Repo",
    };

    this.handleOpenProfileTab = this.handleOpenProfileTab.bind(this);

  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  
  handleOpenProfileTab(e, { value }) {
    //TODO - Refresh the rate limit
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Router>
        <div style={{ marginTop: 10 + "px" }}>
          <Menu pointing secondary>
            <Menu.Item
              as={Link}
              to="/"
              name="Repo"
              active={activeItem === "Repo"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={Link}
              to="/profile"
              name="Profile"
              active={activeItem === "Profile"}
              onClick={this.handleItemClick}
            />

            <Menu.Menu position='right'>
              <Dropdown item text='Profile Details' onOpen={this.handleOpenProfileTab}>
                <Dropdown.Menu>
                  <div style={{
                    width: 400 + 'px',
                    height: 100 + 'px',
                    padding: 8 + 'px',
                  }}>
                    <ProfileDetailWithData />
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>

          </Menu>

          <div style={{ marginTop: 2 + "%" }}>
            <Route exact path="/" component={RepoSearch} />
            <Route path="/profile" component={ProfileSearch} />
          </div>
        </div>
      </Router>
    );
  }
}
