import React, { useEffect, useState } from "react";
import { useAuth } from "../context/contextapi";
import { NavLink } from "react-router-dom";

const StudentDashboard = () => {
  const [totalFees, setTotalFees] = useState(0);
  const [grandTotalMessage, setGrandTotalMessage] = useState([]);
  const {
    studentView,
    monthlyFeeView,
    pendingFees,
    fetchStudentDashboard,
    DownloadReceipt,
  } = useAuth();

  useEffect(() => {
    fetchStudentDashboard();

    let total = 0;
    let messages = [];

    monthlyFeeView.forEach((fee) => {
      const feeKey = `${fee.month} ${fee.year}`;
      if (studentView.pendingFees[feeKey]) {
        if (studentView.pendingFees[feeKey]) {
          total += fee.feeAmount;
          messages.push(feeKey);
        }
      }
    });

    setTotalFees(total);
    setGrandTotalMessage(messages);
  }, []);

  const handleDownload = async (studentId, month, year) => {
    await DownloadReceipt(studentId, month, year);
  };
  if (!studentView) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Not Found</h1>
      </div>
    );
  }


  return (
    <div className="min-h-screen p-6 w-full">
      <header className="mb-4">
        <h1 className="text-3xl font-bold text-center">View student</h1>
      </header>

      <table className="min-w-full border-collapse border border-gray-200 mb-4">
        <thead>
          <tr>
            <th className="p-2 border">Field</th>
            <th className="p-2 border">Value</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Full Name", studentView.fullName],
            ["Email", studentView.email],
            ["Room Number", studentView.roomNumber],
            ["Branch", studentView.branch],
            ["Batch", studentView.batch],
            ["Gender", studentView.gender],
            ["Mobile Number", studentView.mobileNumber],
            ["Enrollment Number", studentView.enrollmentNumber],
          ].map(([label, value]) => (
            <tr className="border" key={label}>
              <td className="p-2 border">{label}</td>
              <td className="p-2 border">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-2xl font-semibold mb-4">Monthly Fees</h2>
      <table className="min-w-full border-collapse border border-gray-200 mb-4">
        <thead>
          <tr>
            <th className="p-2 border">Month</th>
            <th className="p-2 border">Fee Amount</th>
            <th className="p-2 border">Pending</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {monthlyFeeView.map((fee, index) => {
            const feeKey = `${fee.month} ${fee.year}`;
            const isPending = studentView.pendingFees[feeKey];
            const paymentDate = studentView.paymentDateTime[feeKey];

            return (
              <tr className="border" key={index}>
                <td className="p-2 border">{feeKey}</td>
                <td className="p-2 border">{fee.feeAmount}</td>
                <td className="p-2 border">{isPending ? "Yes" : "No"}</td>
                <td className="p-2 border">
                  <div className="flex gap-2">
                    {isPending ? (
                      <a
                        href={`upi://pay?pa=resm7848@paytm&pn=RESMIT%20DHOLARIYA&cu=INR&am=${fee.feeAmount}&tn=${feeKey}`}
                      >
                        <button className="bg-blue-500 text-white px-2 py-1 rounded">
                          Pay Now
                        </button>
                      </a>
                    ) : (
                      <>
                        {paymentDate ? (
                          <>
                            <button
                              className="bg-gray-500 text-white px-2 py-1 rounded"
                              disabled
                            >
                              Fees Paid
                            </button>
                            <button
                              onClick={() =>
                                handleDownload(
                                  studentView._id,
                                  fee.month,
                                  fee.year
                                )
                              }
                              className="bg-green-500 text-white px-2 py-1 rounded"
                            >
                              Download Receipt
                            </button>
                          </>
                        ) : null}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
          <tr className="font-bold">
            <td className="p-2 border">Total Pending Fees</td>
            <td colSpan="2" className="p-2 border">
              {totalFees}
            </td>
            <td className="p-2 border">
              {totalFees > 0 && (
                <NavLink
                  to={`upi://pay?pa=resm7848@paytm&pn=RESMIT%20DHOLARIYA&cu=INR&am=${totalFees}&tn=${grandTotalMessage.join(
                    "%2C%20"
                  )}`}
                >
                  <button className="bg-red-500 text-white px-2 py-1 rounded">
                    Pay Grand Total
                  </button>
                </NavLink>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <footer className="mt-6">
        <div className="flex justify-start">
          <NavLink to="/logout">
            <button className="bg-red-500 text-white px-4 py-2 rounded">
              Logout
            </button>
          </NavLink>
        </div>
      </footer>
    </div>
  );
};

export default StudentDashboard;
