import React, { useState } from "react";
import { useAuth } from "../context/contextapi";

const MonthlyFeeView = () => {
  const {
    monthlyFeeViews,
    studentViews,
    MarkFeePaid,
    viewStudent,
    dashboard,
    DownloadReceipt,
  } = useAuth();

  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null);
  let totalFees = 0;

  const handleMarkAsPaid = async (studentId, feeKey) => {
    if (window.confirm("Are you sure you want to mark this fee as paid?")) {
      setLoading(true);
      setProcessingId(feeKey);
      try {
        await MarkFeePaid(studentId, feeKey);
        await viewStudent(studentId); // Refresh data
        await dashboard();
      } catch (error) {
        console.error("Error marking fee as paid:", error);
        // Optionally show error message
      } finally {
        setLoading(false);
        setProcessingId(null);
      }
    }
  };

  const handleDownload = async (studentId, month, year) => {
    await DownloadReceipt(studentId, month, year);
  };

  return (
    <>
      {monthlyFeeViews.map((fee, i) => {
        const feeKey = `${fee.month} ${fee.year}`;
        const isPending = studentViews.pendingFees[feeKey];
        const paymentDate = studentViews.paymentDateTime
          ? studentViews.paymentDateTime[feeKey]
          : null;
        if (isPending) {
          totalFees += fee.feeAmount;
        }

        return (
          <tr key={i} className="border">
            <td className="p-2 border">{feeKey}</td>
            <td className="p-2 border">{fee.feeAmount}</td>
            <td className="p-2 border">{isPending ? "Yes" : "No"}</td>
            <td className="p-2 border">{paymentDate || "N/A"}</td>
            <td className="p-2 border">
              <div className="flex gap-2">
                {isPending ? (
                  <button
                    className={`bg-blue-500 text-white px-2 py-1 rounded ${loading && processingId === feeKey ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handleMarkAsPaid(studentViews._id, feeKey)}
                    disabled={loading && processingId === feeKey}
                  >
                    {loading && processingId === feeKey ? 'Processing...' : 'Mark as Paid'}
                  </button>
                ) : paymentDate ? (
                  <>
                    <button
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                      disabled
                    >
                      Fees Paid
                    </button>
                    <button
                      onClick={() => handleDownload(studentViews._id, fee.month, fee.year)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Download Receipt
                    </button>
                  </>
                ) : (
                  <button
                    className="bg-gray-500 text-white px-2 py-1 rounded"
                    disabled
                  >
                    Not Applicable
                  </button>
                )}
              </div>
            </td>
          </tr>
        );
      })}

      <tr>
        <th className="p-2 border">Total Pending Fees</th>
        <td colSpan="4" className="p-2 border">
          {totalFees}
        </td>
      </tr>
    </>
  );
};

export default MonthlyFeeView;
