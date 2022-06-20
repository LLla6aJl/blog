/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { registerUser } from '../../servises/userReducer';
import { newUser, styleError } from '../../servises/servises';
import { nextPage } from '../../servises/ArticlesReducer';

import './registration.scss';

export default function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required('Обязательное поле')
      .min(6, 'Пароль должен быть не менее 6 символов')
      .max(40, 'Пароль должен быть не более 40 символов'),
    cpassword: Yup.string()
      .required('Обязательное поле')
      .oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
    username: Yup.string()
      .required('Обязательное поле')
      .min(3, 'Минимум 3 символа')
      .max(20, 'Максимум 20 символов'),
    email: Yup.string()
      .required('Обязательное поле')
      .email('Введите корректный адрес электронной почты'),
    persInf: Yup.bool() // use bool instead of boolean
      .oneOf([true], 'You must accept the terms and conditions'),
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    newUser(data).then((res) => {
      if (res.errors) {
        if (res.errors.username) {
          setError('username', {
            type: 'username',
            message: `Username ${res.errors.username}`,
          });
        }
        if (res.errors.email) {
          setError('email', {
            type: 'email',
            message: `Email ${res.errors.email}`,
          });
        }
      } else {
        dispatch(registerUser(res));
        dispatch(nextPage(1));
        reset();
        navigate('/');
      }
    });
  };

  return (
    <div className="article register-wrapper">
      <form className="registration" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form-header">Create new account</h1>
        <label className="label-button" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          className="login-input"
          id="username"
          placeholder="Username"
          {...register('username')}
          style={errors.username && styleError}
        />
        <span className="error">{errors.username?.message}</span>

        <label className="label-button" htmlFor="email">
          Email address
        </label>
        <input
          type="text"
          className="login-input"
          id="email"
          placeholder="Email address"
          {...register('email')}
          style={errors.email && styleError}
        />
        <span className="error">{errors.email?.message}</span>

        <label className="label-button" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="login-input"
          placeholder="Password"
          {...register('password')}
        />
        <span className="error">{errors.password?.message}</span>
        <label className="label-button" htmlFor="repeat-password">
          Repeat Password
        </label>
        <input
          type="password"
          id="repeat-password"
          className="login-input"
          placeholder="Repeat Password"
          {...register('cpassword')}
        />
        <span className="error">{errors.cpassword?.message}</span>
        <div className="line" />
        <label className="pers-inf" htmlFor="pers-inf">
          <input type="checkbox" {...register('persInf')} id="pers-inf" />I
          agree to the processing of my personal information
        </label>
        <span className="error">{errors.persInf?.message}</span>
        <input className="submit" type="submit" value="Create" />
        <span className="footer">
          Already have an account? <Link to="/sign-in">Sign In</Link>.
        </span>
      </form>
    </div>
  );
}
