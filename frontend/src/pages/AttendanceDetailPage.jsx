import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import attendanceService from '../services/attendanceService';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Card, { CardBody, CardHeader, CardTitle } from '../components/Card';
import '../styles/AttendanceDetail.css';

const AttendanceDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: recordResponse,
    loading,
    error,
    refetch,
  } = useFetch(() => attendanceService.getRecordById(id), [id]);

  const record = recordResponse;

  const dayPct =
    record && record.totalLectures > 0
      ? Math.round((record.attendedLectures / record.totalLectures) * 100)
      : 0;

  return (
    <div className="attendance-detail-container">
      <header className="attendance-detail-header">
        <div>
          <h1>Day details</h1>
          <p className="muted">Lecture-wise attendance for this saved day</p>
        </div>
        <Button variant="secondary" onClick={() => navigate('/attendance')}>
          Back to list
        </Button>
      </header>

      {error && <Alert type="error" message={error} onClose={null} />}

      <div className="attendance-detail-grid">
        <Card>
          <CardHeader>
            <CardTitle>
              {record?.date ? new Date(record.date).toLocaleDateString() : '—'}
            </CardTitle>
          </CardHeader>
          <CardBody>
            {loading ? (
              <div className="attendance-detail-skeleton">
                <div className="ad-skeleton-line" />
                <div className="ad-skeleton-line" />
                <div className="ad-skeleton-line" />
              </div>
            ) : record ? (
              <>
                <div className="attendance-detail-row">
                  <span className="label">Attended / total</span>
                  <span className="value">
                    {record.attendedLectures} / {record.totalLectures} lectures
                  </span>
                </div>

                <div className="attendance-detail-row">
                  <span className="label">Day attendance</span>
                  <span className="value">{dayPct}%</span>
                </div>

                <div className="attendance-detail-actions">
                  <Button variant="primary" onClick={() => refetch()} loading={loading}>
                    Refresh
                  </Button>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <p>No record found.</p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceDetailPage;
