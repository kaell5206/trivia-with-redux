import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions } from '../redux/actions';

const negative = -1;
let indexes = [negative, 0, 1, 2];

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      correct: '',
      incorrect: '',
    };
  }

  /* componentDidMount() {
    const { getQuestions, token } = this.props;
    getQuestions(token);
  } */

  handleClick = () => {
    const time = 10000;
    this.setState({
      correct: 'correctAnswer',
      incorrect: 'incorrectAnswer',
    });
    setTimeout(() => this.setState((prevState) => ({
      index: prevState.index + 1,
      correct: '',
      incorrect: '',
    })), time);
  }

  // Fonte da função shuffle: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle = (array) => {
    let currentIndex = array.length;
    let randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  answersButtons = (correctAnswer, incorrectAnswers) => {
    const { correct, incorrect } = this.state;
    const min = 1;
    if (incorrectAnswers.length === min) {
      indexes = [negative, 0];
    }
    if (correct === '') { indexes = this.shuffle(indexes); }
    return indexes.map((index) => {
      if (index === negative) {
        return (
          <button
            name="correct"
            type="button"
            data-testid="correct-answer"
            key={ correctAnswer }
            onClick={ this.handleClick }
            className={ correct }
          >
            {correctAnswer}
          </button>);
      }
      return (
        <button
          name="incorrect"
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ incorrectAnswers[index] }
          onClick={ this.handleClick }
          className={ incorrect }
        >
          {incorrectAnswers[index]}
        </button>);
    });
  }

  render() {
    const { questionResults } = this.props;
    const { index } = this.state;
    return (
      <div>
        <Header />
        { questionResults
        && (
          <div>
            <div>
              <p
                data-testid="question-category"
              >
                {questionResults[index].category}

              </p>
              <p
                data-testid="question-text"
              >
                {questionResults[index].question}

              </p>
            </div>
            <div data-testid="answer-options">
              {
                this.answersButtons(
                  questionResults[index].correct_answer,
                  questionResults[index].incorrect_answers,
                )
              }
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  questionResults: state.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

Game.propTypes = {
  questionResults: PropTypes.arrayOf(PropTypes.any),
  getQuestions: PropTypes.func,
  token: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
