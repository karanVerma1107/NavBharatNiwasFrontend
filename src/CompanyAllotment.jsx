import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCDrawbyId, createCompanyAllotment } from './Actions/formAction';
import './CompanyAllotment.css'; // Import the CSS file
import logo from './logoimg - Copy.jpg';
import SignaturePad from './Signaturepad';

const CompanyAllotment = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { error, loading, companyFill } = useSelector(state => state.getCF); // Update state selector

    const {message, Error} = useSelector(state => state.createAllotC);

    console.log(companyFill);
    const {
        companyName,
        authorizedSignatory,
        gstNumber,
        panNumber,
        paymentPlan,
        passportPhoto,
    } = companyFill || {};

    const [signature, setSignature] = useState(null);

  const handleSaveSignature = (signatureData) => {
    setSignature(signatureData);
  };

  
    // Local state for form fields
    const [formData, setFormData] = useState({
        authorizedSignatory: authorizedSignatory || '',
        gstNumber: gstNumber || '',
        companyName: companyName || '',
        emailId: '',
        panNumber: panNumber || '',
        companyAddress: '',
        uniqueId: '',
        developmentCharge: '',
        area: '',
        unitNo: '',
        plc: '',
        paymentPlan: paymentPlan || '',
        plcAmount: '',
        registrationAmount: '',
        totalCost: '',
        modeOfPayment: '',
        chequeNoDDNo: '',
        bankName: '',
        amount: '',
        chequeDateDDDate: '',
        transactionId: '',
        passportPhoto: passportPhoto || ''
    });

    useEffect(() => {
        if (companyFill) {
            setFormData({
                authorizedSignatory: companyFill.authorizedSignatory || '',
                gstNumber: companyFill.gstNumber || '',
                companyName: companyFill.companyName || '',
                emailId: '',
                panNumber: companyFill.panNumber || '',
                companyAddress: '',
                uniqueId: '',
                developmentCharge: '',
                area: '',
                unitNo: '',
                plc: '',
                paymentPlan: companyFill.paymentPlan || '',
                plcAmount: '',
                registrationAmount: '',
                totalCost: '',
                modeOfPayment: '',
                chequeNoDDNo: '',
                bankName: '',
                amount: '',
                chequeDateDDDate: '',
                transactionId: '',
                passportPhoto: companyFill.passportPhoto || ''
            });
        }
    }, [companyFill]);
    


    useEffect(() => {
        dispatch(getCDrawbyId(id));
    }, [dispatch, id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData();
        Object.keys(formData).forEach((key) => {
            form.append(key, formData[key]);
        });

        // Send form data to backend
        dispatch(createCompanyAllotment(form));
    };

    return (
        <>
            <div className="company-allotment-container">
                <div className="allotment-card">
                    <div className="logo-container">
                        <img src={logo} alt="Company Logo" className="logo" />
                    </div>
                    <div className="address-container">
                        <p>3rd floor, Shayama building, B-92, 63, Sector 62 Noida Uttar Pradesh - 201301</p>
                    </div>
               
                    <div className="form-container">
    {/* Passport Image displayed above the tables */}
    <div className="image-container">
        {formData.passportPhoto ? (
            <img src={formData.passportPhoto} alt="Passport" style={{ width: '10vmax', height: '12vmax' }} />
        ) : (
            <p>No passport photo available</p>
        )}
    </div>

    {/* Form submission */}
    <form onSubmit={handleSubmit}>
        <div className="table-container">
            {/* Applicant Table - Auto-filled */}
            <table className="styled-table">
                <thead>
                    <tr>
                        <th colSpan="2" style={{backgroundColor:"#2e3c52", color:'white'}}>Applicant Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Authorized Signatory</td>
                        <td><input type="text" name="authorizedSignatory" value={formData.authorizedSignatory} onChange={handleInputChange} readOnly /></td>
                    </tr>
                    <tr>
                        <td>GST Number</td>
                        <td><input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleInputChange} readOnly /></td>
                    </tr>
                    <tr>
                        <td>Company Name</td>
                        <td><input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} readOnly /></td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td><input type="email" name="emailId" value={formData.emailId} onChange={handleInputChange} required /></td>
                    </tr>
                    <tr>
                        <td>PAN Number</td>
                        <td><input type="text" name="panNumber" value={formData.panNumber} onChange={handleInputChange} readOnly /></td>
                    </tr>
                    <tr>
                        <td>Company Address</td>
                        <td><input type="text" name="companyAddress" value={formData.companyAddress} onChange={handleInputChange} required /></td>
                    </tr>
                    <tr>
                        <td>Unique ID</td>
                        <td><input type="text" name="uniqueId" value={formData.uniqueId} onChange={handleInputChange} required /></td>
                    </tr>
                </tbody>
            </table>

            {/* Booking Details Table - User Input */}
            <table className="styled-table">
                <thead>
                    <tr>
                        <th colSpan="2" style={{backgroundColor:"#2e3c52", color:'white'}}>Booking Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Development Charge</td>
                        <td><input type="text" name="developmentCharge" value={formData.developmentCharge} onChange={handleInputChange} required /></td>
                    </tr>
                    <tr>
                        <td>Area</td>
                        <td><input type="text" name="area" value={formData.area} onChange={handleInputChange} required /></td>
                    </tr>
                    <tr>
                        <td>Unit No</td>
                        <td><input type="text" name="unitNo" value={formData.unitNo} onChange={handleInputChange} required /></td>
                    </tr>
                    <tr>
                        <td>PLC</td>
                        <td><input type="text" name="plc" value={formData.plc} onChange={handleInputChange} required /></td>
                    </tr>
                    <tr>
                        <td>Payment Plan</td>
                        <td><input type="text" name="paymentPlan" value={formData.paymentPlan} onChange={handleInputChange} required /></td>
                    </tr>
                    <tr>
                        <td>PLC Amount</td>
                        <td><input type="text" name="plcAmount" value={formData.plcAmount} onChange={handleInputChange} required /></td>
                    </tr>
                    <tr>
                        <td>Registration Amount</td>
                        <td><input type="text" name="registrationAmount" value={formData.registrationAmount} onChange={handleInputChange} required /></td>
                    </tr>
                    <tr>
                        <td>Total Cost</td>
                        <td><input type="text" name="totalCost" value={formData.totalCost} onChange={handleInputChange} required /></td>
                    </tr>
                    <tr>
                        <td>Mode of Payment</td>
                        <td><input type="text" name="modeOfPayment" value={formData.modeOfPayment} onChange={handleInputChange} required /></td>
                    </tr>
                    <tr>
                        <td>Cheque/DD No.</td>
                        <td><input type="text" name="chequeNoDDNo" value={formData.chequeNoDDNo} onChange={handleInputChange} required /></td>
                    </tr>
                    <tr>
                        <td>Bank Name</td>
                        <td><input type="text" name="bankName" value={formData.bankName} onChange={handleInputChange} required /></td>
                    </tr>
                    <tr>
                        <td>Amount</td>
                        <td><input type="text" name="amount" value={formData.amount} onChange={handleInputChange} required /></td>
                    </tr>
                    <tr>
                        <td>Cheque/DD Date</td>
                        <td><input type="date" name="chequeDateDDDate" value={formData.chequeDateDDDate} onChange={handleInputChange} required /></td>
                    </tr>
                    <tr>
                        <td>Transaction ID</td>
                        <td><input type="text" name="transactionId" value={formData.transactionId} onChange={handleInputChange} required /></td>
                    </tr>
                </tbody>
            </table>
        </div>


        <form onSubmit={handleSubmit}>
      <div>
        <label>Signature:</label>
        <SignaturePad onSaveSignature={handleSaveSignature} />
      </div>
      <button type="submit">Submit</button>
    </form>

        <div className="terms-container">
    <h2 style={{ fontSize: '1.5vmax', fontWeight: 'bold' }}>Terms & Conditions</h2>
    <ul style={{ fontSize: '0.9vmax', fontWeight: 'bold' }}>
        <li>The Intending Buyer has applied for the registration of Plot/Farm House with full knowledge and subject to all laws, notifications and rules applicable to this area, which have been explained by the company and understood by him/her.</li>
        <li>The intending buyer has fully satisfied himself/herself about the interest and title of the company in the land, understands all limitations and obligations in respect of it and does not have any objection.</li>
        <li>For preferential situated Plot/Farm House, extra charges as applicable will be payable by the intending buyer.</li>
        <li>The cost of Development Charges for a Plot/Farm House whatever is applicable will be payable by the customer.</li>
        <li>If any applicant wants to cancel his/her registration once they have applied for a Plot/Farm House under this scheme, then the company will refund his/her registration money after deducting 50% from the total paid.</li>
        <li>The applicant has to pay the maintenance & Security charges as applicable.</li>
        <li>In case if any client fails to pay the maintenance & security charges on time, then the company will not be responsible for the security of his/her property or not be responsible if anyone encroaches his/her property and the client cannot blame the company for any loss whatsoever. Moreover, the company will not provide the maintenance services for common area to such clients.</li>
        <li>The company reserves the right to cancel the registration/allotment of the Plot/Farm House in case if any cheque for the Registration Amount or the Balance Amount for that Plot/Farm House bounced/dishonoured due to customer’s fault.</li>
        <li>The applicant/allotee shall before taking possession of the residential Plot/Farm House, must clear all the dues towards the residential Plot/Farm House and have the Conveyance Deed for the said residential Plot/Farm House executed in his favour by the Company after paying stamp duty, registration fee and other charges/expenses.</li>
        <li>The company can change its scheme at any time and the applicants are not supposed to show any objection on the same.</li>
        <li>It is made clear that it is not possible to check the eligibility of applicant at the time of acceptance of the Registration form. Therefore, those who are not eligible would register their name at their own risk and wouldn’t be entitled for allotment of Plot/Farm Houses if at a later stage it is detected that they are not eligible under the scheme.</li>
        <li>All allotments shall be made on free hold basis. However, the title shall be transferred only when Sale Deed/Registry is executed in favour of the allotee and is registered in the office of Sub-Registrar.</li>
        <li>The Company reserves the right to alter/amend/modify any of the terms & conditions of application eligibility and allotment at its sole discretion or as desired/directed by the Govt. of the State/India. The consequences of such alteration/amendment/modification will be automatically binding on all applicants, without any further reference of them.</li>
        <li>If any misrepresentation/concealment/suppression of material facts are found to be made by the applicant/allotee, then the allotment of the given Plot/Farm House will be cancelled at the immediate effect and the total amount of the Plot/Farm House will be refunded after deducting 50% of the total Cost.</li>
        <li>Cheque/DD/Payorder to be in the name of Navbharat Niwas Private Limited.</li>
        <li>A penalty of Rs. 1000 will be charged for cheque bouncing, and a 12% annual interest will be applied on any delayed payments.</li>
        <li>All provisional allotments under Smart City Development Plan are around 30-35% less cost than Original Price. In Case of Payment Delay in any payment plan for more than 45 days, the allotment will be cancelled from Smart City Development plan and original price of Plot/Farm House shall be paid by the applicant/allotee.</li>
        <li>Possession will be given within 24 months after booking. In case possession is not given, 18% interest will be paid to the buyer by Navbharat Niwas on total amount.</li>
        <li>All PDC Cheques, according to the Payment Plan selected by The Client till Registry, need to be deposited at the time of agreement and gift dispersal in Noida Office.</li>
    </ul>
