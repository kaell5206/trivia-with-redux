import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { user, userEmail, score } = this.props;
    const imgGravatar = md5(userEmail).toString();

    return (
      <div className="header-container">
        <div className="user-container">
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${imgGravatar}` } alt="" />
          <h3 data-testid="header-player-name">
            {user}
          </h3>
        </div>
        <div className="score">
          <h3 data-testid="header-score">
            Pontuação:
            {' '}
            {score}
          </h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.player.name,
  userEmail: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  user: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
