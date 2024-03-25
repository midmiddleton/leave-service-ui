import React, {SyntheticEvent, useState, useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom";

const LeaveRequestsCreate = () => {

    interface ErrorMessages {
        user_id?: string[];
        leave_type?: string[];
        start_date?: string[];
        end_date?: string[];
        reason?: string[];
        status?: string[];
        overlap?: string;
    }

    const [user_id, setUserId] = useState('');
    const [leave_type, setLeaveType] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [total_days, setTotalDays] = useState('');
    const [status, setStatus] = useState('');
    const [reason, setReason] = useState('');
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);
    const [minEndDate, setMinEndDate] = useState('');
    const [errors, setErrors] = useState<ErrorMessages>({});

    useEffect(() => {
        setMinEndDate(start_date);
      }, [start_date]);

      const getToday = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
    
        return `${year}-${month}-${day}`;
      };

    const submit = async (e: SyntheticEvent) => {

        e.preventDefault();

        const response =await fetch('http://localhost:800/api/leave-requests', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user_id,
                leave_type,
                start_date,
                end_date,
                reason,
                total_days,
                status: status
            })
        })
        
        const data = await response.json();

        if (response.status === 422) {
            setErrors(data.errors);
            console.log(data.errors);
        } else if (response.status === 409) {
            setErrors({ ...errors, overlap: data.message });
        
        } else if (response.ok) {
            setRedirect(true);
        } else {
            console.error('Error:', data);
        };
    }

    if (redirect) {
        navigate('/leave-requests');
        return null;
    }

    return (
        <div>
        <h2>Leave Requests</h2>
        <form onSubmit={submit}>
            <div className="form-group">
                <label>user_id</label>
                <select className="form-control" id="user_id" onChange={e => setUserId(e.target.value)}
                >
                    <option value="">Select a user</option>
                    <option value="Lez">Lez</option>
                    <option value="Norton">Norton</option>
                    <option value="Quinton">Quinton</option>
                    <option value="Sassy">Sassy</option>
                    <option value="Donny">Donny</option>
                    <option value="Mike">Mike</option>
                    <option value="Clarence">Clarence</option>
                    <option value="Warning guy">Warning Guy</option>
                    <option value="King Laranox">King Laranox</option>
                    <option value="Choomas">Choomas</option>
                </select>
                {errors.user_id && <div className="text-danger">{errors.user_id.join(', ')}</div>}

            </div>
            <div className="form-group">
                <label>leave_type</label>
                <select className="form-control" id="leave_type" onChange={e => setLeaveType(e.target.value)}>
                    <option value="">Select a reason</option>
                    <option value="personal">Personal</option>
                    <option value="sick">Sick</option>
                    <option value="vacation">Vacation</option>
                    <option value="bereavement">Bereavement</option>
                </select>
                {errors.leave_type && <div className="text-danger">{errors.leave_type.join(', ')}</div>}

            </div>
            <div className="form-group">
                <label>start_date</label>
                <input type="datetime-local" className="form-control" id="start_date"
                onChange={e => setStartDate(e.target.value)}
                min={getToday()}
                />
                {errors.start_date && <div className="text-danger">{errors.start_date.join(', ')}</div>}
            </div>
            <div className="form-group">
                <label>end_date</label>
                <input type="datetime-local"  className="form-control" id="end_date"
                onChange={e => setEndDate(e.target.value)}
                min={minEndDate || getToday()}
                />
                {errors.end_date && <div className="text-danger">{errors.end_date.join(', ')}</div>}
            </div>
            <div className="form-group">
            <label>Reason</label>
                <input type="text" id="reason" className="form-control" maxLength={50}
                        onChange={e => setReason(e.target.value)} />
                {errors.reason && <div className="text-danger">{errors.reason.join(', ')}</div>}
            </div>
            <div className="form-group">
                <label>status</label>
                <select className="form-control" id="status" onChange={e => setStatus(e.target.value)}>
                    <option value="">Select a status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="denied">Denied</option>
                </select>
                {errors.status && <div className="text-danger">{errors.status.join(', ')}</div>}
            </div>
            {errors.overlap && <div className="alert alert-danger">{errors.overlap}</div>}
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <button 
            className="btn btn-info" 
            onClick={() => navigate(`/leave-requests/`)}
                >
                    Cancel
                </button>
        </div>
    );
};

export default LeaveRequestsCreate;
