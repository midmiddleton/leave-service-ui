export interface LeaveRequest { 

    id: string;
    user_id: string;
    leave_type: string;
    start_date: string;
    end_date: string;
    reason: string;
    total_days: number;
    status: string;
    [key: string]: any;
}