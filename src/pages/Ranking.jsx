import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  componentDidMount() {
  }

  getPlayersRanking = () => {
    let arrayRanking = localStorage.getItem('players_ranking');
    arrayRanking = JSON.parse(arrayRanking);
    arrayRanking.sort((player1, player2) => player2.score - player1.score);
    return arrayRanking;
  }

  render() {
    const ranking = this.getPlayersRanking();
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking.map((player, index) => (
          <>
            <p data-testid={ `player-name-${index}` }>{player.name}</p>
            <p data-testid={ `player-score-${index}` }>{player.score}</p>
            <img src={ player.picture } alt={ player.name } />
          </>)) }
        <br />
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Home</button>
        </Link>

      </div>
    );
  }
}

export default Ranking;
