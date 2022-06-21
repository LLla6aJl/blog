import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logOut } from '../../servises/userReducer';

export default function LoggedPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((state) => state.user.user.user.username);
  const avatar = useSelector((state) => state.user.user.user.image);
  const urlavatar =
    avatar ||
    'https://gravatar.com/avatar/73b80c17f9128c7b8fc3f5c1c09bd085?s=200&d=robohash&r=x';
  const loginOut = () => {
    dispatch(logOut());
    navigate('/');
  };
  return (
    <div className="login-wrap">
      <Link className="create-article" to="/new-article">
        Create article
      </Link>
      <Link className="profile-panel" to="/profile">
        <span className="profile-name">{userName}</span>{' '}
      </Link>
      <Link className="profile" to="/profile">
        <img alt="avatar" className="profile-avatar" src={urlavatar} />
      </Link>
      <button type="button" className="log-out" onClick={() => loginOut()}>
        Log Out
      </button>
    </div>
  );
}
