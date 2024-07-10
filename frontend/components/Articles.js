import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PT from 'prop-types'
import { loginBusiness } from '../businesssLayer/loginBusiness'
import { useSelector, useDispatch } from 'react-redux';
import { MetaActionFn } from '../reduxThings/actions';



export default function Articles(props) {

  const { articles } = useSelector(store => store);  
const dispatch = useDispatch()
  // ✨ proplarım nerede? burada...
  const {getArticles, deleteArticle} = props
  // ✨ koşullu mantık uygula: eğer token yoksa
  // login ekranını render edeceğiz (React Router v.6)
  if(loginBusiness.checkLogin()){
    useNavigate("/login")
  }

  useEffect(() => {
    // ✨ yalnızca ilk render anında makaleleri buradan alın
    getArticles()
  },[])

  const editButtonHandler = (evt)=> {
    const articleId = evt.target.getAttribute("articleid")
    
    dispatch(MetaActionFn.setCurrentArticleId(articleId))
  }
  const deleteButtonHandler = (evt)=> {
    const articleId = evt.target.getAttribute("articleid")
    deleteArticle(articleId)
  }
  return (
    // ✨ JSX i düzenleyi: `Function.prototype`'ı gerçek fonksiyonlarla güncelleyin
    // ve makale üretmek için articles propunu kullanın
    <div className="articles">
      <h2>Makaleler</h2>
      {
        !articles.length
          ? 'Hiç makale yok'
          : articles.map(art => {
            return (
              <div className="article" key={art.article_id}>
                <div>
                  <h3>{art.title}</h3>
                  <p>{art.text}</p>
                  <p>Başlık: {art.topic}</p>
                </div>
                <div>
                  <button articleid = {art.article_id} onClick={editButtonHandler}>Düzenle</button>
                  <button articleid = {art.article_id} onClick={deleteButtonHandler}>Sil</button>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}

// 🔥 Dokunmayın: Makaleler aşağıdaki propları birebir istiyor:
Articles.propTypes = {
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired
}
