import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import Input from 'material-ui/Input/Input';

import MemberList from './MemberList.js';
import './HomeView.scss';

// TODO
// add note that you might need 'cross origin' chrome extension when working in debug mode
// add tests

const styleSheet = createStyleSheet('InteractiveGrid', theme => ({
  searchContainer: {
    borderColor: 'rgb(219, 219, 219)',
    borderStyle: 'solid',
    borderWidth: 2,
    borderTopWidth: 0,
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15,
    paddingLeft: 15,
  },
  memberListContainer: {
    borderColor: 'rgb(219, 219, 219)',
    borderStyle: 'solid',
    borderWidth: 2,
    borderTopWidth: 0,
  },
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
    width: '50%',
    margin: '0 auto',
    paddingTop: 100,
  },
  input: {
    margin: theme.spacing.unit,
  },
}));

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.displayMembers = this.displayMembers.bind(this);
  }

  componentDidMount() {
    this.props.updateFetching(true);
    this.props.getUsers();
  }

  displayMembers() {
    const { classes, homeReducer, toggleUserItem } = this.props;
    let memberList = []; 
    homeReducer.filteredUsers.forEach((user, id) => {
      const unique = {};
      unique.id = id;
      memberList.push(
        <MemberList
          memberListContainer={classes.memberListContainer}
          unique={unique}
          key={id}
          userName={user.name}
          userEmail={user.email}
          address={user.address}
          toggleUserItem={toggleUserItem}
          userItemId={homeReducer.userItemId}
        />
      );
    });

    return memberList;
  }

  handleChange(event) {
    this.props.filterUsers(event.target.value);
  };

  render() {
    const classes = this.props.classes;
    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid container align='center' id='header'>
            <Grid item xs={12}>
              <h3 style={{ color: 'white', paddingLeft: 35 }}>Team Members</h3>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container align='center' justify='center'>

            <Grid item xs={10}>
              <Grid container align='center' justify='space-between' className={classes.searchContainer}>
                <Grid item xs={3}>
                  <Input
                    placeholder="Find by name" className={classes.input}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={3}>
                  <span className='num-people'>{this.props.homeReducer.filteredUsers.length} People</span>
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </Grid>

        {
          this.props.homeReducer.isFetching ?
            <CircularProgress className={classes.progress} size={50} />
          :
            <List style={{padding: 0}}>
              <Grid item xs={12}>
                <Grid container align='center' justify='center'>
                  <Grid item xs={10}>
                    <Grid container align='center' justify='space-between'>
                      <Grid item xs={12}>
                        {this.displayMembers()}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </List>
        }
      </Grid>
    );
  }
}

Home.propTypes = {
  filterUsers: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  homeReducer: PropTypes.object.isRequired,
  toggleUserItem: PropTypes.func.isRequired,
  updateFetching: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
}

export default withStyles(styleSheet)(Home);
