import { UPDATE_USER } from '../actions/types';

const initialState = {
    isLogged: false,
    userName: "",
    userId: "",
    email: "",
    imageUrl: "",
};

 // eslint-disable-next-line
export default function(state = initialState, action) { 
    switch(action.type){
        case UPDATE_USER:
            {
            return {
                ...state,
                isLogged: action.payload.isLogged,
                userName: action.payload.userName,
                userId: action.payload.userId,
                email: action.payload.email,
                name: action.payload.name,
                imageUrl: action.payload.imageUrl
            }
        }
        default:
            return state;
    }
}