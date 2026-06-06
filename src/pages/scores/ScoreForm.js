import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api/axios';

function ScoreForm() {
    const [streams, setStreams] = useState([]);
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [selectedStream, setSelectedStream] = useState('');
    const [form, setForm] = useState({
        studentId: '',
        subjectId: '',
        examScore: '',
        catScore: '',
        academicYear: '',
        term: ''
    });

    useEffect(() => {
        api.get('/streams').then(res => setStreams(res.data));
        api.get('/subjects').then(res => setSubjects(res.data));
    }, []);

    const handleStreamChange = async (e) => {
        setSelectedStream(e.target.value);
        try {
            const res = await api.get(`/students/stream/${e.target.value}`);
            setStudents(res.data);
        } catch {
            toast.error('Failed to load students');
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post(
                `/scores/student/${form.studentId}/subject/${form.subjectId}`,
                {
                    examScore: form.examScore,
                    catScore: form.catScore,
                    academicYear: form.academicYear,
                    term: form.term
                }
            );
            toast.success('Score recorded successfully');
            setForm({ studentId: '', subjectId: '', examScore: '',
                      catScore: '', academicYear: '', term: '' });
        } catch (error) {
            if (error.response?.status === 500) {
                toast.error('Score already exists for this student, subject and term');
            } else {
                toast.error(error.response?.data?.message || 'Failed to save score');
            }
        }
    };

    return (
        <div style={formContainerStyle}>
            <h2>Record Score</h2>
            <form onSubmit={handleSubmit}>
                <div style={fieldStyle}>
                    <label>Stream</label>
                    <select value={selectedStream} onChange={handleStreamChange}
                        required style={inputStyle}>
                        <option value="">Select stream</option>
                        {streams.map(s => (
                            <option key={s.streamId} value={s.streamId}>
                                {s.streamName} — {s.className}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={fieldStyle}>
                    <label>Student</label>
                    <select name="studentId" value={form.studentId}
                        onChange={handleChange} required style={inputStyle}>
                        <option value="">Select student</option>
                        {students.map(s => (
                            <option key={s.studentId} value={s.studentId}>
                                {s.firstName} {s.lastName} — {s.admissionNumber}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={fieldStyle}>
                    <label>Subject</label>
                    <select name="subjectId" value={form.subjectId}
                        onChange={handleChange} required style={inputStyle}>
                        <option value="">Select subject</option>
                        {subjects.map(s => (
                            <option key={s.subjectId} value={s.subjectId}>
                                {s.subjectName}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={fieldStyle}>
                    <label>Exam Score</label>
                    <input name="examScore" type="number" step="0.01"
                        min="0" max="100" value={form.examScore}
                        onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={fieldStyle}>
                    <label>CAT Score</label>
                    <input name="catScore" type="number" step="0.01"
                        min="0" max="100" value={form.catScore}
                        onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={fieldStyle}>
                    <label>Academic Year</label>
                    <input name="academicYear" type="number"
                        value={form.academicYear} onChange={handleChange}
                        required style={inputStyle} placeholder="e.g. 2024" />
                </div>
                <div style={fieldStyle}>
                    <label>Term</label>
                    <select name="term" value={form.term}
                        onChange={handleChange} required style={inputStyle}>
                        <option value="">Select term</option>
                        <option value="Term 1">Term 1</option>
                        <option value="Term 2">Term 2</option>
                        <option value="Term 3">Term 3</option>
                    </select>
                </div>
                <button type="submit" style={btnStyle}>Save Score</button>
            </form>
        </div>
    );
}

export default ScoreForm;
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