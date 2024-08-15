import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Login from "../pages/Authention/Login";
import Register from "../pages/Authention/Register";
import JobDetails from "../pages/JobDetails";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/registration',
                element: <Register />
            },
            {
                path: '/job/:id',
                element: <JobDetails />
            },

        ]
    }
])

export default router