import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';

function StudentForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        admissionNumber: ''
    });
    const [streams, setStreams] = useState([]);
    const [selectedStreamId, setSelectedStreamId] = useState('');

    useEffect(() => {
        api.get('/streams').then(res => setStreams(res.data));

        if (isEdit) {
            api.get(`/students/${id}`)
                .then(res => {
                    setForm({
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        admissionNumber: res.data.admissionNumber
                    });
                    setSelectedStreamId(res.data.streamId);
                })
                .catch(() => toast.error('Failed to load student'));
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await api.put(`/students/${id}`, {
                    ...form,
                    stream: { streamId: selectedStreamId }
                });
                toast.success('Student updated');
            } else {
                await api.post(`/students/stream/${selectedStreamId}`, form);
                toast.success('Student registered');
            }
            navigate('/students');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div style={formContainerStyle}>
            <h2>{isEdit ? 'Edit Student' : 'Register Student'}</h2>
            <form onSubmit={handleSubmit}>
                <div style={fieldStyle}>
                    <label>First Name</label>
                    <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={fieldStyle}>
                    <label>Last Name</label>
                    <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={fieldStyle}>
                    <label>Admission Number</label>
                    <input
                        name="admissionNumber"
                        value={form.admissionNumber}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        placeholder="e.g. ADM001"
                    />
                </div>
                <div style={fieldStyle}>
                    <label>Stream</label>
                    <select
                        value={selectedStreamId}
                        onChange={e => setSelectedStreamId(e.target.value)}
                        required
                        style={inputStyle}>
                        <option value="">Select a stream</option>
                        {streams.map(s => (
                            <option key={s.streamId} value={s.streamId}>
                                {s.streamName} — {s.className}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" style={btnStyle}>
                    {isEdit ? 'Update' : 'Register'}
                </button>
                <button
                    type="button"
                    style={cancelBtnStyle}
                    onClick={() => navigate('/students')}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default StudentForm;
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