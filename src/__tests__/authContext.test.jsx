import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import { AuthProvider, useAuth } from '../context/authContext'
import React from 'react'

// Simple component to access auth context in tests
const Consumer = () => {
  const { token, user, login, logout } = useAuth()
  return (
    <div>
      <div data-testid="token">{token || ''}</div>
      <div data-testid="user">{user ? user.email : ''}</div>
      <button onClick={() => login('TOK', { email: 'a@b.com' })}>login</button>
      <button onClick={() => logout()}>logout</button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('stores token and user after login', async () => {
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    )

    const loginButton = screen.getByText('login')
    await userEvent.click(loginButton)

    expect(localStorage.getItem('token')).toBe('TOK')
    expect(JSON.parse(localStorage.getItem('user')).email).toBe('a@b.com')
  })
})