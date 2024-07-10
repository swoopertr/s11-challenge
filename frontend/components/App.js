import React, { useEffect, useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import { loginBusiness } from '../businesssLayer/loginBusiness'
import { articleBusiness } from '../businesssLayer/articleBusiness'
import { useSelector, useDispatch } from 'react-redux';
import { MetaActionFn } from '../reduxThings/actions'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ Bu statelerle MVP'ye ulaşılabilir
  const dispatch = useDispatch();

const { message, articles, currentArticleId, spinnerOn, token } = useSelector(store => store);  


  // ✨ `useNavigate` 'i araştırın React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { navigate('/') };

  useEffect(() => {
    if (loginBusiness.checkLogin()) {
      navigate("/articles");
    } else {
      navigate("/")
    }
  }, [])

  const logout = () => {
    const checkLogout = loginBusiness.logout()
    if (checkLogout) {
      dispatch(MetaActionFn.setToken(null));
      dispatch(MetaActionFn.setMessage('Güle güle!'));
      redirectToLogin();
    }
    
  };

  const login = async ({ username, password }) => {

    // ✨ ekleyin
    // State'deki mesajı yok edin, spinner'ı açın
    // uygun uç noktasına istek gönderin.
    // Başarılı olması durumunda local storage'a `token` ı kaydedin
    // başarılı mesajını state'e atayın
    // ve makaleler sayfasına yönlendirin. Spinnerı kapatmayı unutmayın!
    //setMessage("");
    dispatch(MetaActionFn.setMessage(""));
    dispatch(MetaActionFn.setSpinnerOn(true))
    //setSpinnerOn(true);

    let loginMessage = await loginBusiness.login(username, password);

    //setMessage(loginMessage);
    dispatch(MetaActionFn.setMessage(loginMessage));
    dispatch(MetaActionFn.setSpinnerOn(false))
    //setSpinnerOn(false);
    if (loginBusiness.checkLogin()) {
      console.log("login token var")
      navigate("/articles")
    }
  }

  const getArticles = async () => {
    // ✨ ekleyin
    // Mesaj state'ini boşaltın, spinner'ı açın
    // uygun uç noktaya auth'lu isteği atın.
    // Başarılı olursa, articles'ı uygun state'e atayın ve 
    // başarılı mesajını uygun state'e atayın.
    // Eğer bir şeyler yanlış giderse, response'un durumunu inceleyin:
    // eğer 401'se token da bir sıkıntı olabilir ve tekrar login sayfasına yönlendirmeliyiz
    // Spinner'ı kapatmayı unutmayın!
    if (loginBusiness.checkLogin()) {
      dispatch(MetaActionFn.setMessage(""));
      dispatch(MetaActionFn.setSpinnerOn(true))
      let articleRequest = await articleBusiness.getArticles();
      dispatch(MetaActionFn.setSpinnerOn(false))
      if (articleRequest.status == 200) {
        //setMessage(articleRequest.data.message);
        dispatch(MetaActionFn.setMessage(articleRequest.data.message));
        dispatch(MetaActionFn.setArticles(articleRequest.data.articles))
        //setArticles(articleRequest.data.articles);
      } else {
        dispatch(MetaActionFn.setMessage(articleRequest.data.message));
        if (articleRequest.status.toString().startsWith("4")) {
          loginBusiness.logout()
          navigate("/")
        }
      }
    } else {
      dispatch(MetaActionFn.setMessage("Oturum açmanız gerekir"));
      //setMessage("Oturum açmanız gerekir")
      navigate("/")
    }


  }

  const postArticle = async (article) => {
    // ✨ ekleyin
    // Akış, "getArticles" işlevine çok benzer.
    // Ne yapacağınızı biliyorsunuz, log kullanabilirsiniz ya da breakpointler
    dispatch(MetaActionFn.setSpinnerOn(true))
    const postRequest = await articleBusiness.postArticle(article);
    dispatch(MetaActionFn.setSpinnerOn(false))
    if(postRequest.status == 201) {
      
      await getArticles()
      
      //setMessage(postRequest.data.message)
      dispatch(MetaActionFn.setMessage(postRequest.data.message));
      
    } else {
      dispatch(MetaActionFn.setMessage(postRequest.data.message));
    }
   
    
  }

  const updateArticle = async (article_id, article) => {
    // ✨ ekleyin
    // Bunu biliyorsunuz!
    dispatch(MetaActionFn.setSpinnerOn(true))
    const updateArticleRequest = await articleBusiness.updateArticle(article_id, article);
    dispatch(MetaActionFn.setSpinnerOn(false))
    if (updateArticleRequest.status == 200) {
     
      await getArticles()
 
      //setMessage(updateArticleRequest.data.message)
      dispatch(MetaActionFn.setMessage(updateArticleRequest.data.message));
    } else {
      dispatch(MetaActionFn.setMessage(updateArticleRequest.data.message));
    }
    
    
  }

  const deleteArticle = async (article_id) => {
    // ✨ ekleyin
    const deleteArticleRequest = await  articleBusiness.deleteArticle(article_id);
  
    if(deleteArticleRequest.status == 200) {
      await getArticles();
      //setMessage(deleteArticleRequest.data.message)
      dispatch(MetaActionFn.setMessage(deleteArticleRequest.data.message));
    } else {
      dispatch(MetaActionFn.setMessage(deleteArticleRequest.data.message));
    }
    
  }

  return (
    // ✨ JSX'i düzenleyin: `Spinner`, `Message`, `LoginForm`, `ArticleForm` ve `Articles` gerekli proplarla beraber ❗
    <>
      <Spinner />
      <Message />
      {loginBusiness.checkLogin() ? <><button id="logout" onClick={logout}>Oturumu kapat</button> </> : ""}

      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- bu satırı değiştirmeyin */}
        <h1>İleri Seviye Web Uygulaması</h1>
        <nav>
          {loginBusiness.checkLogin()
          ? <NavLink id="articlesScreen" to="/articles">Makaleler</NavLink>
          : <NavLink id="loginScreen" to="/">Oturum aç</NavLink>}

          
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login} />} />
          <Route path="articles" element={
            <>
              <ArticleForm postArticle={postArticle} updateArticle={updateArticle} currentArticle={articles.find(art => art.article_id == currentArticleId)} />
              <Articles getArticles={getArticles} articles={articles} deleteArticle={deleteArticle}/>
            </>
          } />
        </Routes>
        <footer>WorkingÇift @2024</footer>
      </div>
    </>
  )
}
