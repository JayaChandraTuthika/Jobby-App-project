import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginPage extends Component {
  state = {
    userInput: '',
    passwordInput: '',
    errorMsg: '',
  }

  onChangeUserInput = event => {
    this.setState({userInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()

    let userDetails
    const {userInput, passwordInput} = this.state
    if (userInput === 'chandra' && passwordInput === 'jay@4000') {
      userDetails = {
        username: 'rahul',
        password: 'rahul@2021',
      }
    } else {
      userDetails = {
        username: 'jay',
        password: 'chandra4204',
      }
    }

    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {userInput, passwordInput, errorMsg} = this.state
    return (
      <div className="login-bg">
        <div className="open-in-desktop-container">
          <h1 className="open-in-desktop-container-heading">
            Please open in desktop devices
          </h1>
        </div>
        <form className="login-form" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          <label htmlFor="userInput" className="form-label">
            USERNAME
          </label>
          <input
            type="text"
            id="userInput"
            className="form-input"
            value={userInput}
            onChange={this.onChangeUserInput}
          />
          <label htmlFor="passwordInput" className="form-label">
            PASSWORD
          </label>
          <input
            type="password"
            id="passwordInput"
            className="form-input"
            value={passwordInput}
            onChange={this.onChangePasswordInput}
          />
          <button type="submit" className="login-btn">
            Login
          </button>
          {errorMsg.length > 0 && <p className="error-text">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginPage
