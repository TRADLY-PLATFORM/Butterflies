import axios from 'axios';
import tradly from 'tradly';
import { base_url } from '../../constant/url';
var auth_key =
  '';

const image_url = (files, full_files) => {
  return tradly.app
    .generateS3ImageURL({
      authKey: auth_key,
      data: { files: [files] },
    })
    .then((res) => {
      if (!res.error) {
        const path = res.data.result[0].signedUrl;
        const ImagePath = res.data.result[0].fileUri;
        return fetch(path, {
          method: 'PUT',
          headers: {
            ContentType: full_files.type,
          },
          body: full_files,
        }).then((res) => {
          if (res.status == 200) {
            return ImagePath;
          }
        });
      }
    });
};

export const add_general_configs = async (
  logo_files,
  favicon_files,
  data,
  router,
  setIsLoading
) => {
  setIsLoading(true);
  var logo = {
    key: 'web_logo',
    key_group: 'general',
    secured: false,
    value: await image_url(
      { name: logo_files.image_file.name, type: logo_files.image_file.type },
      logo_files.image_file
    ),
  };
  var favicon = {
    key: 'web_icon',
    key_group: 'general',
    secured: false,
    value: await image_url(
      {
        name: favicon_files.image_file.name,
        type: favicon_files.image_file.type,
      },
      favicon_files.image_file
    ),
  };

  const array_configs = Object.entries(data);
  let configs = [];
  for (let i = 0; i < array_configs.length; i++) {
    const element = array_configs[i];
    if (element[1].length > 0) {
      configs.push({
        key: element[0],
        key_group: 'general',
        secured: false,
        value: element[1],
      });
    }
  }

  const url = `${base_url}v1/configs`;
  var header = {
    'Content-Type': 'application/json',
    'x-auth-key': auth_key,
  };

  axios({
    url: url,
    method: 'POST',
    responseType: 'json',
    headers: header,
    data: {
      configs: [...configs, logo, favicon],
    },
  }).then((res) => {
    if (!res.error) {
      setIsLoading(false);
      router.push('/themes/onboarding2');
    }
  });
};

export const add_seo_configs = async (data, router, setIsLoadingSeo) => {
  setIsLoadingSeo(true);

  const array_configs = Object.entries(data);
  let configs = [];
  for (let i = 0; i < array_configs.length; i++) {
    const element = array_configs[i];
    if (element[1].length > 0) {
      configs.push({
        key: element[0],
        key_group: 'seo',
        secured: false,
        value: element[1],
      });
    }
  }

  const url = `${base_url}v1/configs`;
  var header = {
    'Content-Type': 'application/json',
    'x-auth-key': auth_key,
  };

  axios({
    url: url,
    method: 'POST',
    responseType: 'json',
    headers: header,
    data: {
      configs: [...configs],
    },
  }).then((res) => {
    if (!res.error) {
      setIsLoadingSeo(false);
      router.push('/themes/onboarding3');
    } else {
      setIsLoadingSeo(false);
    }
  });
};


export const add_social_configs = async (data, router, setIsLoading) => {
  setIsLoading(true);

  const array_configs = Object.entries(data);
  let configs = [];
  for (let i = 0; i < array_configs.length; i++) {
    const element = array_configs[i];
    if (element[1].length > 0) {
      configs.push({
        key: element[0],
        key_group: 'social',
        secured: false,
        value: element[1],
      });
    }
  }

  const url = `${base_url}v1/configs`;
  var header = {
    'Content-Type': 'application/json',
    'x-auth-key': auth_key,
  };

  axios({
    url: url,
    method: 'POST',
    responseType: 'json',
    headers: header,
    data: {
      configs: [...configs],
    },
  }).then((res) => {
    if (!res.error) {
      setIsLoading(false);
      router.push('/');
    } else {
      setIsLoading(false);
    }
  });
};
