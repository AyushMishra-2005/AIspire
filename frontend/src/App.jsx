import './App.css'
import InterviewPage from './interview/interviewPage';
import { NavbarDemo } from './components/navBar';
import HomeComponent from './home/home';
import Footer from './components/footerComponent';
import SignupForm from './components/signUp';
import Login from './components/login';
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>

      <div className="flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 w-full z-50">
          <NavbarDemo />
        </div>

        <div className='flex flex-col items-center h-[100%] w-[100vw] bg-black'>
          <Routes>
            <Route path='/' element={<HomeComponent />} />
            <Route path='/interviewPage' element={<InterviewPage />} />
            <Route path='/signup' element={<SignupForm />} />
            <Route path='/login' element={<Login />} />
            <Route path="*" element={
              <>
                <div className='h-[100vh] w-[100vw] flex justify-center text-center items-center'>
                  <h3>Page Not Found</h3>
                </div>
              </>
            } />
          </Routes>
        </div>


        <Footer />
      </div>

    </>
  )
}

export default App
