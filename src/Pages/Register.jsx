import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [emailOtp, setEmailOtp] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendEmailOtp = async () => {
    setError('');
    if (!formData.email) return setError('Enter an email first');
    try {
      const res = await fetch('https://coralcreek-backend-production.up.railway.app/api/auth/send-email-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      if (!res.ok) throw new Error('Failed to send email OTP');
      setEmailSent(true);
      setEmailVerified(false);
      setOtpTimer(120);
      setSuccess('Email OTP sent.');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    let timer;
    if (otpTimer > 0) {
      timer = setInterval(() => setOtpTimer(t => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [otpTimer]);

  const verifyEmailOtp = async () => {
    setError('');
    if (!emailOtp) return setError('Enter email OTP');
    try {
      const res = await fetch('https://coralcreek-backend-production.up.railway.app/api/auth/verify-email-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: emailOtp })
      });
      if (!res.ok) throw new Error('Invalid email OTP');
      setEmailVerified(true);
      setSuccess('Email verified.');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!/(?=.*[!@#$%^&*])(?=.{8,})/.test(formData.password)) {
      return setError('Password must be at least 8 characters and include one special character');
    }

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }

    if (!emailVerified) {
      return setError('Please verify your email before registering.');
    }

    try {
      const res = await fetch('https://coralcreek-backend-production.up.railway.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, emailVerified: true })
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(data.error || 'Registration failed.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg mt-20 mb-20 p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
            <div className="mt-2 flex gap-2">
              <button type="button" onClick={sendEmailOtp}
                className="bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-50"
                disabled={otpTimer > 0}
              >
                {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : 'Send Email OTP'}
              </button>
              {emailSent && !emailVerified && (
                <button type="button" onClick={verifyEmailOtp}
                  className="bg-green-600 text-white px-4 py-1 rounded"
                >
                  Verify Email OTP
                </button>
              )}
            </div>
            {emailSent && !emailVerified && (
              <input type="text" placeholder="Enter email OTP" value={emailOtp} onChange={e => setEmailOtp(e.target.value)}
                className="mt-2 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
            )}
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Mobile Number</label>
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="10-digit mobile number" />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} required
                className="w-full border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-black" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black">
                {showPassword ? '👁️' : '🙈'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Confirm Password</label>
            <div className="relative">
              <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required
                className="w-full border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-black" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black">
                {showConfirmPassword ? '👁️' : '🙈'}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition-all"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <span className="text-blue-600 hover:underline cursor-pointer" onClick={() => navigate('/login')}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
