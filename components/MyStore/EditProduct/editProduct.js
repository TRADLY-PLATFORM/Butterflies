 import trady from 'tradly';

export const edit_product_click = (
  files,
  fullFile,
  title,
  description,
  price,
  shippingCharge,
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
  setEditProductLoading
) => {
  setEditProductLoading(true);
  if (files === null || !files.length > 0) {
    setShowError(true);
    setError_message('Image is required');
    setEditProductLoading(false);
    return false;
  }
  if (title === '') {
    setShowError(true);
    setError_message('Title is required');
    setEditProductLoading(false);
    return false;
  }
  if (description === '') {
    setShowError(true);
    setError_message('Description is required');
    setEditProductLoading(false);
    return false;
  }
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

  trady.app
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
            body: fullFile[0],
          })
            .then((res) => {
              if (res.ok) {
                increment = increment + 1;
                if (increment === files.length) {
                  if (attributeData !== null) {
                    const check = attributeData.find((attr) => attr.uploadFile);
                    if (check === undefined) {
                      const listingData = {
                        listing: {
                          list_price: price,
                          description: description,
                          account_id: accountId,
                          currency_id: currency,
                          attributes: attributeData,
                          title: title,
                          offer_percent: 0,
                          images: responseFiles.map((res) => res.fileUri),
                          category_id: [selectedCategory],
                          type: 'listings',
                        },
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

                      // ekhane
                      trady.app
                        .postListing({
                          id: productId,
                          authKey: auth_key,
                          data: listingData,
                        })
                        .then((res) => {
                          if (!res.error) {
                            setEditProductLoading(false);
                            router.push('/stores/my-store');
                          }
                        });
                    } else {
                      trady.app
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
                                  listing: {
                                    list_price: price,
                                    description: description,
                                    account_id: accountId,
                                    currency_id: currency,
                                    attributes: attributeUpdate,
                                    title: title,
                                    offer_percent: 0,
                                    images: responseFiles.map(
                                      (res) => res.fileUri
                                    ),
                                    category_id: [selectedCategory],
                                    type: 'listings',
                                  },
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

                                // ekhane
                                trady.app
                                  .postListing({
                                    id: productId,
                                    authKey: auth_key,
                                    data: listingData,
                                  })
                                  .then((res) => {
                                    if (!res.error) {
                                      setEditProductLoading(false);
                                      router.push('/stores/my-store');
                                    }
                                  });
                              })
                              .catch((error) => {
                                setEditProductLoading(false);
                                console.log('Error:' + error.message);
                              });
                          }
                        });
                    }
                  } else {
                    const listingData = {
                      listing: {
                        list_price: price,
                        description: description,
                        account_id: accountId,
                        currency_id: currency,
                        title: title,
                        offer_percent: 0,
                        images: responseFiles.map((res) => res.fileUri),
                        category_id: [selectedCategory],
                        type: 'listings',
                      },
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

                    // ekhane
                    trady.app
                      .postListing({
                        id: productId,
                        authKey: auth_key,
                        data: listingData,
                      })
                      .then((res) => {
                        if (!res.error) {
                          setEditProductLoading(false);
                          router.push('/stores/my-store');
                        }
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
      }
    })
    .catch((error) => {
      setShowError(true);
      setError_message(error?.response?.data?.error.message);
      setEditProductLoading(false);
    });
};
