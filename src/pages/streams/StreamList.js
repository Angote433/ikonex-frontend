import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';

function StreamList() {
    const [streams, setStreams] = useState([]);

    useEffect(() => {
        fetchStreams();
    }, []);

    const fetchStreams = async () => {
        try {
            const response = await api.get('/streams');
            setStreams(response.data);
        } catch (error) {
            toast.error('Failed to load streams');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this stream?')) return;
        try {
            await api.delete(`/streams/${id}`);
            toast.success('Stream deleted');
            fetchStreams();
        } catch (error) {
            toast.error('Failed to delete stream');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h2>Streams</h2>
                <Link to="/streams/new">
                    <button style={btnStyle}>+ Add Stream</button>
                </Link>
            </div>
            <table style={tableStyle}>
                <thead>
                    <tr style={thRowStyle}>
                        <th style={thStyle}>Stream Name</th>
                        <th style={thStyle}>Class</th>
                        <th style={thStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {streams.map(s => (
                        <tr key={s.streamId} style={trStyle}>
                            <td style={tdStyle}>{s.streamName}</td>
                            <td style={tdStyle}>{s.className}</td>
                            <td style={tdStyle}>
                                <Link to={`/streams/edit/${s.streamId}`}>
                                    <button style={editBtnStyle}>Edit</button>
                                </Link>
                                <button
                                    style={deleteBtnStyle}
                                    onClick={() => handleDelete(s.streamId)}>
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

export default StreamList;
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
