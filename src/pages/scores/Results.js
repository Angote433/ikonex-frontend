import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api/axios';

function Results() {
    const [streams, setStreams] = useState([]);
    const [results, setResults] = useState([]);
    const [filter, setFilter] = useState({
        streamId: '', academicYear: '', term: ''
    });

    useEffect(() => {
        api.get('/streams').then(res => setStreams(res.data));
    }, []);

    const handleChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    const handleFetch = async (e) => {
        e.preventDefault();
        try {
            const res = await api.get(
                `/scores/results/stream/${filter.streamId}`,
                { params: { academicYear: filter.academicYear, term: filter.term } }
            );
            setResults(res.data);
        } catch {
            toast.error('Failed to load results');
        }
    };

    const downloadReportCard = async (studentId) => {
        try {
            const response = await api.get(`/reports/report-card/${studentId}`, {
                params: {
                    academicYear: filter.academicYear,
                    term: filter.term
                },
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `report-card-${studentId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            toast.success('Report card downloaded');
        } catch {
            toast.error('Failed to download report card');
        }
    };

    return (
        <div>
            <h2>Class Results</h2>
            <form
                onSubmit={handleFetch}
                style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <select
                    name="streamId"
                    value={filter.streamId}
                    onChange={handleChange}
                    required
                    style={inputStyle}>
                    <option value="">Select stream</option>
                    {streams.map(s => (
                        <option key={s.streamId} value={s.streamId}>
                            {s.streamName} — {s.className}
                        </option>
                    ))}
                </select>
                <input
                    name="academicYear"
                    type="number"
                    placeholder="Year e.g. 2024"
                    value={filter.academicYear}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
                <select
                    name="term"
                    value={filter.term}
                    onChange={handleChange}
                    required
                    style={inputStyle}>
                    <option value="">Select term</option>
                    <option value="Term 1">Term 1</option>
                    <option value="Term 2">Term 2</option>
                    <option value="Term 3">Term 3</option>
                </select>
                <button type="submit" style={btnStyle}>View Results</button>
            </form>

            {results.length > 0 && (
                <table style={tableStyle}>
                    <thead>
                        <tr style={thRowStyle}>
                            <th style={thStyle}>Position</th>
                            <th style={thStyle}>Admission No.</th>
                            <th style={thStyle}>Name</th>
                            <th style={thStyle}>Total</th>
                            <th style={thStyle}>Average</th>
                            <th style={thStyle}>Grade</th>
                            <th style={thStyle}>Remarks</th>
                            <th style={thStyle}>Report Card</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map(r => (
                            <tr key={r.studentId} style={trStyle}>
                                <td style={tdStyle}>{r.position}</td>
                                <td style={tdStyle}>{r.admissionNumber}</td>
                                <td style={tdStyle}>{r.name}</td>
                                <td style={tdStyle}>{r.total}</td>
                                <td style={tdStyle}>{r.average}</td>
                                <td style={tdStyle}>{r.grade}</td>
                                <td style={tdStyle}>{r.remarks}</td>
                                <td style={tdStyle}>
                                    <button
                                        style={downloadBtnStyle}
                                        onClick={() => downloadReportCard(r.studentId)}>
                                        Download PDF
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {results.length === 0 && (
                <p style={{ color: '#757575', marginTop: '20px' }}>
                    Select a stream, year and term then click View Results.
                </p>
            )}
        </div>
    );
}

const btnStyle = {
    backgroundColor: '#1a237e', color: '#fff',
    border: 'none', padding: '8px 16px',
    borderRadius: '4px', cursor: 'pointer'
};
const downloadBtnStyle = {
    backgroundColor: '#2e7d32', color: '#fff',
    border: 'none', padding: '4px 10px',
    borderRadius: '4px', cursor: 'pointer',
    fontSize: '12px'
};
const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const thRowStyle = { backgroundColor: '#1a237e' };
const thStyle = {
    color: '#fff', padding: '10px 12px',
    textAlign: 'left', fontSize: '14px'
};
const trStyle = { borderBottom: '1px solid #e0e0e0' };
const tdStyle = { padding: '10px 12px', fontSize: '14px' };
const inputStyle = {
    padding: '8px', border: '1px solid #bdbdbd',
    borderRadius: '4px', fontSize: '14px'
};

export default Results;