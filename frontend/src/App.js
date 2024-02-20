import './App.css';
import Navbar from "../src/screen/navigation"
import { Route, Routes } from 'react-router-dom';
import AdminPrivatRouters from './admin/AdminPrivatRouters';
import CreateArticle from './admin/createArticle';
import Login from './components/login';
import Signup from './components/signup'
import HomePage from './components/home';
import Userslist from './admin/userslist'
import PrivatRouters from './components/PrivatRouters';
import Anonse from './components/Anonse'
import Profile from './components/profile'
import Message from './admin/Message';
import MessageForUsers from './components/MessageForUsers';
import UpdateUser from './admin/update'; 
import ArticleDetails from './components/ArticleDetails';
import Notifications from './components/Notifications';
import ArtclesForEachUser from './components/ArtclesForEachUser';
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
    <Route path="/components/ArticleDetails/:newsItemId" element={<ArticleDetails />} />
    <Route path="/components/Notifications" element={< Notifications/>} />
    




  
     </Route>
     admin router
     <Route path="" element={<AdminPrivatRouters />}>
     <Route path="/admin/createArticle" element={<CreateArticle />}/>

     <Route path="/userslist" element={<Userslist />}/>
     <Route path="/admin/Message"element={<Message/>}/>
     <Route path="/update/:userId" element={<UpdateUser />} />
     <Route path="/components/ArtclesForEachUser" element={<ArtclesForEachUser/>} />
     </Route>
     </Routes>
    </div>
    
  
    </>
  );
}

export default App;
