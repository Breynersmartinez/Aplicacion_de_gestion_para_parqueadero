// src/services/AuthService.js

class AuthService {
    static login(token, idCard, name) {
      localStorage.setItem('token', token);
      localStorage.setItem('idCard', idCard);
      localStorage.setItem('name', name);
    }
  
    static logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('idCard');
      localStorage.removeItem('name');
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