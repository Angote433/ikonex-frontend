import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
    nav: {
        backgroundColor: '#1a237e',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        height: '56px'
    },
    brand: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: '18px',
        textDecoration: 'none',
        marginRight: '16px'
    },
    link: {
        color: '#c5cae9',
        textDecoration: 'none',
        fontSize: '14px'
    }
};

function Navbar() {
    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.brand}>Ikonex Academy</Link>
            <Link to="/" style={styles.link}>Classes</Link>
            <Link to="/streams" style={styles.link}>Streams</Link>
            <Link to="/students" style={styles.link}>Students</Link>
            <Link to="/subjects" style={styles.link}>Subjects</Link>
            <Link to="/scores/new" style={styles.link}>Record Scores</Link>
            <Link to="/results" style={styles.link}>Results</Link>
        </nav>
    );
}

export default Navbar;