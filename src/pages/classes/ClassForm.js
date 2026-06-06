import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';

function ClassForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [form, setForm] = useState({
        className: '',
        gradeLevel: '',
        academicYear: ''
    });

    useEffect(() => {
        if (isEdit) {
            api.get(`/classes/${id}`)
                .then(res => setForm(res.data))
                .catch(() => toast.error('Failed to load class'));
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await api.put(`/classes/${id}`, form);
                toast.success('Class updated');
            } else {
                await api.post('/classes', form);
                toast.success('Class created');
            }
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div style={formContainerStyle}>
            <h2>{isEdit ? 'Edit Class' : 'Add Class'}</h2>
            <form onSubmit={handleSubmit}>
                <div style={fieldStyle}>
                    <label>Class Name</label>
                    <input
                        name="className"
                        value={form.className}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        placeholder="e.g. Form 1"
                    />
                </div>
                <div style={fieldStyle}>
                    <label>Grade Level</label>
                    <input
                        name="gradeLevel"
                        type="number"
                        value={form.gradeLevel}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        placeholder="e.g. 1"
                    />
                </div>
                <div style={fieldStyle}>
                    <label>Academic Year</label>
                    <input
                        name="academicYear"
                        type="number"
                        value={form.academicYear}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        placeholder="e.g. 2024"
                    />
                </div>
                <button type="submit" style={btnStyle}>
                    {isEdit ? 'Update' : 'Create'}
                </button>
                <button
                    type="button"
                    style={cancelBtnStyle}
                    onClick={() => navigate('/')}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

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

export default ClassForm;