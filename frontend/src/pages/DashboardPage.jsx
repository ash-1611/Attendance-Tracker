import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import attendanceService from '../services/attendanceService';
import Button from '../components/Button';
import Alert from '../components/Alert';
import SummaryCard from '../components/SummaryCard';
import Card, { CardBody } from '../components/Card';
import StudentAttendanceForm from '../components/StudentAttendanceForm';
import '../styles/Dashboard.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [marking, setMarking] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [hasMarkedSelectedDate, setHasMarkedSelectedDate] = useState(false);

  const {
    data: analytics,
    loading,
    refetch,
  } = useFetch(() => attendanceService.getDashboardStats(), []);

  useEffect(() => {
    let mounted = true;

    const checkForDate = async () => {
      try {
        const res = await attendanceService.getRecords({
          page: 1,
          limit: 1,
          startDate: selectedDate,
          endDate: selectedDate,
        });
        if (!mounted) return;
        setHasMarkedSelectedDate(Boolean(res?.records?.length));
      } catch {
        if (!mounted) return;
        setHasMarkedSelectedDate(false);
      }
    };

    if (user) {
      checkForDate();
    }

    return () => {
      mounted = false;
    };
  }, [user, selectedDate]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleMarkAttendance = async ({ date, attendedLectures, totalLectures }) => {
    setError(null);
    setToast(null);

    if (hasMarkedSelectedDate) {
      setToast({ type: 'info', message: 'You already saved attendance for this date.' });
      return;
    }

    setMarking(true);
    try {
      await attendanceService.markToday({ date, attendedLectures, totalLectures });
      setToast({
        type: 'success',
        message: `Saved ${attendedLectures} out of ${totalLectures} lectures for ${new Date(
          date
        ).toLocaleDateString()}.`,
      });
      setHasMarkedSelectedDate(true);
      await refetch();
    } catch (err) {
      setError(err?.message || 'Failed to save attendance');
    } finally {
      setMarking(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Attendance Dashboard</h1>
          <p className="welcome-message">Welcome back, {user.firstName}.</p>
        </div>
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </header>

      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
      {toast && <Alert type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

      <main className="dashboard-main">
        <section className="dashboard-hero">
          <div>
            <p className="hero-kicker">Student self-tracker</p>
            <h2 className="hero-title">
              Track each day lecture-wise instead of waiting for end-of-month totals.
            </h2>
            <p className="hero-copy">
              If you attended 3 out of 4 lectures today, just log 3 and 4. The app keeps your
              running percentage visible throughout the month.
            </p>
          </div>
        </section>

        <section className="entry-section">
          <div className="section-heading-row">
            <div>
              <h2 className="section-title">Add daily lecture entry</h2>
              <p className="section-copy">
                Enter one record per day with how many lectures happened and how many you attended.
              </p>
            </div>
          </div>

          <StudentAttendanceForm
            defaultDate={selectedDate}
            onDateChange={setSelectedDate}
            onSubmit={handleMarkAttendance}
            submitting={marking}
            disabled={marking || hasMarkedSelectedDate}
          />

          {hasMarkedSelectedDate && (
            <p className="selected-date-note">
              Attendance is already saved for {new Date(selectedDate).toLocaleDateString()}.
            </p>
          )}
        </section>

        <section className="summary-section">
          <div className="section-heading-row">
            <div>
              <h2 className="section-title">Your attendance summary</h2>
              <p className="section-copy">
                These totals are based on lectures attended, not teacher-marked status labels.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="loading-skeleton">
              <div className="skeleton"></div>
              <div className="skeleton"></div>
              <div className="skeleton"></div>
              <div className="skeleton"></div>
            </div>
          ) : analytics ? (
            <div className="summary-grid">
              <SummaryCard
                title="Days Logged"
                value={analytics.totalRecords || 0}
                variant="primary"
                onClick={() => navigate('/attendance')}
              />
              <SummaryCard
                title="Lectures Attended"
                value={analytics.attendedLectures || 0}
                variant="success"
                onClick={() => navigate('/attendance')}
              />
              <SummaryCard
                title="Lectures Missed"
                value={analytics.missedLectures || 0}
                variant="error"
                onClick={() => navigate('/attendance')}
              />
              <SummaryCard
                title="Attendance %"
                value={Math.round(analytics.attendancePercentage || 0)}
                unit="%"
                variant="primary"
              />
            </div>
          ) : null}
        </section>

        <section className="quick-actions">
          <div className="section-heading-row">
            <div>
              <h2 className="section-title">Quick actions</h2>
              <p className="section-copy">Move between your daily log, history, and profile.</p>
            </div>
          </div>

          <div className="actions-grid">
            <Card>
              <CardBody>
                <h3>Log today</h3>
                <p>Jump back to today&apos;s date and record your lecture count.</p>
                <Button
                  onClick={() => setSelectedDate(new Date().toISOString().slice(0, 10))}
                  variant="primary"
                  size="sm"
                >
                  Open Today
                </Button>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h3>View history</h3>
                <p>See every saved day and check how many lectures you attended.</p>
                <Button onClick={() => navigate('/attendance')} variant="primary" size="sm">
                  View All
                </Button>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h3>Profile</h3>
                <p>Update your personal details for your own attendance tracker.</p>
                <Button onClick={() => navigate('/profile')} variant="primary" size="sm">
                  Edit Profile
                </Button>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h3>Refresh</h3>
                <p>Reload your lecture totals and current attendance percentage.</p>
                <Button onClick={refetch} variant="primary" size="sm" disabled={loading}>
                  Refresh
                </Button>
              </CardBody>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
