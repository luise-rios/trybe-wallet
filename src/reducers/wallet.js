const INITIAL_STATE = {
  isFetching: false,
  currencies: [],
  expenses: [],
  controlId: 0,
  rates: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_EXPENSE':
    action.expense.id = state.controlId;
    action.expense.exchangeRates = state.rates;
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      controlId: state.controlId + 1,
    };
  case 'REQUEST_CURRENCIES':
    return {
      ...state,
      isFetching: true,
    };
  case 'RECEIVE_SUCCESS':
    return {
      ...state,
      currencies: action.currencies,
      isFetching: false,
    };
  case 'RECEIVE_ERROR':
    return {
      ...state,
      currencies: action.currencies,
      isFetching: false,
    };
  case 'RECEIVE_FULL_EXCHANGE':
    return {
      ...state,
      rates: action.exchangeRates,
    };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== action.expenseId)],
    };
  default:
    return state;
  }
};

export default wallet;
