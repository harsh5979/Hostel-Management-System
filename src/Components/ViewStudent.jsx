import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/contextapi";
import MonthlyFeeView from "./MonthlyFeeView";

const ViewStudent = ({user}) => {
  const { id } = useParams();
  const { viewStudent, studentViews, MarkFeePaid, pendingFees } = useAuth();
  // const [pendingFees, setPendingFees] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      viewStudent(id);
    }
  }, [id]);

  if (!studentViews) {
    return <div>No data found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">View Student</h1>
      <table className="min-w-full border-collapse border border-gray-200 mb-4">
        <tbody>
          {[
            ["Full Name", studentViews.fullName],
            ["Email", studentViews.email],
            ["Room Number", studentViews.roomNumber],
            ["Branch", studentViews.branch],
            ["Batch", studentViews.batch],
            ["Gender", studentViews.gender],
            ["Mobile Number", studentViews.mobileNumber],
            ["Enrollment Number", studentViews.enrollmentNumber],
          ].map(([label, value]) => (
            <tr className="border" key={label}>
              <td className="p-2 border">{label}</td>
              <td className="p-2 border">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-bold mb-4">Monthly Fees</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="border">
            <th className="p-2 border">Month</th>
            <th className="p-2 border">Fee Amount</th>
            <th className="p-2 border">Pending</th>
            <th className="p-2 border">Payment Date</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <MonthlyFeeView />
        </tbody>
      </table>

      <button
        className="bg-gray-500 text-white px-4 py-2 rounded"
        onClick={() => navigate("/admin/dashboard")}
      >
        Back to Admin Page
      </button>
    </div>
  );
};

export default ViewStudent;
