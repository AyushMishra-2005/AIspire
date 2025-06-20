import './App.css'
import InterviewPage from './interview/interviewPage';
import { NavbarDemo } from './components/navBar';
import HomeComponent from './home/home';
import Footer from './components/footerComponent';
import SignupForm from './components/signUp';
import Login from './components/login';
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthProvider';
import Logout from './components/logout';
import InterviewForm from './interview/interviewForm';
import useConversation from './stateManage/useConversation';
import { useEffect } from 'react';
import axios from 'axios'
import server from './environment';
import {Navigate} from 'react-router-dom';
import QuizPage from './quiz/QuizPage';
import QuizStart from './quiz/QuizeStart';

function App() {

  const {authUser, setAuthUser} = useAuth();
  const {accessInterviewPage} = useConversation();

  useEffect(() => {
    const checkSession = async () => {
      try{  
        const res = await axios.get(
          `${server}/verify-token`,
          {withCredentials : true}
        );
      }catch(err){
        localStorage.removeItem('authUserData');
        setAuthUser(null); 
      }
    }
    checkSession();
  }, []);


  return (
    <>

      <div className="flex flex-col min-h-screen">

        <Toaster
          toastOptions={{
            style: {
              zIndex: 9999,
            },
          }}
        />
        <div className="fixed top-0 left-0 w-full z-30">
          <NavbarDemo />
        </div>

        <div className='flex flex-col items-center h-[100%] w-[100vw] bg-black'>
          <Routes>
            <Route path='/' element={<HomeComponent />} />
            <Route path='/interviewPage' element={authUser && accessInterviewPage ? <InterviewPage /> : <HomeComponent />} />
            <Route path='/signup' element={authUser ? <HomeComponent />  : <SignupForm />} />
            <Route path='/login' element={authUser ? <HomeComponent /> : <Login />} />
            <Route path="*" element={
              <>
                <div className='h-[100vh] w-[100vw] flex justify-center text-center items-center'>
                  <h3>Page Not Found</h3>
                </div>
              </>
            } />
            <Route path='/logout' element={authUser? <Logout/> : <HomeComponent />}/>
            <Route path='/interviewForm' element={authUser? <InterviewForm/> : <Navigate to="/login" replace />}/>
            <Route path='/quiz' element={authUser? <QuizPage/> : <Navigate to="/login" replace />}/>
            <Route path='/quiz/start' element={authUser? <QuizStart/> : <Navigate to="/login" replace />}/>
          </Routes>
        </div>

        <Footer />
      </div>

    </>
  )
}

export default App
