import ReactDOMClient from 'react-dom/client';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CodeCell from './components/code-cell';
const App = () => {

  return (
    <div>
      <CodeCell />
      <CodeCell />
    </div>
  );
};

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container as Element);
root.render(<App />);
