import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Card, { CardBody, CardHeader, CardTitle } from '../components/Card';
import '../styles/Auth.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout, loading } = useAuth();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    department: user?.department || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        department: formData.department,
      });
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.message || 'Update failed');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <CardHeader>
          <CardTitle>Your Student Profile</CardTitle>
        </CardHeader>
        <CardBody>
          {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
          {success && <Alert type="success" message={success} onClose={() => setSuccess(null)} />}

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
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={formData.email} disabled />
              <p className="auth-helper">Email cannot be changed</p>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
            </div>

            <div className="auth-actions-row">
              <Button type="submit" loading={loading} className="auth-button">
                Save Changes
              </Button>
              <Button type="button" variant="secondary" onClick={() => navigate('/dashboard')}>
                Back
              </Button>
            </div>
          </form>

          <hr className="auth-divider" />

          <div>
            <h3 style={{ marginBottom: '10px' }}>Danger Zone</h3>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProfilePage;
