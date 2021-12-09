import api from '../../../pages/api/api';
import { postStore } from '../../../store/feature/storeSlice';
import tradly from 'tradly';

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
  router,
  accounts_configs
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
  } else if (accounts_configs.account_address_enabled && coordinates === null) {
    setShowError(true);
    setError_message('Address is required');
    setEditStoreLoading(false);

    return false;
  } else if (category === null) {
    setShowError(true);
    setError_message('Select one category');
    setEditStoreLoading(false);

    return false;
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
          })
            .then((res) => {
              if (attributeData !== null && attributeData?.length !== 0) {
                const check = attributeData.find((attr) => attr.uploadFile);
                if (check === undefined) {
                  const storesData = {
                    name: name,
                    category_id: [category],
                    description: description,
                    web_address: '',
                    images: [ImagePath],

                    attributes: attributeData,
                    type: 'accounts',
                  };
                  if (accounts_configs.account_address_enabled) {
                    storesData['coordinates'] = coordinates;
                  }
                  dispatch(
                    postStore({
                      id: accountId,
                      prams: { account: storesData },
                      authKey: auth_key,
                    })
                  ).then((res) => {
                    if (!res.payload.code) {
                      router.push('/a/my-store?page=1');
                      setEditStoreLoading(false);
                    } else {
                      setShowError(true);
                      setError_message(res.payload.message);
                      setEditStoreLoading(false);
                    }
                  });
                } else {
                  tradly.app
                    .generateS3ImageURL({
                      authKey: auth_key,
                      data: {
                        files: [
                          {
                            name: check.values[0].name,
                            type: check.values[0].type,
                          },
                        ],
                      },
                    })
                    .then((response) => {
                      if (!response.error) {
                        const fileURL = response.data.result[0];
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
                            const storesData = {
                              name: name,
                              category_id: [category],
                              description: description,
                              web_address: '',
                              images: [ImagePath],

                              attributes: attributeUpdate,
                              type: 'accounts',
                            };
                            if (accounts_configs.account_address_enabled) {
                              storesData['coordinates'] = coordinates;
                            }

                            dispatch(
                              postStore({
                                id: accountId,
                                prams: { account: storesData },
                                authKey: auth_key,
                              })
                            ).then((res) => {
                              if (!res.payload.code) {
                                router.push('/a/my-store?page=1');
                                setEditStoreLoading(false);
                              } else {
                                setShowError(true);
                                setError_message(res.payload.message);
                                setEditStoreLoading(false);
                              }
                            });
                          })
                          .catch((error) => {
                            setShowError(true);
                            setEditStoreLoading(false);
                            setError_message(
                              error?.response?.data?.error.message
                            );
                          });
                      } else {
                        setShowError(true);
                        setError_message(response.error.message);
                        setEditStoreLoading(false);
                      }
                    });
                }
              } else {
                const storesData = {
                  name: name,
                  category_id: [category],
                  description: description,
                  web_address: '',
                  images: [ImagePath],
                  type: 'accounts',
                };
                if (accounts_configs.account_address_enabled) {
                  storesData['coordinates'] = coordinates;
                }

                dispatch(
                  postStore({
                    id: accountId,
                    prams: { account: storesData },
                    authKey: auth_key,
                  })
                ).then((res) => {
                  if (!res.payload.code) {
                    router.push('/a/my-store?page=1');
                    setEditStoreLoading(false);
                  } else {
                    setShowError(true);
                    setError_message(res.payload.message);
                    setEditStoreLoading(false);
                  }
                });
              }
            })
            .catch((error) => {
              setShowError(true);
              setEditStoreLoading(false);
              setError_message(error.response.data.error.message);
            });
        } else {
          setShowError(true);
          setError_message(response.error.message);
          setEditStoreLoading(false);
        }
      })
      .catch((error) => {
        setShowError(true);
        setError_message(error.response.data.error.message);
      });
  } else {
    if (attributeData !== null  && attributeData?.length !== 0) {
      const check = attributeData.find((attr) => attr.uploadFile);
      if (check === undefined) {
        const storesData = {
          name: name,
          category_id: [category],
          description: description,
          web_address: '',
          images: [imagePath.path],
          attributes: attributeData,
          type: 'accounts',
        };
        if (accounts_configs.account_address_enabled) {
          storesData['coordinates'] = coordinates;
        }

        dispatch(
          postStore({
            id: accountId,
            prams: { account: storesData },
            authKey: auth_key,
          })
        ).then((res) => {
          if (!res.payload.code) {
            router.push('/a/my-store?page=1');
            setEditStoreLoading(false);
          } else {
            setShowError(true);
            setError_message(res.payload.message);
            setEditStoreLoading(false);
          }
        });
      } else {
        tradly.app
          .generateS3ImageURL({
            authKey: auth_key,
            data: {
              files: [
                {
                  name: check.values[0].name,
                  type: check.values[0].type,
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
                    { values: [ImagePath], id: check.id },
                  ];
                  const storesData = {
                    name: name,
                    category_id: [category],
                    description: description,
                    web_address: '',
                    images: [imagePath.path],
                    attributes: attributeUpdate,
                    type: 'accounts',
                  };
                  if (accounts_configs.account_address_enabled) {
                    storesData['coordinates'] = coordinates;
                  }

                  dispatch(
                    postStore({
                      id: accountId,
                      prams: { account: storesData },
                      authKey: auth_key,
                    })
                  ).then((res) => {
                    if (!res.payload.code) {
                      router.push('/a/my-store?page=1');
                      setEditStoreLoading(false);
                    } else {
                      setShowError(true);
                      setError_message(res.payload.message);
                      setEditStoreLoading(false);
                    }
                  });
                })
                .catch((error) => {
                  setEditStoreLoading(false);
                  setShowError(true);
                  setError_message(error.response.data.error.message);
                });
            } else {
              setShowError(true);
              setError_message(response.error.message);
              setEditStoreLoading(false);
            }
          });
      }
    } else {
      const storesData = {
        name: name,
        category_id: [category],
        description: description,
        web_address: '',
        images: [imagePath.path],
        type: 'accounts',
      };
      if (accounts_configs.account_address_enabled) {
        storesData['coordinates'] = coordinates;
      }
      dispatch(
        postStore({
          id: accountId,
          prams: { account: storesData },
          authKey: auth_key,
        })
      ).then((res) => {
        if (!res.payload.code) {
          router.push('/a/my-store?page=1');
          setEditStoreLoading(false);
        } else {
          setShowError(true);
          setError_message(res.payload.message);
          setEditStoreLoading(false);
        }
      });
    }
  }
};
