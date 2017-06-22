import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';

import ArrowRight from 'material-ui/svg-icons/keyboard-arrow-right';
import remyImage from '../assets/Duck.jpg';

export const MemberList = ({
  memberListContainer,
  userName,
  userEmail,
  address,
  unique,
  toggleUserItem,
  userItemId,
}) => {
  return (
    <div
      className={memberListContainer}
      onClick={event => toggleUserItem(unique.id)}
    >
      <ListItem dense button>
        <Avatar alt="Remy Sharp" src={remyImage} />
        <ListItemText primary={userName} secondary={userEmail} />
        <ListItemSecondaryAction>
          <IconButton>
            <ArrowRight
              color={'rgb(100, 206, 149)'}
              className={
                userItemId === unique.id
                ? 'downArrow'
                : null
              }
            />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      {
        userItemId === unique.id ?
          <Grid container justify='flex-end'>
            <Grid item xs={12}>
              <div className='address-container'>
                <span className='address'>Address: </span>
                <span className='address-details'>{`${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`}</span>
              </div>
            </Grid>
          </Grid>
        : null
      }
    </div>
  );
}

MemberList.propTypes = {
  memberListContainer: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  address: PropTypes.object.isRequired,
  unique: PropTypes.object.isRequired,
  toggleUserItem: PropTypes.func.isRequired,
  userItemId: PropTypes.number,
}

export default MemberList
