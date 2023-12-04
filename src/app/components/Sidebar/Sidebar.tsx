// components/Sidebar.tsx
"use client";
// components/Sidebar.tsx
import { useRouter } from "next/navigation";

interface SidebarProps {
  setActiveTab: (tab: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isAdmin: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  setActiveTab,
  setIsLoggedIn,
  isAdmin,
}) => {
  const router = useRouter();

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    // router.push(path);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    router.push("/LoginPage"); // Redirect to LoginPage
  };

  return (
    <nav className="bg-gray-800 h-screen w-64 fixed top-0 left-0 overflow-y-auto">
      <div className="px-10 p-4 my-[20px] text-white font-extrabold text-5xl">
        LNMIIT
      </div>
      <ul className="text-white">
        {isAdmin && (
          <li
            className="p-4 hover:bg-gray-700"
            onClick={() => handleNavigation("inventory")}
          >
            Inventory List
          </li>
        )}
        <li
          className="p-4 hover:bg-gray-700"
          onClick={() => handleNavigation("orders")}
        >
          Orders List
        </li>
        <li
          className="p-4 hover:bg-gray-700"
          onClick={() => handleNavigation("orderHistory")}
        >
          Order History
        </li>
        {isAdmin && (
          <li
            className="p-4 hover:bg-gray-700"
            onClick={() => handleNavigation("issuedItems")}
          >
            Issued Items List
          </li>
        )}
        {isAdmin && (
          <li
            className="p-4 hover:bg-gray-700"
            onClick={() => handleNavigation("users")}
          >
            Users List
          </li>
        )}
      </ul>
      <div className="flex items-center justify-center mt-8">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
