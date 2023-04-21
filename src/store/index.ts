import {configureStore} from '@reduxjs/toolkit';
import {
  useDispatch,
  useSelector,
  shallowEqual,
  TypedUseSelectorHook
} from 'react-redux';

import userInfoSlice from './modules/userInfo';


const store = configureStore({
  reducer: {
    userInfo: userInfoSlice,
  },
});

/**
 * redux中使用typescripts: https://www.reduxjs.cn/tutorials/typescript-quick-start
 */
type RootState = ReturnType<typeof store.getState>
type DispatchType = typeof store.dispatch
export const useAppDispatch: () => DispatchType = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const shallowEqualApp = shallowEqual

export default store;
