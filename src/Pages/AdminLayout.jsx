import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Subheader Nav */}
      <header className="bg-white shadow p-4 md:p-6 flex flex-wrap justify-center md:justify-start gap-6">
        <h2 className="text-xl font-bold mr-8 self-center whitespace-nowrap">
          Admin Panel
        </h2>

        <nav className="flex flex-wrap gap-4">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive
                ? 'font-bold text-blue-600 border-b-2 border-blue-600 pb-1'
                : 'text-gray-700 hover:text-blue-600'
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/add-room"
            className={({ isActive }) =>
              isActive
                ? 'font-bold text-blue-600 border-b-2 border-blue-600 pb-1'
                : 'text-gray-700 hover:text-blue-600'
            }
          >
            Add Room
          </NavLink>

          <NavLink
            to="/admin/add-menu"
            className={({ isActive }) =>
              isActive
                ? 'font-bold text-blue-600 border-b-2 border-blue-600 pb-1'
                : 'text-gray-700 hover:text-blue-600'
            }
          >
            Add Menu
          </NavLink>

          <NavLink
            to="/admin/list-room"
            className={({ isActive }) =>
              isActive
                ? 'font-bold text-blue-600 border-b-2 border-blue-600 pb-1'
                : 'text-gray-700 hover:text-blue-600'
            }
          >
            List Room
          </NavLink>

          <NavLink
            to="/admin/list-menu"
            className={({ isActive }) =>
              isActive
                ? 'font-bold text-blue-600 border-b-2 border-blue-600 pb-1'
                : 'text-gray-700 hover:text-blue-600'
            }
          >
            List Menu
          </NavLink>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
