import { createStore, applyMiddleware, compose } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import throttle from 'lodash/throttle';
import thunk from 'redux-thunk';
import Cookies from 'universal-cookie';

// Local Storage
import { loadState, saveState, removeState } from './localStorage';

// Reducer
import rootReducer from '../Reducers/Root.reducer';

const middlewares = [thunk];

export const configureStore = initialState => {
    const createdStore = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middlewares)),
    );
    return createdStore;
};

const store = configureStore(loadState());
const cookies = new Cookies();

store.subscribe(
    throttle(() => {
        if (store.getState().isLogin === false) {
            cookies.remove('tokens');
            removeState();
        } else {
            // store necessary reducer in local storage
            saveState({

            });
        }
    }, 1000),
);

export default store;