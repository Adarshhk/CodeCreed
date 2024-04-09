import React, { useRef, useState } from 'react'
import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-dracula";

const CodeEditor = ({driverCode , setDriverCode}) => {
  
  return (
    <div className='border- rounded-sm border-gray-800 h-[80vh]'>
      <AceEditor
        height="100%"
        width='100%'
        value={driverCode}
        onChange={(value) => {setDriverCode(value)}}
        mode="c_cpp"
        theme="dracula"
        fontSize="20px"
        highlightActiveLine={true}
        setOptions={{
          
          showLineNumbers: true,
          tabSize: 3
        }}
      />
    </div>
  )
}

export default CodeEditor