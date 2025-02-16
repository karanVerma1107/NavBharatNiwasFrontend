import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getformbyID } from './Actions/siteActions';
import letterhead from './letterhead.png'; // Letterhead Image
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './WelcomeLetter.css'; // Import CSS file

const WelcomeLetter = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, error, draw } = useSelector(state => state.form);

    const {  
        name, 
        AdhaarNo, 
        PANno, 
        fatherName, 
        address, 
        project,
        paymentPlan,
        preference,
        plotSize,
        createdAt // Added the createdAt field
    } = draw || {};

    const [typedText, setTypedText] = useState('');
    const [imageSize, setImageSize] = useState({ width: 'auto', height: 'auto' });
    const [dateText, setDateText] = useState(''); // State for manually entering the date

    const letterRef = useRef(); // Ref for capturing the first page
    const secondPageRef = useRef(); // Ref for capturing the second page

    useEffect(() => {
        dispatch(getformbyID(id));

        // Load the letterhead image and get its actual dimensions
        const img = new Image();
        img.src = letterhead;
        img.onload = () => {
            const imgWidth = img.width;
            const imgHeight = img.height;
            const aspectRatio = imgWidth / imgHeight;

            // Convert image dimensions to viewport units dynamically
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Set the dimensions relative to viewport size
            const maxWidth = Math.min(imgWidth / viewportWidth * 100, 80); // Max 80% viewport width
            const maxHeight = maxWidth / aspectRatio;

            setImageSize({
                width: `${maxWidth}vmax`,
                height: `${maxHeight}vmax`
            });
        };
    }, [dispatch, id]);

    const [rows, setRows] = useState([]);
    
    const addRow = () => {
        setRows([...rows, { installment: "", time: "", percentage: "", amount: "" }]);
    };
    
    const deleteRow = (index) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };
    
    const handleChange = (index, field, value) => {
        const updatedRows = rows.map((row, i) =>
            i === index ? { ...row, [field]: value } : row
        );
        setRows(updatedRows);
    };

    const [text, setText] = useState("");
    const [showParagraph, setShowParagraph] = useState(false);
    const textAreaRef = useRef(null);


    const [isConfirmed, setIsConfirmed] = useState(false);
    const [managerName, setManagerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");


    const handlelineChange = (e) => {
        setText(e.target.value);
        textAreaRef.current.style.height = "auto"; // Reset height first
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px"; // Adjust height
    };

    const handleConfirm = () => {
        setShowParagraph(true);
    };

    const replaceInputsWithText = () => {
        const inputs = document.querySelectorAll('.table-iinput');
        inputs.forEach(input => {
            const span = document.createElement('span');
            span.textContent = input.value;
            span.className = input.className;
            span.style = input.style.cssText;
            input.parentNode.replaceChild(span, input);
        });
    };

    const restoreInputs = () => {
        const spans = document.querySelectorAll('.table-iinput');
        spans.forEach(span => {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = span.textContent;
            input.className = span.className;
            input.style = span.style.cssText;
            span.parentNode.replaceChild(input, span);
        });
    };

    const handleDownloadPDF = () => {
        replaceInputsWithText();
        document.querySelectorAll('.add-btn, .delete-btn, .edt-btn').forEach(btn => btn.classList.add('hidden'));
        
        const firstPage = letterRef.current;
        const secondPage = secondPageRef.current;

        html2canvas(firstPage, { scale: 2 }).then(canvas1 => {
            const imgData1 = canvas1.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;
            const imgHeight = (canvas1.height * imgWidth) / canvas1.width;

            pdf.addImage(imgData1, 'PNG', 0, 0, imgWidth, imgHeight);

            html2canvas(secondPage, { scale: 2 }).then(canvas2 => {
                const imgData2 = canvas2.toDataURL('image/png');
                pdf.addPage();
                pdf.addImage(imgData2, 'PNG', 0, 0, imgWidth, imgHeight);
                pdf.save('Welcome_Letter.pdf');
                restoreInputs();
                document.querySelectorAll('.add-btn, .delete-btn').forEach(btn => btn.classList.remove('hidden'));
            });
        });
    };

    return (
        <div className="welcome-container">
            <div ref={letterRef} 
                className="a4-paper" 
                style={{ width: imageSize.width, height: imageSize.height }}>

                {/* Manually Editable Date */}
                <div className='date'>
                    <input
                        value={dateText} 
                        onChange={(e) => setDateText(e.target.value)}
                        placeholder="Enter Date Here"
                        className="date-textarea"
                    />
                </div>

                <div className='welcome-content'>
                <p>
        Dear Mr/Mrs/Ms. <strong>{name}</strong>,
        <br /><br />
        Congratulations on your new investment in <strong>{project}</strong> at 
        <strong> Navbharat Niwas</strong>. You are among the fortunate few to secure 
        a unit at a <strong>reasonable rate</strong>, and we are honored to be part of 
        this journey with you.
        <br />
        Your <strong>{plotSize}</strong> unit has been allotted through our 
        <strong> lucky draw system</strong>, considering your <strong>preference for {preference}</strong>. 
        The <strong>payment plan</strong> ensures a <strong>smooth ownership process</strong>, making your 
        investment seamless.
        <br />
        This investment marks the beginning of a <strong>prosperous journey</strong>, and 
        we look forward to supporting you every step of the way.
        <br /><br/>
        Thank you for choosing <strong>Navbharat Niwas</strong>.
        <br /><br/>
        Basic Details:
    </p>
                </div>   
                <table className="details-table">
    <tbody>
        <tr>
            <td><strong>Client Name</strong></td>
            <td><input type="text" className="table-input" placeholder="Name" /></td>
        </tr>
        <tr>
            <td><strong>Allotted Area (Sq. Yd)</strong></td>
            <td><input type="text" className="table-input" placeholder="Area" /></td>
        </tr>
        <tr>
            <td><strong>Payment Plan</strong></td>
            <td><input type="text" className="table-input" placeholder="Plan" /></td>
        </tr>
        <tr>
            <td><strong>Basic Sales Price (Per Sq. Yd.)</strong></td>
            <td>
                <>
                    <input type="text" className="table-input small-input" placeholder="unit" />
                    <input type="text" className="table-input small-input" placeholder="total" />
                </>
            </td>
        </tr>
        <tr>
            <td><strong>EDC/IDC (Per Sq. Yd.)</strong></td>
            <td>
                <>
                    <input type="text" className="table-input small-input" placeholder="unit" />
                    <input type="text" className="table-input small-input" placeholder="total" />
                </>
            </td>
        </tr>
        <tr>
            <td><strong>PLC = 12%</strong></td>
            <td><input type="text" className="table-input" placeholder="PLC" /></td>
        </tr>
        <tr>
            <td><strong>Total Cost</strong></td>
            <td><input type="text" className="table-input" placeholder="Total" /></td>
        </tr>
    </tbody>
</table>

<div className="mini-excel-container">
      <table className="mini-excel">
        <thead>
          <tr>
            <th>Installment No</th>
            <th>Time</th>
            <th>Payment %</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                   className="table-iinput"
                   style={{height: "0.1vmax", fontSize: "0.9vmax" , fontWeight:"bolder"}}
                  value={row.installment}
                  onChange={(e) => handleChange(index, "installment", e.target.value)}
                />
              </td>
              <td>
                <input
                 className="table-iinput"
                  type="text"
                  style={{height: "0.1vmax", fontSize: "0.9vmax", fontWeight:"bolder"}}
                  value={row.time}
                  onChange={(e) => handleChange(index, "time", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                   className="table-iinput"
                  value={row.percentage}
                  style={{height: "0.1vmax", fontSize: "0.9vmax", fontWeight:"bolder"}}
                  onChange={(e) => handleChange(index, "percentage", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                   className="table-iinput"
                  value={row.amount}
                  style={{height: "0.1vmax", fontSize: "0.9vmax" , fontWeight:"bolder"}}
                  onChange={(e) => handleChange(index, "amount", e.target.value)}
                />
              </td>
              <td>
                <button className="delete-btn" onClick={() => deleteRow(index)}>Remove row</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-btn" onClick={addRow}>➕ Add Row</button>

      
    </div>

            </div>

            <div ref={secondPageRef} className="a4-paper" style={{ width: imageSize.width, height: imageSize.height }}>
            <div className="createCard"  style={{
                                    width: "100%"}}>
            <div className="inputWrapper" style={{
                                    width: "100%"}}>
                <div className="contentContainer"   style={{
                                    width: "100%"}}>
                    {!showParagraph ? (
                        <div>
                            <textarea
                                className="ending"
                                ref={textAreaRef}
                                value={text}
                                onChange={handlelineChange}
                                rows="1"
                                style={{
                                    width: "100%",
                                    minHeight: "6vmax",
                                    fontSize: "1vmax",
                                    padding: "5px",
                                    resize: "none",
                                    overflow: "hidden"
                                }}
                            />
                            <button onClick={handleConfirm}>Yes</button>
                        </div>
                    ) : (
                        <p style={{color:"black", fontSize:"1vmax"}}>{text}</p>
                    )}
                </div>
            </div>
        </div>
        <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        padding: "20px",
        fontSize: "0.9vmax",
      }}
    >
      <strong style={{ fontSize: "1.2vmax", display: "block" }}>Payment Details</strong>
      <br />
      <strong>Payment can be transferred online using the following details:</strong>
      <br />
    
      <strong>Account Name:</strong> NAVBHARAT NIWAS PRIVATE LIMITED
      <br />
      <strong>Account Number:</strong> 924020056702191
      <br />
      <strong>Bank:</strong> AXIS BANK
      <br />
      <strong>Branch:</strong> Mayur Vihar Phase-1
      <br />
      <strong>IFSC Code:</strong> UTIB0001540
      <br />
      
      <strong>Note:</strong> For credit card transactions, an additional 2% processing fee will be applied.
      <br />
      <br />
      <strong style={{ fontSize: "1.1vmax", display: "block" }}>Account Manager</strong>
      
      {isConfirmed ? (
        <>
          Your account manager is <strong>{managerName}</strong> and will be reachable at{" "}
          <strong>
            <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
          </strong>
          <br />
          <button
            onClick={() => setIsConfirmed(false)}
            style={{
              marginTop: "10px",
              padding: "5px 10px",
              cursor: "pointer",
              fontSize: "0.8vmax",
            }}
            className='edt-btn'
          >
            Edit
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter Manager Name"
            value={managerName}
            onChange={(e) => setManagerName(e.target.value)}
            style={{ marginRight: "10px", padding: "5px", fontSize: "0.8vmax" }}
          />
          <input
            type="tel"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ marginRight: "10px", padding: "5px", fontSize: "0.8vmax" }}
          />
          <button
            onClick={() => setIsConfirmed(true)}
            style={{
              padding: "5px 10px",
              cursor: "pointer",
              fontSize: "0.8vmax",
            }}
            disabled={!managerName || !phoneNumber}
          >
            Yes
          </button>
        </>
      )}
      <hr />
      <strong>With Best Regards,</strong>
      <br />
      Gaurav Gupta
      <br />
      Accounts Manager
      <br />
      Navbharat Niwas Private Limited
      <br />
      
      <strong>Website:</strong>{" "}
      <strong>
        <a href="http://www.navbharatniwas.in" target="_blank" rel="noopener noreferrer">
          www.navbharatniwas.in
        </a>
      </strong>
      <br />
      <br />
      <strong style={{ fontSize: "1.1vmax", display: "block" }}>Corporate Office</strong>
      
      Shyama Building, 3rd Floor, B-92
      <br />
      Sector 63, Noida, Gautam Buddh Nagar,
      <br />
      Uttar Pradesh, 201301
      <br />
      
      <strong>Contact No:</strong>{" "}
      <strong>
        <a href="tel:+919971488477">+91 9971488477</a>
      </strong>
    </div>
            </div>

            <button onClick={() => letterRef.current && handleDownloadPDF()} className="download-btn">
    Download PDF
</button>
        </div>
    );
};

export default WelcomeLetter;