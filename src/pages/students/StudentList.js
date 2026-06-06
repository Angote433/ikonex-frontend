import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';

function StudentList() {
    const [students, setStudents] = useState([]);
    const [streams, setStreams] = useState([]);
    const [selectedStream, setSelectedStream] = useState('');

    useEffect(() => {
        api.get('/streams').then(res => setStreams(res.data));
        fetchStudents();
    }, []);

    const fetchStudents = async (streamId = '') => {
        try {
            const url = streamId ? `/students/stream/${streamId}` : '/students';
            const response = await api.get(url);
            setStudents(response.data);
        } catch (error) {
            toast.error('Failed to load students');
        }
    };

    const handleStreamFilter = (e) => {
        setSelectedStream(e.target.value);
        fetchStudents(e.target.value);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this student?')) return;
        try {
            await api.delete(`/students/${id}`);
            toast.success('Student deleted');
            fetchStudents(selectedStream);
        } catch (error) {
            toast.error('Failed to delete student');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h2>Students</h2>
                <Link to="/students/new">
                    <button style={btnStyle}>+ Add Student</button>
                </Link>
            </div>
            <div style={{ marginBottom: '16px' }}>
                <label>Filter by stream: </label>
                <select value={selectedStream} onChange={handleStreamFilter} style={inputStyle}>
                    <option value="">All Streams</option>
                    {streams.map(s => (
                        <option key={s.streamId} value={s.streamId}>{s.streamName}</option>
                    ))}
                </select>
            </div>
            <table style={tableStyle}>
                <thead>
                    <tr style={thRowStyle}>
                        <th style={thStyle}>Admission No.</th>
                        <th style={thStyle}>First Name</th>
                        <th style={thStyle}>Last Name</th>
                        <th style={thStyle}>Stream</th>
                        <th style={thStyle}>Class</th>
                        <th style={thStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(s => (
                        <tr key={s.studentId} style={trStyle}>
                            <td style={tdStyle}>{s.admissionNumber}</td>
                            <td style={tdStyle}>{s.firstName}</td>
                            <td style={tdStyle}>{s.lastName}</td>
                            <td style={tdStyle}>{s.streamName}</td>
                            <td style={tdStyle}>{s.className}</td>
                            <td style={tdStyle}>
                                <Link to={`/students/edit/${s.studentId}`}>
                                    <button style={editBtnStyle}>Edit</button>
                                </Link>
                                <button
                                    style={deleteBtnStyle}
                                    onClick={() => handleDelete(s.studentId)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentList;
const btnStyle = {
    backgroundColor: '#1a237e', color: '#fff',
    border: 'none', padding: '8px 16px',
    borderRadius: '4px', cursor: 'pointer', marginRight: '8px'
};

const editBtnStyle = {
    backgroundColor: '#1565c0', color: '#fff',
    border: 'none', padding: '4px 10px',
    borderRadius: '4px', cursor: 'pointer', marginRight: '6px'
};
const deleteBtnStyle = {
    backgroundColor: '#c62828', color: '#fff',
    border: 'none', padding: '4px 10px',
    borderRadius: '4px', cursor: 'pointer'
};
const tableStyle = {
    width: '100%', borderCollapse: 'collapse'
};
const thRowStyle = {
    backgroundColor: '#1a237e'
};
const thStyle = {
    color: '#fff', padding: '10px 12px',
    textAlign: 'left', fontSize: '14px'
};
const trStyle = {
    borderBottom: '1px solid #e0e0e0'
};
const tdStyle = {
    padding: '10px 12px', fontSize: '14px'
};

const inputStyle = {
    padding: '8px', border: '1px solid #bdbdbd',
    borderRadius: '4px', fontSize: '14px'
};