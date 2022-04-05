import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import { fetchToken } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      buttonDisabled: true,
    };
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

  render() {
    const { name, email, buttonDisabled } = this.state;
    const { buttonLogin } = this.props;
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
          <Link to="/">
            <button
              data-testid="btn-play"
              type="button"
              disabled={ buttonDisabled }
              onClick={ buttonLogin }
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

const mapDispatchToProps = (dispatch) => ({
  buttonLogin: () => dispatch(fetchToken()),
});

export default connect(null, mapDispatchToProps)(Login);
