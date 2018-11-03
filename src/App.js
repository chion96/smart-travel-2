import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import logo from './logo.svg';
import cathayLogo from './src/Cathay/element/bannerLogo.png';

import './App.css';

import Login from './pages/Login';
import Trips from './pages/Trips';
import TripDetails from './pages/TripDetails';

import { 
  AppBar, 
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      sideBarOpen: false,
      logged: true
    };
    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  toggleSideBar() {
    this.setState({ sideBarOpen: !this.state.sideBarOpen });
  }

  render() {
    const { path } = this.props;
    const { sideBarOpen, logged } = this.state;
      
    return (
      <Router>
        <div className="App">
          {logged && (
            <div>
              <header className="App-header">
                <AppBar position="static">
                  <Toolbar className="appToolBar">
                    <IconButton className="appBarButton measurementButton" color="inherit" aria-label="Measure">
                      <CenterFocusWeakIcon />
                    </IconButton>
                    <div className="headerTitle">
                      <img src={cathayLogo} />
                    </div>
                    <IconButton className="appBarButton notificationButton" color="inherit" aria-label="Notifications">
                      <NotificationsIcon />
                    </IconButton>
                    <IconButton className="appBarButton sideMenuButton" color="inherit" aria-label="Menu" onClick={this.toggleSideBar}>
                      <MenuIcon />
                    </IconButton>
                  </Toolbar>
                </AppBar>
                <Drawer
                  variant="persistent"
                  anchor="right"
                  open={sideBarOpen}
                >
                  <div className="sideBarHeader">
                    <IconButton onClick={this.toggleSideBar}>
                      <ChevronLeftIcon />
                    </IconButton>
                  </div>
                  <Divider />
                  <List>

                    <Link to='/'>
                      <ListItem button key="Home">
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary="Home" />
                      </ListItem>
                    </Link>

                    <Link to='/trip_details'>
                      <ListItem button key="Trip Details">
                          <ListItemIcon><InboxIcon /></ListItemIcon>
                          <ListItemText primary="Trip Details" />
                      </ListItem>
                    </Link>

                    <ListItem button key="Logout" onClick={() => {this.setState({ logged: false })}}>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                  </List>
                </Drawer>
              </header>

              <div className="app-container">
                <Route exact path="/" component={Trips} />
                <Route path="/trip_details" component={TripDetails} />
              </div>

              <footer>
              </footer>
            </div>
          )}
          {!logged && (
            <Login />
          )}
        </div>

        
      </Router>
    );
  }
}

export default App;
