import React from 'react';
import { AuthFormProps } from '../types';

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  buttonText,
  onSubmit,
  email,
  password,
  setEmail,
  setPassword,
  error,
  linkText,
  linkHref,
}) => {
  return (
    <div className="flex justify-center mt-60">
      <div className="max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
        <form onSubmit={onSubmit} className="bg-white shadow-md rounded-md p-8 space-y-4">
          <label className="text-sm text-gray-800" htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 h-6 p-4 m-2"
          />
          <label className="text-sm text-gray-800" htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 h-6 p-4 m-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 w-full">
            {buttonText}
          </button>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <div className="text-sm text-center mt-4">
            <a href={linkHref}>{linkText}</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
