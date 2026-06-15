import { useState } from 'react';
import { useNavigate } from 'react-router'; 
import { loginService } from '../services/api';
import './LoginForm.css';

export const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', pass: '' });
  const [verPass, setVerPass] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    try {
      const resultado = await loginService.Login(formData);
      localStorage.setItem('usuarioTickeTI', JSON.stringify(resultado.data));
      navigate('/dashboard');
    } catch (error: any) {
      alert(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Iniciar Sesión</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">E-mail</label>
          <input
            type="email"
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Contraseña</label>
          <input
            type={verPass ? "text" : "password"}
            name="pass" 
            value={formData.pass}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        
        <button type="submit" className="login-button">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};