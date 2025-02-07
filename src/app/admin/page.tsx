import { useRouter } from "next/router";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the email and password match
    if (email === "msyeda808@gmail.com" && password === "yourPassword") {
      // Redirect to the admin dashboard or any other page upon successful login
      router.push("/admin-dashboard");
    } else {
      // You can add an error message here if the login fails
      alert("Invalid credentials!");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
