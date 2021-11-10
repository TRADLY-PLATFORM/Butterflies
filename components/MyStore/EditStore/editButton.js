import api from '../../../pages/api/api';
import { postStore } from '../../../store/feature/storeSlice';

export const edit_store_click = (
  files,
  imagePath,
  name,
  description,
  coordinates,
  category,
  attributeData,
  setShowError,
  setError_message,
  auth_key,
  dispatch,
  accountId,
  setEditStoreLoading,
  router
) => {
  setEditStoreLoading(true);
  if (files === null && imagePath === null) {
    setShowError(true);
    setError_message('Image is required');
    setEditStoreLoading(false);
    return false;
  }
  if (name === null || name === '') {
    setShowError(true);
    setError_message('Store name is required');
    setEditStoreLoading(false);

    return false;
  } else if (description === '' || description === null) {
    setShowError(true);
    setError_message('Store Description is require');
    setEditStoreLoading(false);

    return false;
  } else if (coordinates === null) {
    setShowError(true);
    setError_message('Address is required');
    setEditStoreLoading(false);

    return false;
  } else if (category === null) {
    setShowError(true);
    setError_message('category is required');
    setEditStoreLoading(false);

    return false;
  }

  if (files !== null) {
    let imageUploadConfig = {
      method: 'post',
      url: 'v1/utils/S3signedUploadURL',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        files: [
          {
            name: files.name,
            type: files.type,
          },
        ],
      },
    };
    api(imageUploadConfig)
      .then((response) => {
        if (response.data.status) {
          const fileURL = response.data.data.result[0];
          const path = fileURL.signedUrl;
          const ImagePath = fileURL.fileUri;
          fetch(path, {
            method: 'put',
            headers: {
              ContentType: files.type,
            },
            body: files,
          })
            .then((res) => {
              if (res.status) {
                if (attributeData !== null) {
                  const check = attributeData.find((attr) => attr.uploadFile);
                  if (check === undefined) {
                    const data = {
                      account: {
                        name: name,
                        category_id: [category],
                        description: description,
                        web_address: '',
                        images: [ImagePath],
                        coordinates: coordinates,
                        attributes: attributeData,
                        type: 'accounts',
                      },
                    };
                    dispatch(
                      postStore({
                        id: accountId,
                        prams: data,
                        authKey: auth_key,
                      })
                    ).then((res) => {
                      if (!res.payload.code) {
                        router.push('/stores/my-store');
                        setEditStoreLoading(false);
                      }
                    });
                  } else {
                    var imageUploadConfig = {
                      method: 'post',
                      url: 'v1/utils/S3signedUploadURL',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      data: {
                        files: [
                          {
                            name: check.values[0].name,
                            type: check.values[0].type,
                          },
                        ],
                      },
                    };

                    api(imageUploadConfig).then((response) => {
                      if (response.data.status) {
                        const fileURL = response.data.data.result[0];
                        const path = fileURL.signedUrl;
                        const ImagePath2 = fileURL.fileUri;
                        fetch(path, {
                          method: 'put',
                          headers: {
                            ContentType: check.values[0].type,
                          },
                          body: check.values[0],
                        })
                          .then((res) => {
                            const filter = attributeData.filter(
                              (attr) => !attr.uploadFile
                            );
                            const attributeUpdate = [
                              ...filter,
                              { values: [ImagePath2], id: check.id },
                            ];
                            const data = {
                              account: {
                                name: name,
                                category_id: [category],
                                description: description,
                                web_address: '',
                                images: [ImagePath],
                                coordinates: coordinates,
                                attributes: attributeUpdate,
                                type: 'accounts',
                              },
                            };

                            dispatch(
                              postStore({
                                id: accountId,
                                prams: data,
                                authKey: auth_key,
                              })
                            ).then((res) => {
                              if (!res.payload.code) {
                                router.push('/stores/my-store');
                                setEditStoreLoading(false);
                              }
                            });
                          })
                          .catch((error) => {
                            setShowError(true);
                            setEditStoreLoading(false)
                            setError_message(error?.response?.data?.error.message);
                          });
                      }
                    });
                  }
                } else {
                  const data = {
                    account: {
                      name: name,
                      category_id: [category],
                      description: description,
                      web_address: '',
                      images: [ImagePath],
                      coordinates: coordinates,
                      type: 'accounts',
                    },
                  };

                  dispatch(
                    postStore({
                      id: accountId,
                      prams: data,
                      authKey: auth_key,
                    })
                  ).then((res) => {
                    if (!res.payload.code) {
                      router.push('/stores/my-store');
                      setEditStoreLoading(false);
                    }
                  });
                }
              }
            })
            .catch((error) => {
              setShowError(true);
              setEditStoreLoading(false)
              setError_message(error.response.data.error.message);
            });
        }
      })
      .catch((error) => {
        setShowError(true);
        setError_message(error.response.data.error.message);
      });
  } else {
    if (attributeData !== null) {
      const check = attributeData.find((attr) => attr.uploadFile);
      if (check === undefined) {
        const data = {
          account: {
            name: name,
            category_id: [category],
            description: description,
            web_address: '',
            images: [imagePath.path],
            coordinates: coordinates,
            attributes: attributeData,
            type: 'accounts',
          },
        };

        dispatch(
          postStore({
            id: accountId,
            prams: data,
            authKey: auth_key,
          })
        ).then((res) => {
          if (!res.payload.code) {
            router.push('/stores/my-store');
            setEditStoreLoading(false);
          }
        });
      } else {
        let imageUploadConfig = {
          method: 'post',
          url: 'v1/utils/S3signedUploadURL',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            files: [
              {
                name: check.values[0].name,
                type: check.values[0].type,
              },
            ],
          },
        };

        api(imageUploadConfig).then((response) => {
          if (response.data.status) {
            const fileURL = response.data.data.result[0];
            const path = fileURL.signedUrl;
            const ImagePath = fileURL.fileUri;
            fetch(path, {
              method: 'put',
              headers: {
                ContentType: check.values[0].type,
              },
              body: check.values[0],
            })
              .then((res) => {
                const filter = attributeData.filter((attr) => !attr.uploadFile);
                const attributeUpdate = [
                  ...filter,
                  { values: [ImagePath], id: check.id },
                ];
                const data = {
                  account: {
                    name: name,
                    category_id: [category],
                    description: description,
                    web_address: '',
                    images: [imagePath.path],
                    coordinates: coordinates,
                    attributes: attributeUpdate,
                    type: 'accounts',
                  },
                };

                dispatch(
                  postStore({
                    id: accountId,
                    prams: data,
                    authKey: auth_key,
                  })
                ).then((res) => {
                  if (!res.payload.code) {
                    router.push('/stores/my-store');
                    setEditStoreLoading(false);
                  }
                });
              })
              .catch((error) => {
                setEditStoreLoading(false)
                setShowError(true);
                setError_message(error.response.data.error.message);
              });
          }
        });
      }
    } else {
      const data = {
        account: {
          name: name,
          category_id: [category],
          description: description,
          web_address: '',
          images: [imagePath.path],
          coordinates: coordinates,
          type: 'accounts',
        },
      };
      dispatch(
        postStore({
          id: accountId,
          prams: data,
          authKey: auth_key,
        })
      ).then((res) => {
        if (!res.payload.code) {
          router.push('/stores/my-store');
          setEditStoreLoading(false);
        }
      });
    }
  }
};
