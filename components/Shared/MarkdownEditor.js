import React, { useEffect } from 'react';
import Editor from 'rich-markdown-editor';
import debounce from 'lodash/debounce';
import { useState } from 'react';

const MarkdownEditor = ({ oldValue, setMarkdownValue }) => {
  console.log(oldValue);
  const [default_value, setdefault_value] = useState(null);
  useEffect(() => {
    setdefault_value(oldValue);
  }, [oldValue]);
  return (
    default_value && (
      <div className="">
        <Editor
          className="
                    relative mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                     
                  "
          defaultValue={default_value}
          onChange={debounce((value) => {
            const text = value();
            console.log(text);
            setMarkdownValue(text);
          }, 250)}
          tooltip={'right'}
          placeholder="Write from here"
        />
      </div>
    )
  );
};

export default MarkdownEditor;
