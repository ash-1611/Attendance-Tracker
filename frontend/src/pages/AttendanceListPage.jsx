import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useAuth from '../hooks/useAuth';
import attendanceService from '../services/attendanceService';
import Button from '../components/Button';
import Card, { CardBody } from '../components/Card';
import ToastHost from '../components/ToastHost';
import '../styles/AttendanceList.css';

const AttendanceListPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });
  const [toasts, setToasts] = useState([]);

  const addToast = (type, message) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const dismissToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const {
    data: attendanceData,
    loading,
    refetch,
  } = useFetch(() => attendanceService.getRecords(filters), [filters]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this record?')) return;
    try {
      await attendanceService.deleteRecord(id);
      refetch();
      addToast('success', 'Record deleted.');
    } catch (err) {
      addToast('error', err?.message || 'Failed to delete');
    }
  };

  const canDelete = Boolean(user);

  return (
    <div className="attendance-container">
      <header className="attendance-header">
        <div>
          <h1>Attendance history</h1>
          <p className="attendance-subcopy">Your lecture-wise daily entries, all in one place.</p>
        </div>
        <Button onClick={() => navigate('/dashboard')}>Back</Button>
      </header>

      <ToastHost toasts={toasts} onDismiss={dismissToast} />

      {loading ? (
        <div className="records-grid list-skeleton">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="record-skeleton" />
          ))}
        </div>
      ) : attendanceData && attendanceData.records.length > 0 ? (
        <>
          <div className="records-grid">
            {attendanceData.records.map((record) => (
              <Card key={record._id}>
                <CardBody>
                  <div className="record-header">
                    <h3>{new Date(record.date).toLocaleDateString()}</h3>
                  </div>
                  <div className="record-details">
                    <p>
                      <strong>Lecture count:</strong> {record.attendedLectures} / {record.totalLectures}
                    </p>
                    {record.totalLectures > 0 && (
                      <p className="day-pct">
                        Daily attendance:{' '}
                        {Math.round((record.attendedLectures / record.totalLectures) * 100)}%
                      </p>
                    )}
                  </div>
                  <div className="record-actions">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => navigate(`/attendance/${record._id}`)}
                    >
                      View
                    </Button>
                    {canDelete && (
                      <Button size="sm" variant="danger" onClick={() => handleDelete(record._id)}>
                        Delete
                      </Button>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {attendanceData.pages > 1 && (
            <div className="pagination">
              {Array.from({ length: attendanceData.pages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  variant={page === p ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => handlePageChange(p)}
                >
                  {p}
                </Button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <p>No attendance entries yet. Add your first lecture-wise day from the dashboard.</p>
          <Button onClick={() => navigate('/dashboard')}>Go to dashboard</Button>
        </div>
      )}
    </div>
  );
};

export default AttendanceListPage;
