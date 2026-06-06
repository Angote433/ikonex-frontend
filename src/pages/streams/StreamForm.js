import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';

function StreamForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [form, setForm] = useState({ streamName: '' });
    const [classes, setClasses] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState('');

    useEffect(() => {
        api.get('/classes')
            .then(res => setClasses(res.data))
            .catch(() => toast.error('Failed to load classes'));

        if (isEdit) {
            api.get(`/streams/${id}`)
                .then(res => {
                    setForm({ streamName: res.data.streamName });
                    setSelectedClassId(res.data.classId);
                })
                .catch(() => toast.error('Failed to load stream'));
        }
    }, [id, isEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await api.put(`/streams/${id}`, form);
                toast.success('Stream updated');
            } else {
                await api.post(`/streams/class/${selectedClassId}`, form);
                toast.success('Stream created');
            }
            navigate('/streams');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div style={formContainerStyle}>
            <h2>{isEdit ? 'Edit Stream' : 'Add Stream'}</h2>
            <form onSubmit={handleSubmit}>
                {!isEdit && (
                    <div style={fieldStyle}>
                        <label>Class</label>
                        <select
                            value={selectedClassId}
                            onChange={e => setSelectedClassId(e.target.value)}
                            required
                            style={inputStyle}>
                            <option value="">Select a class</option>
                            {classes.map(c => (
                                <option key={c.classId} value={c.classId}>
                                    {c.className}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div style={fieldStyle}>
                    <label>Stream Name</label>
                    <input
                        name="streamName"
                        value={form.streamName}
                        onChange={e => setForm({ streamName: e.target.value })}
                        required
                        style={inputStyle}
                        placeholder="e.g. Form 1A"
                    />
                </div>
                <button type="submit" style={btnStyle}>
                    {isEdit ? 'Update' : 'Create'}
                </button>
                <button
                    type="button"
                    style={cancelBtnStyle}
                    onClick={() => navigate('/streams')}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default StreamForm;
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