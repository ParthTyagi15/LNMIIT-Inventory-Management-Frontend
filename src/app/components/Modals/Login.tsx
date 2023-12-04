import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface LoginProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

const Login: React.FC<LoginProps> = ({ title, onClose, children }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  const handleSignIn = async () => {
    try {
      // Perform the login request using the fetch function
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      // Parse the JSON response
      const data = await response.json();

      // Check the status and update state accordingly
      if (data.status === "admin") {
        setIsAdmin(true);
        localStorage.setItem("isAdmin", "true");
      } else {
        setIsAdmin(false);
        localStorage.setItem("isAdmin", "false");
      }

      // Update local storage with user information
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("department", data.user.department);
      localStorage.setItem("userId", data.user._id);

      // Update state to reflect login status
      setIsLoggedIn(true);

      console.log(data);
    } catch (error : any) {
      toast.error("Wrong username or password",{position:"top-center",autoClose:2000,theme:"dark"})
    }
    console.log("Sign In: ", { username, password });
  };

  useEffect(() => {
    // const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === true) {
      console.log("isAdmin : " + isAdmin);
      if (isAdmin == true) {
        router.push("/pages/admin/Dashboard");
      } else {
        router.push("pages/user/Dashboard");
      }
    }
  }, [isLoggedIn,isAdmin,router]);

  const handleSignUp = () => {
    // Handle Sign Up logic with username, password, department, and name
    console.log("Sign Up: ", { username, password, department, name });
  };

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>
        </div>

        <div className="bg-white rounded-lg p-8 z-10 max-w-md w-full mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button onClick={onClose}>&times;</button>
          </div>
          {children} {/* Render Sign In or Sign Up form based on the context */}
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Additional fields for Sign Up */}
            {title === "Sign Up" && (
              <>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="department"
                  >
                    Department:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="department"
                    type="text"
                    placeholder="Enter your department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="flex items-center justify-end">
              <button
                className={`${
                  title === "Sign In"
                    ? "bg-blue-500 hover:bg-blue-700"
                    : "bg-green-500 hover:bg-green-700"
                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                type="button"
                onClick={title === "Sign In" ? handleSignIn : handleSignUp}
              >
                {title}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
