import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import RepoSearch from "./Home";
import ProfileSearch from "./Profile";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class MenuBar extends Component {
  constructor(props) {
    super(props);

    this.state = { activeItem: "Repo" };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

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
