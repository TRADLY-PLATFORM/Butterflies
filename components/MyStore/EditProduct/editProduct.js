/* eslint-disable @typescript-eslint/no-var-requires */
import axios from 'axios';
var slugify = require('slugify');

export const edit_product_click = (
  imagePath,
  files,
  fullFile,
  title,
  slug,
  meta_title,
  meta_description,
  meta_keyword,
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
  productId,
  setEditProductLoading,
  setShowSuccessMessage,
  attributes
) => {
  setEditProductLoading(true);
 
  if (imagePath.length === 0 || imagePath.length === null) {
    if (files.length === 0) {
      setShowError(true);
      setError_message('Image is required');
      setEditProductLoading(false);
      return false;
    }
  }
  if (title === '') {
    setShowError(true);
    setError_message('Title is required');
    setEditProductLoading(false);
    return false;
  }
  // if (description === '') {
  //   setShowError(true);
  //   setError_message('Description is required');
  //   setEditProductLoading(false);
  //   return false;
  // }
  if (price === '') {
    setShowError(true);
    setError_message('Price is required');
    setEditProductLoading(false);
    return false;
  }
  if (price < parseInt(listing_configs.listing_min_price)) {
    setShowError(true);
    setError_message(
      'Minimum price cannot be less than ' +
        parseInt(listingsConfigs.listing_min_price)
    );
    setEditProductLoading(false);
    return false;
  }
  if (listing_configs.listing_address_enabled) {
    if (coordinates === null) {
      setShowError(true);
      setError_message('Address is required');
      setEditProductLoading(false);
      return false;
    }
  }
  if (listing_configs.enable_stock) {
    if (quantity === null) {
      setShowError(true);
      setError_message('Stock quantity is required');
      setEditProductLoading(false);
      return false;
    }
  }

  if (selectedCategory === null) {
    setShowError(true);
    setError_message('Category is required');
    setEditProductLoading(false);
    return false;
  }

  if (attributes.length > 0) {
    for (let i = 0; i < attributes.length; i++) {
      const attribute = attributes[i];
      if (!attribute.optional) {
        if (
          !attributeData?.filter((at_data) => at_data.id === attribute.id)
            ?.length > 0 ||
          attributeData === null
        ) {
          setShowError(true);
          setError_message(`${attribute.name} is required`);
          setEditProductLoading(false);
          return false;
          break;
        }
      }
    }
  }

  if (fullFile.length > 0) {
    axios
      .post('/api/generateS3ImageURL', {
        data: {
          files: files,
        },
      })
      .then((response) => {
        if (!response.data.error) {
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
                    if (attributeData !== null && attributeData?.length !== 0) {
                      const check = attributeData.find(
                        (attr) => attr.uploadFile
                      );
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
                        if (!meta_title?.replace(/\s/g, '').length <= 0) {
                          listingData['meta_title'] = meta_title;
                        }
                        if (!meta_keyword?.replace(/\s/g, '').length <= 0) {
                          listingData['meta_keyword'] = meta_keyword;
                        }
                        if (!meta_description?.replace(/\s/g, '').length <= 0) {
                          listingData['meta_description'] = meta_description;
                        }
                        if (!slug?.replace(/\s/g, '').length <= 0) {
                          listingData['slug'] = slugify(slug, {
                            remove: undefined,
                            lower: true,
                            strict: true,
                          });
                        } else {
                          listingData['slug'] = slugify(title, {
                            remove: undefined,
                            lower: true,
                            strict: true,
                          });
                        }

                        // post data

                        axios
                          .post('/api/l/edit_listing', {
                            productId,
                            data: { listing: listingData },
                          })
                          .then((res) => {
                            setEditProductLoading(false);
                            setShowSuccessMessage(true);
                          })
                          .catch((error) => {
                            setShowError(true);
                            setError_message(error.response.data.message);
                            setEditProductLoading(false);
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
                                  if (
                                    !meta_title?.replace(/\s/g, '').length <= 0
                                  ) {
                                    listingData['meta_title'] = meta_title;
                                  }
                                  if (
                                    !meta_keyword?.replace(/\s/g, '').length <=
                                    0
                                  ) {
                                    listingData['meta_keyword'] = meta_keyword;
                                  }
                                  if (
                                    !meta_description?.replace(/\s/g, '')
                                      .length <= 0
                                  ) {
                                    listingData['meta_description'] =
                                      meta_description;
                                  }
                                  if (!slug?.replace(/\s/g, '').length <= 0) {
                                    listingData['slug'] = slugify(slug, {
                                      remove: undefined,
                                      lower: true,
                                      strict: true,
                                    });
                                  } else {
                                    listingData['slug'] = slugify(title, {
                                      remove: undefined,
                                      lower: true,
                                      strict: true,
                                    });
                                  }

                                  // post listing data
                                  axios
                                    .post('/api/l/edit_listing', {
                                      productId,
                                      data: { listing: listingData },
                                    })
                                    .then((res) => {
                                      setEditProductLoading(false);
                                      setShowSuccessMessage(true);
                                    })
                                    .catch((error) => {
                                      setShowError(true);
                                      setError_message(error.response.message);
                                      setEditProductLoading(false);
                                    });
                                })
                                .catch((error) => {
                                  setShowError(true);
                                  setError_message(
                                    error?.response?.data?.error?.message
                                  );
                                  setEditProductLoading(false);
                                });
                            } else {
                              setShowError(true);
                              setError_message(response?.data?.error?.message);
                              setEditProductLoading(false);
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
                      if (!meta_title?.replace(/\s/g, '').length <= 0) {
                        listingData['meta_title'] = meta_title;
                      }
                      if (!meta_keyword?.replace(/\s/g, '').length <= 0) {
                        listingData['meta_keyword'] = meta_keyword;
                      }
                      if (!meta_description?.replace(/\s/g, '').length <= 0) {
                        listingData['meta_description'] = meta_description;
                      }
                      if (!slug?.replace(/\s/g, '').length <= 0) {
                        listingData['slug'] = slugify(slug, {
                          remove: undefined,
                          lower: true,
                          strict: true,
                        });
                      } else {
                        listingData['slug'] = slugify(title, {
                          remove: undefined,
                          lower: true,
                          strict: true,
                        });
                      }

                      // post listing data
                      axios
                        .post('/api/l/edit_listing', {
                          productId,
                          data: { listing: listingData },
                        })
                        .then((res) => {
                          setEditProductLoading(false);
                          setShowSuccessMessage(true);
                        })
                        .catch((error) => {
                          setShowError(true);
                          setError_message(error.response.data.message);
                          setEditProductLoading(false);
                        });
                    }
                  }
                }
              })
              .catch((error) => {
                setShowError(true);
                setError_message(error?.response?.data?.error.message);
                setEditProductLoading(false);
              });
          }
        } else {
          setShowError(true);
          setError_message(response?.data?.error?.message);
          setEditProductLoading(false);
        }
      })
      .catch((error) => {
        setShowError(true);
        setError_message(error?.response?.data?.error?.message);
        setEditProductLoading(false);
      });
  } else {
    if (attributeData !== null && attributeData?.length !== 0) {
      const check = attributeData.find((attr) => attr.uploadFile);
      if (check === undefined) {
        const listingData = {
          list_price: price,

          account_id: accountId,
          currency_id: currency,
          attributes: attributeData,
          title: title,
          offer_percent: offerPercent,
          images: imagePath.map((item) => item),
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
        if (!meta_title?.replace(/\s/g, '').length <= 0) {
          listingData['meta_title'] = meta_title;
        }
        if (!meta_keyword?.replace(/\s/g, '').length <= 0) {
          listingData['meta_keyword'] = meta_keyword;
        }
        if (!meta_description?.replace(/\s/g, '').length <= 0) {
          listingData['meta_description'] = meta_description;
        }
        if (!slug?.replace(/\s/g, '').length <= 0) {
          listingData['slug'] = slugify(slug, {
            remove: undefined,
            lower: true,
            strict: true,
          });
        } else {
          listingData['slug'] = slugify(title, {
            remove: undefined,
            lower: true,
            strict: true,
          });
        }

        // post listing data
        axios
          .post('/api/l/edit_listing', {
            productId,
            data: { listing: listingData },
          })
          .then((res) => {
            setEditProductLoading(false);
            setShowSuccessMessage(true);
          })
          .catch((error) => {
            setShowError(true);
            setError_message(error.response.data.message);
            setEditProductLoading(false);
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
                  const listingData = {
                    list_price: price,
                    account_id: accountId,
                    currency_id: currency,
                    attributes: attributeUpdate,
                    title: title,
                    offer_percent: offerPercent,
                    images: imagePath.map((item) => item),
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
                  if (!meta_title?.replace(/\s/g, '').length <= 0) {
                    listingData['meta_title'] = meta_title;
                  }
                  if (!meta_keyword?.replace(/\s/g, '').length <= 0) {
                    listingData['meta_keyword'] = meta_keyword;
                  }
                  if (!meta_description?.replace(/\s/g, '').length <= 0) {
                    listingData['meta_description'] = meta_description;
                  }
                  if (!slug?.replace(/\s/g, '').length <= 0) {
                    listingData['slug'] = slugify(slug, {
                      remove: undefined,
                      lower: true,
                      strict: true,
                    });
                  } else {
                    listingData['slug'] = slugify(title, {
                      remove: undefined,
                      lower: true,
                      strict: true,
                    });
                  }
                  // post listing data
                  axios
                    .post('/api/l/edit_listing', {
                      productId,
                      data: { listing: listingData },
                    })
                    .then((res) => {
                      setEditProductLoading(false);
                      setShowSuccessMessage(true);
                    })
                    .catch((error) => {
                      setShowError(true);
                      setError_message(error.response.data.message);
                      setEditProductLoading(false);
                    });
                })
                .catch((error) => {
                  setShowError(true);
                  setError_message(error?.response?.data?.error?.message);
                  setEditProductLoading(false);
                });
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
        images: imagePath.map((item) => item),
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
      if (!meta_title?.replace(/\s/g, '').length <= 0) {
        listingData['meta_title'] = meta_title;
      }
      if (!meta_keyword?.replace(/\s/g, '').length <= 0) {
        listingData['meta_keyword'] = meta_keyword;
      }
      if (!meta_description?.replace(/\s/g, '').length <= 0) {
        listingData['meta_description'] = meta_description;
      }
      if (!slug?.replace(/\s/g, '').length <= 0) {
        listingData['slug'] = slugify(slug, {
          remove: undefined,
          lower: true,
          strict: true,
        });
      } else {
        listingData['slug'] = slugify(title, {
          remove: undefined,
          lower: true,
          strict: true,
        });
      }
      // post listing data
      axios
        .post('/api/l/edit_listing', {
          productId,
          data: { listing: listingData },
        })
        .then((res) => {
          setEditProductLoading(false);
          setShowSuccessMessage(true);
        })
        .catch((error) => {
          setShowError(true);
          setError_message(error.response.data.message);
          setEditProductLoading(false);
        });
    }
  }
};
