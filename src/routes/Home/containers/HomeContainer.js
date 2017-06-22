import { connect } from 'react-redux';
import { getUsers, toggleUserItem, updateFetching, filterUsers } from '../modules/Home';

import Home from '../components/HomeView';

const mapDispatchToProps = {
  getUsers,
  toggleUserItem,
  updateFetching,
  filterUsers,
};

const mapStateToProps = (state) => ({
  homeReducer : state.homeReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
