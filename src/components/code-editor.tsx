import './code-editor.css';
import './syntax.css';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useRef } from 'react';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
  onChange(value: string): void;
  initialValue: string;
}


const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      const value: string = getValue();
      onChange(value);
    })
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );
    highlighter.highLightOnDidChangeModelContent(
      () => { },
      () => { },
      undefined,
      () => { }
    );

  };

  const onFormatClick = () => {
    // get current value from editor
    const unformatted = editorRef.current.getModel().getValue();

    //format that value
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true

    })
      .replace(/\n$/, '');

    //set formatted value back to editor
    editorRef.current.setValue(formatted);
  }
  return (
    <div className="editor-wrapper">
      <button className="button button-format is-primary is-small" onClick={onFormatClick}>Format</button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        theme="dark"
        height="500px"
        language='javascript'
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true
        }}
      />
    </div>);
};

export default CodeEditor;