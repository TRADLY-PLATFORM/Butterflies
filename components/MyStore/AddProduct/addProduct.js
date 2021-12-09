import { set } from 'react-hook-form';
import tradly from 'tradly';

export const add_product_click = (
  files,
  fullFile,
  title,
  description,
  price,
  shippingCharge,
  offerPercent,
  quantity,
  coordinates,
  selectedCategory,
  attributeData,
  currency,
  setShowError,
  setError_message,
  dispatch,
  router,
  listing_configs,
  auth_key,
  accountId,
  setAddProductLoading,
  schedulesArray,
  variantsArray
) => {
  setAddProductLoading(true);
  if (files === null || !files.length > 0) {
    setShowError(true);
    setError_message('Image is required');
    setAddProductLoading(false);
    return false;
  }
  if (title === '') {
    setShowError(true);
    setError_message('Title is required');
    setAddProductLoading(false);
    return false;
  }
  // if (description === '') {
  //   setShowError(true);
  //   setError_message('Description is required');
  //   setAddProductLoading(false);
  //   return false;
  // }
  if (price === '') {
    setShowError(true);
    setError_message('Price is required');
    setAddProductLoading(false);
    return false;
  }
  if (price < parseInt(listing_configs.listing_min_price)) {
    setShowError(true);
    setError_message(
      'Minimum price cannot be less than ' +
        parseInt(listing_configs.listing_min_price)
    );
    setAddProductLoading(false);
    return false;
  }
  if (listing_configs.listing_address_enabled) {
    if (coordinates === null) {
      setShowError(true);
      setError_message('Address is required');
      setAddProductLoading(false);
      return false;
    }
  }
  if (listing_configs.enable_stock) {
    if (quantity === null) {
      setShowError(true);
      setError_message('Stock quantity is required');
      setAddProductLoading(false);
      return false;
    }
  }

  if (selectedCategory === null) {
    setShowError(true);
    setError_message('Category is required');
    setAddProductLoading(false);
    return false;
  }

  tradly.app
    .generateS3ImageURL({
      authKey: auth_key,
      data: {
        files: files,
      },
    })
    .then((response) => {
      if (!response.error) {
        // dispatch(SetFiles(response.data.data.result[0]));
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
                  if (attributeData !== null  && attributeData?.length !== 0) {
                    const check = attributeData.find((attr) => attr.uploadFile);
                    if (check === undefined) {
                      const listingData = {
                        list_price: price,
                        account_id: accountId,
                        currency_id: currency,
                        attributes: attributeData,
                        title: title,
                        offer_percent: offerPercent,
                        images: responseFiles.map((res) => res.fileUri),
                        category_id: [selectedCategory],
                        type: 'listings',
                      };
                      if (listing_configs.listing_address_enabled) {
                        listingData['coordinates'] = coordinates;
                      }
                      if (listing_configs.enable_stock) {
                        listingData['stock'] = quantity;
                      }
                      if (listing_configs.show_shipping_charges) {
                        listingData['shipping_charges'] = shippingCharge;
                      }
                      if (!description?.replace(/\s/g, '').length <= 0) {
                        listingData['description'] = description;
                      }

                      // ekhane
                      tradly.app
                        .postListing({
                          id: '',
                          authKey: auth_key,
                          data: { listing: listingData },
                        })
                        .then((res) => {
                          if (!res.error) {
                            let changeRoute = false;
                            const listingId = res.data.listing.id;
                            if (
                              schedulesArray !== null &&
                              schedulesArray.length > 0
                            ) {
                              tradly.app
                                .createSchedule({
                                  id: res.data.listing.id,
                                  authKey: auth_key,
                                  data: { schedules: schedulesArray },
                                })
                                .then((res) => {
                                  if (!res.error) {
                                    // setAddProductLoading(false);
                                    // router.push('/stores/my-store');
                                    changeRoute = true;
                                  } else {
                                    setShowError(true);
                                    setError_message(res?.error?.message);
                                    setAddProductLoading(false);
                                  }
                                });
                            }
                            if (
                              variantsArray !== null &&
                              variantsArray.length > 0
                            ) {
                              let isLoopFinish = 0;
                              for (let i = 0; i < variantsArray.length; i++) {
                                const element = variantsArray[i];
                                tradly.app
                                  .generateS3ImageURL({
                                    authKey: auth_key,
                                    data: {
                                      files: [
                                        {
                                          name: element.images.name,
                                          type: element.images.type,
                                        },
                                      ],
                                    },
                                  })
                                  .then((response) => {
                                    if (!response.error) {
                                      const fileURL = response.data.result[0];
                                      const path = fileURL.signedUrl;
                                      const variant_ImagePath = fileURL.fileUri;
                                      fetch(path, {
                                        method: 'put',
                                        headers: {
                                          ContentType: element.images.type,
                                        },
                                        body: element.images,
                                      }).then((res) => {
                                        const variant_data = {
                                          active: true,
                                          title: element.title,
                                          description: element.description,
                                          list_price: element.list_price,
                                          offer_percent: element.offer_percent,
                                          stock: element.stock,
                                          images: [variant_ImagePath],
                                          variant_values: [
                                            {
                                              variant_type_id:
                                                element.variant_type,
                                              variant_type_value_id:
                                                element.variant_type_value,
                                            },
                                          ],
                                        };
                                        tradly.app
                                          .addEditVariants({
                                            authKey: auth_key,
                                            listingId,
                                            id: '',
                                            data: {
                                              variant: { ...variant_data },
                                            },
                                          })
                                          .then((res) => {
                                            if (!res.error) {
                                              isLoopFinish = isLoopFinish + 1;

                                              if (
                                                isLoopFinish ===
                                                variantsArray.length + 1
                                              ) {
                                                changeRoute = true;
                                              } else {
                                                setShowError(true);
                                                setError_message(
                                                  response?.error?.message
                                                );
                                                setAddProductLoading(false);
                                              }
                                            }
                                          });
                                      });
                                    } else {
                                      setShowError(true);
                                      setError_message(
                                        response?.error?.message
                                      );
                                      setAddProductLoading(false);
                                    }
                                  });
                              }
                            }
                            if (changeRoute) {
                              setAddProductLoading(false);
                              router.push('/a/my-store?page=1');
                            } else {
                              setAddProductLoading(false);
                              router.push('/a/my-store?page=1');
                            }
                          } else {
                            setShowError(true);
                            setError_message(res?.error?.message);
                            setAddProductLoading(false);
                          }
                        })
                        .catch((error) => {
                          setShowError(true);
                          setError_message(
                            error?.response?.data?.error.message
                          );
                          setAddProductLoading(false);
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
                                const listingData = {
                                  list_price: price,
                                  account_id: accountId,
                                  currency_id: currency,
                                  attributes: attributeUpdate,
                                  title: title,
                                  offer_percent: offerPercent,
                                  images: responseFiles.map(
                                    (res) => res.fileUri
                                  ),
                                  category_id: [selectedCategory],
                                  type: 'listings',
                                };

                                if (listing_configs.listing_address_enabled) {
                                  listingData['coordinates'] = coordinates;
                                }
                                if (listing_configs.enable_stock) {
                                  listingData['stock'] = quantity;
                                }
                                if (listing_configs.show_shipping_charges) {
                                  listingData['shipping_charges'] =
                                    shippingCharge;
                                }
                                if (
                                  !description?.replace(/\s/g, '').length <= 0
                                ) {
                                  listingData['description'] = description;
                                }

                                // ekhane
                                tradly.app
                                  .postListing({
                                    id: '',
                                    authKey: auth_key,
                                    data: { listing: listingData },
                                  })
                                  .then((res) => {
                                    if (!res.error) {
                                      let changeRoute = false;
                                      const listingId = res.data.listing.id;
                                      if (
                                        schedulesArray !== null &&
                                        schedulesArray.length > 0
                                      ) {
                                        tradly.app
                                          .createSchedule({
                                            id: res.data.listing.id,
                                            authKey: auth_key,
                                            data: { schedules: schedulesArray },
                                          })
                                          .then((res) => {
                                            if (!res.error) {
                                              // setAddProductLoading(false);
                                              // router.push('/stores/my-store');
                                              changeRoute = true;
                                            } else {
                                              setShowError(true);
                                              setError_message(
                                                res?.error?.message
                                              );
                                              setAddProductLoading(false);
                                            }
                                          });
                                      }
                                      if (
                                        variantsArray !== null &&
                                        variantsArray.length > 0
                                      ) {
                                        let isLoopFinish = 0;
                                        for (
                                          let i = 0;
                                          i < variantsArray.length;
                                          i++
                                        ) {
                                          const element = variantsArray[i];
                                          tradly.app
                                            .generateS3ImageURL({
                                              authKey: auth_key,
                                              data: {
                                                files: [
                                                  {
                                                    name: element.images.name,
                                                    type: element.images.type,
                                                  },
                                                ],
                                              },
                                            })
                                            .then((response) => {
                                              if (!response.error) {
                                                const fileURL =
                                                  response.data.result[0];
                                                const path = fileURL.signedUrl;
                                                const variant_ImagePath =
                                                  fileURL.fileUri;
                                                fetch(path, {
                                                  method: 'put',
                                                  headers: {
                                                    ContentType:
                                                      element.images.type,
                                                  },
                                                  body: element.images,
                                                }).then((res) => {
                                                  const variant_data = {
                                                    active: true,
                                                    title: element.title,
                                                    description:
                                                      element.description,
                                                    list_price:
                                                      element.list_price,
                                                    offer_percent:
                                                      element.offer_percent,
                                                    stock: element.stock,
                                                    images: [variant_ImagePath],
                                                    variant_values: [
                                                      {
                                                        variant_type_id:
                                                          element.variant_type,
                                                        variant_type_value_id:
                                                          element.variant_type_value,
                                                      },
                                                    ],
                                                  };
                                                  tradly.app
                                                    .addEditVariants({
                                                      authKey: auth_key,
                                                      listingId,
                                                      id: '',
                                                      data: {
                                                        variant: {
                                                          ...variant_data,
                                                        },
                                                      },
                                                    })
                                                    .then((res) => {
                                                      if (!res.error) {
                                                        isLoopFinish =
                                                          isLoopFinish + 1;

                                                        if (
                                                          isLoopFinish ===
                                                          variantsArray.length +
                                                            1
                                                        ) {
                                                          changeRoute = true;
                                                        }
                                                      } else {
                                                        setShowError(true);
                                                        setError_message(
                                                          res?.error?.message
                                                        );
                                                        setAddProductLoading(
                                                          false
                                                        );
                                                      }
                                                    });
                                                });
                                              } else {
                                                setShowError(true);
                                                setError_message(
                                                  response?.error?.message
                                                );
                                                setAddProductLoading(false);
                                              }
                                            });
                                        }
                                      }
                                      if (changeRoute) {
                                        setAddProductLoading(false);
                                        router.push('/a/my-store?page=1');
                                      } else {
                                        setAddProductLoading(false);
                                        router.push('/a/my-store?page=1');
                                      }
                                    } else {
                                      setShowError(true);
                                      setError_message(res?.error?.message);
                                      setAddProductLoading(false);
                                    }
                                  })
                                  .catch((error) => {
                                    setShowError(true);
                                    setError_message(
                                      error?.response?.data?.error.message
                                    );
                                    setAddProductLoading(false);
                                  });
                              })
                              .catch((error) => {
                                setAddProductLoading(false);
                                console.log('Error:' + error.message);
                              });
                          } else {
                            setShowError(true);
                            setError_message(response?.error?.message);
                            setAddProductLoading(false);
                          }
                        });
                    }
                  } else {
                    const listingData = {
                      list_price: price,
                      account_id: accountId,
                      currency_id: currency,
                      title: title,
                      offer_percent: offerPercent,
                      images: responseFiles.map((res) => res.fileUri),
                      category_id: [selectedCategory],
                      type: 'listings',
                    };
                    if (listing_configs.listing_address_enabled) {
                      listingData['coordinates'] = coordinates;
                    }
                    if (listing_configs.enable_stock) {
                      listingData['stock'] = quantity;
                    }
                    if (listing_configs.show_shipping_charges) {
                      listingData['shipping_charges'] = shippingCharge;
                    }
                    if (!description?.replace(/\s/g, '').length <= 0) {
                      listingData['description'] = description;
                    }

                    // ekhane
                    tradly.app
                      .postListing({
                        id: '',
                        authKey: auth_key,
                        data: { listing: listingData },
                      })
                      .then((res) => {
                        if (!res.error) {
                          let changeRoute = false;
                          const listingId = res.data.listing.id;
                          if (
                            schedulesArray !== null &&
                            schedulesArray.length > 0
                          ) {
                            tradly.app
                              .createSchedule({
                                id: res.data.listing.id,
                                authKey: auth_key,
                                data: { schedules: schedulesArray },
                              })
                              .then((res) => {
                                if (!res.error) {
                                  // setAddProductLoading(false);
                                  // router.push('/stores/my-store');
                                  changeRoute = true;
                                } else {
                                  setShowError(true);
                                  setError_message(res?.error?.message);
                                  setAddProductLoading(false);
                                }
                              });
                          }
                          if (
                            variantsArray !== null &&
                            variantsArray.length > 0
                          ) {
                            let isLoopFinish = 0;
                            for (let i = 0; i < variantsArray.length; i++) {
                              const element = variantsArray[i];
                              tradly.app
                                .generateS3ImageURL({
                                  authKey: auth_key,
                                  data: {
                                    files: [
                                      {
                                        name: element.images.name,
                                        type: element.images.type,
                                      },
                                    ],
                                  },
                                })
                                .then((response) => {
                                  if (!response.error) {
                                    const fileURL = response.data.result[0];
                                    const path = fileURL.signedUrl;
                                    const variant_ImagePath = fileURL.fileUri;
                                    fetch(path, {
                                      method: 'put',
                                      headers: {
                                        ContentType: element.images.type,
                                      },
                                      body: element.images,
                                    }).then((res) => {
                                      const variant_data = {
                                        active: true,
                                        title: element.title,
                                        description: element.description,
                                        list_price: element.list_price,
                                        offer_percent: element.offer_percent,
                                        stock: element.stock,
                                        images: [variant_ImagePath],
                                        variant_values: [
                                          {
                                            variant_type_id:
                                              element.variant_type,
                                            variant_type_value_id:
                                              element.variant_type_value,
                                          },
                                        ],
                                      };
                                      tradly.app
                                        .addEditVariants({
                                          authKey: auth_key,
                                          listingId,
                                          id: '',
                                          data: {
                                            variant: { ...variant_data },
                                          },
                                        })
                                        .then((res) => {
                                          if (!res.error) {
                                            isLoopFinish = isLoopFinish + 1;

                                            if (
                                              isLoopFinish ===
                                              variantsArray.length + 1
                                            ) {
                                              changeRoute = true;
                                            }
                                          } else {
                                            setShowError(true);
                                            setError_message(
                                              res?.error?.message
                                            );
                                            setAddProductLoading(false);
                                          }
                                        });
                                    });
                                  } else {
                                    setShowError(true);
                                    setError_message(response?.error?.message);
                                    setAddProductLoading(false);
                                  }
                                });
                            }
                          }
                          if (changeRoute) {
                            setAddProductLoading(false);
                            router.push('/a/my-store?page=1');
                          } else {
                            setAddProductLoading(false);
                            router.push('/a/my-store?page=1');
                          }
                        } else {
                          setShowError(true);
                          setError_message(res?.error?.message);
                          setAddProductLoading(false);
                        }
                      })
                      .catch((error) => {
                        setShowError(true);
                        setError_message(error?.response?.error?.message);
                        setAddProductLoading(false);
                      });
                  }
                }
              }
            })
            .catch((error) => {
              setShowError(true);
              setError_message(response?.error?.message);
              setAddProductLoading(false);
            });
        }
      } else {
        setShowError(true);
        setError_message(response?.error?.message);
        setAddProductLoading(false);
      }
    })
    .catch((error) => {
      setShowError(true);
      setError_message(response?.error?.message);
      setAddProductLoading(false);
    });
};
