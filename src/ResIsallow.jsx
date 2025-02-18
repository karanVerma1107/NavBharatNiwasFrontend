import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getIsAllowResults } from './Actions/formAction';
import './ResIsallow.css';

const ResIsallow = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { isLoading, result = [], resultCompany = [], error } = useSelector(state => state.getIsallRREE);

    useEffect(() => {
        dispatch(getIsAllowResults(id));
    }, [dispatch, id]);

    return (
        <div className="res-isallow-container">
            <h2 className="header-title">IsAllow Results</h2>
            {isLoading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}

            {result.length > 0 && (
                <div className="section">
                    <h3 className="section-title">Lucky Draw Results</h3>
                    {result.map((item) => (
                        <div key={item._id} className="result-card">
                            <p><strong>Name:</strong> {item.name}</p>
                            <p><strong>Phone No:</strong> {item.phoneNo}</p>
                            <p><strong>Father's Name:</strong> {item.fatherName}</p>
                            <p><strong>Address:</strong> {item.address}</p>
                            <div className="button-container">
                                <button className="action-button allotment"><a href={`/AllotmentIndiForm/${item._id} `} target='_blank' style={{color:'white'}}>Create Allotment Letter</a></button>
                                <button className="action-button welcome"><a href={`/WelcomeForm/${item._id} `} target='_blank' style={{color:'white'}}>Create Welcome Letter</a></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {resultCompany.length > 0 && (
                <div className="section">
                    <h3 className="section-title">Company Fill Results</h3>
                    {resultCompany.map((company) => (
                        <div key={company._id} className="result-card">
                            <p><strong>Company Name:</strong> {company.companyName}</p>
                            <p><strong>Authorized Signatory:</strong> {company.authorizedSignatory}</p>
                            <p><strong>GST Number:</strong> {company.gstNumber}</p>
                            <p><strong>Company Address:</strong> {company.companyAddress}</p>
                            <div className="button-container">
                                <button className="action-button allotment"><a href={`/AllotmentCForm/${company._id} `} target='_blank' style={{color:'white'}}>Create Allotment Letter</a></button>
                                <button className="action-button welcome"><a href={`/WelcomeCForm/${company._id} `} target='_blank' style={{color:'white'}}>Create Welcome Letter</a></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResIsallow;
