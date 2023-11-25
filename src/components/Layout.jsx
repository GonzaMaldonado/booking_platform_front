import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast"


const Layout = () => {
  return (
    <div>
      <Toaster />
      <Header />
      <div className="min-h-screen font-mono dark:bg-gray-900">
        <Outlet />
      </div>
      <Footer/>
    </div>
  )
}

export default Layout