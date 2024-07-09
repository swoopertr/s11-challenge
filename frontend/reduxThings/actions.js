export const MetaActions = { 

SET_MESSAGE: "SET_MESSAGE",

SET_ARTICLES: "SET_ARTICLES",

SET_CURRENT_ARTICLE_ID: "SET_CURRENT_ARTICLE_ID",

SET_SPINNER_ON: "SET_SPINNER_ON",

SET_TOKEN: "SET_TOKEN",
};

export const MetaActionFn = {
  setMessage: (message) => ({ type: MetaActions.SET_MESSAGE, payload: message }),
  setArticles: (articles) => ({ type: MetaActions.SET_ARTICLES, payload: articles }),
  setCurrentArticleId: (id) => ({ type: MetaActions.SET_CURRENT_ARTICLE_ID, payload: id }),
  setSpinnerOn: (status) => ({ type: MetaActions.SET_SPINNER_ON, payload: status }),
  setToken: (token) => ({ type: MetaActions.SET_TOKEN, payload: token }),
};
