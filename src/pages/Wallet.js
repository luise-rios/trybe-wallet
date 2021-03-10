import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, apiFetchThunk } from '../actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.sumExpenses = this.sumExpenses.bind(this);
    this.reduceExchange = this.reduceExchange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetState = this.resetState.bind(this);

    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    const { apiFetchThunkProp } = this.props;
    apiFetchThunkProp();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  resetState() {
    this.setState({
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  sumExpenses(acc, currValue) {
    const baseValue = parseFloat(currValue.value);
    const multiplier = parseFloat(currValue.exchangeRates[currValue.currency].ask);
    return acc + baseValue * multiplier;
  }

  reduceExchange(value) {
    return value.reduce((acc, currValue) => this.sumExpenses(acc, currValue), 0);
  }

  render() {
    const { email, expenses, addExpenseProp, currencies, apiFetchThunkProp } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div className="wallet-container">
        <header>
          <div data-testid="email-field">{`Usuário: ${ email }`}</div>
          <div className="wallet-total">
            <div data-testid="total-field">
              {`Total de despesas: ${this.reduceExchange(expenses).toString()}`}
            </div>
            <div data-testid="header-currency-field">BRL</div>
          </div>
        </header>
        <form>
          <section>
            <div className="wallet-inputs">
              <input
                placeholder="Valor"
                data-testid="value-input"
                type="number"
                min="0"
                name="value"
                value={ value ? value : 'Valor' }
                onChange={ this.handleChange }
                style={{ width: '15%' }}
              />
              <input
                placeholder="Descrição"
                data-testid="description-input"
                name="description"
                value={ description }
                onChange={ this.handleChange }
                style={{ width: '75%' }}
              />
            </div>

            <div className="wallet-selects">
              <select
                data-testid="currency-input"
                name="currency"
                value={ currency }
                onChange={ this.handleChange }
              >
                <option value="" selected disabled>Moeda</option>
                {currencies.map((item) => (
                  <option key={ item } data-testid={ item }>{ item }</option>
                ))}
              </select>

              <select
                data-testid="method-input"
                name="method"
                value={ method }
                onChange={ this.handleChange }
              >
                <option value="" selected disabled>Método de Pagamento</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>

              <select
                data-testid="tag-input"
                name="tag"
                value={ tag }
                onChange={ this.handleChange }
              >
                <option value="" selected disabled>Categoria</option>
                <option value="Alimentação">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
              </select>
            </div>
          </section>

          <button
            type="button"
            onClick={ () => {
              apiFetchThunkProp();
              addExpenseProp(this.state);
            } }
          >
            Adicionar Despesa
          </button>
        </form>
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenseProp: (expense) => dispatch(addExpense(expense)),
  apiFetchThunkProp: () => dispatch(apiFetchThunk()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  apiFetchThunkProp: PropTypes.func.isRequired,
  addExpenseProp: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
