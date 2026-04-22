import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Card, { CardBody } from '../components/Card';
import '../styles/Auth.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [localError, setLocalError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!formData.email || !formData.password) {
      setLocalError('Please fill in all fields');
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setLocalError(err.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-layout">
        <section className="auth-hero">
          <span className="auth-badge">Attendance OS</span>
          <h1 className="auth-hero-title">Run attendance with less admin and more clarity.</h1>
          <p className="auth-hero-copy">
            Track presence, review trends, and keep the whole class in sync from one place.
          </p>
        </section>

        <Card className="auth-card">
          <CardBody>
            <span className="auth-kicker">Welcome back</span>
            <h1 className="auth-title">Sign in</h1>
            <p className="auth-subtitle">Use your email and password to access the dashboard.</p>

            {(localError || error) && (
              <Alert
                type="error"
                message={localError || error}
                onClose={() => setLocalError(null)}
              />
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>

              <Button type="submit" loading={loading} className="auth-button">
                Sign In
              </Button>
            </form>

            <p className="auth-footer">
              Don&apos;t have an account? <Link to="/register">Create one</Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
