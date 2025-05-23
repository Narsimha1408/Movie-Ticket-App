import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import ProtectedRoute from './components/RouteProtected.js';


function App() {
  //checking redux
  // const val = useSelector((state)=>state.loader.loading)
  // const vals= useSelector((state)=>state.user)
  // console.log(vals)


  return (
    <div>
        <BrowserRouter>
        
         <Routes>
      
         <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>
         <Route path='/admin' element={<ProtectedRoute><Admin/></ProtectedRoute>}/>
         <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>

       


         </Routes>
        
        </BrowserRouter>
    </div>
  );
}

export default App;