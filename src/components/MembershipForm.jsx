import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MembershipForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        birthDay: '',
        birthMonth: '',
        birthYear: '',
        email: '',
        phone: '',
        street: '',
        zip: '',
        city: '',
        acceptTerms: false
    });
    const [status, setStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        // Basic validation
        if (!formData.acceptTerms) {
            setStatus('error');
            setErrorMessage('You must accept the Bylaws & Personal Data Handling Policy.');
            return;
        }

        // Map gender to ID
        const genderMap = {
            'female': "1",
            'male': "2",
            'other': "3",
            'prefer-not-to-say': "3"
        };

        // Format Date YYYYMMDD
        const day = formData.birthDay.padStart(2, '0');
        const month = formData.birthMonth.padStart(2, '0');
        const year = formData.birthYear;
        const socialSecurityNumber = `${year}${month}${day}`;

        const today = new Date().toISOString().split('T')[0];

        const payload = {
            api_key: import.meta.env.VITE_API_KEY,
            member: {
                firstname: formData.firstName,
                lastname: formData.lastName,
                gender_id: genderMap[formData.gender] || "3",
                socialsecuritynumber: socialSecurityNumber,
                email: formData.email,
                phone1: formData.phone,
                street: formData.street,
                zip_code: formData.zip,
                city: formData.city,
                renewed: today,
                subscribe_nyhetsbrev: null
            }
        };

        try {
            // Use PHP proxy endpoint (set in .env)
            const apiEndpoint = import.meta.env.VITE_API_ENDPOINT || '/api-proxy.php';

            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.ok && result.stored_member === true) {
                setStatus('success');
                setFormData({
                    firstName: '',
                    lastName: '',
                    gender: '',
                    birthDay: '',
                    birthMonth: '',
                    birthYear: '',
                    email: '',
                    phone: '',
                    street: '',
                    zip: '',
                    city: '',
                    acceptTerms: false
                });
            } else {
                setStatus('error');
                let errorMsg = 'Registration failed.';

                if (result.member_errors) {
                    const errors = Object.values(result.member_errors).flat().join(', ');
                    errorMsg = `Error: ${errors}`;
                } else if (result.member_warnings && result.member_warnings.length > 0) {
                    errorMsg = `Warning: ${result.member_warnings.join(', ')}`;
                }

                setErrorMessage(errorMsg);
            }
        } catch (err) {
            setStatus('error');
            setErrorMessage(`Network error: ${err.message}`);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '1rem 0',
        background: 'transparent',
        border: 'none',
        borderBottom: '2px solid rgba(197, 160, 89, 0.4)',
        color: '#ffffff',
        outline: 'none',
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
        transition: 'border-color 0.3s ease'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '0.75rem',
        fontSize: '0.75rem',
        color: 'var(--accent-color)',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        fontFamily: 'var(--font-body)',
        fontWeight: 600
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
                background: 'transparent',
                padding: '0',
                maxWidth: '700px',
                width: '100%',
                margin: '0 auto'
            }}
        >
            {status === 'success' ? (
                <div style={{
                    textAlign: 'center',
                    padding: '4rem 0'
                }}>
                    <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '2rem',
                        marginBottom: '1rem',
                        color: 'var(--accent-color)'
                    }}>
                        Application Received
                    </h3>
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        color: '#666',
                        marginBottom: '2rem'
                    }}>
                        You are now registered as a member of Slutstation 2025!
                        <br />
                        <br />
                        Unfortunately, you won't receive a confirmation email. If you want to verify your membership, you can email <a href="mailto:info@slutstation.se" style={{ color: 'black', textDecoration: 'underline' }}>info@slutstation.se</a>
                        <br />
                        See you at the next event!
                    </p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="btn"
                    >
                        Register another
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    {/* Name Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                            <label style={labelStyle}>First Name *</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                                onFocus={(e) => e.target.style.borderBottomColor = 'var(--accent-color)'}
                                onBlur={(e) => e.target.style.borderBottomColor = 'rgba(197, 160, 89, 0.2)'}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Last Name *</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                                onFocus={(e) => e.target.style.borderBottomColor = 'var(--accent-color)'}
                                onBlur={(e) => e.target.style.borderBottomColor = 'rgba(197, 160, 89, 0.2)'}
                            />
                        </div>
                    </div>

                    {/* Gender */}
                    <div>
                        <label style={labelStyle}>Gender *</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            style={{
                                ...inputStyle,
                                cursor: 'pointer',
                                appearance: 'none',
                                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C5A059' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.5rem center',
                                backgroundSize: '1.2rem',
                                paddingRight: '2.5rem'
                            }}
                            onFocus={(e) => e.target.style.borderBottomColor = 'var(--accent-color)'}
                            onBlur={(e) => e.target.style.borderBottomColor = 'rgba(197, 160, 89, 0.2)'}
                        >
                            <option value="" style={{ color: 'black' }}>Select Gender</option>
                            <option value="male" style={{ color: 'black' }}>Male</option>
                            <option value="female" style={{ color: 'black' }}>Female</option>
                            <option value="other" style={{ color: 'black' }}>Other / Prefer not to say</option>
                        </select>
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label style={labelStyle}>Date of Birth *</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1.5fr', gap: '1rem' }}>
                            <input
                                type="number"
                                name="birthDay"
                                placeholder="Day"
                                min="1"
                                max="31"
                                value={formData.birthDay}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                                onFocus={(e) => e.target.style.borderBottomColor = 'var(--accent-color)'}
                                onBlur={(e) => e.target.style.borderBottomColor = 'rgba(197, 160, 89, 0.2)'}
                            />
                            <select
                                name="birthMonth"
                                value={formData.birthMonth}
                                onChange={handleChange}
                                required
                                style={{
                                    ...inputStyle,
                                    cursor: 'pointer',
                                    appearance: 'none',
                                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C5A059' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 0.5rem center',
                                    backgroundSize: '1.2rem',
                                    paddingRight: '2.5rem'
                                }}
                                onFocus={(e) => e.target.style.borderBottomColor = 'var(--accent-color)'}
                                onBlur={(e) => e.target.style.borderBottomColor = 'rgba(197, 160, 89, 0.2)'}
                            >
                                <option value="" style={{ color: 'black' }}>Month</option>
                                <option value="01" style={{ color: 'black' }}>January</option>
                                <option value="02" style={{ color: 'black' }}>February</option>
                                <option value="03" style={{ color: 'black' }}>March</option>
                                <option value="04" style={{ color: 'black' }}>April</option>
                                <option value="05" style={{ color: 'black' }}>May</option>
                                <option value="06" style={{ color: 'black' }}>June</option>
                                <option value="07" style={{ color: 'black' }}>July</option>
                                <option value="08" style={{ color: 'black' }}>August</option>
                                <option value="09" style={{ color: 'black' }}>September</option>
                                <option value="10" style={{ color: 'black' }}>October</option>
                                <option value="11" style={{ color: 'black' }}>November</option>
                                <option value="12" style={{ color: 'black' }}>December</option>
                            </select>
                            <input
                                type="number"
                                name="birthYear"
                                placeholder="Year"
                                min="1900"
                                max={new Date().getFullYear()}
                                value={formData.birthYear}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                                onFocus={(e) => e.target.style.borderBottomColor = 'var(--accent-color)'}
                                onBlur={(e) => e.target.style.borderBottomColor = 'rgba(197, 160, 89, 0.2)'}
                            />
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                            <label style={labelStyle}>Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                                onFocus={(e) => e.target.style.borderBottomColor = 'var(--accent-color)'}
                                onBlur={(e) => e.target.style.borderBottomColor = 'rgba(197, 160, 89, 0.2)'}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Phone Number *</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                                onFocus={(e) => e.target.style.borderBottomColor = 'var(--accent-color)'}
                                onBlur={(e) => e.target.style.borderBottomColor = 'rgba(197, 160, 89, 0.2)'}
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label style={labelStyle}>Street Address *</label>
                        <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderBottomColor = 'var(--accent-color)'}
                            onBlur={(e) => e.target.style.borderBottomColor = 'rgba(197, 160, 89, 0.2)'}
                        />
                    </div>

                    {/* Zip & City */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                        <div>
                            <label style={labelStyle}>Zip Code *</label>
                            <input
                                type="text"
                                name="zip"
                                value={formData.zip}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                                onFocus={(e) => e.target.style.borderBottomColor = 'var(--accent-color)'}
                                onBlur={(e) => e.target.style.borderBottomColor = 'rgba(197, 160, 89, 0.2)'}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>City *</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                                onFocus={(e) => e.target.style.borderBottomColor = 'var(--accent-color)'}
                                onBlur={(e) => e.target.style.borderBottomColor = 'rgba(197, 160, 89, 0.2)'}
                            />
                        </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div style={{ marginTop: '1rem' }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '1rem',
                            cursor: 'pointer',
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.9rem',
                            lineHeight: 1.6,
                            color: '#d0d0d0'
                        }}>
                            <input
                                type="checkbox"
                                name="acceptTerms"
                                checked={formData.acceptTerms}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    marginTop: '0.2rem',
                                    accentColor: 'var(--accent-color)',
                                    cursor: 'pointer'
                                }}
                            />
                            <span>
                                I accept the <Link to="/privacy-policy" target="_blank" style={{ color: 'var(--accent-color)' }}>Bylaws & Personal Data Handling Policy</Link> *
                            </span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn"
                        disabled={status === 'loading'}
                        style={{
                            opacity: status === 'loading' ? 0.7 : 1,
                            marginTop: '1rem',
                            alignSelf: 'flex-start'
                        }}
                    >
                        {status === 'loading' ? 'Processing...' : 'Submit Application'}
                    </button>

                    {status === 'error' && (
                        <p style={{
                            color: '#f44336',
                            fontSize: '0.9rem',
                            fontFamily: 'var(--font-body)',
                            marginTop: '1rem',
                            padding: '1rem',
                            borderLeft: '2px solid #f44336',
                            background: 'rgba(244, 67, 54, 0.05)'
                        }}>
                            {errorMessage}
                        </p>
                    )}
                </form>
            )}
        </motion.div>
    );
};

export default MembershipForm;
