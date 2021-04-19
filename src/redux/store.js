import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import eventsReducer from './reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['favourites']
  };

const rootReducer = combineReducers({
    eventsReducer: persistReducer(persistConfig, eventsReducer)
  });


export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
//persistor.purge() // code for empty the storage