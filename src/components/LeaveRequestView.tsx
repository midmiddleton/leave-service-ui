import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LeaveRequest } from '../interfaces/LeaveRequest';

const LeaveRequestView = () => {
  const { id } = useParams<{ id: string }>();
  const [leaveRequestInfo, setLeaveRequest] = useState<LeaveRequest | null>(null);

  const calculateDaysBetween = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const difference = end.getTime() - start.getTime();
    const hours = difference / (1000 * 3600);
    const totalDays = hours / 24;

    return parseFloat(totalDays.toFixed(2));
  };

  useEffect(() => {
    const fetchLeaveRequest = async () => {
      const response = await fetch(`http://localhost:800/api/leave-requests/${id}`);
      const data = await response.json();
      if (data.length > 0) {
        setLeaveRequest(data[0]);
      } else {
      setLeaveRequest(data);
      }
    };

    if (id) {
      fetchLeaveRequest();
    }
  }, [id]);

  if (!leaveRequestInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Leave Request Details</h2>
      <p>{id}</p>
      <p>User: {leaveRequestInfo.user_id}</p>
      <p>Leave Type: {leaveRequestInfo.leave_type}</p>
      <p>Start Date: {leaveRequestInfo.start_date}</p>
      <p>End Date: {leaveRequestInfo.end_date}</p>
      <p>Reason: {leaveRequestInfo.reason}</p>
      <p>Status: {leaveRequestInfo.status}</p>
      <p>Total Days: {calculateDaysBetween(leaveRequestInfo.start_date, leaveRequestInfo.end_date)}</p>
    </div>
  );
};

export default LeaveRequestView;
