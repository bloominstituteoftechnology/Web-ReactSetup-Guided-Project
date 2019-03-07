import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { takeLatest, put } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import Container from './components/Container';

function* helloSaga() {
  yield put({ type: 'HI' });
}

function watchHelloSaga() {
  return takeLatest('HELLO_SAGA', helloSaga);
}

function* rootSaga() {
  return yield watchHelloSaga();
}

const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);

const rootReducer = () => ({ foo: 'bar' });

const store = createStoreWithMiddleware(
  rootReducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.querySelector('#target'),
);

sagaMiddleware.run(rootSaga);
