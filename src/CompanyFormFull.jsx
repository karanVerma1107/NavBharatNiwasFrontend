import React, { useEffect } from 'react'
import { getCDrawbyId  } from './Actions/formAction'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from './logoimg - Copy.jpg';  // Adjust path to logo if necessary

const CompanyFormFull = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCDrawbyId(id));
    }, [dispatch, id]);

    const { error, loading, companyFill } = useSelector(state => state.getCF);  // Update state selector

    // Handle loading or error state
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Format the date of filling
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
        <div style={{ padding: '3vmax' }}>
            <div style={{ textAlign: 'center', marginBottom: '1vmax' }}>
                {/* Company Logo */}
                <img src={logo} alt="Company Logo" style={{ width: '18vmax', height: '14vmax', objectFit: 'contain' }} />
            </div>

            {/* Address below Logo */}
            <div style={{ textAlign: 'center', marginBottom: '3vmax', fontSize: '1.5vmax' }}>
                <p>3rd floor, Shayama building, B-92, 63, Sector 62 Noida Uttar Pradesh - 201301</p>
            </div>

            {/* Passport Photo */}
            <div style={{ textAlign: 'center', marginBottom: '3vmax' }}>
                <img src={companyFill?.passportPhoto} alt="Passport Photo" style={{ width: '10vmax', height: '13vmax', objectFit: 'cover' }} />
            </div>

            {/* Date of Filling */}
            <div style={{ textAlign: 'center', marginBottom: '3vmax', fontSize: '1.5vmax' }}>
                <p><strong>Date of Filling:</strong> {formatDate(companyFill?.createdAt)}</p>
            </div>

            {/* Company Fill Attributes in a Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.5vmax' }}>Field</th>
                        <th style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.5vmax' }}>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {companyFill && (
                        <>
                         <tr>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>Ticket Id:</td>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>{companyFill._id}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>Company Name</td>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>{companyFill.companyName}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>Authorized Signatory</td>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>{companyFill.authorizedSignatory}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>GST Number</td>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>{companyFill.gstNumber}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>PAN Number</td>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>{companyFill.panNumber}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>Company Address</td>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>{companyFill.companyAddress}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>Authorized Signatory Address</td>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>{companyFill.authorizedSignatoryAddress}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>Payment Plan</td>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>{companyFill.paymentPlan}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>Status</td>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>{companyFill.status}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>Project</td>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>{companyFill.project}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>Plot Size</td>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>{companyFill.plotSize}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>Preference</td>
                                <td style={{ border: '1px solid black', padding: '1vmax', fontSize: '1.2vmax' }}>{companyFill.preference}</td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CompanyFormFull;
