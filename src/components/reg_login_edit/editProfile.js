import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserFetch } from "../../servises/servises";
import "./registration.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUser } from "../../servises/userReducer";
import { nextPage } from "../../servises/ArticlesReducer";
import * as Yup from "yup";
export default function EditProfile() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const userName = useSelector((state) => state.user.user.user.username);
  const email = useSelector((state) => state.user.user.user.email);
  const token = useSelector((state) => state.user.token);
  const oldPassword = useSelector((state) => state.user.user.user.password);
  const oldAvatar = useSelector((state) => state.user.user.user.image);
  const [error, setError] = useState(false);
  const formSchema = Yup.object().shape({
    password: Yup.string().test(
      "len",
      "Пароль должен быть не менее 6 символов и не более 40",
      (val) => {
        if (val === undefined) {
          return true;
        }
        return val.length === 0 || (val.length >= 6 && val.length <= 40);
      }
    ),
    avatar: Yup.string().url(),
    username: Yup.string()
      .required("Обязательное поле")
      .min(3, "Минимум 3 символа")
      .max(20, "Максимум 20 символов"),
    email: Yup.string()
      .required("Обязательное поле")
      .email("Введите корректный адрес электронной почты"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    updateUserFetch(data, token, oldPassword, oldAvatar).then((res) => {
      if (res.errors) {
        setError(true);
      } else {
        dispatch(updateUser(res));
        dispatch(nextPage(1));
        reset();
        navigate("/");
      }
    });
  };
  const errormessage = error ? (
    <span className="error">Вы ввели неверные данные</span>
  ) : null;
  return (
    <div className="article register-wrapper login-wrapper">
      <form className="registration" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form-header">Edit Profile</h1>
        <label className="label-button" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          className="login-input"
          id="username"
          defaultValue={userName}
          placeholder="Username"
          {...register("username")}
        />
        <span className="error">{errors.username?.message}</span>

        <label className="label-button" htmlFor="email">
          Email address
        </label>
        <input
          type="text"
          className="login-input"
          id="email"
          defaultValue={email}
          placeholder="Email address"
          {...register("email")}
        />
        <span className="error">{errors.email?.message}</span>

        <label className="label-button" htmlFor="new_password">
          New password
        </label>
        <input
          type="password"
          id="new_password"
          className="login-input"
          placeholder="New password"
          {...register("password")}
        />
        <span className="error">{errors.password?.message}</span>

        <label className="label-button" htmlFor="avatar">
          Avatar image (url)
        </label>
        <input
          type="text"
          className="login-input"
          id="avatar"
          placeholder="Avatar image"
          {...register("avatar")}
        />
        <span className="error">{errors.avatar?.message}</span>

        <input className="submit" type="submit" value="Save" />
        {errormessage}
      </form>
    </div>
  );
}
