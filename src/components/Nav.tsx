import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {

  const navigate = useNavigate();
  const handleClearAll = async () => {

    try {
        const response = await fetch('http://localhost:800/api/leave-requests/batch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clearAll: true,
            }),
        });

        if (response.ok) {
            navigate('/leave-requests/');
        } else {
            console.error('Failed to clear batch');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};



    return (
        <nav className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
        <div className="offcanvas-md offcanvas-end bg-body-terstiary" tabIndex={-1} id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="sidebarMenuLabel">Datanova</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">

            <ul className="nav flex-column mb-auto">
            <li className="nav-item">
          <Link to="/leave-requests/" className="nav-link d-flex align-items-center gap-2">
            Leave Requests
          </Link>
        </li>
            <li className="nav-item">
          <Link to="/leave-requests/create" className="nav-link d-flex align-items-center gap-2">
            Create New
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link d-flex align-items-center gap-2" href="#">
            Search
          </a>
        </li>
        <li className="nav-item">
          
          <Link to="/create-batch" className="nav-link d-flex align-items-center gap-2">
            Batch create
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link d-flex align-items-center gap-2" href="#">
            Filter
          </a>
        </li>
        <li className="nav-item">
        <button className="nav-link d-flex align-items-center gap-2" onClick={handleClearAll}>
          Clear all
        </button>
        </li>
      </ul>
      
          </div>
        </div>
      </nav>
    )
};

export default Nav;