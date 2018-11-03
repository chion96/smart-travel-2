import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#006465',
    },
  },
  overrides: {
    MuiExpansionPanel: {
      expanded: {
        margin: '0'
      }
    },
    MuiExpansionPanelDetails: {
      root: {
        padding: '8px 24px 24px 20px'
      }
    },
    MuiToolbar: {
      regular: {
        minHeight: '50px'
      }
    },
    MuiPaper: {
      rounded: {
        borderRadius: '0'
      }
    }
  }
});

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<App />
	</MuiThemeProvider>, 
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
