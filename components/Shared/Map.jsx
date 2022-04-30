import { GoogleMap, LoadScript } from '@react-google-maps/api';
import CustomLoading from './Loading/CustomLoading';
import { TYPE_CONSTANT } from '../../constant/Web_constant';

const Map = () => {
  //const containerStyle for map

  const containerStyle = {
    width: '100%',
    height: '100%',
  };
  return (
    <LoadScript
      googleMapsApiKey={TYPE_CONSTANT?.general_configs?.google_map_api_key}
      loadingElement={CustomLoading}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: -3.745,
          lng: -38.523,
        }}
        zoom={10}
      ></GoogleMap>
    </LoadScript>
  );
};

export default Map;