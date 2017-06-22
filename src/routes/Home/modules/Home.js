// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_USERS = 'UPDATE_USERS';
export const UPDATE_USER_ITEM = 'UPDATE_USER_ITEM';
export const UPDATE_IS_FETCHING = 'UPDATE_IS_FETCHING';
export const FILTER_USERS = 'FILTER_USERS';

// ------------------------------------
// Actions
// ------------------------------------
export function getUsers() {
  return (dispatch, getState) => fetch(`http://jsonplaceholder.typicode.com/users`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  .then(resp => resp.json())
  .then((response) => {
    dispatch(updateUsers(response));
    dispatch(updateFetching(false));
  })
  .catch(e => e);
}

export function toggleUserItem(id) {
  return {
    type: UPDATE_USER_ITEM,
    payload: id
  }
}

export function updateUsers(users) {
  return {
    type: UPDATE_USERS,
    payload: users
  }
}

export function updateFetching(bool) {
  return {
    type: UPDATE_IS_FETCHING,
    payload: bool
  }
}

export function filterUsers(query) {
  return {
    type: FILTER_USERS,
    payload: query
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_USERS]: (state, action) => {
    return { ...state, users: action.payload, filteredUsers: action.payload };
  },
  [UPDATE_USER_ITEM]: (state, action) => {
    return { ...state, userItemId: action.payload };
  },
  [UPDATE_IS_FETCHING]: (state, action) => {
    return { ...state, isFetching: action.payload };
  },
  [FILTER_USERS]: (state, action) => {
    var queryResult=[];

    if (action.payload === '') {
      return { ...state, filteredUsers: state.users };
    }

    state.users.forEach((person) => {
      if(person.name.toLowerCase().indexOf(action.payload) != -1) {
        queryResult.push(person);
      }
    });

    return { ...state, filteredUsers: queryResult };
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  users: [],
  query: '',
  filteredUsers: [],
  userItemId: null,
  isFetching: false,
};

export default function homeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
