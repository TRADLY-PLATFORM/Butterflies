import axios from 'axios';
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
    axios
      .post('/api/generateS3ImageURL', {
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
        if (!response.data.error) {
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

            axios
              .post('/api/variant/edit_variant', {
                productId,
                variantId,
                data: {
                  variant: { ...variant_data },
                },
              })
              .then((res) => {
                setShowVariantForm(false);
                setIsEditVariant(false);
                setEditVariantData(null);
                setShowSuccessMessage(true);
                setEditVariantLoading(false);
              })
              .catch((error) => {
                setShowError(true);
                setError_message(error.response.data.message);
                setEditVariantLoading(false);
                // setAddProductLoading(false);
              });
          });
        } else {
          setShowError(true);
          setError_message(response?.data?.error?.message);
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

    axios
      .post('/api/variant/edit_variant', {
        productId,
        variantId,
        data: {
          variant: { ...variant_data },
        },
      })
      .then((res) => {
        setShowVariantForm(false);
        setIsEditVariant(false);
        setEditVariantData(null);
        setShowSuccessMessage(true);
        setEditVariantLoading(false);
      })
      .catch((error) => {
        setShowError(true);
        setError_message(error.response.data.message);
        setEditVariantLoading(false);
      });
  }
};

export const deleteVariant = (variantID, productId, auth_key, dispatch) => {
  axios
    .post('/api/variant/delete_variant', { variantID, productId })
    .then((res) => {
      dispatch(myAccountListingDetails({ id: productId, authKey: auth_key }));
    });
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

  axios
    .post('/api/generateS3ImageURL', {
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
      if (!response.data.error) {
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

          axios
            .post('/api/variant/edit_variant', {
              productId,
              variantId,
              data: {
                variant: { ...variant_data },
              },
            })
            .then((res) => {
              setShowVariantForm(false);
              setIsEditVariant(false);
              setEditVariantData(null);
              setShowSuccessMessage(true);
              setAddVariantLoading(false);
            })
            .catch((error) => {
              setShowError(true);
              setError_message(error.response.data.message);
              setAddVariantLoading(false);
              // setAddProductLoading(false);
            });
        });
      } else {
        setShowError(true);
        setError_message(response?.data?.error?.message);
        setAddVariantLoading(false);

        // setAddProductLoading(false);
      }
    });
};
