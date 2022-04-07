import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';

class Feedback extends Component {
  /* const imgGravatar = md5(userEmail).toString();
  `https://www.gravatar.com/avatar/${imgGravatar}` */
  componentDidMount() {
    const { playerName, playerEmail, score } = this.props;
    let playersRanking = localStorage.getItem('players_ranking');
    if (playersRanking) {
      playersRanking = JSON.parse(playersRanking);
    } else {
      playersRanking = [];
    }
    const imgGravatar = md5(playerEmail).toString();
    const playerPicture = `https://www.gravatar.com/avatar/${imgGravatar}`;

    const object = { name: playerName, score, picture: playerPicture };
    playersRanking = [...playersRanking, object];
    playersRanking = JSON.stringify(playersRanking);
    localStorage.setItem('players_ranking', playersRanking);
  }

  message = () => {
    const { assertions } = this.props;
    if (assertions <= 2) {
      return 'Could be better...';
    }
    return 'Well Done!';
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">Feedback</h1>
        <h2 data-testid="feedback-text">{ this.message() }</h2>
        <h2 data-testid="feedback-total-score">{score}</h2>
        <h2 data-testid="feedback-total-question">{ assertions }</h2>
        <br />
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Play Again</button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ranking</button>
        </Link>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  playerName: state.player.name,
  playerEmail: state.player.email,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  playerName: PropTypes.string,
  playerEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
