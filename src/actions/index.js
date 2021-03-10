export const login = (email) => ({
  type: 'USER',
  email,
});

export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
});

const requestCurrencies = () => ({
  type: 'REQUEST_CURRENCIES',
});

const receiveSuccess = (exchangeData) => ({
  type: 'RECEIVE_SUCCESS',
  currencies: Object.keys(exchangeData),
});

const receiveError = (error) => ({
  type: 'RECEIVE_ERROR',
  currencies: [error],
});

const receiveFullExchange = (fullExchangeData) => ({
  type: 'RECEIVE_FULL_EXCHANGE',
  exchangeRates: fullExchangeData,
});

export function apiFetchThunk() {
  return async (dispatch) => {
    try {
      dispatch(requestCurrencies());
      const currencyRequest = await fetch('https://economia.awesomeapi.com.br/json/all');
      const response = await currencyRequest.json();
      delete response.USDT;
      dispatch(receiveSuccess(response));
      dispatch(receiveFullExchange(response));
    } catch (error) {
      dispatch(receiveError(error));
    }
  };
}

export const deleteExpense = (expenseId) => ({
  type: 'DELETE_EXPENSE',
  expenseId,
});
