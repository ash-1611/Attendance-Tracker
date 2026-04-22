import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Card, { CardBody } from '../components/Card';
import '../styles/Auth.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [localError, setLocalError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setLocalError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    try {
      await register(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      );
      navigate('/dashboard');
    } catch (err) {
      setLocalError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-layout">
        <section className="auth-hero">
          <span className="auth-badge">Setup</span>
          <h1 className="auth-hero-title">Create a calmer workflow for daily attendance.</h1>
          <p className="auth-hero-copy">
            Get started with a streamlined workspace for records, trends, and class management.
          </p>
        </section>

        <Card className="auth-card auth-card-register">
          <CardBody>
            <span className="auth-kicker">Create your account</span>
            <h1 className="auth-title">Join Attendance Tracker</h1>
            <p className="auth-subtitle">Set up your profile and start using the dashboard.</p>

            {(localError || error) && (
              <Alert
                type="error"
                message={localError || error}
                onClose={() => setLocalError(null)}
              />
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                  />
                </div>
              </div>

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
                  placeholder="Choose a secure password"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                />
              </div>

              <Button type="submit" loading={loading} className="auth-button">
                Create Account
              </Button>
            </form>

            <p className="auth-footer">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
