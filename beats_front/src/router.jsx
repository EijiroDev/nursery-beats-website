import { Navigate, createBrowserRouter } from 'react-router-dom'
import LoginLayout from './Layouts/LoginLayout';
import Login from './Pages/Landing/Login';
import Signup from './Pages/Landing/Signup';
import StudentLayout from './Layouts/StudentLayout';
import AdminLayout from './Layouts/AdminLayout';
import TeacherLayout from './Layouts/TeacherLayout';
import NotFound from './Pages/ErrPages/NotFound';
import About from './Pages/GeneralPages/About';
import Download from './Pages/GeneralPages/Download';
import Features from './Pages/GeneralPages/Features';
import Home from './Pages/StudentPages/Home';
import News from './Pages/GeneralPages/News';
import TeacherDashboard from './Pages/TeacherPages/TeacherDashboard';
import AdminDashboard from './Pages/AdminPages/AdminDashboard';
import UserDashboard from './Pages/StudentPages/UserDashboard';

const router = createBrowserRouter([

    //DEFAULT LAYOUTS SUCH AS LOGIN & SIGN UP
    {
        path: '/',
        element: <LoginLayout />,
        children: [

            {
                path: '/',
                element: <Navigate to="/login" />
            },

            {
                path: '/login',
                element: <Login />
            },

            {
                path: '/signup',
                element: <Signup />
            },

        ],
    },

    //STUDENT ROUTINGS
    {
        path: '/',
        element: <StudentLayout />,
        children: [

            {
                path: '/user-dashboard',
                element: <UserDashboard />
            },

            {
                path: '/home',
                element: <Home />
            },

            {
                path: '/about',
                element: <About />
            },

            {
                path: '/download',
                element: <Download />
            },

            {
                path: '/features',
                element: <Features />
            },

            {
                path: '/news',
                element: <News />
            },

            {
                path: 'student-dashboard',
            }

        ],
    },

    //ADMIN ROUTINGS
    {
        path: '/',
        element: <AdminLayout />,
        children: [

            {
                path: 'admin-dashboard',
                element: <AdminDashboard />
            },
        ],
    },

    //TEACHER ROUTINGS
    {
        path: '/',
        element: <TeacherLayout />,
        children: [

            {
                path: '/teacher-dashboard',
                element: <TeacherDashboard />
            },

        ],
    },

    //GENERAL PAGE MEANING KAHIT WALANG SESSION OKAY LANG MAVISIT
    // {
    //     path: '/about',
    //     element: <About/>
    // },

    // {
    //     path: '/download',
    //     element: <Download/>
    // },

    // {
    //     path: '/features',
    //     element: <Features/>
    // },

    //VALIDATION IF WALANG ROUTE NA NADEFINE AND NAG TYPE LANG NG RANDOM SHITS
    {
        path: '*',
        element: <NotFound />

    }

]);

export default router