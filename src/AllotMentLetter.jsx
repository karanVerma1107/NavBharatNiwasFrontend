import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getAllotmentById } from './Actions/formAction';
import SignatureCanvas from 'react-signature-canvas';
import { updateSignature } from './Actions/formAction';
import "./AllotmentDetails.css";
import { toast } from 'react-toastify';

const AllotMentLetter = () => {

    const {id} = useParams();
    const dispatch = useDispatch();

    const {loading, error, allotment} = useSelector(state=>state.allotbyid);

    // Extract necessary information from the response
const { 
    _id,
    name, 
    swdo, // Son/Wife/Daughter Of
    phoneNumber, 
    gstNumber, 
    dob, 
    nationality, 
    company, 
    emailId, 
    aadhaarNo, 
    panNo, 
    profession, 
    address, 
    uniqueId, // Unique ID
    // Property Details
    developmentCharge, 
    area, 
    unitNo, 
    plc, // Preferential Location Charges
    paymentPlan, 
    changeinPP, // Change in Payment Plan
    date,
    // Payment Details
    plcAmount, 
    registrationAmount, 
    totalCost, 
    modeOfPayment, 
    chequeNoDDNo, 
    bankName, 
    amount, 
    image,
    chequeDateDDDate, 
    transactionId,
    // Signatures
    sign1, 
    sign2, 
    sign3, 
    createdAt, 
    updatedAt // Timestamps from Mongoose
} = allotment || {};

const {Loading, Error, message} = useSelector(state=>state.sign)

useEffect(()=>{
    if(message){
        toast.success(message);
    }

    if (Error){
        toast.error(Error);
    }
})


 const signatureRef = useRef(null);

 const [currentSignField, setCurrentSignField] = useState(null);
 const [signatures, setSignatures] = useState({ sign1, sign2, sign3 });

 const sigRef1 = useRef(null);
 const sigRef2 = useRef(null);
 const sigRef3 = useRef(null);

 const [signature1, setSignature1] = useState(sign1);
 const [signature2, setSignature2] = useState(sign2);
 const [signature3, setSignature3] = useState(sign3);

  


 useEffect(() => {
    setSignature1(sign1);
    setSignature2(sign2);
    setSignature3(sign3);
}, [sign1, sign2, sign3]);


const saveSignature = (ref, setSignature, field) => {
    if (!ref.current) return;

    const signatureData = ref.current.toDataURL();
    dispatch(updateSignature(id, field, signatureData));

    setSignature(signatureData);
};

const clearSignature = (ref) => {
    if (ref.current) {
        ref.current.clear();
    }
};


    useEffect(()=>{
      dispatch(getAllotmentById(id));
    },[]);
    

  return (
   <>
   
   <div className="allotment-container">
            {/* Applicant Details */}
            {(name || swdo || phoneNumber || gstNumber|| dob || nationality || company || emailId || aadhaarNo || panNo || profession || address || uniqueId|| image) && (
                <div className="section">
                    <h2 className="section-title">Applicant Details</h2>
                    <div className="info">
                    {image&&  <img src={image} alt="Passport" style={{ width: '10vmax', height: '12vmax' }} />}
                        {name && <p><strong>Name:</strong> {name}</p>}
                        {swdo && <p><strong>Son/Wife/Daughter Of:</strong> {swdo}</p>}
                        {phoneNumber && <p><strong>Phone Number:</strong> {phoneNumber}</p>}
                        {dob && <p><strong>Date of Birth:</strong> {new Date(dob).toLocaleDateString()}</p>}
                        {nationality && <p><strong>Nationality:</strong> {nationality}</p>}
                        {company && <p><strong>Company:</strong> {company}</p>}
                        {emailId && <p><strong>Email:</strong> {emailId}</p>}
                        {aadhaarNo && <p><strong>Aadhaar Number:</strong> {aadhaarNo}</p>}
                        {gstNumber && <p><strong>GST Number:</strong> {gstNumber}</p>}
                        {panNo && <p><strong>PAN Number:</strong> {panNo}</p>}
                        {profession && <p><strong>Profession:</strong> {profession}</p>}
                        {address && <p><strong>Address:</strong> {address}</p>}
                        {uniqueId && <p><strong>Unique ID:</strong> {uniqueId}</p>}
                    </div>
                </div>
            )}

            {/* Booking Details */}
            {(developmentCharge || area || unitNo || plc || paymentPlan || changeinPP || plcAmount || registrationAmount || totalCost || modeOfPayment || chequeNoDDNo || bankName || amount || chequeDateDDDate || transactionId) && (
                <div className="section">
                    <h2 className="section-title">Booking Details</h2>
                    <div className="info">
                        {developmentCharge && <p><strong>Development Charge:</strong> {developmentCharge}</p>}
                        {area && <p><strong>Area:</strong> {area}</p>}
                        {unitNo && <p><strong>Unit Number:</strong> {unitNo}</p>}
                        {plc && <p><strong>Preferential Location Charges:</strong> {plc}</p>}
                        {paymentPlan && <p><strong>Payment Plan:</strong> {paymentPlan}</p>}
                        {changeinPP && <p><strong>Change in Payment Plan:</strong> {changeinPP}</p>}
                        {plcAmount && <p><strong>PLC Amount:</strong> {plcAmount}</p>}
                        {registrationAmount && <p><strong>Registration Amount:</strong> {registrationAmount}</p>}
                        {totalCost && <p><strong>Total Cost:</strong> {totalCost}</p>}
                        {modeOfPayment && <p><strong>Mode of Payment:</strong> {modeOfPayment}</p>}
                        {chequeNoDDNo && <p><strong>Cheque/DD Number:</strong> {chequeNoDDNo}</p>}
                        {bankName && <p><strong>Bank Name:</strong> {bankName}</p>}
                        {amount && <p><strong>Amount:</strong> {amount}</p>}
                        {chequeDateDDDate && <p><strong>Cheque/DD Date:</strong> {new Date(chequeDateDDDate).toLocaleDateString()}</p>}
                        {transactionId && <p><strong>Transaction ID:</strong> {transactionId}</p>}
                    </div>
                </div>
            )}

            {/* Timestamps */}
            {(createdAt || updatedAt) && (
                <div className="section">
                    <h2 className="section-title">Timestamps</h2>
                    <div className="info">
                        {createdAt && <p><strong>Created At:</strong> {new Date(createdAt).toLocaleString()}</p>}
                        {updatedAt && <p><strong>Updated At:</strong> {new Date(updatedAt).toLocaleString()}</p>}
                    </div>
                </div>
            )}
        </div>

        {!signature1 ? (
                    <div className="signature-area">
                        <SignatureCanvas
                            ref={sigRef1}
                            penColor="black"
                            canvasProps={{ width: 400, height: 200,  className: 'sigCanvas' }}
                        />
                        <div className="signature-buttons">
                            <button onClick={() => saveSignature(sigRef1, setSignature1, "sign1")} className="save-btn">
                                Save Signature
                            </button>
                            <button onClick={() => clearSignature(sigRef1)} className="clear-btn">
                                Clear
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <img src={signature1} alt="Signature 1" className="signature-img" />
                    </div>
                )}

        <div className="terms-container">
    <h2 style={{ fontSize: '1.5vmax', fontWeight: 'bold', marginLeft:'2vmax'}}>Terms & Conditions</h2>
    <ul style={{ fontSize: '1.3vmax', fontWeight: 'bold' }}>
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
    <h4 style={{marginLeft:'2vmax'}}> DATE: {date}</h4>
</div>

{!signature2 ? (
                    <div className="signature-area">
                        <SignatureCanvas
                            ref={sigRef2}
                            penColor="black"
                            canvasProps={{ width: 400, height: 200,  className: 'sigCanvas' }}
                        />
                        <div className="signature-buttons">
                            <button onClick={() => saveSignature(sigRef2, setSignature2, "sign2")} className="save-btn">
                                Save Signature
                            </button>
                            <button onClick={() => clearSignature(sigRef2)} className="clear-btn">
                                Clear
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <img src={signature2} alt="Signature 2" className="signature-img" />
                    </div>
                )}

<div className="declaration-container">
    <h2 style={{ fontSize: '1.5vmax', fontWeight: 'bold', marginLeft:'2vmax'}}>Declaration</h2>
    <ul style={{ fontSize: '1.3vmax', fontWeight: 'bold' }}>
        <li>I/WE declare that I/We have read & understood the above-mentioned terms and conditions of the project and shall abide by them.</li>
        <li>The Plot/Farm Houses allotted to me by the company under the rules shall be acceptable to me/us. I/We shall have no objection.</li>
        <li>In case of cancellation of registration done by me/us, I/We shall accept the deduction made by the company as per rules.</li>
        <li>I agree that the measurement/number and area of Plot/Farm House required by me/us can vary at the time of Registry as per the Govt. Rules/Approved Map and Availability.</li>
        <li>I/We hereby declare that all information on the application form has been given by me/us and is true to the best of knowledge and belief.</li>
        <li>Note: For credit card transactions, an additional 2% fee will be applied.</li>
    </ul>
    <h4 style={{marginLeft:'2vmax'}}> DATE: {date}</h4>
</div>
   
{!signature3 ? (
                    <div className="signature-area">
                        <SignatureCanvas
                            ref={sigRef3}
                            penColor="black"
                            canvasProps={{ width: 400, height: 200, className: 'sigCanvas' }}
                        />
                        <div className="signature-buttons">
                            <button onClick={() => saveSignature(sigRef3, setSignature3, "sign3")} className="save-btn">
                                Save Signature
                            </button>
                            <button onClick={() => clearSignature(sigRef3)} className="clear-btn">
                                Clear
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <img src={signature3} alt="Signature 3" className="signature-img" />
                    </div>
                )}
   </>
  )
}

export default AllotMentLetter