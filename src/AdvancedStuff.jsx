import React, { useEffect, useState } from 'react';
import './AdvancedStuff.css';
import { getIsAllowRecords, fetchAllFAQs } from './Actions/formAction';
import { useDispatch, useSelector } from 'react-redux';
import SearchAllotment from './SearchAllotment';

const AdvancedStuff = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const { isLoading, isAllowRecords, totalPages, error } = useSelector(
    (state) => state.getAllisallow
  );

  const { loading, faqs, Error } = useSelector((state) => state.getFaq);

  // Fetch records whenever `page` changes
  useEffect(() => {
    dispatch(getIsAllowRecords(page));
  }, [dispatch, page]);

  // Fetch FAQs on component mount
  useEffect(() => {
    dispatch(fetchAllFAQs());
  }, [dispatch]);

  return (
    <div className="prop">
      <h2>Form Records</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="form-list">
        {isAllowRecords &&
          isAllowRecords.map((item) => (
            <li key={item._id} className="form-item">
              <strong>Form Name:</strong> {item.formName} <br />
              <strong>Opening Date:</strong>{' '}
              {new Date(item.formOpeningDate).toLocaleDateString()}
              <a href={`/getar/${item._id}`} target="_blank" rel="noreferrer">
                View result
              </a>
            </li>
          ))}
      </ul>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span>
          {' '}
          Page {page} of {totalPages}{' '}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>

      {/* FAQs Section */}
      <div className="faqs-section">
        <h2>Frequently Asked Questions</h2>
        {loading && <p>Loading FAQs...</p>}
        {Error && <p className="error">{Error}</p>}
        <ul className="faq-list">
          {faqs &&
            faqs.map((faq) => (
              <li key={faq._id} className="faq-item">
                <p><strong>City:</strong> {faq.city}</p>
                <p><strong>Name:</strong> {faq.name}</p>
                <p><strong>Phone No:</strong> {faq.phoneNo}</p>
                <p><strong>Budget:</strong> {faq.budget}</p>
              </li>
            ))}
        </ul>
      </div>

      <SearchAllotment />
    </div>
  );
};

export default AdvancedStuff;
