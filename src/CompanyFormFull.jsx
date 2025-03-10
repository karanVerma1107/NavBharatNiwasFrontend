import React, { useEffect } from 'react'
import { getCDrawbyId } from './Actions/formAction'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from './logoimg - Copy.jpg';

const CompanyFormFull = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCDrawbyId(id));
    }, [dispatch, id]);

    const { error, loading, companyFill } = useSelector(state => state.getCF);

    if (loading) {
        return <div style={{ color: 'black' }}>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: 'black' }}>Error: {error}</div>;
    }

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div style={{ padding: '3vmax', width:'100%' }}>
            <div style={{ textAlign: 'center', marginBottom: '1vmax' }}>
                <img src={logo} alt="Company Logo" style={{ width: '18vmax', height: '14vmax', objectFit: 'contain', marginTop: "1.2vmax" }} />
            </div>

            <div style={{ textAlign: 'center', marginBottom: '3vmax', fontSize: '1.5vmax', color: 'black' }}>
                <p style={{ color: 'black' }}>3rd floor, Shayama building, B-92, 63, Sector 62 Noida Uttar Pradesh - 201301</p>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '3vmax' }}>
                <img src={companyFill?.passportPhoto} alt="Passport Photo" style={{ width: '10vmax', height: '13vmax', objectFit: 'cover' }} />
            </div>

            <div style={{ textAlign: 'center', marginBottom: '3vmax', fontSize: '1.5vmax', color: 'black' }}>
                <p style={{ color: 'black' }}><strong>Date of Filling:</strong> {formatDate(companyFill?.createdAt)}</p>
            </div>

            <table style={{ minWidth: '40vmax', borderCollapse: 'collapse' , height:'auto'

             } }>
                <thead>
                    <tr style={{ color: 'black' }}>
                        <th style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.5vmax', color: 'black' }}>Field</th>
                        <th style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.5vmax', color: 'black' }}>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {companyFill && (
                        Object.entries(companyFill).map(([key, value]) => (
                            <tr key={key} style={{ color: 'black' }}>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax', color: 'black' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax', color: 'black' }}>{value}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CompanyFormFull;
