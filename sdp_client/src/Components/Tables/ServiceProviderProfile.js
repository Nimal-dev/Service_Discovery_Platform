import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';




function ServiceProviderProfile() {
    const [providername, setProvidername] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [authid, setAuthid] = useState("");
    const loc = useLocation();

    useEffect(() => {
      const ids = { id: loc.state.id };
      fetch("http://localhost:4000/provider/viewProfile", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ids),
      })
        .then((res) => res.json())
        .then((result) => {
          setProvidername(result.providerDetails.providername);
          setContact(result.providerDetails.contact);
          setAddress(result.providerDetails.address);
          setEmail(result.authDetails.email);
          setAuthid(result.authDetails._id); // Store auth ID for update
        });
    }, [loc.state.id]);
  return (
    <>
    <div class="col-sm-12 col-xl-6">
                        <div class="bg-secondary rounded h-100 p-4">
                            <h6 class="mb-4">My Profile</h6>
                            
                                <div class="testimonial-item text-center">
                                    {/* <img class="img-fluid rounded-circle mx-auto mb-4" src="img/testimonial-1.jpg" style={{width: "100px", height: "100px"}}/> */}
                                    <h5 class="mb-1">Client Name</h5>
                                    <p>Profession</p>
                                    <p class="mb-0">Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
                                </div>
                        </div>
                    </div>
                    </>
  )
}

export default ServiceProviderProfile;