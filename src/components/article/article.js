import { HeartTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { useEffect } from "react";
import { Spin } from "antd";
import { getArticle } from "../../servises/ArticlesReducer";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
export function Article() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const fetchArticle = (id) =>
    // eslint-disable-next-line no-shadow
    function (dispatch) {
      fetch(`https://kata.academy:8021/api/articles/${id}`)
        .then((response) => response.json())
        .then((json) => dispatch(getArticle(json)));
    };

  useEffect(() => {
    dispatch(fetchArticle(id));
  }, [id, dispatch]);

  const article = useSelector((state) => state.articles.article);
  if (article.slug) {
    const {
      slug,
      title,
      body,
      description,
      updatedAt,
      tagList,
      author,
      favoritesCount,
    } = article;
    const { username, image } = author;
    return (
      <li className="article">
        <div className="header">
          <div className="title">
            <div className="title-text">
              <Link to={`/articles/${slug}`} className="article-name">
                {title}
              </Link>
              <label className="label-like">
                <HeartTwoTone twoToneColor="#eb2f96" />
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
                  "MMMM d, yyyy"
                )}
              </span>
            </div>
            <img className="avatar" src={image} alt="avatar"></img>
          </div>
        </div>
        <div className="text">{description}</div>
        <div className="content">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </li>
    );
  } else return <Spin size="large" />;
}
