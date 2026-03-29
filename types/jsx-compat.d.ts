// Compatibility shim: @types/react v18+ moved JSX types under React.JSX.
// Older packages (e.g. react-markdown v7) still reference the global JSX namespace.
import type React from 'react';

declare global {
  namespace JSX {
    type Element = React.JSX.Element;
    type ElementClass = React.JSX.ElementClass;
    type IntrinsicElements = React.JSX.IntrinsicElements;
    type IntrinsicAttributes = React.JSX.IntrinsicAttributes;
    type ElementAttributesProperty = React.JSX.ElementAttributesProperty;
    type ElementChildrenAttribute = React.JSX.ElementChildrenAttribute;
    type LibraryManagedAttributes<C, P> = React.JSX.LibraryManagedAttributes<C, P>;
    type IntrinsicClassAttributes<T> = React.JSX.IntrinsicClassAttributes<T>;
  }
}

// Make useDispatch return the typed AppDispatch globally so all pages
// (including .jsx → .tsx renames) work without individual changes.
import type { AppDispatch, RootState } from '../store/store';

declare module 'react-redux' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultRootState extends RootState {}
  function useDispatch(): AppDispatch;
}
