// src/services/AuthService.js

class AuthService {
    static login(token, adminId, adminName) {
      localStorage.setItem('token', token);
      localStorage.setItem('adminId', adminId);
      localStorage.setItem('adminName', adminName);
    }
  
    static logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('adminId');
      localStorage.removeItem('adminName');
    }
  
    static isAuthenticated() {
      return !!localStorage.getItem('token');
    }
  
    static getToken() {
      return localStorage.getItem('token');
    }
  
    static getAuthHeaders() {
      const token = this.getToken();
      return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
    }
  
    static handleResponseError(response, navigate) {
      if (response.status === 401 || response.status === 403) {
        this.logout();
        navigate('/login');
        return true;
      }
      return false;
    }
  }
  
  export default AuthService;