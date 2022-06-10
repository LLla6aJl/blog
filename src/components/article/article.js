import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { useEffect } from "react";
import { getArticle } from "../../servises/ArticlesReducer";
import { Spin } from "antd";
import whiteheart from "./white-heart.svg";
import redheart from "./red-heart.svg";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { fetchLike } from "../../servises/servises";
import { likeArticleAction } from "../../servises/ArticlesReducer";
export function Article() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.isLogged);
  const token = useSelector((state) => state.user.token);
  const userNameLogged = useSelector((state) => state.user.user.user.username);
  let navigate = useNavigate();
  useEffect(() => {
    const fetchArticle = (id) =>
      // eslint-disable-next-line no-shadow
      function (dispatch) {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${isLogged ? token : null}`,
          },
          redirect: "follow",
        };
        fetch(`https://kata.academy:8021/api/articles/${id}`, requestOptions)
          .then((response) => response.json())
          .then((json) => dispatch(getArticle(json)));
      };
    dispatch(fetchArticle(id));
  }, [id, dispatch, isLogged, token]);

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
      if (!isLogged) return;
      else {
        fetchLike(slug, token, favorited).then((res) => {
          dispatch(likeArticleAction(res));
        });
      }
    };

    const editArticle = () => {
      navigate(`/articles/${slug}/edit`);
    };
    const editButtons =
      username === userNameLogged ? (
        <div>
          <button className="button-article delete delete-article">
            Delete
          </button>
          <button className="button-article edit" onClick={() => editArticle()}>
            Edit
          </button>
        </div>
      ) : null;
    return (
      <li className="article full-size">
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
            <div className="tags tags-inArticle">
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
                  "MMMM d, yyyy"
                )}
              </span>
              {editButtons}
            </div>
            <img className="avatar" src={image} alt="avatar"></img>
          </div>
        </div>

        <div className="text text-in-article">{description}</div>
        <div className="content-article">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </li>
    );
  } else return <Spin size="large" />;
}
