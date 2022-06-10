import { fetchLike } from "../../servises/servises";
import whiteheart from "../article/white-heart.svg";
import redheart from "../article/red-heart.svg";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Item(item) {
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

  const [checkFavorite, setCheckFavorite] = useState(favorited);
  const [favoriteCount, setFavoriteCount] = useState(favoritesCount);
  const token = useSelector((state) => state.user.token);
  const isLogged = useSelector((state) => state.user.isLogged);
  const likeArticle = (slug) => {
    if (!isLogged) return;
    else {
      fetchLike(slug, token, checkFavorite);
      if (!checkFavorite) {
        setCheckFavorite(true);
        setFavoriteCount(favoriteCount + 1);
      } else {
        setCheckFavorite(false);
        setFavoriteCount(favoriteCount - 1);
      }
    }
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
                src={checkFavorite ? redheart : whiteheart}
                alt="like"
                onClick={() => likeArticle(slug)}
              />
              <span className="like-count">{favoriteCount}</span>
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
}
