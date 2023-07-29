import React, { useState, useEffect } from 'react';
import { getReviews, deleteReviews } from '../../../api/ReviewService';
import Navbar from "../Navbar/Navbar";


const Review = () => {
  const [data, setData] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    getReviews()
      .then((res) => setData(res))
      .catch((err) => console.log(err));
    setLoader(false)
  }, []);

  const handleDelete = (item) => {
    setDeleteItem(item);
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    deleteReviews(deleteItem.id)
      .then((res) => {
        setData((prevData) => prevData.filter((item) => item.id !== deleteItem.id));
        setShowConfirmDelete(false);
      })
      .catch((err) => console.log(err));
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <>
      <Navbar />


      <h1 className="student-heading mt-20"> <i class="fa-solid fa-comment-dots"></i> Feedback </h1>

      {loader &&
        <div className='flex justify-center'>
          <div class="loadingio-spinner-double-ring-amot1w4ku1j"><div class="ldio-14cancim8ocq">
            <div></div>
            <div></div>
            <div><div></div></div>
            <div><div></div></div>
          </div></div>
        </div>}
      {!loader && <div className="overflow-x-auto">
        <table className="min-w-full divide-y text-white bg-gray-500 text-xl   divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-6   font-medium  uppercase tracking-wider">
                ID
              </th>
              <th  className="  font-medium  uppercase tracking-wider">
                Name
              </th>
              <th className="    font-medium  uppercase tracking-wider">
                Number
              </th>
              <th className="px-6 py-6    font-medium  uppercase tracking-wider">
                Email
              </th>
              <th data-testid="comments" className="px-6 py-3    font-medium  uppercase tracking-wider">
                Comments
              </th>
              <th className="px-6 py-3   font-medium  uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className='hover:bg-gray-50'>
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md font-bold text-black">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">{item.number}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">{item.email}</td>
                <td className="px-6 py-4 whitespace-wrap break-words text-md text-gray-500">{item.comments}</td>
                <td className='flex justify-center '>
                  <button
                    className="bg-red-400 text-white px-3 py-2 my-2 rounded-lg hover:bg-red-700"
                    onClick={() => handleDelete(item)}
                  >
                    <i class="fa-regular fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      }

      {/* pop up for delete */}
      {showConfirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-center text-red-500 text-lg mb-4">Confirm Delete</p>
            <p className="text-center text-gray-600 mb-4">Are you sure you want to delete this item?</p>
            <div className="flex justify-center">
              <button
                className="bg-red-400 text-white px-3 py-2 mx-2 rounded-lg hover:bg-red-700"
                onClick={confirmDelete}
              >
                Confirm
              </button>
              <button
                className="bg-gray-400 text-white px-3 py-2 mx-2 rounded-lg hover:bg-gray-700"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Review;