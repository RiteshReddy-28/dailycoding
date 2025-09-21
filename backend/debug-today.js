const axios = require('axios');
(async ()=>{
  try{
    const login = await axios.post('http://localhost:5000/api/auth/login', { email: 'student@test.com', password: 'student123' });
    console.log('LOGIN:', login.data);
    const token = login.data.token || (login.data.data && login.data.data.token);
    const resp = await axios.get('http://localhost:5000/api/student/getTodayQuestion', { headers: { Authorization: `Bearer ${token}` } });
    console.log('TODAY RESPONSE:', JSON.stringify(resp.data, null, 2));
  }catch(e){
    console.error('ERR', e.response ? JSON.stringify(e.response.data, null,2) : e.message);
  }
})();
