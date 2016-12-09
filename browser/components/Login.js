import React from 'react';
import { connect } from'react-redux';
import { browserHistory } from 'react-router';
import { fetchUser } from '../redux/login';

/* -----------------    COMPONENT     ------------------ */

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
    
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  render() {
    const { message } = this.props;
    return (
      <div className="signin-container">
        <div className="buffer local">
            <form onSubmit={this.onLoginSubmit}>
                <div className="form-group">
                  <label>email</label>
                  <input
                    name="email" 
                    type="email" 
                    className="form-control"
                    onChange={this.handleInput}
                    value={this.state.email}
                    required 
                  />
                </div>
                <div className="form-group">
                    <label>password</label>
                    <input 
                      name="password"
                      type="password" 
                      className="form-control"
                      onChange={this.handleInput}
                      value={this.state.password} 
                      required 
                    />
                </div>
                <button type="submit" className="btn btn-block btn-primary">{message}</button>
            </form>
        </div>
        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a target="_self"
               href="/auth/google"
               className="btn btn-social btn-google">
            <i className="fa fa-google"></i>
            <span>{message} with Google</span>
            </a>
          </p>
        </div>
      </div>
    );
  }

  onLoginSubmit(event) {
    event.preventDefault();

    const email = this.state.email;
    const password = this.state.password;

    this.props.fetchUser(email, password);

  }

  handleInput(event) {
  
    if (event.target.type === 'email') {
      this.setState({
        email: event.target.value
      })
    }

    if (event.target.type === 'password') {
      this.setState({
        password: event.target.value
      })
    }
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Log in' })
const mapDispatch = dispatch => ({
  fetchUser: (email, password) => dispatch(fetchUser(email, password))
});

export default connect(mapState, mapDispatch)(Login);
