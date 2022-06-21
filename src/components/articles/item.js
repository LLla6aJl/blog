/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import { actionArticles } from '../../servises/ArticlesReducer';
import { fetchLike } from '../../servises/servises';
import whiteheart from '../article/white-heart.svg';
import redheart from '../article/red-heart.svg';

export default function Item(item) {
  const dispatch = useDispatch();
  const {
    slug,
    title,
    description,
    updatedAt,
    tagList,
    author,
    favorited,
    favoritesCount,
  } = item.item;
  const { username, image } = author;
  const token = useSelector((state) => state.user.token);
  const isLogged = useSelector((state) => state.user.isLogged);
  const offset = useSelector((state) => state.articles.offset);
  const likeArticle = (slug) => {
    // eslint-disable-next-line no-useless-return
    if (!isLogged) return;
    fetchLike(slug, token, favorited).then(() => {
      const fetchArticles = (offset) =>
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
          fetch(
            `https://kata.academy:8021/api/articles?limit=5&offset=${offset}`,
            requestOptions
          )
            .then((response) => response.json())
            .then((json) => dispatch(actionArticles(json)));
        };
      dispatch(fetchArticles(offset));
    });
  };

  return (
    <li className="article">
      <div className="header">
        <div className="title">
          <div className="title-text">
            <Link to={`/articles/${slug}`} className="article-name">
              {title}
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
          <div className="tags">
            {tagList.map((tag, key) => (
              <span className="tag" key={key}>
                {tag}
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
          </div>
          <img
            className="avatar"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                'https://static.productionready.io/images/smiley-cyrus.jpg';
            }}
            src={image}
            alt="avatar"
          />
        </div>
      </div>
      <div className="text">{description}</div>
    </li>
  );
}
