const axios = require('axios');

axios.get('https://api.github.com')
  .then(res => console.log('✅ npm está funcionando!', res.status))
  .catch(err => console.error('❌ Erro:', err));