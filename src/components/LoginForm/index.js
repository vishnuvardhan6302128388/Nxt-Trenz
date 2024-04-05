// Write your JS code here
import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitErr: false, errorMsg: ''}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitDetails = () => {
    const {history} = this.props
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({showSubmitErr: true, errorMsg})
  }

  onSubmitFrom = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitDetails()
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  renderUserName = () => {
    const {username} = this.state
    return (
      <div>
        <div>
          <label htmlFor="vv">USERNAME</label>
          <input
            type="text"
            onChange={this.onChangeUserName}
            className="inputEl"
            id="vv"
            value={username}
            placeholder="Username"
          />
        </div>
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div>
        <div>
          <label htmlFor="vi">PASSWORD</label>
          <input
            type="text"
            onChange={this.onChangePassword}
            className="inputEl"
            id="vi"
            value={password}
            placeholder="Password"
          />
        </div>
      </div>
    )
  }

  render() {
    const {showSubmitErr, errorMsg} = this.state
    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.onSubmitFrom}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <div className="input-container">{this.renderUserName()}</div>
          <div className="input-container">{this.renderPassword()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitErr && <p>{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
