import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import KanbanBoard from '../../modules/Kanban/KanbanBoard';

// Import Actions
import { toggleAddBoard } from './AppActions';
import { addBoardRequest, fetchBoards } from '../../modules/Kanban/KanbanActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';

let DevTools;
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  DevTools = require('./components/DevTools').default;
}

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }
/*
  toggleAddBoardSection = () => {
    this.props.dispatch(toggleAddBoard());
  };*/
  handleAddBoard = () => {
    this.props.dispatch(addBoardRequest());
  }
  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Helmet
            title="MERN Starter - Blog App"
            titleTemplate="%s - Blog App"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <Header
            switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
            intl={this.props.intl}
            toggleAddBoard={this.toggleAddBoardSection}
          />
          <div className={styles.container}>
            <div>
                <button className={styles.AddPost}
                onClick={() =>
                 this.handleAddBoard({
                 name: 'New board',
               })}
              >Add Board</button>
              <KanbanBoard boards={this.props.boards} />
          </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
App.need = [() => { return fetchBoards(); }];
App.propTypes = {
  //children: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  intl: PropTypes.object.isRequired,
  boards: PropTypes.array,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
    boards: Object.values(state.boards)
  };
}

export default connect(mapStateToProps)(App);
