import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/StellarCodeLogo.png";

function ClientSignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    idCard: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    direction: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validaciones básicas
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    // Validar longitud mínima de contraseña
    if (formData.password.length < 3) {
      setError('La contraseña debe tener al menos 3 caracteres');
      setIsLoading(false);
      return;
    }

    // Crear objeto para enviar al backend con role: "USER"
    const registrationData = {
      idCard: parseInt(formData.idCard),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      direction: formData.direction,
      role: "USER" // Siempre registrar como USER
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        setSuccess('Registro exitoso. Redirigiendo al inicio de sesión...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.message || "Error al registrar. Por favor, inténtelo de nuevo.");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      setError("Error de conexión con el servidor. Por favor, inténtelo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-black p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <img className="h-20 w-auto mb-4" src={logo} alt="Logo" />
          <h2 className="text-center text-2xl font-bold text-white">
            Crear Cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Regístrate para acceder a nuestros servicios
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Identificación */}
            <div>
              <label htmlFor="idCard" className="block text-sm font-medium text-gray-200 mb-1">
                Número de Identificación
              </label>
              <input
                id="idCard"
                name="idCard"
                type="number"
                required
                value={formData.idCard}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Ingrese su número de identificación"
              />
            </div>
            
            {/* Nombre */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
                Nombre Completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Ingrese su nombre completo"
              />
            </div>
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="ejemplo@correo.com"
              />
            </div>
            
            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength="3"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Mínimo 3 caracteres"
              />
            </div>
            
            {/* Confirmar Contraseña */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-1">
                Confirmar Contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength="3"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Confirme su contraseña"
              />
            </div>
            
            {/* Teléfono */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-200 mb-1">
                Número de Teléfono
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Ingrese su número telefónico"
              />
            </div>
            
            {/* Dirección */}
            <div>
              <label htmlFor="direction" className="block text-sm font-medium text-gray-200 mb-1">
                Dirección
              </label>
              <input
                id="direction"
                name="direction"
                type="text"
                required
                value={formData.direction}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Ingrese su dirección"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md">
              <p className="text-sm">{success}</p>
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
              {isLoading ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handleGoLogin}
              className="text-blue-400 hover:text-blue-300 text-sm"
              type="button"
            >
              ¿Ya tienes cuenta? Iniciar sesión
            </button>
            
            <button
              onClick={handleGoHome}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition text-sm"
              type="button"
            >
              Volver a inicio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClientSignUp;