import { MetaActions } from "./actions";


const initialState = {
    message: '',
    articles: [],
    currentArticleId: null,
    spinnerOn: false,
    token: localStorage.getItem('token') || null,
  };


export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case MetaActions.SET_MESSAGE :
        return { ...state, message: action.payload };
      case MetaActions.SET_ARTICLES:
        return { ...state, articles: action.payload };
      case MetaActions.SET_CURRENT_ARTICLE_ID:
        return { ...state, currentArticleId: action.payload };
      case MetaActions.SET_SPINNER_ON:
        return { ...state, spinnerOn: action.payload };
      case MetaActions.SET_TOKEN:
        return { ...state, token: action.payload };
      default:
        return state;
    }
  };