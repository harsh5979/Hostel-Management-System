import React, { useState } from "react";
import { useAuth } from "../context/contextapi";
import { NavLink } from "react-router-dom";

const AddMonthlyFees = ({
  feesWithPendingAmount,
  grandTotal,
  errorMessage,
}) => {
  const { addMonthlyFee,fetchMonthlyFee,deleteMonthlyFee,reportgenrate ,dashboard} = useAuth();

  const [formData, setFormData] = useState({
    month: "",
    year: new Date().getFullYear().toString(),
    feeAmount: "",
  });

  const handlereport = async(month,year)=>{
   await reportgenrate(month,year)

  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleConfirmDelete = async(e, id) => {
    e.preventDefault();
    const ComfirmDelete = confirm("Are you sure you want to delete this Fee?");
    if (ComfirmDelete) {
        await deleteMonthlyFee(id);
      console.log("Deleting fee with id:", id);

    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addMonthlyFee(formData);
    await fetchMonthlyFee();
    await dashboard();
    // console.log("Adding fee:", formData);
  };

  return (
    <div className="p-8 w-screen md:w-auto">
      <h1 className="text-2xl font-bold mb-4">Add Monthly Fees</h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="mb-8">
        <label htmlFor="month" className="block mb-2">
          Month:
        </label>
        <select
          name="month"
          value={formData.month}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        >
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month) => (
            <option value={month} key={month}>
              {month}
            </option>
          ))}
        </select>

        <label htmlFor="year" className="block mb-2">
          Year:
        </label>
        <select
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        >
          {[...Array(5)].map((_, index) => {
            const yearOption = (new Date().getFullYear() + index).toString();
            return (
              <option value={yearOption} key={yearOption}>
                {yearOption}
              </option>
            );
          })}
        </select>

        <label htmlFor="feeAmount" className="block mb-2">
          Fee Amount:
        </label>
        <input
          type="number"
          name="feeAmount"
          placeholder="Fee Amount"
          value={formData.feeAmount}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Fees
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Existing Monthly Fees</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Month</th>
            <th className="border px-4 py-2">Fee Amount</th>
            <th className="border px-4 py-2">Pending Count</th>
            <th className="border px-4 py-2">Pending Amount</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(feesWithPendingAmount) &&
          feesWithPendingAmount.length > 0 ? (
            feesWithPendingAmount.map((fee,i) => (
              <tr key={i}>
                <td className="border px-4 py-2">{`${fee.month} ${fee.year}`}</td>
                <td className="border px-4 py-2">{fee.feeAmount}</td>
                <td className="border px-4 py-2">{fee.pendingCount}</td>
                <td className="border px-4 py-2">{fee.pendingAmount}</td>
                <td className="border px-4 py-2 flex space-x-2">
                 
                    <button className="px-2 py-1  bg-green-500 text-white rounded" onClick={()=>handlereport(fee.month,fee.year)}>
                      Generate Report
                    </button>
                  
                  <form
                    onSubmit={(e) => handleConfirmDelete(e, fee._id)}
                  >
                    <button
                      type="submit"
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete Fee
                    </button>
                  </form>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data found</td>
            </tr>
          )}
          <tr className="font-bold">
            <td className="border px-4 py-2" colSpan="3">
              Grand Total:
            </td>
            <td className="border px-4 py-2">{grandTotal}</td>
            <td className="border px-4 py-2"></td>
          </tr>
        </tbody>
      </table>
      <a href="/admin/dashboard" className="removeLinkHover">
        <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded">
          Back to Admin Page
        </button>
      </a>
    </div>
  );
};

export default AddMonthlyFees;
