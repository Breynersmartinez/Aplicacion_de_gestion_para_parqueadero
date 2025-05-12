import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  const [isEditingAdmin, setIsEditingAdmin] = useState(false);
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/Administrador`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        setAdmins(data);
      } else if (response.status === 401 || response.status === 403) {
        // Token expirado o inválido
        localStorage.removeItem('token');
        localStorage.removeItem('adminId');
        localStorage.removeItem('adminName');
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

  const handleAddAdmin = () => {
    setIsAddingAdmin(true);
    setIsEditingAdmin(false);
    resetForm();
  };

  const handleEditAdmin = (admin) => {
    setCurrentAdmin({
      idCard: admin.idCard,
      name: admin.name,
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
          localStorage.removeItem('adminId');
          localStorage.removeItem('adminName');
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
      
      const method = isEditingAdmin ? 'PUT' : 'POST';
      
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
        localStorage.removeItem('adminId');
        localStorage.removeItem('adminName');
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
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminName');
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
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center pb-5 border-b border-gray-200 mb-8">
        <h1 className="text-2xl font-bold text-blue-900">Panel de Administración / Administradores</h1>
        <div className="flex items-center">
          <span className="mr-4 text-gray-700">
            Bienvenido, {localStorage.getItem('adminName')}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Lista de Administradores</h2>
            <button 
              onClick={handleAddAdmin}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors duration-200"
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
  );
}

export default AdminDashboard;