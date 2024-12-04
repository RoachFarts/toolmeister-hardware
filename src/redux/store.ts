import { configureStore } from '@reduxjs/toolkit'
import toolmeisterReducer from './toolmeisterSlice'
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  WebStorage,
} from 'redux-persist'
import createWebStorage from 'redux-persist/es/storage/createWebStorage'

export function createPersistedStorage(): WebStorage {
  const isServer = typeof window === 'undefined'

  //Dummy Server:
  if (isServer) {
    return {
      getItem(){
        return Promise.resolve(null)
      },
      setItem(){
        return Promise.resolve()
      },
      removeItem(){
        return Promise.resolve()
      }
    }
  }
  return createWebStorage("local")
}

const storage = 
  typeof window !== "undefined" 
? createWebStorage("local") 
: createPersistedStorage();

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, toolmeisterReducer)

export const store = configureStore({
  reducer: {
    toolmeister: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)