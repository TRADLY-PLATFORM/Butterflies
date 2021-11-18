import tradly from 'tradly';
import { myAccountListingDetails } from '../../../../store/feature/storeSlice';

export const editVariantButton = (
  variantsObject,
  setShowVariantForm,
  setIsEditVariant,
  setEditVariantData,
  setError_message,
  setShowError,
  auth_key,
  variantId,
  productId,
  setShowSuccessMessage,
  setEditVariantLoading
) => {
  setEditVariantLoading(true);
  if (variantsObject.images.name) {
    tradly.app
      .generateS3ImageURL({
        authKey: auth_key,
        data: {
          files: [
            {
              name: variantsObject.images.name,
              type: variantsObject.images.type,
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
              ContentType: variantsObject.images.type,
            },
            body: variantsObject.images,
          }).then((res) => {
            const variant_data = {
              active: true,
              title: variantsObject.title,
              description: variantsObject.description,
              list_price: variantsObject.list_price,
              offer_percent: variantsObject.offer_percent,
              stock: variantsObject.stock,
              images: [variant_ImagePath],
              variant_values: [
                {
                  variant_type_id: variantsObject.variant_type,
                  variant_type_value_id: variantsObject.variant_type_value,
                },
              ],
            };
            tradly.app
              .addEditVariants({
                authKey: auth_key,
                listingId: productId,
                id: variantId,
                data: {
                  variant: { ...variant_data },
                },
              })
              .then((res) => {
                if (!res.error) {
                  setShowVariantForm(false);
                  setIsEditVariant(false);
                  setEditVariantData(null);
                  setShowSuccessMessage(true);
                  setEditVariantLoading(false);
                } else {
                  setShowError(true);
                  setError_message(res?.error?.message);
                  setEditVariantLoading(false);
                  // setAddProductLoading(false);
                }
              });
          });
        } else {
          setShowError(true);
          setError_message(response?.error?.message);
          setEditVariantLoading(false);

          // setAddProductLoading(false);
        }
      });
  } else {
    const variant_data = {
      active: true,
      title: variantsObject.title,
      description: variantsObject.description,
      list_price: variantsObject.list_price,
      offer_percent: variantsObject.offer_percent,
      stock: variantsObject.stock,
      images: [variantsObject.images],
      variant_values: [
        {
          variant_type_id: variantsObject.variant_type,
          variant_type_value_id: variantsObject.variant_type_value,
        },
      ],
    };
    tradly.app
      .addEditVariants({
        authKey: auth_key,
        listingId: productId,
        id: variantId,
        data: {
          variant: { ...variant_data },
        },
      })
      .then((res) => {
        if (!res.error) {
          setShowVariantForm(false);
          setIsEditVariant(false);
          setEditVariantData(null);
          setShowSuccessMessage(true);
          setEditVariantLoading(false);
        } else {
          setShowError(true);
          setError_message(res?.error?.message);
          setEditVariantLoading(false);

          // setAddProductLoading(false);
        }
      });
  }
};

export const deleteVariant = (variantID, productId, auth_key,dispatch) => {
  tradly.app.deleteVariant({
    id: variantID,
    listingId: productId,
    authKey: auth_key,
  }).then((res) => {
      if (!res.error) {
           dispatch(
             myAccountListingDetails({ id: productId, authKey: auth_key })
           );
      }
  })
};


export const addNewVariant = (
  variantsObject,
  setShowVariantForm,
  setIsEditVariant,
  setEditVariantData,
  setError_message,
  setShowError,
  auth_key,
  variantId,
  productId,
  setShowSuccessMessage,
  setAddVariantLoading
) => {
  setAddVariantLoading(true);

  tradly.app
    .generateS3ImageURL({
      authKey: auth_key,
      data: {
        files: [
          {
            name: variantsObject.images.name,
            type: variantsObject.images.type,
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
            ContentType: variantsObject.images.type,
          },
          body: variantsObject.images,
        }).then((res) => {
          const variant_data = {
            active: true,
            title: variantsObject.title,
            description: variantsObject.description,
            list_price: variantsObject.list_price,
            offer_percent: variantsObject.offer_percent,
            stock: variantsObject.stock,
            images: [variant_ImagePath],
            variant_values: [
              {
                variant_type_id: variantsObject.variant_type,
                variant_type_value_id: variantsObject.variant_type_value,
              },
            ],
          };
          tradly.app
            .addEditVariants({
              authKey: auth_key,
              listingId: productId,
              id: variantId,
              data: {
                variant: { ...variant_data },
              },
            })
            .then((res) => {
              if (!res.error) {
                setShowVariantForm(false);
                setIsEditVariant(false);
                setEditVariantData(null);
                setShowSuccessMessage(true);
                setAddVariantLoading(false);
              } else {
                setShowError(true);
                setError_message(res?.error?.message);
                setAddVariantLoading(false);
                // setAddProductLoading(false);
              }
            });
        });
      } else {
        setShowError(true);
        setError_message(response?.error?.message);
        setAddVariantLoading(false);

        // setAddProductLoading(false);
      }
    });
};