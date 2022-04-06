import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions, saveScore } from '../redux/actions';

const negative = -1;
let indexes = [negative, 0, 1, 2];
const oneSecond = 1000;
const maxTimer = 30;

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      correct: '',
      incorrect: '',
      next: false,
      buttonDisable: true,
      timer: maxTimer,
      codeInterval: 0,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  calculateScore = (difficulty) => {
    const hardQuestion = 3;
    const { timer } = this.state;
    const correctAnswer = 10;
    let levelQuestion = 1;
    if (difficulty === 'hard') {
      levelQuestion = hardQuestion;
    } else if (difficulty === 'medium') {
      levelQuestion = 2;
    }
    const sum = correctAnswer + (timer * levelQuestion);
    return sum;
  }

  handleClick = ({ target }, difficulty) => {
    const { sumScore } = this.props;
    const { codeInterval } = this.state;
    this.setState({
      correct: 'correctAnswer',
      incorrect: 'incorrectAnswer',
      next: true,
      buttonDisable: true,
    });
    clearInterval(codeInterval);
    if (target.name === 'correct') {
      sumScore(this.calculateScore(difficulty));
    }
  }

  nextQuestion = () => {
    this.setState((state) => ({
      correct: '',
      incorrect: '',
      next: false,
      index: state.index + 1,
      timer: maxTimer,
    }));
    this.startTimer();
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

  startTimer = (time = oneSecond) => {
    const codeInterval = setInterval(() => {
      this.setState((state) => {
        if (state.timer === 0) {
          clearInterval(state.codeInterval);
          this.setState({ buttonDisable: true });
        } else {
          return {
            timer: state.timer - 1,
          };
        }
      });
    }, time);
    this.setState({
      codeInterval,
    });
  }

  answersButtons = (correctAnswer, incorrectAnswers, difficulty) => {
    const { correct, incorrect, buttonDisable, timer } = this.state;
    const min = 1;
    const fiveSeconds = 5000;

    if (timer === maxTimer) {
      if (incorrectAnswers.length === min) {
        indexes = [negative, 0];
      }
      indexes = this.shuffle(indexes);
      setTimeout(() => {
        this.setState({
          buttonDisable: false,
        });
      }, fiveSeconds);
    }

    return indexes.map((index) => {
      if (index === negative) {
        return (
          <button
            name="correct"
            type="button"
            data-testid="correct-answer"
            key={ correctAnswer }
            onClick={ (event) => this.handleClick(event, difficulty) }
            className={ correct }
            disabled={ buttonDisable }
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
          onClick={ (event) => this.handleClick(event, difficulty) }
          className={ incorrect }
          disabled={ buttonDisable }
        >
          {incorrectAnswers[index]}
        </button>);
    });
  }

  render() {
    const { questionResults } = this.props;
    const { index, next, timer } = this.state;
    return (
      <div>
        <Header />
        <p>{timer}</p>
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
                  questionResults[index].difficulty,
                )
              }
            </div>
          </div>
        )}
        {next
       && (
         <button
           type="button"
           data-testid="btn-next"
           onClick={ this.nextQuestion }
         >
           Next

         </button>)}
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
  sumScore: (score) => dispatch(saveScore(score)),
});

Game.propTypes = {
  questionResults: PropTypes.arrayOf(PropTypes.any),
  getQuestions: PropTypes.func,
  token: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
