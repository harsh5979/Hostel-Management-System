import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

export const AuthContext = createContext();

export const MycontextProvide = ({ children }) => {
  const data = 1;
  const url = import.meta.env.VITE_API_URL;


  // const url = "http://localhost:3000";

  const [token, settoken] = useState(localStorage.getItem("token"));
  const [user, setuser] = useState("");
  const [allStudent, setallStudent] = useState([""]);
  const [Monthlyfee, setMonthlyfee] = useState([""]);
  const [studentView, setstudentView] = useState(null);
  const [monthlyFeeView, setmonthlyFeeView] = useState([]);

  const storeToken = (servertoken) => {
    settoken(servertoken);
    return localStorage.setItem("token", servertoken);
  };

  let islogin = !!token;
  const Logout = () => {
    settoken("");
    setuser("");
    setallStudent("");
    toast.success("Logout....");

    return localStorage.removeItem("token");
  };


  const userdata = async () => {
    try {

      const response = await fetch(`${url}/auth/api/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        // body: JSON.stringify(data),
      });
      if (response.ok) {
        const r = await response.json();

        setuser(r);
      }
    } catch (error) {}
  };
  const userStudentdata = async () => {
    try {

      const response = await fetch(`${url}/auth/api/getStudentuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        // body: JSON.stringify(data),
      });
      if (response.ok) {
        const r = await response.json();
        // console.log(r._id)

        setuser(r);
      }
    } catch (error) {}
  };
  // useEffect(() => {
  //   userdata();
  // }, [token]);

  // const userAdmin = () => {
  //   if (islogin) {
  //     const isadmin = user.isadmin === true;
  //     // console.log("Is Admin: ", isAdmin);
  //   }
  // };

  // useEffect(() => {
  //   userAdmin();
  //   userdata()
  // }, [token]);


  // admin check ......

  const userAdmin = async () => {
    if (islogin) {
      const response = await fetch(`${url}/auth/api/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      if (response.ok) {
        const r = await response.json();
        setuser(r);
        if (r.isadmin) {
          userdata();
        } else {
          userStudentdata();
        }
      } else {
        console.error("Failed to determine admin status");
      }
    }
  };

  useEffect(() => {
    userAdmin();
  }, [token]);

  // dashboard.....................................................
  const dashboard = async () => {
    const response = await fetch(`${url}/admin/dashboard/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    if (response.ok) {
      const r = await response.json();

      setstudentView(r.students);
      setmonthlyFeeView(r.monthlyFees);
    } else {
      // Handle errors here
      console.error("Failed to fetch student data");
    }
  };
  // useEffect(() => {

      
  //     dashboard();
    
  // }, []);

  // add student...............
  const addStudent = async (data) => {
    const response = await fetch(`${url}/admin/add-student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(data),
    });
    const r = await response.json();
    if (response.ok) {
      toast.success(" Student added..");

      setallStudent(r);
    }
    else{
      toast.error(r.error)
    }
  };
  // fetch all student...............
  const fetchStudent = async () => {
    const response = await fetch(`${url}/admin/add-student`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    if (response.ok) {
      const r = await response.json();
      setallStudent(r);
    } else {
      [];
    }
  };
  // useEffect(() => {
  //   fetchStudent();
  // }, [islogin]);

  // delete Student

  const deleteStudent = async (id) => {
    const r = await fetch(`${url}/admin/delete-student/${id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    const res = await r.json();
    if (r.ok) {
      toast.success(res.message);
      fetchStudent();
    }
  };

  // add-monthly-fee
  const addMonthlyFee = async (data) => {
    const response = await fetch(`${url}/admin/add-monthly-fees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(data),
    });
    const r = await response.json();
    if (response.ok) {
      toast.success(r.message, " fee added..");

      setMonthlyfee(r);
    } else {
      toast.error(r.message);
    }
  };

  // fetch -monthly -fee
  const [FeesWithPendingAmount, setFeesWithPendingAmount] = useState([""]);
  const [GrandTotal, setGrandTotal] = useState(0);
  const [ErrorMessage, setErrorMessage] = useState("");
  const fetchMonthlyFee = async () => {
    const response = await fetch(`${url}/admin/add-monthly-fees`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    if (response.ok) {
      const r = await response.json();

      setFeesWithPendingAmount(r.feesWithPendingAmount);
      setGrandTotal(r.grandTotal);
      setErrorMessage(r.errorMessage || "");
      setMonthlyfee(r);
    } else {
      [];
    }
  };

  // delete monthly-fee
  const deleteMonthlyFee = async (id) => {
    const r = await fetch(`${url}/admin/delete-monthly-fees/${id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    const res = await r.json();
    if (r.ok) {
      toast.success(res.message);
      fetchMonthlyFee();
    } else {
      toast.error(res.message);
    }
  };

  // report : generate-report
  const reportgenrate = async (month, year) => {
    const response = await fetch(
      `${url}/admin/generate-report?month=${month}&year=${year}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
    );
    // const r =await  response.json();
    if (response.ok) {
      // Convert the response to a Blob
      const blob = await response.blob();
      // Create a link element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${month}_${year}_pending_fees.xlsx`; // Adjust the file name as needed
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Report generated successfully!");
    } else {
      toast.error("Failed to generate report.");
    }
  };

  // download-all-students
  const downloadallstudents = async () => {
    const response = await fetch(`${url}/admin/download-all-students`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    // const r =await  response.json();
    if (response.ok) {
      // Convert the response to a Blob
      const blob = await response.blob();
      // Create a link element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `All_Student_Data_fees.xlsx`; // Adjust the file name as needed
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(" generated successfully!");
    } else {
      toast.error("Failed to generate .");
    }
  };
  // download-all-students
  const downloadbasicstudents = async () => {
    const response = await fetch(`${url}/admin/download-basic-students`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    // const r =await  response.json();
    if (response.ok) {
      // Convert the response to a Blob
      const blob = await response.blob();
      // Create a link element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `Basic_Student_Data_fees.xlsx`; // Adjust the file name as needed
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(" generated successfully!");
    } else {
      toast.error("Failed to generate .");
    }
  };

  // view-Student...
  const [pendingFees, setPendingFees] = useState([]);

  const [studentViews, setstudentViews] = useState(null);
  const [monthlyFeeViews, setmonthlyFeeViews] = useState([]);

  const viewStudent = async (id) => {
    const response = await fetch(`${url}/admin/view-student/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    if (response.ok) {
      const r = await response.json();

      setstudentViews(r.student);
      setmonthlyFeeViews(r.monthlyFees);
      if (r.student.pendingFees) {
        setPendingFees(Object.keys(r.student.pendingFees));
      }
    } else {
      // Handle errors here
      console.error("Failed to fetch student data");
    }
  };

  // mark fee as paid

  const MarkFeePaid = async (studentId, feekey) => {
    const response = await fetch(
      `${url}/admin/mark-fee-as-paid/${studentId}/${feekey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        // body: JSON.stringify(data),
      }
    );
    const r = await response.json();
    if (response.ok) {
      dashboard();
      toast.success(" fee paid..");
    } else {
      toast.error(error);
    }
  };

  // Dounload -Receipt
  const DownloadReceipt = async (studentId, month, year) => {
    try {
      const response = await fetch(
        `${url}/admin/download-receipt/${studentId}/${month}/${year}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
            "auth-token": token,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(`Error: ${errorText}`);
        return;
      }

      const blob = await response.blob();
      const fileName = `receipt_${studentId}_${month}_${year}.pdf`;
      saveAs(blob, fileName);
      toast.success("Receipt downloaded successfully!");
    } catch (error) {
      console.error("Error downloading the receipt:", error);
      toast.error("Failed to download the receipt.");
    }
  };

  // student - dashboard..............
  // const [dashboardStudentViews, setdashboardStudentViews] = useState(null);
  // const [DashboardMonthlyFeeViews, setmonthlyFeeViews] = useState([]);
    const fetchStudentDashboard = async (id) => {
      const response = await fetch(`${url}/student/dashboard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (response.ok) {
        const r = await response.json();

        setstudentView(r.student);
        setmonthlyFeeView(r.monthlyFees);
        if (r.student.pendingFees) {
          setPendingFees(Object.keys(r.student.pendingFees));
        }
      } else {
        // Handle errors here
        console.error("Failed to fetch student data");
      }
    };
    useEffect(() => {
      fetchStudentDashboard()
    }, []);
    

  return (
    <AuthContext.Provider
      value={{
        data,
        url,
        storeToken,
        islogin,
        Logout,
        user,
        dashboard,
        // userAdmin,
        token,
        addStudent,
        fetchStudent,
        allStudent,
        deleteStudent,
        addMonthlyFee,
        Monthlyfee,
        fetchMonthlyFee,
        FeesWithPendingAmount,
        GrandTotal,
        ErrorMessage,
        deleteMonthlyFee,
        reportgenrate,
        downloadallstudents,
        downloadbasicstudents,
        viewStudent,
        studentView,
        monthlyFeeView,
        studentViews,
        monthlyFeeViews,
        MarkFeePaid,
        pendingFees,
        DownloadReceipt,
        userdata,
        userStudentdata,
        fetchStudentDashboard,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authcontextValue = useContext(AuthContext);
  return authcontextValue;
};
