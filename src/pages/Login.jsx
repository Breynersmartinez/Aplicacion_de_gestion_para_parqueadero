import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/StellarCodeLogo.jpg";

function Login() {
  const navigate = useNavigate();
  const [idCard, setIdCard] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/Administrador/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idCard: parseInt(idCard),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Guardar el token JWT y la información del administrador
        localStorage.setItem('token', data.token);
        localStorage.setItem('idCard', data.user.idCard);
        localStorage.setItem('name', data.user.name);
        navigate('/admin-dashboard');
      } else {
        setError(data.message || "Credenciales incorrectas. Por favor, inténtelo de nuevo.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error de conexión con el servidor. Por favor, inténtelo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  // Comprobar si el usuario ya está autenticado
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-00 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-black p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <img className="h-20 w-auto mb-4" src={logo} alt="Logo" />
          <h2 className="text-center text-2xl font-bold text-white">
            Iniciar Sesión
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="idCard" className="block text-sm font-medium text-gray-200 mb-1">
                Cedula
              </label>
              <input
                id="idCard"
                name="idCard"
                type="number"
                required
                value={idCard}
                onChange={(e) => setIdCard(e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Ingrese su cédula"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Ingrese su contraseña"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 text-sm font-medium rounded-md text-white ${
                isLoading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;