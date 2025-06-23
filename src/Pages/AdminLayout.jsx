import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Subheader Navigation */}
      <div className="mt-20 px-4 md:px-8"> {/* Add top margin to push below main navbar */}
        <div className="bg-gray-100 rounded-lg shadow p-4 md:p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Admin Panel
          </h2>

          <nav className="flex flex-wrap gap-4 text-sm">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive
                  ? 'font-semibold text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-600 hover:text-blue-600'
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/add-room"
              className={({ isActive }) =>
                isActive
                  ? 'font-semibold text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-600 hover:text-blue-600'
              }
            >
              Add Room
            </NavLink>

            <NavLink
              to="/admin/add-menu"
              className={({ isActive }) =>
                isActive
                  ? 'font-semibold text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-600 hover:text-blue-600'
              }
            >
              Add Menu
            </NavLink>

            <NavLink
              to="/admin/list-room"
              className={({ isActive }) =>
                isActive
                  ? 'font-semibold text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-600 hover:text-blue-600'
              }
            >
              List Room
            </NavLink>

            <NavLink
              to="/admin/list-menu"
              className={({ isActive }) =>
                isActive
                  ? 'font-semibold text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-600 hover:text-blue-600'
              }
            >
              List Menu
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
