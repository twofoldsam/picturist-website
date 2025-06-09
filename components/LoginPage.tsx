import React, { useState } from 'react'
import { PicturistLogo } from './ui-custom/PicturistLogo'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Direct authentication with NextAuth credentials provider
      const response = await fetch('https://app.picturist.ai/api/auth/callback/credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email,
          password: password,
          callbackUrl: 'https://app.picturist.ai',
          json: 'true'
        }),
        credentials: 'include',
        redirect: 'manual'
      })

      const data = await response.json()

      if (response.ok && data.url) {
        // Authentication successful, redirect to app
        window.location.href = data.url
      } else if (response.ok && !data.error) {
        // Authentication successful but no redirect URL, go to app
        window.location.href = 'https://app.picturist.ai'
      } else {
        // Authentication failed
        setError(data.error || 'Invalid email or password')
        setLoading(false)
      }
    } catch (error) {
      console.error('Authentication error:', error)
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Create account via app API
      const response = await fetch('https://app.picturist.ai/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          fullName: email.split('@')[0] // Use email prefix as default name
        })
      })
      
      if (response.ok) {
        // Account created successfully, now automatically sign them in
        try {
          const authResponse = await fetch('https://app.picturist.ai/api/auth/callback/credentials', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              email: email,
              password: password,
              callbackUrl: 'https://app.picturist.ai',
              json: 'true'
            }),
            credentials: 'include',
            redirect: 'manual'
          })

          const authData = await authResponse.json()

          if (authResponse.ok && authData.url) {
            // Authentication successful, redirect to app
            window.location.href = authData.url
          } else if (authResponse.ok && !authData.error) {
            // Authentication successful but no redirect URL, go to app
            window.location.href = 'https://app.picturist.ai'
          } else {
            // Auto-signin failed, show success message and ask user to sign in manually
            setError('Account created successfully! Please sign in with your new credentials.')
            setIsSignUp(false)
            setLoading(false)
          }
        } catch (authError) {
          console.error('Auto-signin error:', authError)
          setError('Account created successfully! Please sign in with your new credentials.')
          setIsSignUp(false)
          setLoading(false)
        }
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to create account')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--picturist-warm-white)]">
      <div className="max-w-md w-full space-y-8 p-6">
        <div>
          <div className="flex justify-center mb-6">
            <Link to="/">
              <PicturistLogo height={48} className="hover:opacity-90 transition-opacity" />
            </Link>
          </div>
          <h2 className="mt-6 text-center text-3xl font-serif font-extrabold text-[var(--picturist-charcoal)]">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-[var(--picturist-text-muted)]">
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-medium text-[var(--picturist-teal)] hover:text-[#154145]"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={isSignUp ? handleSignUp : handleSignIn}>
          {error && (
            <div className={`px-4 py-3 rounded-xl ${
              error.includes('successfully') 
                ? 'bg-green-50 border border-green-400 text-green-700'
                : 'bg-red-50 border border-red-400 text-red-700'
            }`}>
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="relative block w-full px-4 py-3 border border-[var(--picturist-soft-gray)] rounded-xl placeholder-[var(--picturist-text-muted)] text-[var(--picturist-charcoal)] bg-[var(--picturist-warm-white)] focus:outline-none focus:ring-2 focus:ring-[var(--picturist-teal)] focus:border-[var(--picturist-teal)]"
              placeholder="Email address"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="relative block w-full px-4 py-3 border border-[var(--picturist-soft-gray)] rounded-xl placeholder-[var(--picturist-text-muted)] text-[var(--picturist-charcoal)] bg-[var(--picturist-warm-white)] focus:outline-none focus:ring-2 focus:ring-[var(--picturist-teal)] focus:border-[var(--picturist-teal)]"
              placeholder="Password"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-[var(--picturist-teal)] hover:bg-[#154145] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--picturist-teal)] disabled:opacity-50 transition-all duration-200 hover:translate-y-[-1px]"
            >
              {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 