</div>

<form onSubmit={handleSubmit}>
      <div>
        <label>Signature:</label>
        <SignaturePad onSaveSignature={handleSaveSignature} />
      </div>
      <button type="submit">Submit</button>
    </form>

<div className="declaration-container">
    <h2 style={{ fontSize: '1.5vmax', fontWeight: 'bold' }}>Declaration</h2>
    <ul style={{ fontSize: '0.9vmax', fontWeight: 'bold' }}>
        <li>I/WE declare that I/We have read & understood the above-mentioned terms and conditions of the project and shall abide by them.</li>
        <li>The Plot/Farm Houses allotted to me by the company under the rules shall be acceptable to me/us. I/We shall have no objection.</li>
        <li>In case of cancellation of registration done by me/us, I/We shall accept the deduction made by the company as per rules.</li>
        <li>I agree that the measurement/number and area of Plot/Farm House required by me/us can vary at the time of Registry as per the Govt. Rules/Approved Map and Availability.</li>
        <li>I/We hereby declare that all information on the application form has been given by me/us and is true to the best of knowledge and belief.</li>
        <li>Note: For credit card transactions, an additional 2% fee will be applied.</li>
    </ul>
</div>

<form onSubmit={handleSubmit}>
      <div>
        <label>Signature:</label>
        <SignaturePad onSaveSignature={handleSaveSignature} />
      </div>
      <button type="submit">Submit</button>
    </form>

        <button type="submit" className="submit-btn">Submit</button>
    </form>




</div>

              
            </div>
            </div>
        </>
    );
}

export default CompanyAllotment;
