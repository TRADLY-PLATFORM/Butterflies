// import dynamic from 'next/dynamic';
// import { useEffect, useState } from 'react';
 
// let CustomEditor;
// if (typeof window !== 'undefined') {
//   CustomEditor = dynamic(() => import('./CustomEditor'), {
//     ssr: false,
//   });
// }

 
// const ContainerEditor = ({ pageName, fileName, oldData, ...props }) => {
//   const [imageArray, setImageArray] = useState(
//     []
//   ); /* to keep track of uploaded image */
//   const [editorInstance, setEditorInstance] = useState(
//     {}
//   ); /* to get the instance of editor.Js */
//   const [editorData, setData] = useState(
//     JSON.parse(oldData)
//   ); /* to store data in memory and show it in editor.js */
//   const [saveButton, setSaveButton] = useState('Save');

//   // Track instance editor.js
//   const handleInstance = (instance) => {
//     setEditorInstance(instance);
//   };

//   // Fill array with current images on loading
//   useEffect(() => {
//     const data = JSON.parse(oldData);
//     const list = [];
//     data.blocks.forEach((block) => {
//       if (block.type === 'image') {
//         list.push(block.data.file.url);
//       }
//     });
//     setImageArray(list);
//   }, []);

//   function removeImage(img) {
//     const array = imageArray.filter((image) => image !== img);
//     setImageArray(array);
//   }

//   // Remove unused imges
//   const clearEditorLeftoverImages = async (savedData) => {
//     // Get editor.js images
//     const currentImages = [];
//     savedData.blocks.forEach((block) => {
//       if (block.type === 'image') {
//         currentImages.push(block.data.file.url);
//       }
//     });
//     for (const img of imageArray) {
//       if (!currentImages.includes(img)) {
//         try {
//           // delete image from backend
//           const data = { imagePath: img };
//           const res = await fetch('/api/deleteImage', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//           });
//           const result = await res.json();
//           console.log(JSON.stringify(result));
//           // remove from array
//           removeImage(img);
//         } catch (err) {
//           console.log(err.message);
//         }
//       }
//     }
//   };

//   // Save
//   const saveArticle = async (e) => {
//     e.preventDefault();

//     /* get the editor.js content and save it to state */
//     const savedData = await editorInstance.save();
//     setData(savedData);

//     const data = {
//       pageName,
//       fileName,
//       data: savedData,
//     };

//     /* Clear all the unused images from server */
//     await clearEditorLeftoverImages(savedData);

//     /* Save to server */
//     fetch('/api/save', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
//     setSaveButton('SAVED!');
//   };
//   const handleChange = () => {
//     setSaveButton('Save');
//   };

//   return (
//     <>
//       {/* <p>Component {fileName}</p> */}
//       {/* {saveButton === 'Save' && (
//         <button className={s.save} onClick={saveArticle}>
//           {saveButton}
//         </button>
//       )}
//       {saveButton === 'SAVED!' && (
//         <button className={s.saved}>{saveButton}</button>
//       )} */}
//       {CustomEditor && (
//         <CustomEditor
//           onChange={handleChange}
//           handleInstance={handleInstance}
//           data={editorData}
//           imageArray={imageArray}
//         />
//       )}
//       <p>End Component</p>
//     </>
//   );
// };

// export default ContainerEditor;
