import React, { useState,useEffect } from 'react';
import { getReviews } from '../../../api/ReviewService';
import Navbar from '../../Navbar/Navbar';

const Review = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getReviews()
    .then((res) => setData(res) )
    .catch((err) => console.log(err) )
  }, [])
  

    
  return (
  <>
      <Navbar/>

      <h3 className="text-3xl text-green-800 font-bold p-3 mb-4 text-center">Platform Feedback By Users</h3>

      <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th data-testid="userName" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Number
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th data-testid="comments" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Comments
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
  );

};
  
export default Review;