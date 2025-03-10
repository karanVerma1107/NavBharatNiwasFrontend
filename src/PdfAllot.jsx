import React, { useEffect, useRef } from 'react';
import { getAllotmentById } from './Actions/formAction';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from './logoimg - Copy.jpg';
import './PdfAllot.css';

const PdfAllot = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const firstpage = useRef();
     const secondpage = useRef();
     const thirdpage = useRef();
    const { loading, error, allotment } = useSelector(state => state.allotbyid);

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
      bookingAmount,
      Project,
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
      sign,
      createdAt,
      updatedAt // Timestamps from Mongoose
  } = allotment || {};

    useEffect(() => {
        dispatch(getAllotmentById(id));
    }, [dispatch, id]);

    const downloadPDF = async () => {
      const pdf = new jsPDF("p", "mm", "a4"); // Create a new PDF document (Portrait mode, millimeters, A4 size)
  
      const pages = [firstpage, secondpage, thirdpage]; // References to pages
  
      for (let i = 0; i < pages.length; i++) {
          if (!pages[i].current) continue;
  
          const canvas = await html2canvas(pages[i].current, { scale: 3, useCORS: true, allowTaint: true }); // Convert page to canvas
          const imgData = canvas.toDataURL("image/png");
  
          const imgWidth = 210; // A4 width in mm
          const pageHeight = 297; // A4 height in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
  
          if (i !== 0) pdf.addPage(); // Add new page for each section
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      }
  
      pdf.save(`Allotment_${id}.pdf`); // Save the PDF with a dynamic filename
  };
  

    const infoStyle = {
      width: "auto",
      height: "auto",
      margin: "0.8vmax",
      display: "flex",
      alignItems: "center",
      gap: "0.2vmax",
      fontSize: "0.9vmax",
      color: "navy"
  };

  const formattedDOB = dob ? new Date(dob).toLocaleDateString('en-GB') : "N/A"; 
  const formattedDOB1 = date ? new Date(date).toLocaleDateString('en-GB') : "N/A"; 

    return (
        <>
            <div  className="pdf-container">
                {/* Page 1 */}
                <div className="pdf-page" ref={firstpage}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'  , marginTop:'2vmax', flexDirection:'column', borderBottom:'1.8px solid #2c3e52', paddingBottom:'1vmax', top:'0'}}>
        <img src={logo} alt="Logo" style={{ width: '17.8vmax', height: '7vmax' }} />
        <strong style={{color:"black" , fontSize:'0.9vmax'}}>Allotment Under Navbharat Niwas Smart City Development Plan, "NNSCDP" - {Project}</strong>
      </div>


      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'  , marginTop:'0.9vmax', flexDirection:'column', borderBottom:'1.8px solid #2c3e52', paddingBottom:'1vmax', top:'0'}} >
      <strong style={{borderTop:'none', fontSize:'0.9vmax'}}>3'rd Floor, Shyama Building, B-92, Noida sec - 63, U.P - 201301 </strong>
      <strong style={{margin:'1vmax',  fontSize:'0.9vmax'}}>Website: <a style={{color:'navy'}}>www.navbharatniwas.in</a>,  Email: <a  style={{color:'navy'}}>info@navbharatniwas.in</a></strong>
      <strong style={{color:'black', margin:'none', padding:'none', fontSize:'1vmax'}}>Personal And Booking Details</strong>
      </div>
      <h5>Applicant</h5>
      <div className='applicant' style={{ 
    display: 'flex', 
    flexWrap: 'wrap',
    gap: '3px', 
    padding: '2px', 
    border: '2px solid #000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '100%',
}}>


    
    <div style={{width:'8vmax', height:'10vmax'}}>
      <img src={image} alt="Applicant" style={{ width: '8vmax', height: '9vmax' }} />
    </div>
   {name && <div style={infoStyle}><h5 style={{color:"black"}}>Name: </h5>  <span>{name}</span></div>}
   {gstNumber && <div style={infoStyle}><h5 style={{color:"black"}}>GST_No: </h5> <span>{gstNumber}</span></div>}
   {company && <div style={infoStyle}><h5 style={{color:"black"}}>Company: </h5> <span>{company}</span></div>}
{swdo && <div style={infoStyle}><h5 style={{color:"black"}}>S/W/DO: </h5> <span>{swdo}</span></div>}
{phoneNumber && <div style={infoStyle}><h5 style={{color:"black"}}>Phone: </h5> <span>{phoneNumber}</span></div>}
{dob && <div style={infoStyle}><h5 style={{color:"black"}}>DOB: </h5> <span>{formattedDOB}</span></div>}
{nationality && <div style={infoStyle}><h5 style={{color:"black"}}>Nationality: </h5> <span>{nationality}</span></div>}
{panNo && <div style={infoStyle}><h5 style={{color:"black"}}>Pan No: </h5> <span>{panNo}</span></div>}
{profession && <div style={infoStyle}><h5 style={{color:"black"}}>Profession: </h5> <span>{profession}</span></div>}
{emailId && <div style={infoStyle}><h5 style={{color:"black"}}>Email: </h5> <span>{emailId}</span></div>}
{aadhaarNo && <div style={infoStyle}><h5 style={{color:"black"}}>Aadhaar No: </h5> <span>{aadhaarNo}</span></div>}
{address && <div style={infoStyle}><h5 style={{color:"black"}}>Address: </h5> <span>{address}</span></div>}
</div>

<h5>Booking Details</h5>
<div  className='applicant' style={{ 
    display: 'flex', 
    flexWrap: 'wrap',
    gap: '1px', 
    padding: '2px', 
    border: '2px solid #000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '100%'}}>
 {bookingAmount && <div style={infoStyle}><h5 style={{color:"black"}}>Booking Amount: </h5>  <span>{bookingAmount}</span></div>}
   {developmentCharge && <div style={infoStyle}><h5 style={{color:"black"}}>Development Charge: </h5> <span>{developmentCharge}</span></div>}
   {area && <div style={infoStyle}><h5 style={{color:"black"}}>Area: </h5> <span>{area}</span></div>}
{plc && <div style={infoStyle}><h5 style={{color:"black"}}>PLC: </h5> <span>{plc}</span></div>}
{paymentPlan && <div style={infoStyle}><h5 style={{color:"black"}}>Payment Plan: </h5> <span>{paymentPlan}</span></div>}
{plcAmount && <div style={infoStyle}><h5 style={{color:"black"}}>PLC Amount: </h5> <span>{plcAmount}</span></div>}
{registrationAmount && <div style={infoStyle}><h5 style={{color:"black"}}>Registration Amount: </h5> <span>{registrationAmount}</span></div>}
{totalCost&& <div style={infoStyle}><h5 style={{color:"black"}}>Total Amount: </h5> <span>{totalCost}</span></div>}
{modeOfPayment && <div style={infoStyle}><h5 style={{color:"black"}}>Mode Of Payment: </h5> <span>{modeOfPayment}</span></div>}
{chequeNoDDNo && <div style={infoStyle}><h5 style={{color:"black"}}>ChequeNo: </h5> <span>{chequeNoDDNo}</span></div>}
{chequeDateDDDate && <div style={infoStyle}><h5 style={{color:"black"}}>Cheque/DD date: </h5> <span>{chequeDateDDDate}</span></div>}
{transactionId && <div style={infoStyle}><h5 style={{color:"black"}}>Transaction ID: </h5> <span>{transactionId}</span></div>}
</div>

<div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-between' }}>
<div >
<h5>
  Date: {formattedDOB1}
</h5>
</div>
<div>
<img src={sign} alt="Signature" style={{ width: '12vmax', height: '8vmax', marginTop:'1vmax' }} />
<h5>
  Applicant Signature
</h5>
</div>
</div>


                </div>

                {/* Page 2 */}
                <div className="pdf-page" ref={secondpage}>
                <h2 style={{ fontSize: '1.5vmax', fontWeight: 'bold', marginLeft:'2vmax'}}>Terms & Conditions</h2>
    <ul style={{ fontSize: '1vmax', fontWeight: 'bold' }}>
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

    <div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-between' }}>
<div >
<h5>
  Date: {formattedDOB1}
</h5>
</div>
<div>
<img src={sign} alt="Signature" style={{ width: '12vmax', height: '8vmax', marginTop:'1vmax' }} />
<h5>
  Applicant Signature
</h5>
</div>
</div>
                </div>

                {/* Page 3 */}
                <div className="pdf-page3" ref={thirdpage}>
                <h2 style={{ fontSize: '1.5vmax', fontWeight: 'bold', marginLeft:'2vmax'}}>Declaration</h2>
    <ul style={{ fontSize: '1vmax', fontWeight: 'bold' }}>
        <li>I/WE declare that I/We have read & understood the above-mentioned terms and conditions of the project and shall abide by them.</li>
        <li>The Plot/Farm Houses allotted to me by the company under the rules shall be acceptable to me/us. I/We shall have no objection.</li>
        <li>In case of cancellation of registration done by me/us, I/We shall accept the deduction made by the company as per rules.</li>
        <li>I agree that the measurement/number and area of Plot/Farm House required by me/us can vary at the time of Registry as per the Govt. Rules/Approved Map and Availability.</li>
        <li>I/We hereby declare that all information on the application form has been given by me/us and is true to the best of knowledge and belief.</li>
        <li>Note: For credit card transactions, an additional 2% fee will be applied.</li>
    </ul>

    <div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-between' }}>
<div >
<h5>
  Date: {formattedDOB1}
</h5>
</div>
<div>
<img src={sign} alt="Signature" style={{ width: '12vmax', height: '8vmax', marginTop:'1vmax' }} />
<h5>
  Applicant Signature
</h5>
</div>
</div>
                </div>
            </div>

            {/* Download Button */}
            <button className="download-btn" onClick={downloadPDF}>Download PDF</button>
        </>
    );
};

export default PdfAllot;