import './App.css';
import Navbar from "../src/screen/navigation"
import { Route, Routes } from 'react-router-dom';
import AdminPrivatRouters from './admin/AdminPrivatRouters'
import CreateProduct from './admin/createProduct'
import Login from './components/login'
import Signup from './components/signup'
import HomePage from './components/home';
import Userslist from './admin/userslist'
import ProductListAdmin from './admin/productListAdmin';
import PrivatRouters from './components/PrivatRouters';
import Anonse from './components/Anonse'
import Profile from './components/profile'
import Message from './admin/Message';
import MessageForUsers from './components/MessageForUsers';
import UpdateUser from './admin/update'; 

function App() {
  return (
    <>
      <Navbar/> 
     <div className="App">
     <Routes>
     <Route path="/" element={<HomePage />}/>

     <Route path="/login" element={<Login />} />
     <Route path="/signup" element={<Signup/>}/>

     private router
     <Route path="" element={<PrivatRouters />}>
     <Route path="/components/Anonse" element={<Anonse />}/>
    <Route path="/components/profile"element={<Profile/>}/>
    <Route path="/components/MessageForUsers"element={<MessageForUsers/>}/>


   


     </Route>

     admin router
     <Route path="" element={<AdminPrivatRouters />}>
     <Route path="/admin/createProduct" element={<CreateProduct />}/>

     <Route path="/userslist" element={<Userslist />}/>
     <Route path="/productListAdmin" element={<ProductListAdmin />}/>
     <Route path="/admin/Message"element={<Message/>}/>
     <Route path="/update/:userId" element={<UpdateUser />} />

     
     </Route>
  

     </Routes>
    </div>
    
  
    </>
  );
}

export default App;
