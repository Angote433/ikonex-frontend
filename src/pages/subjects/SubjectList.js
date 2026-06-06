import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';

function SubjectList() {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => { fetchSubjects(); }, []);

    const fetchSubjects = async () => {
        try {
            const res = await api.get('/subjects');
            setSubjects(res.data);
        } catch { toast.error('Failed to load subjects'); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this subject?')) return;
        try {
            await api.delete(`/subjects/${id}`);
            toast.success('Subject deleted');
            fetchSubjects();
        } catch { toast.error('Failed to delete subject'); }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h2>Subjects</h2>
                <Link to="/subjects/new"><button style={btnStyle}>+ Add Subject</button></Link>
            </div>
            <table style={tableStyle}>
                <thead>
                    <tr style={thRowStyle}>
                        <th style={thStyle}>Subject Name</th>
                        <th style={thStyle}>Subject Code</th>
                        <th style={thStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map(s => (
                        <tr key={s.subjectId} style={trStyle}>
                            <td style={tdStyle}>{s.subjectName}</td>
                            <td style={tdStyle}>{s.subjectCode}</td>
                            <td style={tdStyle}>
                                <Link to={`/subjects/edit/${s.subjectId}`}>
                                    <button style={editBtnStyle}>Edit</button>
                                </Link>
                                <button style={deleteBtnStyle} onClick={() => handleDelete(s.subjectId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SubjectList;
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


