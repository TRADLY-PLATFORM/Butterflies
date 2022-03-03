import React from 'react';
import Feedback from './Feedback';
import Rating from './Rating';

const ReviewBox = ({
  rating_value,
  setRating_value,
  rating_title,
  setRating_title,
  rating_description,
  setRating_description,
  imagePath,
  setImagePath,
  files,
  setFiles,
  fullFile,
  setFullFile,
  send_review,
  isLoading,
}) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-c-sm min-h-[700px]">
      <div>
        <Rating setRating_value={setRating_value} />
      </div>
      <div>
        <Feedback
          rating_title={rating_title}
          setRating_title={setRating_title}
          rating_description={rating_description}
          setRating_description={setRating_description}
          imagePath={imagePath}
          setImagePath={setImagePath}
          files={files}
          setFiles={setFiles}
          fullFile={fullFile}
          setFullFile={setFullFile}
          send_review={send_review}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ReviewBox;