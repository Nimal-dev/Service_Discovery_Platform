import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import SigninPage from "./Components/Auth/SignIn";
import Signup from "./Components/Auth/SignUp"; 
import AdminHome from "./Components/Home/adminHome";
import ProviderSignUp from "./Components/Auth/ProviderSignUp";
import ProviderHome from "./Components/Home/providerHome";
import AddCategory from "./Components/Forms/AddCategory";
import EditCategory from "./Components/Tables/EditCategory";
import AddProvider from "./Components/Forms/AddProvider";
import EditProvider from "./Components/Forms/EditProvider";
import AddService from "./Components/Forms/AddService";
import EditService from "./Components/Forms/EditService";
import CustomerHome from "./Components/Home/customerHome";

function App() {
  return (
    <BrowserRouter>
    <Routes>


{/* -----------------Auth Route Start------------------------ */}

      <Route path="/" element={<SigninPage/>}/>
      <Route path="/Signup" element={<Signup/>}/>
      <Route path="/ProviderSignup" element={<ProviderSignUp/>}/>

{/* -----------------Auth Route End------------------------ */}
      <Route path="/AddCategory" element={<AddCategory/>}/>
      <Route path="/EditCategory" element={<EditCategory/>}/>

      {/* <Route path="/UserHome" element={<UserHome/>}/>


      <Route path="/AddState" element={<AddState/>}/>
      <Route path="/EditState" element={<EditState/>}/> */}


{/* -------------------------------------Home Page Routes----------------------------- */}
<Route path="/AdminHome" element={<AdminHome/>}/>
<Route path="/ServiceProviderHome" element={<ProviderHome/>}/>
<Route path="/CustomerHome" element={<CustomerHome/>}/>
      {/* 
      <Route path="/StateHome" element={<StateHome/>}/>
      />
      <Route path="/UserHome" element={<UserHome/>}/> */}

{/* -------------------------------------Home Page Routes----------------------------- */}
<Route path="/AddProvider" element={<AddProvider/>}/>
<Route path="/EditProvider" element={<EditProvider/>}/>
<Route path="/EditService" element={<EditService/>}/>
<Route path="/AddService" element={<AddService/>}/>
{/* 
      <Route path="/VolunteerSignup" element={<VolunteerSignUp/>}/>
      <Route path="/AddVolunteer" element={<AddVolunteer/>}/>
      <Route path="/EditVolunteer" element={<EditVolunteer/>}/>
      <Route path="/SOSPage" element={<SOSPage/>}/>

    
    
      <Route path="/HelpRequests" element={<HelpRequestList/>} />
      <Route path="/ResourceRequests" element={<ResourceRequestList/>} /> */}




    </Routes>
    </BrowserRouter>
  );
}

export default App;
