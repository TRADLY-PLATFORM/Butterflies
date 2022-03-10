import axios from 'axios';
import tradly from 'tradly';
import { UserInfo } from '../../store/feature/authSlice';

export const saveChange = (
  firstName,
  lastName,
  imagePath,
  files,
  setShowError,
  setError_message,
  setLoading,
  auth_key,
  userId,
  dispatch,
  setShowSuccess,
  setSuccess_message
) => {
  setLoading(true);
  if (firstName === null || firstName?.replace(/\s/g, '').length <= 0) {
    setLoading(false);
    setShowError(true);
    setError_message('Enter your first name');
  }
  if (lastName === null || lastName?.replace(/\s/g, '').length <= 0) {
    setLoading(false);
    setShowError(true);
    setError_message('Enter your first name');
  }
  if (imagePath === null) {
    setLoading(false);
    setShowError(true);
    setError_message('Set one image');
  }

  if (files !== null) {
    axios
      .post('/api/generateS3ImageURL', {
        data: {
          files: [
            {
              name: files.name,
              type: files.type,
            },
          ],
        },
      })
      .then((response) => {
        if (!response.data.error) {
          const fileURL = response.data.result[0];
          const path = fileURL.signedUrl;
          const ImagePath = fileURL.fileUri;
          fetch(path, {
            method: 'put',
            headers: {
              ContentType: files.type,
            },
            body: files,
          }).then((res) => {
            const userData = {
              user: {
                first_name: firstName,
                last_name: lastName,
                profile_pic: ImagePath,
              },
            };

            axios
              .post('/api/user/update_user', { userId, userData })
              .then((res) => {
                dispatch(UserInfo({ userId, auth_key })).then((res) => {
                  if (!res.payload.code) {
                    setLoading(false);
                    setShowSuccess(true);
                    setSuccess_message('Your profile updated successfully');
                  } else {
                    setShowError(true);
                    setError_message(response.payload.message);
                    setLoading(false);
                  }
                });
              })
              .catch((error) => {
                alert(error.response.data.message);
              });
          });
        } else {
          setShowError(true);
          setError_message(response.data.error.message);
          setLoading(false);
        }
      });
  } else {
    const userData = {
      user: {
        first_name: firstName,
        last_name: lastName,
        profile_pic: imagePath.path,
      },
    };
    axios
      .post('/api/user/update_user', { id, userData })
      .then((res) => {
        dispatch(UserInfo({ userId, auth_key })).then((res) => {
          if (!res.payload.code) {
            setLoading(false);
            setShowSuccess(true);
            setSuccess_message('Your profile updated successfully');
          } else {
            setShowError(true);
            setError_message(response.payload.message);
            setLoading(false);
          }
        });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
};
