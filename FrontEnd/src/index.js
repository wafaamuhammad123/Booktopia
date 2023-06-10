import ReactDom from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
let root = ReactDom.createRoot(document.getElementById('root'))

root.render(<App/>);