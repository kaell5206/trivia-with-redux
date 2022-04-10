import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions, saveScore } from '../redux/actions';
import right from '../images/green-checkmark.svg';
import wrong from '../images/red-x.svg';

const he = require('he');

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
      pickAnswer: 'none',
      test: 0,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  timerWithColor = () => {
    const { timer } = this.state;
    const min = 9;
    if (timer <= min && timer > 0) {
      return (
        <p className="timer red tickAnimation">{timer}</p>
      );
    }
    if (timer === 0) {
      return (
        <p className="timer red">{timer}</p>
      );
    }
    return (
      <p className="timer">{timer}</p>
    );
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
      this.setState({
        pickAnswer: 'right',
        test: this.calculateScore(difficulty),
      });
    } else {
      this.setState({
        pickAnswer: 'wrong',
      });
    }
  }

  nextQuestion = () => {
    this.setState({
      pickAnswer: 'none',
      test: 0,
    });
    const { index } = this.state;
    const { history } = this.props;
    const maxIndex = 4;
    this.setState((state) => ({
      correct: '',
      incorrect: '',
      next: false,
      index: state.index + 1,
      timer: maxTimer,
    }));
    this.startTimer();
    if (index === maxIndex) {
      history.push('/feedback');
    }
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
          <div className={ `${correct}` }>
            <button
              name="correct"
              type="button"
              data-testid="correct-answer"
              key={ correctAnswer }
              onClick={ (event) => this.handleClick(event, difficulty) }
              className="answer-btn"
              disabled={ buttonDisable }
            >
              {he.decode(correctAnswer)}
            </button>
          </div>
        );
      }
      return (
        <div key={ incorrectAnswers[index] } className={ `${incorrect}` }>
          <button
            name="incorrect"
            type="button"
            data-testid={ `wrong-answer-${index}` }
            onClick={ (event) => this.handleClick(event, difficulty) }
            className="answer-btn"
            disabled={ buttonDisable }
          >
            {he.decode(incorrectAnswers[index])}
          </button>
        </div>);
    });
  }

  renderCheck = () => {
    const { questionResults } = this.props;
    const { pickAnswer, test, index, next } = this.state;
    if (pickAnswer === 'right') {
      return (
        <div>
          <img src={ right } alt="" />
          <div>
            <span>{ `+ ${test} pontos!` }</span>
          </div>
          {next
       && (
         <button
           type="button"
           data-testid="btn-next"
           onClick={ this.nextQuestion }
           className="btn-next"
         >
           Next

         </button>)}
        </div>
      );
    }
    if (pickAnswer === 'wrong') {
      return (
        <div>
          <img src={ wrong } alt="" />
          <div>
            <span>{ `+ ${0} pontos!` }</span>
          </div>
          {next
       && (
         <button
           type="button"
           data-testid="btn-next"
           onClick={ this.nextQuestion }
           className="btn-next"
         >
           Next

         </button>)}
        </div>
      );
    }
    if (pickAnswer === 'none') {
      return (
        <div>
          { questionResults
        && (
          <div className="questions-container">
            <div className="question">
              <p
                className="question-category"
                data-testid="question-category"
              >
                {he.decode(questionResults[index].category)}

              </p>
              <p
                className="question-text"
                data-testid="question-text"
              >
                {he.decode(questionResults[index].question)}

              </p>
            </div>
            <div
              className="answer-options"
              data-testid="answer-options"
            >
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
           className="btn-next"
         >
           Next

         </button>)}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          { this.timerWithColor() }
        </div>
        { this.renderCheck() }
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
