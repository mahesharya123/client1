import React, { useEffect, useState } from 'react';

const Account = () => {
  const [user, setUser] = useState(null);
  const [mobile, setMobile] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setMobile(parsedUser.mobile);
    }
  }, []);

  const clearMessages = () => {
    setMessage('');
    setError('');
  };

  const handleMobileUpdate = async () => {
    clearMessages();
    try {
      const res = await fetch('https://coralcreek-backend-production.up.railway.app/api/users/update-mobile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ mobile }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.error);
      setMessage('Mobile number updated successfully');
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  const handlePasswordReset = async () => {
    clearMessages();

    if (!currentPassword) return setError('Enter your current password');
    if (newPassword !== confirmPassword) return setError('Passwords do not match');

    if (!/(?=.*[!@#$%^&*])(?=.{8,})/.test(newPassword)) {
      return setError('Password must be 8+ characters and contain one special character');
    }

    try {
      const res = await fetch('https://coralcreek-backend-production.up.railway.app/api/users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ current: currentPassword, newPass: newPassword }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.error);
      setMessage('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Failed to reset password');
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;

    try {
      const res = await fetch('https://coralcreek-backend-production.up.railway.app/api/users/delete', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.ok) {
        localStorage.clear();
        window.location.href = '/register';
      } else {
        setError('Failed to delete account');
      }
    } catch {
      setError('Error deleting account');
    }
  };

  if (!user) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Account Settings</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {message && <p className="text-green-500 mb-2">{message}</p>}

      <div className="space-y-4">
        <div>
          <label className="block font-medium">Full Name</label>
          <input value={user.name} disabled className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input value={user.email} disabled className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Mobile</label>
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button
            onClick={handleMobileUpdate}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Mobile
          </button>
        </div>

        <div>
          <label className="block font-medium">Current Password</label>
          <input
            type={showPasswords ? 'text' : 'password'}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <label className="block font-medium mt-2">New Password</label>
          <input
            type={showPasswords ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <label className="block font-medium mt-2">Confirm Password</label>
          <input
            type={showPasswords ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <div className="mt-1">
            <label className="text-sm">
              <input
                type="checkbox"
                checked={showPasswords}
                onChange={() => setShowPasswords(!showPasswords)}
                className="mr-1"
              />
              Show Passwords
            </label>
          </div>

          <button
            onClick={handlePasswordReset}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
          >
            Reset Password
          </button>
        </div>

        <button
          onClick={handleDeleteAccount}
          className="bg-red-600 text-white px-4 py-2 rounded mt-4"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Account;
