/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { createArticle } from '../../servises/servises';
import {
  nextPage,
  editArticle,
  actionArticles,
} from '../../servises/ArticlesReducer';

export default function CreateArticle() {
  const dispatch = useDispatch();
  const edit = useSelector((state) => state.articles.edit);
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const title = useSelector((state) => state.articles.article.title);
  const description = useSelector(
    (state) => state.articles.article.description
  );
  const text = useSelector((state) => state.articles.article.body);
  const slug = useSelector((state) => state.articles.article.slug);
  const tagListState = useSelector((state) => state.articles.article.tagList);
  const [tagsList, setTagList] = useState(edit ? tagListState : []);
  const [error, setError] = useState(false);
  const [tag, setTag] = useState('');

  const handleChange = (event) => {
    setTag(event.target.value);
  };
  const addTag = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (tag) {
      setTagList((prevState) => [...prevState, tag]);
      setTag('');
    }
  };

  const formSchema = Yup.object().shape({
    title: Yup.string().required('Обязательное поле'),

    description: Yup.string().required('Обязательное поле'),

    text: Yup.string().required('Обязательное поле'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(formSchema),
  });
  const onSubmit = (data) => {
    createArticle(data, token, tagsList, edit, slug).then((res) => {
      if (res.errors) {
        setError(true);
      } else {
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
        dispatch(editArticle(false));
        dispatch(nextPage(1));
        navigate('/');
      }
    });
  };

  const errormessage = error ? (
    <span className="error">Вы ввели неверные данные</span>
  ) : null;

  const flex = {
    display: 'flex',
  };

  return (
    <div className="article full-size">
      <form className="registration" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form-header">
          {edit ? 'Edit article' : 'Create new article'}
        </h1>
        <label className="label-button" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          className="login-input"
          id="title"
          defaultValue={edit ? title : null}
          placeholder="title"
          {...register('title')}
        />
        <span className="error">{errors.title?.message}</span>

        <label className="label-button" htmlFor="description">
          Short description
        </label>
        <input
          type="text"
          className="login-input"
          id="description"
          defaultValue={edit ? description : null}
          placeholder="Short description"
          {...register('description')}
        />
        <span className="error">{errors.description?.message}</span>

        <label className="label-button" htmlFor="new_password">
          Text
        </label>
        <textarea
          id="text"
          className="login-input"
          rows="6"
          defaultValue={edit ? text : null}
          placeholder="Text"
          {...register('text')}
        />
        <span className="error">{errors.text?.message}</span>
        <label className="label-button" htmlFor="new_password">
          Tags
        </label>
        <div className="tags">
          {tagsList.map((item, i) => (
            <div style={flex} key={i}>
              <input
                type="text"
                disabled
                className="tag-item"
                value={item}
                key={i}
              />
              <div>
                <button
                  className="button-tag delete"
                  type="button"
                  key={i}
                  onClick={() =>
                    setTagList((currentItems) =>
                      currentItems.filter((it, index) => index !== i)
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <input
            type="text"
            className="login-input add-tag-input"
            id="tag"
            value={tag}
            placeholder="Tag"
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setTag('')}
            className="button-tag delete"
          >
            Delete
          </button>
          <button type="button" className="button-tag add" onClick={addTag}>
            Add tag
          </button>
        </div>
        <input className="submit" type="submit" value="Send" />
        {errormessage}
      </form>
    </div>
  );
}
