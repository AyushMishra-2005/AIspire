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

function App() {

  const {authUser} = useAuth();
  console.log(authUser);

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
            <Route path='/interviewPage' element={authUser ? <InterviewPage /> : <Login />} />
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
          </Routes>
        </div>


        <Footer />
      </div>

    </>
  )
}

export default App
