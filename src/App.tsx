import React from 'react';
import Nav from './components/Nav';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LeaveRequests from './components/LeaveRequests';
import LeaveRequestsCreate from './components/LeaveRequestsCreate';
import LeaveRequestView from './components/LeaveRequestView';
import CreateBatch from './components/Createbatch';


function App() {
  return (
    <BrowserRouter>
    <div className="App">

      <div className="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
        <button className="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
                id="bd-theme"
                type="button"
                aria-expanded="false"
                data-bs-toggle="dropdown"
                aria-label="Toggle theme (auto)">
          <span className="visually-hidden" id="bd-theme-text">Toggle theme</span>
        </button>
      </div>
      

      <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="#">Datanova</a>

        <ul className="navbar-nav flex-row d-md-none">
          <li className="nav-item text-nowrap">
            <button className="nav-link px-3 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSearch" aria-controls="navbarSearch" aria-expanded="false" aria-label="Toggle search">
            </button>
          </li>
          <li className="nav-item text-nowrap">
            <button className="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
         
            </button>
          </li>
        </ul>

        <div id="navbarSearch" className="navbar-search w-100 collapse">
          <input className="form-control w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search" />
        </div>

      </header>
      <div className="container-fluid">
        
        
        <div className="row">
        <Nav />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <Routes>
              <Route path="/leave-requests" element={<LeaveRequests />} />
              <Route path="/leave-requests/create" element={<LeaveRequestsCreate />} />
              <Route path="/leave-requests/:id" element={<LeaveRequestView />} />
              <Route path="/create-batch" element={<CreateBatch />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
