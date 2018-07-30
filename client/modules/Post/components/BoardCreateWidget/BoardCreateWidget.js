import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostCreateWidget.css';

export class BoardCreateWidget extends Component {
  addBoard = () => {
        this.props.addBoard();
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddBoard ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div>
          <a className={styles['post-submit-button']} href="#" onClick={this.addBoard}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

BoardCreateWidget.propTypes = {
  addBoard: PropTypes.func.isRequired,
  showAddBoard: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(BoardCreateWidget);
