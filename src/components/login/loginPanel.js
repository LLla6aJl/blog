import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoggedPanel from './loggedPanel';

import './loginpanel.scss';

export default function LoginPanel() {
  const isLogged = useSelector((state) => state.user.isLogged);
  const unloggedPanel = (
    <div className="login-wrap">
      <div className="sign-in-wrap">
        <Link to="/sign-in" className="sign-in">
          Sign In
        </Link>
      </div>
      <div className="sign-up-wrap">
        <Link to="/sign-up" className="sign-up">
          Sign Up
        </Link>
      </div>
    </div>
  );
  const panel = isLogged ? <LoggedPanel /> : unloggedPanel;
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{panel}</>;
}
