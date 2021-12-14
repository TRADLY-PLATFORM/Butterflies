import api from '../../../pages/api/api';
import { postStore } from '../../../store/feature/storeSlice';
import tradly from 'tradly';

export const create_store_click = (
  files,
  name,
  description,
  coordinates,
  category,
  attributeData,
  setShowError,
  setError_message,
  auth_key,
  dispatch,
  setCreateStoreLoading,
  router,
  accounts_configs,
  account_categories
) => {
  setCreateStoreLoading(true);

  if (files === null) {
    setShowError(true);
    setError_message('Image is required');
    setCreateStoreLoading(false);

    return false;
  }
  if (name === null || name === '') {
    setShowError(true);
    setError_message('Store name is required');
    setCreateStoreLoading(false);
    return false;
  } else if (description === '' || description === null) {
    setShowError(true);
    setError_message('Store Description is require');
    setCreateStoreLoading(false);
    return false;
  } else if (accounts_configs.account_address_enabled && coordinates === null) {
    setShowError(true);
    setError_message('Address is required');
    setCreateStoreLoading(false);
    return false;
  } else if (category === null) {
    setShowError(true);
    setError_message('Select one category');
    setCreateStoreLoading(false);
    return false;
  }

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
            if (res.status) {
              if (attributeData !== null && attributeData?.length !== 0) {
                const check = attributeData.find((attr) => attr.uploadFile);
                if (check === undefined) {
                  let storesData = {
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
                      id: '',
                      prams: { account: storesData },
                      authKey: auth_key,
                    })
                  ).then((res) => {
                    if (!res.payload.code) {
                      router.push('/a/my-store?page=1');
                      setCreateStoreLoading(false);
                    } else {
                      setCreateStoreLoading(false);
                      setShowError(true);
                      setError_message(res.payload.message);
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
                            let storesData = {
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
                                id: '',
                                prams: { account: storesData },
                                authKey: auth_key,
                              })
                            ).then((res) => {
                              if (!res.payload.code) {
                                router.push('/a/my-store?page=1');
                                setCreateStoreLoading(false);
                              } else {
                                setCreateStoreLoading(false);
                                setShowError(true);
                                setError_message(res.payload.message);
                              }
                            });
                          })
                          .catch((error) => {
                            setCreateStoreLoading(false);
                            setShowError(true);
                            setError_message(
                              error?.response?.data?.error.message
                            );
                          });
                      } else {
                        setCreateStoreLoading(false);
                        setShowError(true);
                        setError_message(response.error.message);
                      }
                    });
                }
              } else {
                let storesData = {
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
                    id: '',
                    prams: { account: storesData },
                    authKey: auth_key,
                  })
                ).then((res) => {
                  if (!res.payload.code) {
                    router.push('/a/my-store?page=1');
                    setCreateStoreLoading(false);
                  } else {
                    setCreateStoreLoading(false);
                    setShowError(true);
                    setError_message(res.payload.message);
                  }
                });
              }
            }
          })
          .catch((error) => {
            setCreateStoreLoading(false);
            setShowError(true);
            setError_message(error.response.data.error.message);
          });
      } else {
        setCreateStoreLoading(false);
        setShowError(true);
        setError_message(response.error.message);
      }
    })
    .catch((error) => {
      setCreateStoreLoading(false);
      setShowError(true);
      setError_message(error.response.data.error.message);
    });
};
