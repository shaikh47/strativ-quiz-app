import * as React from 'react';
import { useState, useRef } from 'react';
import clsx from 'clsx';
import useAutosizeTextArea from './useAutosizeTextArea';

const variants = {
  transparentFullWidth: 'bg-transparent text-white',
};

export type TextInputProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  variant?: keyof typeof variants;
  placeholder?: string;
  hoverEffect?: boolean;
  value?: string;
  dynamicHeight?: boolean;
};

export const TextInput = ({
  className = '',
  variant = 'transparentFullWidth',
  placeholder = '',
  hoverEffect = true,
  value = "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of",
  dynamicHeight = false,
  ...props
}: TextInputProps) => {
  const [edit, setEdit] = useState<boolean>(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const formattedText = value.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  // useAutosizeTextArea(textAreaRef.current, value);

  return (
    <>
      <textarea
        className={clsx(
          className,
          'w-full resize-none px-2 py-1 text-black h-full',
          'rounded-sm outline-1 focus:outline-none focus:outline-gray-400',
          variants[variant],
          hoverEffect && 'hover:outline-gray-400 hover:outline-none',
        )}
        id="review-text"
        placeholder={placeholder}
        ref={textAreaRef}
        // rows={1}
        value={value}
        onBlur={() => setEdit(false)}
        {...props}
      />
      {/* {
        <div
          className={clsx(
            className,
            'w-full resize-none px-2 py-1',
            'rounded-sm outline-1 focus:outline-none focus:outline-gray-400',
            variants[variant],
            edit && 'hidden',
            value.length === 0 && 'text-opacity-50',
            hoverEffect && 'hover:outline-gray-400 hover:outline-none',
          )}
          onClick={(e) => {
            e.stopPropagation();
            setEdit(true);
          }}
        >
          {value.length === 0 ? placeholder : formattedText}
        </div>
      } */}
    </>
  );
};
