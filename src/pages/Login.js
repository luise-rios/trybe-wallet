import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputEmail: '',
      inputPassword: '',
    };
  }

  buttonDisabled() {
    const { inputEmail, inputPassword } = this.state;
    const regexEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const size = 6;

    if (regexEmail.test(inputEmail) && inputPassword.length >= size) {
      return false;
    }
    return true;
  }

  render() {
    const { inputEmail, inputPassword } = this.state;
    const { loginAction, history } = this.props;

    return (
      <div className="login-container">
        <h2>Trybe Wallet</h2>
        <h3>Login</h3>
        <div className="login-input-container">
          <input
            type="email"
            name="email"
            onChange={ (e) => this.setState({ inputEmail: e.target.value }) }
            placeholder="e-mail"
            data-testid="email-input"
            value={ inputEmail }
          />
          <input
            type="password"
            name="password"
            onChange={ (e) => this.setState({ inputPassword: e.target.value }) }
            placeholder="senha"
            data-testid="password-input"
            value={ inputPassword }
          />
        </div>
        <button
          type="button"
          disabled={ this.buttonDisabled(inputEmail, inputPassword) }
          onClick={ () => loginAction(inputEmail) && history.push('/carteira') }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginAction: (email) => dispatch(login(email)),
});

Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
