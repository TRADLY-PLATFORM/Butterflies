import React, { useEffect } from 'react';
import Editor from 'rich-markdown-editor';
import debounce from 'lodash/debounce';
import { useState } from 'react';
import styled from 'styled-components';

const MarkdownEditor = ({ oldValue, setMarkdownValue }) => {
  console.log(oldValue);
  const [default_value, setdefault_value] = useState(null);
  useEffect(() => {
    setdefault_value(oldValue);
  }, [oldValue]);
  return (
    default_value && (
      <div className="">
        <article className="prose  prose-red max-w-full	">
          <Editor
            className="event
                    relative mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200 transition  duration-700
                    hover:ring-0 hover:border-primary

                  "
            defaultValue={default_value}
            onChange={debounce((value) => {
              const text = value();
              setMarkdownValue(text);
            }, 250)}
            tooltip={'right'}
            placeholder="Write from here"
            style={{
              height: '220px',
              overflow: 'auto',
              justifyContent: 'start',
            }}
          />
        </article>
      </div>
    )
  );
};

export default MarkdownEditor;
