import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import location from '../../store/location';
import './PageLayout.scss';

const styleSheet = createStyleSheet('InteractiveGrid', theme => ({
  root: {
    flexGrow: 1,
  },
}));

class PageLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classes = this.props.classes;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          {this.props.children}
        </Grid>
      </Grid>
    );
  }
}

PageLayout.propTypes = {
  children: PropTypes.node,
}

const mapStateToProps = (state) => ({
  location: state.location,
});

export default withStyles(styleSheet)(
  connect(mapStateToProps)(PageLayout)
);
