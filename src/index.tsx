import ReactDOMClient from 'react-dom/client';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import TextEditor from './components/text-editor';

const App = () => {

  return (
    <div>
      <TextEditor />
    </div>
  );
};

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container as Element);
root.render(<App />);
