import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="header-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="logo-image"
      />
      <div className="links-container">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/jobs" className="nav-link">
          Jobs
        </Link>
      </div>
      <button className="logout-btn" type="button" onClick={onLogout}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
