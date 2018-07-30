import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import Kanban from '../../../Kanban/Kanban';
import BoardCreateWidget from '../../components/BoardCreateWidget/BoardCreateWidget';

// Import Actions
import { addBoardRequest } from '../../../Kanban/KanbanActions';
//import { fetchLanes } from '../../../Lane/LaneActions';
import { toggleAddBoard } from '../../../App/AppActions';

// Import Selectors
import { getShowAddBoard } from '../../../App/AppReducer';
//import { getPosts } from '../../PostReducer';

class BoardPage extends Component {
  /*componentDidMount() {
    this.props.dispatch(fetchLanes());
  }*/

  /*handleDeletePost = post => {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      this.props.dispatch(deletePostRequest(post));
    }
  };*/

  handleAddBoard = () => {
    this.props.dispatch(toggleAddBoard());
    this.props.dispatch(addBoardRequest());
  };

  render() {
    return (
      <div>
        <BoardCreateWidget addBoard={this.handleAddBoard} showAddBoard={this.props.showAddBoard} />
        <Kanban />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
//BoardPage.need = [() => { return fetchLanes(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddBoard: getShowAddBoard(state),
    //posts: getPosts(state),
  };
}

BoardPage.propTypes = {
  lanes: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
  showAddBoard: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

BoardPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(BoardPage);
