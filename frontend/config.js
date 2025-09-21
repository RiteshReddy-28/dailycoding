// Frontend configuration for auto-deployment
const API_CONFIG = {
  // Development
  development: {
    API_BASE_URL: 'http://localhost:5000/api',
    ENVIRONMENT: 'development'
  },
  
  // Production (auto-updated during deployment)
  production: {
    API_BASE_URL: 'https://your-app-name.railway.app/api', // Update this after Railway deployment
    ENVIRONMENT: 'production'
  }
};

// Auto-detect environment
const environment = window.location.hostname === 'localhost' ? 'development' : 'production';
const config = API_CONFIG[environment];

// Export for use in other files
window.API_BASE_URL = config.API_BASE_URL;
window.ENVIRONMENT = config.ENVIRONMENT;

console.log(`🌐 Environment: ${environment}`);
console.log(`🔗 API URL: ${config.API_BASE_URL}`);