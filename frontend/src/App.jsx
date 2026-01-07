import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    numero: '',
    chavePix: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar mensagem ao digitar
    if (message.text) setMessage({ text: '', type: '' });
  };

  const formatPhone = (value) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Formata conforme o tamanho
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
                    .replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
                    .replace(/(\d{2})(\d{0,5})/, '($1) $2');
    }
    return value;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({
      ...prev,
      numero: formatted
    }));
    if (message.text) setMessage({ text: '', type: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // Remove formatação do número antes de enviar
      const cleanNumber = formData.numero.replace(/\D/g, '');
      
      const response = await axios.post('/api/pix', {
        numero: cleanNumber,
        chavePix: formData.chavePix
      });

      if (response.data.success) {
        setMessage({ 
          text: 'Dados enviados com sucesso! ✓', 
          type: 'success' 
        });
        // Limpar formulário
        setFormData({ numero: '', chavePix: '' });
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessage({ 
        text: error.response?.data?.message || 'Erro ao enviar dados. Tente novamente.', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="card">
          <h1>Cadastro de Chave PIX</h1>
          <p className="subtitle">Conecte-se conosco através do PIX</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="numero">
                Número de Telefone
              </label>
              <input
                type="tel"
                id="numero"
                name="numero"
                value={formData.numero}
                onChange={handlePhoneChange}
                placeholder="(00) 00000-0000"
                required
                maxLength={15}
              />
            </div>

            <div className="form-group">
              <label htmlFor="chavePix">
                Chave PIX
              </label>
              <input
                type="text"
                id="chavePix"
                name="chavePix"
                value={formData.chavePix}
                onChange={handleChange}
                placeholder="Digite sua chave PIX"
                required
              />
            </div>

            {message.text && (
              <div className={`message ${message.type}`}>
                {message.text}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading || !formData.numero || !formData.chavePix}
              className="submit-button"
            >
              {loading ? 'Enviando...' : 'Enviar Dados'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
