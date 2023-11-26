import { Outlet } from "react-router-dom";
//import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast"
import SideBar from "./SideBar";

import { useState } from 'react'


const Layout = () => {

  const [visible, setVisible] = useState(true);

  const toggleSidebar = () => {
    setVisible(!visible);
  }

  return (
    <div className="flex">
      <div className={`${visible ? 'w-1/6' : 'w-1/12'} transition-width duration-1000 bg-bordo`}>
        <SideBar visible={visible} toggleSidebar={toggleSidebar} />
      </div>
      <div className="w-full">
        <Toaster />
        <div className="min-h-screen font-mono bg-negro p-10">
            <Outlet />
        </div>
        <Footer />
      </div>
    </div>
    )
  }
    {/* <div>
      <Toaster />
      <div className="flex h-screen">

        <SideBar />

        <div className="flex-1 p-10 ml-20 min-h-screen font-mono dark:bg-gray-900">
          <Outlet />
        </div>
      </div>
      <Footer/>
    </div> */}

export default Layout