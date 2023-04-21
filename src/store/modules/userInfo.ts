import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getUserInfo} from '../../service/modules/login';
import Cache from '../../utils/cache'

interface loginParams {
  phone: string
  password: string,
  cb: (res: any) => void
}

export const fetchUserInfo = createAsyncThunk('fetchUserInfoData',
  async ({phone,password,cb}:loginParams, {dispatch}) => {
    const res = await getUserInfo({phone,password})    
    dispatch(changeUserInfoAction(res))
    cb(res)
  }
);

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    userInfo: {}
  },
  reducers: {
    changeUserInfoAction(state, {payload}) {      
      Cache.setCache("userInfo", payload)
      state.userInfo = payload
    }
  }
})

export const { changeUserInfoAction } = userInfoSlice.actions
export default userInfoSlice.reducer