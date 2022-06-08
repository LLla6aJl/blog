import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actionLoginUser } from "../../servises/userReducer";
import "./registration.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "../../servises/servises";
import * as Yup from "yup";
export default function Login() {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Обязательное поле")
      .min(6, "Пароль должен быть не менее 6 символов")
      .max(40, "Пароль должен быть не более 40 символов"),
    email: Yup.string()
      .required("Обязательное поле")
      .email("Введите корректный адрес электронной почты"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    loginUser(data).then((res) => {
      if (res.errors) {
        setError(true);
      } else dispatch(actionLoginUser(res));
    });
  };

  const errorMessage = error ? (
    <span className="error">Неверно введён логин или пароль</span>
  ) : null;

  return (
    <div className="article register-wrapper login-wrapper">
      <form className="registration" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form-header">Sign In</h1>

        <label className="label-button" htmlFor="email">
          Email address
        </label>
        <input
          type="text"
          className="login-input"
          id="email"
          placeholder="Email address"
          {...register("email")}
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
          {...register("password")}
        />
        <span className="error">{errors.password?.message}</span>

        <input className="submit" type="submit" value="Login" />
        {errorMessage}
        <span className="footer">
          Don’t have an account? <Link to={"/sign-up"}>Sign Up</Link>.
        </span>
      </form>
    </div>
  );
}
