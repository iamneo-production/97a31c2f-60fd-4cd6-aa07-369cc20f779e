import React, { useState,useEffect } from 'react';
import { getReviews,deleteReviews } from '../../../api/ReviewService';
import Navbar from "../Navbar/Navbar";


const Review = () => {
  const [data, setData] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  useEffect(() => {
    getReviews()
      .then((res) => setData(res))
      .catch((err) => console.log(err));
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

      <h3 className="text-3xl text-green-800 font-bold p-3 mb-4 text-center">Platform Feedback By Users</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Number
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Comments
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.number}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                <td className="px-6 py-4 whitespace-wrap break-words text-sm text-gray-500">{item.comments}</td>
                <td>
                  <button
                    className="bg-red-400 text-white px-3 py-2 my-2 rounded-lg hover:bg-red-700"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
