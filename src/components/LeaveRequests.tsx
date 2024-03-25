import React, { useEffect, useState } from "react";
import { LeaveRequest } from "../interfaces/LeaveRequest";
import { useNavigate } from "react-router-dom";

const LeaveRequests = () => {

    const navigate = useNavigate();
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [sortCriteria, setSortCriteria] = useState('start_date');
    const [sortDirection, setSortDirection] = useState('asc');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterEndDate, setFilterEndDate] = useState('');
    const [filterUser, setFilterUser] = useState('');

    const calculateDaysBetween = (startDate: string, endDate: string) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const difference = end.getTime() - start.getTime();
        const hours = difference / (1000 * 3600);
        const totalDays = hours / 24;
  
        return parseFloat(totalDays.toFixed(2));
      };

      const deleteLeaveRequest = async (id: string) => {
        await fetch(`http://localhost:800/api/leave-requests/${id}`, {
            method: 'DELETE',
        });
        setLeaveRequests(leaveRequests.filter(leaveRequest => leaveRequest.id !== id));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    };
    const handleFilterStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterStartDate(e.target.value);
    };

    const handleFilterEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterEndDate(e.target.value);
    };

    const handleFilterUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterUser(e.target.value);
    };

    const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            const url = new URL(`http://localhost:800/api/leave-requests`);
            url.searchParams.append("page", currentPage.toString());
            url.searchParams.append("perPage", itemsPerPage.toString());
            url.searchParams.append("sortBy", sortCriteria);
            url.searchParams.append("sortOrder", sortDirection);
            if (searchKeyword) url.searchParams.append("keyword", searchKeyword);
            if (filterStartDate) {
                url.searchParams.append("start_date_from", filterStartDate);
            }
            if (filterEndDate) {
                url.searchParams.append("start_date_to", filterEndDate);
            }
            if (filterUser) {
                url.searchParams.append("user_id", filterUser);
            }

            const response = await fetch(url.toString());
            const data = await response.json();
            setLeaveRequests(data.data);
            setTotalPages(data.last_page);
            setTotalItems(data.total);
        };

        fetchLeaveRequests();
    }, [currentPage, itemsPerPage, sortCriteria, sortDirection, searchKeyword, filterStartDate, filterEndDate, filterUser]);

    return (
        <div>
            <h2>Leave Requests</h2>

            <select onChange={(e) => setSortCriteria(e.target.value)}>
                <option value="start_date">Start Date</option>
                <option value="end_date">End Date</option>
                <option value="number_of_days">Number of Days</option>
                <option value="leave_type">Leave Type</option>
                <option value="user_id">User</option>
            </select>
            <button onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}>
                {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
            </button>
            <form onSubmit={handleSubmitSearch}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchKeyword}
                    onChange={handleSearchChange}
                />
                <button type="submit">Search</button>
            </form>

            <form onSubmit={(e) => { e.preventDefault(); setCurrentPage(1); }}>
                <input
                    type="date"
                    placeholder="Start Date"
                    value={filterStartDate}
                    onChange={handleFilterStartDateChange}
                />
                <input
                    type="date"
                    placeholder="End Date"
                    value={filterEndDate}
                    onChange={handleFilterEndDateChange}
                />
                <input
                    type="text"
                    placeholder="User"
                    value={filterUser}
                    onChange={handleFilterUserChange}
                />
                <button type="submit">Filter</button>
            </form>
            <div className="table-responsive small">
                <table className="table table-striped table-sm">
                <thead>
                    <tr>
                    <th scope="col">uuid</th>
                    <th scope="col">user</th>
                    <th scope="col">leave_type</th>
                    <th scope="col">start_date</th>
                    <th scope="col">status</th>
                    <th scope="col">total_days</th>

                    </tr>
                </thead>
                <tbody>
                    {leaveRequests.map((leaveRequest: LeaveRequest) => {
                            const totalDays = calculateDaysBetween(leaveRequest.start_date, leaveRequest.end_date);

                        return (
                            <tr key={leaveRequest.id}>
                                <td>{leaveRequest.id}</td>
                                <td>{leaveRequest.user_id}</td>
                                <td>{leaveRequest.leave_type}</td>
                                <td>{leaveRequest.start_date}</td>
                                <td>{leaveRequest.status}</td>
                                <td>{totalDays}</td>
                                <td>
                                <button 
                                    className="btn btn-info" 
                                    onClick={() => navigate(`/leave-requests/${leaveRequest.id}`)}
                                >
                                    View
                                </button>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => deleteLeaveRequest(String(leaveRequest.id))}
                                >
                                    Delete
                                </button>
                            </td>
                            </tr>
                        )
                        })}
                </tbody>
            </table>
            <div>
                <p>Page: {currentPage} of {totalPages}</p>
                <p>Total Items: {totalItems}</p>
                <button onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
            </div>
            
        </div>
    )
};

export default LeaveRequests;