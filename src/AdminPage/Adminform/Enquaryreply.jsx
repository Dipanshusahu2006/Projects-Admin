import React, { useEffect, useState } from "react";
import '../../App.css';
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

function Adminreply() {
    const {id} = useParams();
  const [CustomerName, setCustomerName] = useState("");
  const [Emaileaddress, setEmaileaddress] = useState("");
  const [BillNumber, setBillNumber] = useState("");
  const [CustomerNumber, setcustomerNumber] = useState("");
  const [Adminreply, setAdminreply] = useState("");


  const Adminreplyys =(e)=>{
      e.preventDefault();
      Fetchreply()
     

  }

  useEffect(() => {
        const fetchEnquiryreply = async () => {
          const response = await fetch(`https://main-projectnode.vercel.app/enqury/Get/${id}`);
          const data = await response.json();
           const Enquryreply = data?.Data || {};
         setCustomerName(Enquryreply.CustomerName);
          setEmaileaddress(Enquryreply.Emaileaddress);
          setBillNumber(Enquryreply.BillNumber);
          setcustomerNumber(Enquryreply.CustomerNumber);
        };
        fetchEnquiryreply();
      }, [id]);
   


  async function Fetchreply() {
    const Replydata = {
      "CustomerName": CustomerName,
      "Emaileaddress": Emaileaddress,
      "BillNumber": BillNumber,
      "CustomerNumber": CustomerNumber,
      "Reply": Adminreply,
      
    };


    try {
     const Reply = await fetch("https://main-projectnode.vercel.app/adminreply/Post", {
  method: "POST",
  body: JSON.stringify(Replydata),
  headers: { "Content-Type": "application/json" },
});
      

      if (Reply.ok) {
        toast.success("Reply posted successfully");
      } else {
        toast.error("Error Reply enquiry");
      }
    } catch (error) {
      toast.error("Please try again");
      console.error(error);
    }

  }

  return (
    <>
      <Toaster />
      <div className="MAIN-Reply">
        <div className="Replyss">
          <h1> Admin Reply Form</h1>
          <form onSubmit={Adminreplyys}>
          <label>Name:</label>
          <input
            value={CustomerName}
            type="text"
            placeholder="Customer name"
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
          <br />
          <br />
          <label>Email address:</label>
          <input
            value={Emaileaddress}
            type="email"
            placeholder="Mail@example.com"
            onChange={(e) => setEmaileaddress(e.target.value)}
            required
          />
          <br />
          <br />
          <label>Bill Number:</label>
          <input
            value={BillNumber}
            type="text"
            placeholder="Bill Number"
            onChange={(e) => setBillNumber(e.target.value)}
            required
          />
          <br />
          <br />
          <label>Phone Number:</label>
          <input
            value={CustomerNumber}
            type="number"
            placeholder="Customer Phone Number"
            onChange={(e) => setcustomerNumber(e.target.value)}
            required
          />
          <br />
          <br />
          <label >Reply:</label>
          <textarea
            id="Customerenquarirs"
            value={Adminreply}
            placeholder="Your Reply"
            onChange={(e) => setAdminreply(e.target.value)}
            required
          ></textarea>
          <br />
          <br />
          <button className="button1" type="submit">
            Reply
          </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Adminreply;
