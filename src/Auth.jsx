import React, { useState, useEffect } from 'react'
import './auth.css'
import { FaTimes } from 'react-icons/fa' // Importing close icon from react-icons
import { useDispatch, useSelector } from 'react-redux'
import { sendSignupOtp, verifySignupOtp, sendLoginOtp, verifyLoginOtp } from './Actions/authActions'
import { toast } from 'react-toastify'

const Auth = ({ closeLogin,  }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [otp, setOtp] = useState('')

  const toggleForm = () => {
    setIsLogin(!isLogin)
    setStep(1)
    setEmail('')
    setName('')
    setOtp('')
  }

  const { loading, success, error, message } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
    if (message) {
      toast.success(message)
      if (step === 1) {
        setStep(2)
      }
    }
  }, [error, message])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step === 1) {
      if (isLogin) {
        // Handle login OTP request
        dispatch(sendLoginOtp(email))
      } else {
        // Handle signup OTP request
        dispatch(sendSignupOtp(name, email))
      }
    } else {
      // Handle OTP verification
      if (isLogin) {
        dispatch(verifyLoginOtp(email, otp))
      } else {
        dispatch(verifySignupOtp(email, otp))
      }
    }
  }

  return (
    <div className="auth-overlay">
      <div className="auth-form">
        <FaTimes className="close-icon" onClick={closeLogin} />
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Name"
                  style={{fontSize:'1.1vmax'}}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              )}
              <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Next'}
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="OTP"
                value={otp}
                style={{fontSize:'1.1vmax'}}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Submit'}
              </button>
            </>
          )}
        </form>
        <button className="toggle-button" onClick={toggleForm}>
          {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
        </button>
      </div>
    </div>
  )
}

export default Auth