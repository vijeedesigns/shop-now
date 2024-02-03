import "./App.scss";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/layout";
import PageDashboard from "./pages/dashboard";
import PageUsers from "./pages/users";
import PagePurchases from "./pages/purchases";
import PageProducts from "./pages/products/index.tsx";
import PageLogin from "./pages/login";
import PageSignup from "./pages/signup";
import { useEffect, useState } from "react";

function App() {
    const [authorized, setAuthorized] = useState(false);
    const { userDetails, jwt } = useSelector(state => state?.auth);

    useEffect(() => {
        if(userDetails && jwt && userDetails !== '' && jwt !== '') {
            setTimeout(() => {
                setAuthorized(true);
            },1);
        } else {
            setAuthorized(false);
        }
    }, [userDetails, jwt]);

    return (
        <BrowserRouter basename="shop-now">
            <Routes>
                {authorized ? <>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<PageProducts />} />
                        {userDetails?.type === 1 ? <Route path="users" element={<PageUsers />} /> : null}
                        <Route path="purchases" element={<PagePurchases />} />
                        <Route path="products" element={<PageDashboard />} />
                    </Route>
                </> : <>
                    <Route path="/signup" element={<PageSignup />} />
                    <Route path="/" element={<PageLogin />} />
                </>}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
