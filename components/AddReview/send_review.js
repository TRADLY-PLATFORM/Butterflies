import axios from 'axios';
import tradly from 'tradly';

export const add_review = (
  selected_product,
  rating_value,
  rating_title,
  rating_description,
  imagePath,
  files,
  fullFile,
  setShowError,
  setError_message,
  setShowSuccess,
  setSuccess_message,
  auth_key,
  setIsLoading
) => {
  setIsLoading(true);
  if (files.length > 0) {
    axios
      .post('/api/generateS3ImageURL', {
        data: {
          files: files,
        },
      })
      .then((response) => {
        if (!response.data.error) {
          const responseFiles = response.data.result;
          var increment = 0;
          for (let index = 0; index < responseFiles.length; index++) {
            const path = responseFiles[index].signedUrl;
            const ImagePath = responseFiles[index].fileUri;

            fetch(path, {
              method: 'PUT',
              headers: {
                ContentType: files[index].type,
              },
              body: fullFile[index],
            })
              .then((res) => {
                if (res.ok) {
                  increment = increment + 1;
                  if (increment === files.length) {
                    const reviewData = {
                      type: 'listings',
                      id: selected_product,
                      title: rating_title,
                      images: responseFiles.map((res) => res.fileUri),
                      rating: rating_value,
                    };
                    if (!rating_description?.replace(/\s/g, '').length <= 0) {
                      reviewData['content'] = rating_description;
                    }

                    axios
                      .post('/api/review/add_review', {
                        data: {
                          review: reviewData,
                        },
                      })
                      .then((response) => {
                        if (!response.data.error) {
                          setShowSuccess(true);
                          setSuccess_message('Your review added successfully');
                          setIsLoading(false);
                        } else {
                          setShowError(true);
                          setError_message(response?.data.error?.message);
                          setIsLoading(false);
                        }
                      });
                  }
                }
              })
              .catch((error) => {
                setShowError(true);
                setError_message(response?.error?.message);
                setIsLoading(false);
              });
          }
        } else {
          setShowError(true);
          setError_message(response?.data.error?.message);
          setIsLoading(false);
        }
      });
  } else {
    const reviewData = {
      type: 'listings',
      id: selected_product,
      title: rating_title,
      rating: rating_value,
    };
    if (!rating_description?.replace(/\s/g, '').length <= 0) {
      reviewData['content'] = rating_description;
    }

    axios
      .post('/api/review/add_review', {
        data: {
          review: reviewData,
        },
      })
      .then((response) => {
        if (!response.error) {
          setShowSuccess(true);
          setSuccess_message('Your review added successfully');
          setIsLoading(false);
        } else {
          setShowError(true);
          setError_message(response?.error?.message);
          setIsLoading(false);
        }
      });
  }
};
