import {Types} from '../actions/users';

const INITIAL_STATE = {
    items: [],
    error: '',
    isLoading: false,
};

export default function users(state = INITIAL_STATE, action) {
    switch(action.type) {
        case Types.GET_USERS_REQUEST:
        case Types.CREATE_USER_REQUEST:
        case Types.DELETE_USER_REQUEST:
            return {
                ...state,
                error: '',
                isLoading: true,    
            };
        case Types.GET_USERS_SUCCESS: {
            return {
                ...state,
                items: action.payload.items,
                isLoading: false,
            };
        }
        case Types.USERS_ERROR: {
            console.log(action.payload.error);
            return {
                ...state,
                error: action.payload.error,
                isLoading: false,
            };
        }
        default: {
            return state;
        }
    }
}
