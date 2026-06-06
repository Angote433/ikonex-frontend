import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';

function SubjectForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [form, setForm] = useState({ subjectName: '', subjectCode: '' });

    useEffect(() => {
        if (isEdit) {
            api.get(`/subjects/${id}`)
                .then(res => setForm(res.data))
                .catch(() => toast.error('Failed to load subject'));
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await api.put(`/subjects/${id}`, form);
                toast.success('Subject updated');
            } else {
                await api.post('/subjects', form);
                toast.success('Subject created');
            }
            navigate('/subjects');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div style={formContainerStyle}>
            <h2>{isEdit ? 'Edit Subject' : 'Add Subject'}</h2>
            <form onSubmit={handleSubmit}>
                <div style={fieldStyle}>
                    <label>Subject Name</label>
                    <input name="subjectName" value={form.subjectName}
                        onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={fieldStyle}>
                    <label>Subject Code</label>
                    <input name="subjectCode" value={form.subjectCode}
                        onChange={handleChange} required style={inputStyle}
                        placeholder="e.g. MATH101" />
                </div>
                <button type="submit" style={btnStyle}>{isEdit ? 'Update' : 'Create'}</button>
                <button type="button" style={cancelBtnStyle}
                    onClick={() => navigate('/subjects')}>Cancel</button>
            </form>
        </div>
    );
}

export default SubjectForm;
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