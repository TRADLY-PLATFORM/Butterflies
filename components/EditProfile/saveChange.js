import tradly from 'tradly';

export const saveChange = (
  firstName,
  lastName,
  imagePath,
  files,
  setShowError,
  setError_message,
  setLoading,
  auth_key,
  userId
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
    tradly.app
      .generateS3ImageURL({
        authKey: auth_key,
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
        if (!response.error) {
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
            tradly.app
              .updateUserInfo({
                id: userId,
                data: userData,
                authKey: auth_key,
              })
              .then((res) => {
                if (!res.error) {
                  setLoading(false);
                }
              });
          });
        } else {
          setShowError(true);
          setError_message(response.error.message);
          setLoading(false);
        }
      });
  }
};
