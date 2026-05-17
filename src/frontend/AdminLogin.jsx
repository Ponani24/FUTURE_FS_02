import { useState } from "react";

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "123456";

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      onLogin();
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* EMAIL */}
          <div>
            <label className="block text-sm mb-1">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm mb-1">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;