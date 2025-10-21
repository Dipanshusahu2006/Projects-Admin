import React, { useEffect, useState } from "react";
import '../../App.css';
import { Link } from "react-router-dom";

  

  

function Enqirylist() {
  const [Enquiryitems, setEnquiryitem] = useState([]);

  const FethEnquriries = async () => {
    try {
      const Enqiriesdata = await fetch("https://main-projectnode.vercel.app/enqury/Get");
      const Enqiriesurl = await Enqiriesdata .json();
      setEnquiryitem(Enqiriesurl.Data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    FethEnquriries ();
  }, []);


  
    
  return (
    
    <>
        <div className="Enquries">
           <h1>Enquiry List</h1>
          <div className="EnquriesList">
          <table>
            <thead>
               <tr>
        <th>Sr no.</th>
        <th>Conjumername</th>
        <th>Conjumeremail</th>
        <th>Comjumerbill</th>
        <th>conjumerphonenumber</th>
        <th>Enquary</th>
        <th>Reply</th>
       </tr>
            </thead>
            <tbody>
              {Enquiryitems.map((Enquiry, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                 <td>{Enquiry.CustomerName}</td>  
                        <td>{Enquiry.Emaileaddress}</td>  
                        <td>{Enquiry.BillNumber}</td>  
                        <td>{Enquiry.CustomerNumber}</td> 
                       <td>{Enquiry.Customerenquarirs}</td> 
                    <td>
                       <button  className="Replybuttone"><Link to={`/Enquiry-reply/${Enquiry._id}`}>Reply</Link></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
    
    </>
  )
      
    
}
export default Enqirylist