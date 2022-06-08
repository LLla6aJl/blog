import "./articles.scss";
import { HeartTwoTone } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { Pagination } from "antd";
import { nextPage } from "../../servises/ArticlesReducer";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";

export function Articles() {
  const articles = useSelector((state) => state.articles.articles);
  const dispatch = useDispatch();
  return (
    // eslint-disable-next-line react/no-array-index-key
    <>
      <ul>
        {articles.map((item, index) => {
          const {
            slug,
            title,
            description,
            updatedAt,
            tagList,
            author,
            favoritesCount,
          } = item;
          const { username, image } = author;
          return (
            <li className="article" key={index}>
              <div className="header">
                <div className="title">
                  <div className="title-text">
                    <Link to={`/articles/${slug}`} className="article-name">
                      {title}
                    </Link>
                    <label className="label-like">
                      <HeartTwoTone twoToneColor="#eb2f96" />
                      <span className="like-count" key={index}>
                        {favoritesCount}
                      </span>
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
            </li>
          );
        })}
      </ul>
      <div className="pagination">
        <Pagination
          defaultCurrent={1}
          total="50"
          onChange={(page) => {
            dispatch(nextPage(page));
          }}
        />
      </div>
    </>
  );
}
