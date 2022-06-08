import classes from "./app.module.scss";
import { Routes, Route } from "react-router-dom";
import { Articles } from "../articles/articles";
import { Article } from "../article/article";
import { LoginPanel } from "../login/loginPanel";
import { Link } from "react-router-dom";
import Registration from "../reg_login_edit/registration";
import Login from "../reg_login_edit/login";
import EditProfile from "../reg_login_edit/editProfile";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { actionArticles } from "../../servises/ArticlesReducer";
function App() {
  const dispatch = useDispatch();

  const offset = useSelector((state) => state.articles.offset);

  const fetchArticles = (offset) =>
    // eslint-disable-next-line no-shadow
    function (dispatch) {
      fetch(`https://kata.academy:8021/api/articles?limit=5&offset=${offset}`)
        .then((response) => response.json())
        .then((json) => dispatch(actionArticles(json)));
    };

  useEffect(() => {
    dispatch(fetchArticles(offset));
  }, [offset, dispatch]);

  return (
    <div className={classes["app"]}>
      <div className={classes["header"]}>
        <Link to={"/articles"} className={classes["title"]}>
          Realworld Blog
        </Link>
        <div className={classes["login-panel"]}>
          <LoginPanel />
        </div>
      </div>
      <div className={classes["content"]}>
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<Article />} />
          <Route path="/sign-up" element={<Registration />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/profile" element={<EditProfile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
