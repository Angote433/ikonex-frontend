import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';

function ClassList() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await api.get('/classes');
            setClasses(response.data);
        } catch (error) {
            toast.error('Failed to load classes');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this class?')) return;
        try {
            await api.delete(`/classes/${id}`);
            toast.success('Class deleted');
            fetchClasses();
        } catch (error) {
            toast.error('Failed to delete class');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h2>Classes</h2>
                <Link to="/classes/new">
                    <button style={btnStyle}>+ Add Class</button>
                </Link>
            </div>
            <table style={tableStyle}>
                <thead>
                    <tr style={thRowStyle}>
                        <th style={thStyle}>Class Name</th>
                        <th style={thStyle}>Grade Level</th>
                        <th style={thStyle}>Academic Year</th>
                        <th style={thStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map(c => (
                        <tr key={c.classId} style={trStyle}>
                            <td style={tdStyle}>{c.className}</td>
                            <td style={tdStyle}>{c.gradeLevel}</td>
                            <td style={tdStyle}>{c.academicYear}</td>
                            <td style={tdStyle}>
                                <Link to={`/classes/edit/${c.classId}`}>
                                    <button style={editBtnStyle}>Edit</button>
                                </Link>
                                <button
                                    style={deleteBtnStyle}
                                    onClick={() => handleDelete(c.classId)}>
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

export default ClassList;
const btnStyle = {
    backgroundColor: '#1a237e', color: '#fff',
    border: 'none', padding: '8px 16px',
    borderRadius: '4px', cursor: 'pointer', marginRight: '8px'
};
const cancelBtnStyle = {
    backgroundColor: '#757575', color: '#fff',
    border: 'none', padding: '8px 16px',
    borderRadius: '4px', cursor: 'pointer'
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
const formContainerStyle = {
    maxWidth: '480px', margin: '0 auto'
};
const fieldStyle = {
    marginBottom: '16px', display: 'flex',
    flexDirection: 'column', gap: '4px'
};
const inputStyle = {
    padding: '8px', border: '1px solid #bdbdbd',
    borderRadius: '4px', fontSize: '14px'
};