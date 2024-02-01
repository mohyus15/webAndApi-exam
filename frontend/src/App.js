import './App.css';
import Navbar from "../src/screen/navigation"
import Footer from './components/footer';
import { Route, Routes } from 'react-router-dom';
import AdminPrivatRouters from './admin/AdminPrivatRouters'
import CreateProduct from './admin/createProduct'
import Login from './components/login'
import Register from './components/register'
import HomePage from './components/home';
import Userslist from './admin/userslist'
import ProductListAdmin from './admin/productListAdmin';
import Chatbox from './admin/chatbox';
import PrivatRouters from './components/PrivatRouters';
import Anonse from './components/Anonse'
import Chat from './components/chat';

function App() {
  return (
    <>
      <Navbar/> 
     <div className="App">
     <Routes>
     <Route path="/" element={<HomePage />}/>

     <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Register />}/>

     private router
     <Route path="" element={<PrivatRouters />}>
     <Route
								path="/components/Anonse"
								element={<Anonse />}
							/>
<Route
								path="/components/chat"
								element={<Chat/>}
							/>


     </Route>

     admin router
     <Route path="" element={<AdminPrivatRouters />}>
     <Route path="/admin/createProduct" element={<CreateProduct />}/>

     <Route path="/userslist" element={<Userslist />}/>
     <Route path="/productListAdmin" element={<ProductListAdmin />}/>
     <Route path="/admin/chatbox" element={<Chatbox />}/>

     </Route>
  

     </Routes>
    </div>
    
    <Footer />
    </>
  );
}

export default App;
