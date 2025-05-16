import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function AdminDashboard() {
  // Hook para la navegación
  const navigate = useNavigate();
  // Estado para almacenar la lista de administradores
  const [admins, setAdmins] = useState([]);
  // Estado para manejar la carga de datos
  const [isLoading, setIsLoading] = useState(true);
  // Estado para manejar errores
  const [error, setError] = useState('');
  // Estado para el formulario de agregar
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  // Estado para el formulario de edición
  const [isEditingAdmin, setIsEditingAdmin] = useState(false);
  // const [isDeletingAdmin, setIsDeletingAdmin] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState({
    idCard: '',
    name: '',
    password: ''
  });

  // Verificar si el usuario está autenticado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Cargar la lista de administradores
  useEffect(() => {
    fetchAdmins();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      // Realizar la solicitud al servidor para obtener la lista de administradores
      const response = await fetch(`${import.meta.env.VITE_API_URL}/Administrador`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      // Verificar si la respuesta es exitosa
      // Si la respuesta es exitosa, actualizar el estado de administradores
      if (response.ok) {
        const data = await response.json();
        setAdmins(data);
      } else if (response.status === 401 || response.status === 403) {
        // Token expirado o inválido
        localStorage.removeItem('token');
        localStorage.removeItem('idCard');
        localStorage.removeItem('admin');
        navigate('/login');
      } else {
        setError('Error al cargar los administradores');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error de conexión al servidor');
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAdmin({ ...currentAdmin, [name]: name === 'idCard' ? parseInt(value, 10) || '' : value });
  };

  const resetForm = () => {
    setCurrentAdmin({
      idCard: '',
      name: '',
      password: ''
    });
  };

  // Manejar el evento de agregar un nuevo administrador
  const handleAddAdmin = () => {
    setIsAddingAdmin(true);
    setIsEditingAdmin(false);
    resetForm();
  };

  const handleEditAdmin = (user) => {
    setCurrentAdmin({
      idCard: user.idCard,
      name: user.name,
      password: '' // No mostramos la contraseña por seguridad
    });
    setIsEditingAdmin(true);
    setIsAddingAdmin(false);
  };

  const handleDeleteAdmin = async (idCard) => {
    if (window.confirm('¿Está seguro de que desea eliminar este administrador?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/Administrador/${idCard}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });

        if (response.ok) {
          // Actualizar la lista de administradores
          fetchAdmins();
        } else if (response.status === 401 || response.status === 403) {
          // Token expirado o inválido
          localStorage.removeItem('token');
          localStorage.removeItem('idCard');
          localStorage.removeItem('name');
          navigate('/login');
        } else {
          setError('Error al eliminar el administrador');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Error de conexión al servidor');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentAdmin.idCard || !currentAdmin.name || (!isEditingAdmin && !currentAdmin.password)) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const url = isEditingAdmin 
        ? `${import.meta.env.VITE_API_URL}/Administrador/${currentAdmin.idCard}`
        : `${import.meta.env.VITE_API_URL}/Administrador/register`;
      
      // Determinar el método HTTP según si se está editando o agregando
      const method = isEditingAdmin ? 'PUT' : 'POST';
      
      // Enviar la solicitud al servidor
      const response = await fetch(url, {
        method: method,
        headers: getAuthHeaders(),
        body: JSON.stringify(currentAdmin),
      });

      if (response.ok) {
        // Actualizar la lista de administradores
        fetchAdmins();
        // Limpiar el formulario
        resetForm();
        setIsAddingAdmin(false);
        setIsEditingAdmin(false);
      } else if (response.status === 401 || response.status === 403) {
        // Token expirado o inválido
        localStorage.removeItem('token');
        localStorage.removeItem('idCard');
        localStorage.removeItem('name');
        navigate('/login');
      } else {
        const errorData = await response.text();
        setError(`Error: ${errorData}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error de conexión al servidor');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('idCard');
    localStorage.removeItem('name');
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white">
        <div className="flex items-center justify-between h-16 px-4 bg-gray-800">
          <div className="flex items-center">
            <span className="text-xl font-bold">StellarPark</span>
          </div>
        </div>
        <nav className="mt-5">
          <div className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase">
            Navegación
          </div>
          <Link to="/AdminHomeDashboard" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Inicio
          </Link>
         <Link to="/admin-dashboard" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
                 Gestion de Administradores
               </Link>
                 <Link to="/admin-dashboard" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
                 Gestion de clientes
               </Link>
          <Link to="/checkout" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Checkout
          </Link>
          <Link to="/reports" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Informes
          </Link>
          <Link to="/notifications" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Notificaciones
          </Link>
        </nav>
      </div>

      {/* Contenido principal con margen izquierdo para el sidebar */}
      <div className="ml-64 w-full">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center pb-5 border-b border-gray-200 mb-8">
            <h1 className="text-2xl font-bold text-black">Panel de Administración / Administradores</h1>
            <div className="flex items-center">
              <span className="mr-4 text-blue-900">
                Bienvenido, {localStorage.getItem('name')}
              </span>
              <button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors duration-200"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Sección de lista de administradores */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Lista de administradores */}
            <div className="bg-white shadow overflow-hidden rounded-lg">
              {/* Encabezado de la sección */}
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                {/* Título de la sección */}
                <h2 className="text-lg leading-6 font-medium text-gray-900">Lista de Administradores</h2>
                <button 
                  onClick={handleAddAdmin}
                  className="bg-blue-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors duration-200"
                >
                  Agregar Administrador
                </button>
              </div>
              
              <div className="border-t border-gray-200">
                {admins.length === 0 ? (
                  <div className="px-4 py-5 sm:p-6 text-center text-gray-500">
                    No hay administradores registrados.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cédula
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre
                          </th>
                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Correo
                          </th>
                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Numero de Telefono
                          </th>
                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Direccion
                          </th>
                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha registro
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {admins.map((admin) => (
                          <tr key={admin.idCard} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {admin.idCard}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {admin.name}
                            </td>
                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {admin.email}
                            </td>

                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {admin.phoneNumber}
                            </td>

                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {admin.direction}
                            </td>

                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {admin.registrationDate}
                            </td>
                            
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleEditAdmin(admin)}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mr-2 transition-colors duration-200"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleDeleteAdmin(admin.idCard)}
                                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition-colors duration-200"
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {(isAddingAdmin || isEditingAdmin) && (
              <div className="bg-white shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-lg leading-6 font-medium text-gray-900">
                    {isEditingAdmin ? 'Editar Administrador' : 'Agregar Administrador'}
                  </h2>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="idCard" className="block text-sm font-medium text-gray-700">
                          Cédula
                        </label>
                        <input
                          type="number"
                          name="idCard"
                          id="idCard"
                          value={currentAdmin.idCard}
                          onChange={handleInputChange}
                          disabled={isEditingAdmin}
                          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Nombre
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={currentAdmin.name}
                          onChange={handleInputChange}
                          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          {isEditingAdmin ? 'Nueva Contraseña (dejar en blanco para mantener la actual)' : 'Contraseña'}
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          value={currentAdmin.password}
                          onChange={handleInputChange}
                          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                          required={!isEditingAdmin}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center space-x-4">
                      <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors duration-200"
                      >
                        {isEditingAdmin ? 'Actualizar' : 'Guardar'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingAdmin(false);
                          setIsEditingAdmin(false);
                          resetForm();
                        }}
                        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors duration-200"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;