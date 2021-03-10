import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class Table extends Component {
  constructor() {
    super();

    this.renderExpense = this.renderExpense.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
  }

  deleteButton(expenseId) {
    const { deleteExpenseProps } = this.props;
    deleteExpenseProps(expenseId);
  }

  renderExpense(expense) {
    const { description, tag, method, value, exchangeRates, currency } = expense;
    return (
      <tr key={ description }>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>{exchangeRates[currency].name}</td>
        <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
        <td>
          {parseFloat(value) * parseFloat(exchangeRates[currency].ask)}
        </td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.deleteButton(expense.id) }
          >
            Deletar
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="table-container">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => this.renderExpense(expense))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseProps: (expenseId) => dispatch(deleteExpense(expenseId)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpenseProps: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
