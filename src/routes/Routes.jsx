import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Login from "../pages/Authention/Login";
import Register from "../pages/Authention/Register";
import Home from "../pages/Home";
import PrivateRoute from '../routes/PrivateRoute'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                index: true,
                element: <PrivateRoute>
                    <Home />
                </PrivateRoute>,
            },
            {
                path: '/login',
                element: <Login />
            }, 
            {
                path: '/registration',
                element: <Register />
            },

        ]
    }
])

export default router