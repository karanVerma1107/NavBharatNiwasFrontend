import React, { useEffect, useState } from 'react';
import './AdvancedStuff.css';
import { getIsAllowRecords } from './Actions/formAction';
import { useDispatch, useSelector } from 'react-redux';

const AdvancedStuff = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const { isLoading, isAllowRecords, totalPages, error } = useSelector(
    (state) => state.getAllisallow
  );

  // Fetch records whenever `page` changes
  useEffect(() => {
    dispatch(getIsAllowRecords(page));
  }, [dispatch, page]);

  return (
    <div className="prop">
      <h2>Form Records</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="form-list">
        {isAllowRecords &&
          isAllowRecords.map((item) => (
            <li key={item._id} className="form-item" >
              <strong>Form Name:</strong> {item.formName} <br />
              <strong>Opening Date:</strong> {new Date(item.formOpeningDate).toLocaleDateString()}
              <a href={`/getar/${item._id}`} target='_blank'>View result</a>
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
        <span> Page {page} of {totalPages} </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdvancedStuff;
