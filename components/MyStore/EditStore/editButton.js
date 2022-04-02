/* eslint-disable @typescript-eslint/no-var-requires */
import { postStore } from '../../../store/feature/storeSlice';
import tradly from 'tradly';
import axios from 'axios';
var slugify = require('slugify');

export const edit_store_click = (
  files,
  imagePath,
  name,
  slug,
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

  if (name === null || description?.replace(/\s/g, '').length <= 0) {
    setShowError(true);
    setError_message('Store name is required');
    setEditStoreLoading(false);

    return false;
  } else if (accounts_configs.account_address_enabled && coordinates === null) {
    setShowError(true);
    setError_message('Address is required');
    setEditStoreLoading(false);

    return false;
  }

  if (files !== null && imagePath === null) {
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
          })
            .then((res) => {
              if (attributeData !== null && attributeData?.length !== 0) {
                const check = attributeData.find((attr) => attr.uploadFile);
                if (check === undefined) {
                  const storesData = {
                    name: name,
                    web_address: '',
                    images: [ImagePath],

                    attributes: attributeData,
                    type: 'accounts',
                  };
                  if (accounts_configs.account_address_enabled) {
                    storesData['coordinates'] = coordinates;
                  }
                  if (category !== null) {
                    storesData['category_id'] = [category];
                  }
                  if (
                    !description?.replace(/\s/g, '').length <= 0 &&
                    description !== null
                  ) {
                    storesData['description'] = description;
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
                  axios
                    .post('/api/generateS3ImageURL', {
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
                      if (!response.data.error) {
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

                              web_address: '',
                              images: [ImagePath],

                              attributes: attributeUpdate,
                              type: 'accounts',
                            };
                            if (category !== null) {
                              storesData['category_id'] = [category];
                            }
                            if (accounts_configs.account_address_enabled) {
                              storesData['coordinates'] = coordinates;
                            }
                            if (
                              !description?.replace(/\s/g, '').length <= 0 &&
                              description !== null
                            ) {
                              storesData['description'] = description;
                            }
                            if (!slug?.replace(/\s/g, '').length <= 0) {
                              storesData['slug'] = slugify(slug, {
                                remove: undefined,
                                lower: true,
                                strict: true,
                              });
                            } else {
                              storesData['slug'] = slugify(name, {
                                remove: undefined,
                                lower: true,
                                strict: true,
                              });
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
                        setError_message(response.data.error.message);
                        setEditStoreLoading(false);
                      }
                    });
                }
              } else {
                const storesData = {
                  name: name,

                  web_address: '',
                  images: [ImagePath],
                  type: 'accounts',
                };
                if (accounts_configs.account_address_enabled) {
                  storesData['coordinates'] = coordinates;
                }
                if (category !== null) {
                  storesData['category_id'] = [category];
                }
                if (
                  !description?.replace(/\s/g, '').length <= 0 &&
                  description !== null
                ) {
                  storesData['description'] = description;
                }
                if (!slug?.replace(/\s/g, '').length <= 0) {
                  storesData['slug'] = slugify(slug, {
                    remove: undefined,
                    lower: true,
                    strict: true,
                  });
                } else {
                  storesData['slug'] = slugify(name, {
                    remove: undefined,
                    lower: true,
                    strict: true,
                  });
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
          setError_message(response.data.error.message);
          setEditStoreLoading(false);
        }
      })
      .catch((error) => {
        setShowError(true);
        setError_message(error.response.data.error.message);
      });
  } else if (files === null && imagePath !== null) {
    if (attributeData !== null && attributeData?.length !== 0) {
      const check = attributeData.find((attr) => attr.uploadFile);
      if (check === undefined) {
        const storesData = {
          name: name,

          web_address: '',
          images: [imagePath.path],
          attributes: attributeData,
          type: 'accounts',
        };
        if (accounts_configs.account_address_enabled) {
          storesData['coordinates'] = coordinates;
        }
        if (category !== null) {
          storesData['category_id'] = [category];
        }
        if (
          !description?.replace(/\s/g, '').length <= 0 &&
          description !== null
        ) {
          storesData['description'] = description;
        }
        if (!slug?.replace(/\s/g, '').length <= 0) {
          storesData['slug'] = slugify(slug, {
            remove: undefined,
            lower: true,
            strict: true,
          });
        } else {
          storesData['slug'] = slugify(name, {
            remove: undefined,
            lower: true,
            strict: true,
          });
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
        axios
          .post('/api/generateS3ImageURL', {
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
            if (!response.data.error) {
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

                    web_address: '',
                    images: [imagePath.path],
                    attributes: attributeUpdate,
                    type: 'accounts',
                  };
                  if (accounts_configs.account_address_enabled) {
                    storesData['coordinates'] = coordinates;
                  }
                  if (category !== null) {
                    storesData['category_id'] = [category];
                  }
                  if (
                    !description?.replace(/\s/g, '').length <= 0 &&
                    description !== null
                  ) {
                    storesData['description'] = description;
                  }
                  if (!slug?.replace(/\s/g, '').length <= 0) {
                    storesData['slug'] = slugify(slug, {
                      remove: undefined,
                      lower: true,
                      strict: true,
                    });
                  } else {
                    storesData['slug'] = slugify(name, {
                      remove: undefined,
                      lower: true,
                      strict: true,
                    });
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
              setError_message(response.data.error.message);
              setEditStoreLoading(false);
            }
          });
      }
    } else {
      const storesData = {
        name: name,

        web_address: '',
        images: [imagePath.path],
        type: 'accounts',
      };
      if (accounts_configs.account_address_enabled) {
        storesData['coordinates'] = coordinates;
      }
      if (category !== null) {
        storesData['category_id'] = [category];
      }
      if (
        !description?.replace(/\s/g, '').length <= 0 &&
        description !== null
      ) {
        storesData['description'] = description;
      }
      if (!slug?.replace(/\s/g, '').length <= 0) {
        storesData['slug'] = slugify(slug, {
          remove: undefined,
          lower: true,
          strict: true,
        });
      } else {
        storesData['slug'] = slugify(name, {
          remove: undefined,
          lower: true,
          strict: true,
        });
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
  // No image for store
  else {
    if (attributeData !== null && attributeData?.length !== 0) {
      const check = attributeData.find((attr) => attr.uploadFile);
      if (check === undefined) {
        const storesData = {
          name: name,

          web_address: '',

          attributes: attributeData,
          type: 'accounts',
        };
        if (accounts_configs.account_address_enabled) {
          storesData['coordinates'] = coordinates;
        }
        if (category !== null) {
          storesData['category_id'] = [category];
        }
        if (
          !description?.replace(/\s/g, '').length <= 0 &&
          description !== null
        ) {
          storesData['description'] = description;
        }
        if (!slug?.replace(/\s/g, '').length <= 0) {
          storesData['slug'] = slugify(slug, {
            remove: undefined,
            lower: true,
            strict: true,
          });
        } else {
          storesData['slug'] = slugify(name, {
            remove: undefined,
            lower: true,
            strict: true,
          });
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
        axios
          .post('/api/generateS3ImageURL', {
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
                    web_address: '',

                    attributes: attributeUpdate,
                    type: 'accounts',
                  };
                  if (accounts_configs.account_address_enabled) {
                    storesData['coordinates'] = coordinates;
                  }
                  if (category !== null) {
                    storesData['category_id'] = [category];
                  }
                  if (
                    !description?.replace(/\s/g, '').length <= 0 &&
                    description !== null
                  ) {
                    storesData['description'] = description;
                  }
                  if (!slug?.replace(/\s/g, '').length <= 0) {
                    storesData['slug'] = slugify(slug, {
                      remove: undefined,
                      lower: true,
                      strict: true,
                    });
                  } else {
                    storesData['slug'] = slugify(name, {
                      remove: undefined,
                      lower: true,
                      strict: true,
                    });
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
        web_address: '',

        type: 'accounts',
      };
      if (accounts_configs.account_address_enabled) {
        storesData['coordinates'] = coordinates;
      }
      if (category !== null) {
        storesData['category_id'] = [category];
      }
      if (
        !description?.replace(/\s/g, '').length <= 0 &&
        description !== null
      ) {
        storesData['description'] = description;
      }
      if (!slug?.replace(/\s/g, '').length <= 0) {
        storesData['slug'] = slugify(slug, {
          remove: undefined,
          lower: true,
          strict: true,
        });
      } else {
        storesData['slug'] = slugify(name, {
          remove: undefined,
          lower: true,
          strict: true,
        });
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
