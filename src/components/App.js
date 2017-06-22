import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from 'material-ui/styles'
import PropTypes from 'prop-types'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <MuiThemeProvider>
        <Provider store={this.props.store}>
          <Router history={browserHistory} children={this.props.routes} />
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App
