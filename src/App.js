import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import ClassList from './pages/classes/ClassList';
import ClassForm from './pages/classes/ClassForm';
import StreamList from './pages/streams/StreamList';
import StreamForm from './pages/streams/StreamForm';
import StudentList from './pages/students/StudentList';
import StudentForm from './pages/students/StudentForm';
import SubjectList from './pages/subjects/SubjectList';
import SubjectForm from './pages/subjects/SubjectForm';
import ScoreForm from './pages/scores/ScoreForm';
import Results from './pages/scores/Results';

function App() {
    return (
        <Router>
            <Navbar />
            <div style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<ClassList />} />
                    <Route path="/classes/new" element={<ClassForm />} />
                    <Route path="/classes/edit/:id" element={<ClassForm />} />
                    <Route path="/streams" element={<StreamList />} />
                    <Route path="/streams/new" element={<StreamForm />} />
                    <Route path="/streams/edit/:id" element={<StreamForm />} />
                    <Route path="/students" element={<StudentList />} />
                    <Route path="/students/new" element={<StudentForm />} />
                    <Route path="/students/edit/:id" element={<StudentForm />} />
                    <Route path="/subjects" element={<SubjectList />} />
                    <Route path="/subjects/new" element={<SubjectForm />} />
                    <Route path="/subjects/edit/:id" element={<SubjectForm />} />
                    <Route path="/scores/new" element={<ScoreForm />} />
                    <Route path="/results" element={<Results />} />
                </Routes>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </Router>
    );
}

export default App;