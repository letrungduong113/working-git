import { GET_USERINFO } from '../actions/setUserInfo';


const initialState = {
    userInfo: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USERINFO: return {
            ...state,
            userInfo: action.userInfo,
        };
        default: return state;
    }
}
