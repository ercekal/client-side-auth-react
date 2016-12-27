import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleSignup({ email, password }) {
    this.props.signupUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSignup.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control" />
          {email.touched && email.error && <div className="error"> {email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" className="form-control" />
          {password.touched && password.error && <div className="error"> {password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input {...passwordConfirm} type="password" className="form-control" />
          {passwordConfirm.touched && passwordConfirm.error && <div className="error"> {passwordConfirm.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = 'Please enter email';
  }
  if (!values.password) {
    errors.password = 'Please enter password';
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Please confirm password';
  }
  if (values.password !== values.passwordConfirm) {
    errors.password = 'Passwords do not match!';
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);
