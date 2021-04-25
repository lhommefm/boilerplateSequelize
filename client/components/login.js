import React from 'react'
import {connect} from 'react-redux'
import GoogleLogin from './oauth-login-form'
// import "login" thunk

const Login = (props) => {
  const {handleSubmit} = props

  return (
    <div>

      {/* regular login */}
      <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' />
            <label htmlFor='email'>Password</label>
            <input type='password' name='password' className='input' />
            <button type='submit'>Submit</button>
        </form>
      </div>

      {/* OAuth login */}
      <GoogleLogin />
    
    </div>
    
  )
}

// if this connected Login module is passed to a Route, it receives the "route props"
// (match, location, and history) as its "own props".
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    async handleSubmit (event) {
      try {
        event.preventDefault(); // uncomment the following lines when the login thunk is available
        // await dispatch(
        //   login( {
        //     email: event.target.email.value,
        //     password: event.target.password.value
        //   } )
        // );
        ownProps.history.push('/') // redirect user to home
      } catch(error) {
        console.log('error in handleSubmit request')
      } 
    }
  }

}

export default connect(null, mapDispatchToProps)(Login)
