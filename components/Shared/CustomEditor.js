// import { createReactEditorJS } from 'react-editor-js';

// import Embed from '@editorjs/embed';
// import Table from '@editorjs/table';
// //import Paragraph from '@editorjs/paragraph'
// //import List from '@editorjs/list'
// //import Warning from '@editorjs/warning'
// import Code from '@editorjs/code';
// //import LinkTool from '@editorjs/link'
// import ImageTool from '@editorjs/image';
// //import Raw from '@editorjs/raw'
// import Header1 from '@editorjs/header';
// import Quote from '@editorjs/quote';
// // import Marker from '@editorjs/marker'
// // import CheckList from '@editorjs/checklist'
// import Delimiter from '@editorjs/delimiter';
// // import InlineCode from '@editorjs/inline-code'
// import SimpleImage from '@editorjs/simple-image';

// const CustomEditor = ({ handleInstance, data, imageArray, ...props }) => {
//   const EDITOR_JS_TOOLS = {
//     // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
//     // paragraph: Paragraph,
//     embed: Embed,
//     table: Table,
//     //list: List,
//     //warning: Warning,
//     code: Code,
//     //linkTool: LinkTool,
//     //Image,
//     image: {
//       class: ImageTool,
//       config: {
//         uploader: {
//           async uploadByFile(file) {
//             const formData = new FormData();
//             formData.append('images', file);
//             // send image to server
//             const res = await fetch('/api/saveImage', {
//               method: 'POST',
//               body: formData,
//             });
//             const result = await res.json();
//             // get the uploaded image path, pushing image path to image array
//             await imageArray.push(result.url);
//             return {
//               success: 1,
//               file: {
//                 url: result.url,
//                 width: result.width,
//                 height: result.height,
//               },
//             };
//           },
//         },
//       },
//     },
//     //raw: Raw,
//     header: Header1,
//     quote: Quote,
//     //marker: Marker,
//     // checklist: CheckList,
//     delimiter: Delimiter,
//     // inlineCode: InlineCode,
//     simpleImage: SimpleImage,
//   };
//   const ReactEditorJS = createReactEditorJS();
//   return (
//     <ReactEditorJS
//     //   {...props}
//     //   onInitialize={(instance) => handleInstance(instance)}
//     onChange={(e)=>console.log(e)}
//       tools={EDITOR_JS_TOOLS}
//     //   data={data}
//       placeholder={`Write from here...`}
//     />
//   );
// };
// export default CustomEditor;
