import { useDispatch, useSelector } from "react-redux";
import { likeArticleAction } from "../../servises/ArticlesReducer";
import { fetchLike } from "../../servises/servises";
import redheart from "./red-heart.svg";
import whiteheart from "./white-heart.svg";
export default function Like(props) {
  const dispatch = useDispatch();
  const likecolor = useSelector((state) => state.articles.article.favorited);

  const { favorited, slug } = props;
  const token = useSelector((state) => state.user.token);
  const likeArticle = (favorited, slug) => {
    fetchLike(slug, token, favorited).then((res) =>
      dispatch(likeArticleAction(res))
    );
  };
  const color = likecolor ? redheart : whiteheart;
  return (
    <img src={color} alt="like" onClick={() => likeArticle(favorited, slug)} />
  );
}
