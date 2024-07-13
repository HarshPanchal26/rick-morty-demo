import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import ApiService from './Services/ApiService.ts'

  
// Enable Api Service before initializing components 
ApiService.init();

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
