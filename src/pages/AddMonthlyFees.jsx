import React, { useEffect } from "react";
import AddMonthlyfeeComponet from "../Components/AddMonthlyfeeComponet";
import { useAuth } from "../context/contextapi";

const AddMonthlyFees = () => {
  const { FeesWithPendingAmount, fetchMonthlyFee, GrandTotal, ErrorMessage } = useAuth();
  // const feesWithPendingAmount = [
  //   // Your fees data here
  // ];
  // const grandTotal = 0; // Example grand total
  // const errorMessage = "";

  useEffect(() => {
    fetchMonthlyFee();
  }, []);

  return (
    <div>
      <AddMonthlyfeeComponet
        feesWithPendingAmount={FeesWithPendingAmount}
        grandTotal={GrandTotal}
        errorMessage={ErrorMessage}
      />
    </div>
  );
};

export default AddMonthlyFees;
