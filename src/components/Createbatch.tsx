import React, {SyntheticEvent, useState, useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom";

const CreateBatch = () => {

    const [amount, setAmount] = useState('');
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);


    const submit = async (e: SyntheticEvent) => {

        e.preventDefault();

        await fetch('http://localhost:800/api/leave-requests/batch', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                amount,
            })
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error));

        setRedirect(true);
    }

    if (redirect) {
        navigate('/leave-requests');
        return null;
    }

  return (
    <div>
      <h2>Create Batch</h2>

      <form onSubmit={submit}>

            <div className="form-group">
                <label>Select amount to create</label>
                <input type="text" className="form-control" id="start_date"
                onChange={e => setAmount(e.target.value)}
                />
            </div>
        <div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
        </form>
    </div>
  );
};

export default CreateBatch;