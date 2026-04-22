import React, { useState, useEffect } from 'react';
import Button from './Button';
import Card, { CardBody, CardHeader, CardTitle } from './Card';
import '../styles/StudentAttendanceForm.css';

const StudentAttendanceForm = ({
  defaultDate,
  disabled = false,
  onSubmit,
  submitting = false,
  onDateChange,
}) => {
  const [date, setDate] = useState(defaultDate);
  const [totalLectures, setTotalLectures] = useState(4);
  const [attendedLectures, setAttendedLectures] = useState(0);

  useEffect(() => {
    setDate(defaultDate);
  }, [defaultDate]);

  useEffect(() => {
    if (onDateChange) onDateChange(date);
  }, [date, onDateChange]);

  const setFullDay = () => setAttendedLectures(totalLectures);
  const setAbsent = () => setAttendedLectures(0);

  const handleTotalChange = (v) => {
    const n = Math.max(0, parseInt(v, 10) || 0);
    setTotalLectures(n);
    setAttendedLectures((a) => Math.min(a, n));
  };

  const handleAttendedChange = (v) => {
    const n = Math.max(0, parseInt(v, 10) || 0);
    setAttendedLectures(Math.min(n, totalLectures));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (disabled || submitting) return;
    if (totalLectures < 0 || attendedLectures > totalLectures) return;
    onSubmit({
      date,
      attendedLectures,
      totalLectures,
    });
  };

  return (
    <Card className="student-attendance-card">
      <CardHeader>
        <CardTitle>Log today&apos;s lectures</CardTitle>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleFormSubmit} className="student-attendance-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="att-date">Date</label>
              <input
                id="att-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={disabled}
              />
            </div>
          </div>

          <div className="form-row two-col">
            <div className="form-group">
              <label htmlFor="att-total">Total lectures (today)</label>
              <input
                id="att-total"
                type="number"
                min={0}
                value={totalLectures}
                onChange={(e) => handleTotalChange(e.target.value)}
                disabled={disabled}
              />
            </div>
            <div className="form-group">
              <label htmlFor="att-attended">Attended lectures</label>
              <input
                id="att-attended"
                type="number"
                min={0}
                max={totalLectures}
                value={attendedLectures}
                onChange={(e) => handleAttendedChange(e.target.value)}
                disabled={disabled}
              />
            </div>
          </div>

          <div className="quick-fill">
            <Button type="button" variant="secondary" size="sm" onClick={setFullDay} disabled={disabled}>
              Full day
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={setAbsent} disabled={disabled}>
              Absent
            </Button>
          </div>

          <p className="hint">
            Example: 3 attended out of 4 total — enter 4 and 3, or use the shortcuts.
          </p>

          <Button type="submit" variant="primary" loading={submitting} disabled={disabled}>
            {disabled ? 'Already saved for this date' : 'Save attendance'}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default StudentAttendanceForm;
