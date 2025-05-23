import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/StellarCodeLogo.png";
import { navItems } from "../constants";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
 
  const handleLoginClientClick = () => {
    navigate('/LoginClient');
  };

     const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">StellarPark</span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center items-center space-x-8 ml-8">
            <button className="py-1 px-3 border rounded-md" onClick={handleLoginClientClick}>
              Cliente
            </button>
            
            <button className="py-1 px-3 border rounded-md" onClick={handleLoginClick}>
              Empleado
            </button>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}></button>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            
            <button className="py-2 px-1 rounded-md bg-gradient-to-r from-blue-500 to-blue-800" onClick={handleLoginClientClick}>
              Cliente
            </button>

        <div className="py-2 px-1 rounded-md bg-gradient-to-r ">   
        </div>

           
            <button className="py-2 px-1 rounded-md bg-gradient-to-r from-blue-500 to-blue-800" onClick={handleLoginClick}>
              Empleado
            </button>
           

          </div>
          
        )}
        
      </div>
    </nav>
  );
};

export default Navbar;