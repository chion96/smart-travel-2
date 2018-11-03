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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import HomeIcon from '@material-ui/icons/Home';
import InputIcon from '@material-ui/icons/Input';
import SettingsIcon from '@material-ui/icons/Settings';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      sideBarOpen: false,
      logged: false,
      trips: [],
      clientId: undefined
    };
    this.toggleSideBar = this.toggleSideBar.bind(this);
    this.login = this.login.bind(this);
    this.getNotification = this.getNotification.bind(this);
  }

  componentWillMount() {
    let localStorageId = window.localStorage.getItem('clientId');
    if (localStorageId !== undefined) {
      this.setState({
        clientId: JSON.parse(localStorageId),
        logged: true
      })
    }
  }

  componentDidMount() {
    const { logged } = this.state;
    let getNoti = this.getNotification;

    function timeout() {
      setTimeout(function() {
          getNoti();
          timeout();
      }, 2500);
    }

    if (logged) {
      timeout();
    }
  }

  async getNotification() {
    console.log('getting notfi')
    await axios.get(`http://localhost:8080/api/notification/`).then(res => {
      console.log(res.data);
      if (res.data !== false) {
        toast.success(res.data.content, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
    });
  };

  componentWillReceiveProps(props) {
    console.log(props)
  }

  login(clientId) {
    window.localStorage.setItem('clientId', clientId);
    this.setState({
      logged: true,
      sideBarOpen: false,
      clientId: clientId
    })
  }

  toggleSideBar() {
    this.setState({ sideBarOpen: !this.state.sideBarOpen });
  }

  render() {
    const { path } = this.props;
    const { sideBarOpen, logged, clientId, shouldUpdate } = this.state;
    
    return (
      <Router>
        <div>
          <ToastContainer />
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
                        <ListItem button key="Home" onClick={() => {this.setState({ sideBarOpen: false })}}>
                          <ListItemIcon><HomeIcon /></ListItemIcon>
                          <ListItemText primary="Home" />
                        </ListItem>
                      </Link>

                      <ListItem button key="Account" onClick={() => {this.setState({ sideBarOpen: false })}}>
                          <ListItemIcon><AccountCircleIcon/></ListItemIcon>
                          <ListItemText primary="Account" />
                      </ListItem>
                      

                      <ListItem button key="Settings" onClick={() => {this.setState({ sideBarOpen: false })}}>
                          <ListItemIcon><SettingsIcon/></ListItemIcon>
                          <ListItemText primary="Settings" />
                      </ListItem>

                      <ListItem 
                        button key="Logout" 
                        onClick={() => {
                            this.setState({ logged: false });
                            window.localStorage.removeItem('clientId');
                        }}
                      >
                          <ListItemIcon><InputIcon /></ListItemIcon>
                          <ListItemText primary="Logout" />
                      </ListItem>
                    </List>
                  </Drawer>
                </header>

                <div className="app-container">
                  <Route exact path="/" component={() => <Trips clientId={clientId}/>}/>
                  <Route path="/trip_details" component={TripDetails} />
                </div>

                <footer>

                </footer>
              </div>
            )}
            {!logged && (
              <Login login={this.login}/>
            )}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
