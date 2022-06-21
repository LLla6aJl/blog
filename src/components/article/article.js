/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Spin, Popconfirm } from 'antd';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import {
  fetchLike,
  fetchDeleteArticle,
  truncate,
} from '../../servises/servises';
import {
  getArticle,
  actionArticles,
  likeArticleAction,
  editArticle,
  deleteArticle,
} from '../../servises/ArticlesReducer';

import whiteheart from './white-heart.svg';
import redheart from './red-heart.svg';

export default function Article() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.isLogged);
  const token = useSelector((state) => state.user.token);
  const userNameLogged = useSelector((state) => state.user.user.user.username);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchArticle = (id) =>
      // eslint-disable-next-line no-shadow
      function (dispatch) {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${isLogged ? token : null}`,
          },
          redirect: 'follow',
        };
        fetch(`https://kata.academy:8021/api/articles/${id}`, requestOptions)
          .then((response) => response.json())
          .then((json) => dispatch(getArticle(json)));
      };
    dispatch(fetchArticle(id));
  }, [id, dispatch, isLogged, token]);
  const [visible, setVisible] = useState(false);
  const [confirmLoading] = useState(false);
  const article = useSelector((state) => state.articles.article);
  if (article.slug === id) {
    const {
      slug,
      title,
      body,
      description,
      updatedAt,
      tagList,
      author,
      favoritesCount,
      favorited,
    } = article;

    const { username, image } = author;

    const likeArticle = (slug) => {
      // eslint-disable-next-line no-useless-return
      if (!isLogged) return;
      fetchLike(slug, token, favorited).then((res) => {
        dispatch(likeArticleAction(res));
        const fetchArticles = (offset) =>
          // eslint-disable-next-line no-shadow
          function (dispatch) {
            const requestOptions = {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`,
              },
              redirect: 'follow',
            };
            fetch(
              `https://kata.academy:8021/api/articles?limit=5&offset=${offset}`,
              requestOptions
            )
              .then((response) => response.json())
              .then((json) => dispatch(actionArticles(json)));
          };
        dispatch(fetchArticles(0));
      });
    };

    const handleEditArticle = () => {
      dispatch(editArticle(true));
      navigate(`/articles/${slug}/edit`);
    };

    const showPopconfirm = () => {
      setVisible(true);
    };

    const handleOk = () => {
      fetchDeleteArticle(token, slug);
      dispatch(deleteArticle());
      const fetchArticles = (offset) =>
        // eslint-disable-next-line no-shadow
        function (dispatch) {
          const requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: `Bearer ${token}`,
            },
            redirect: 'follow',
          };
          fetch(
            `https://kata.academy:8021/api/articles?limit=5&offset=${offset}`,
            requestOptions
          )
            .then((response) => response.json())
            .then((json) => dispatch(actionArticles(json)));
        };
      dispatch(fetchArticles(0));
      navigate('/');
    };

    const handleCancel = () => {
      setVisible(false);
    };
    const editButtons =
      username === userNameLogged ? (
        <div>
          <Popconfirm
            title="Are you sure to delete this article?"
            visible={visible}
            onConfirm={handleOk}
            okButtonProps={{
              loading: confirmLoading,
            }}
            onCancel={handleCancel}
          >
            <button
              type="button"
              className="button-article delete delete-article"
              onClick={showPopconfirm}
            >
              Delete
            </button>
          </Popconfirm>

          <button
            type="button"
            className="button-article edit"
            onClick={() => handleEditArticle()}
          >
            Edit
          </button>
        </div>
      ) : null;
    return (
      <li className="article full-size">
        <div className="header">
          <div className="title">
            <div className="title-text">
              <Link
                to={`/articles/${slug}`}
                className="article-name article-name-wrap"
              >
                {truncate.apply(title, [58, false])}
              </Link>
              <label className="label-like">
                <img
                  src={favorited ? redheart : whiteheart}
                  alt="like"
                  onClick={() => likeArticle(slug)}
                />
                <span className="like-count">{favoritesCount}</span>
              </label>
            </div>
            <div className="tags tags-inArticle">
              {tagList.map((tag, key) => (
                // eslint-disable-next-line react/no-array-index-key
                <span className="tag" key={key}>
                  {truncate.apply(tag, [10, false])}
                </span>
              ))}
            </div>
          </div>
          <div className="profile">
            <div className="profile-name">
              <span className="name">{username}</span>
              <span className="date">
                {format(
                  // eslint-disable-next-line camelcase
                  updatedAt ? new Date(updatedAt) : new Date(),
                  'MMMM d, yyyy'
                )}
              </span>
              {editButtons}
            </div>
            <img className="avatar" src={image} alt="avatar" />
          </div>
        </div>

        <div className="text text-in-article content-article">
          {description}
        </div>
        <div className="content-article">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </li>
    );
  }
  return <Spin size="large" />;
}
