import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import AdminRoute from '../components/AdminRoute'
import * as AuthContext from '../context/authContext' // Import the module to mock

// Mock the useAuth hook
vi.mock('../context/authContext', () => ({
    useAuth: vi.fn(),
    AuthProvider: ({ children }) => <div>{children}</div> // Mock provider if needed
}))

describe('AdminRoute', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders nothing if auth is not ready', () => {
        AuthContext.useAuth.mockReturnValue({
            isAuthReady: false,
            isAuthenticated: false,
            user: null
        })

        const { container } = render(
            <MemoryRouter>
                <AdminRoute>
                    <div>Admin Content</div>
                </AdminRoute>
            </MemoryRouter>
        )

        expect(container).toBeEmptyDOMElement()
    })

    it('redirects to /login if not authenticated', () => {
        AuthContext.useAuth.mockReturnValue({
            isAuthReady: true,
            isAuthenticated: false,
            user: null
        })

        render(
            <MemoryRouter initialEntries={['/admin']}>
                <Routes>
                    <Route path="/admin" element={
                        <AdminRoute>
                            <div>Admin Content</div>
                        </AdminRoute>
                    } />
                    <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
            </MemoryRouter>
        )

        expect(screen.getByText('Login Page')).toBeInTheDocument()
        expect(screen.queryByText('Admin Content')).not.toBeInTheDocument()
    })

    it('redirects to / if authenticated but not admin', () => {
        AuthContext.useAuth.mockReturnValue({
            isAuthReady: true,
            isAuthenticated: true,
            user: { role: 'user' }
        })

        render(
            <MemoryRouter initialEntries={['/admin']}>
                <Routes>
                    <Route path="/admin" element={
                        <AdminRoute>
                            <div>Admin Content</div>
                        </AdminRoute>
                    } />
                    <Route path="/" element={<div>Home Page</div>} />
                </Routes>
            </MemoryRouter>
        )

        expect(screen.getByText('Home Page')).toBeInTheDocument()
        expect(screen.queryByText('Admin Content')).not.toBeInTheDocument()
    })

    it('renders children if authenticated and admin', () => {
        AuthContext.useAuth.mockReturnValue({
            isAuthReady: true,
            isAuthenticated: true,
            user: { role: 'admin' }
        })

        render(
            <MemoryRouter initialEntries={['/admin']}>
                <Routes>
                    <Route path="/admin" element={
                        <AdminRoute>
                            <div>Admin Content</div>
                        </AdminRoute>
                    } />
                </Routes>
            </MemoryRouter>
        )

        expect(screen.getByText('Admin Content')).toBeInTheDocument()
    })
})
