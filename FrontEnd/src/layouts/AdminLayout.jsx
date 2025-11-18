import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../Components/layoutComponents/AdminHeader";
import AdminSidebar from "../Components/layoutComponents/AdminSidebar";

function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <AdminHeader setSidebarOpen={setSidebarOpen} />
            
            <div className="flex">
                {/* Sidebar */}
                <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                
                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;