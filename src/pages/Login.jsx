import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import { fetchToken, saveProfile, fetchQuestions } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      buttonDisabled: true,
    };
  }

  componentDidMount() {
    const { getApiToken } = this.props;
    getApiToken();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.isValidLogin);
  }

  isValidLogin = () => {
    const { name, email } = this.state;
    this.setState({
      buttonDisabled: name.length < 1 || email.length < 1,
    });
  }

  handleClick = () => {
    const { sendProfile, token, getQuestions } = this.props;
    const { name, email } = this.state;
    sendProfile(name, email);
    getQuestions(token);
  }

  render() {
    const { name, email, buttonDisabled } = this.state;

    return (

      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <div>
          <label htmlFor="name">
            Nome:
            <input
              name="name"
              data-testid="input-player-name"
              id="name"
              type="text"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <label htmlFor="email">
            E-mail:
            <input
              name="email"
              data-testid="input-gravatar-email"
              id="email"
              type="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <Link to="/game">
            <button
              data-testid="btn-play"
              type="button"
              disabled={ buttonDisabled }
              onClick={ this.handleClick }
            >
              Play
            </button>
          </Link>
          <Link to="/settings">
            <button
              data-testid="btn-settings"
              type="button"
            >
              Configurações
            </button>
          </Link>
        </div>
      </header>

    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  getApiToken: () => dispatch(fetchToken()),
  sendProfile: (name, email) => dispatch(saveProfile(name, email)),
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

Login.propTypes = {
  getApiToken: PropTypes.func.isRequired,
  sendProfile: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
