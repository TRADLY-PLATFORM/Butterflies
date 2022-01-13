import React from 'react';
import {
  gallery_icon,
  list_icon,
  map_icon,
} from '../Shared/Constant/Icons/AllIcons';

const ListingsView = ({ selected_type, setSelected_type }) => {
  const type = [
    {
      name: 'map_view',
      icon: map_icon,
    },
    {
      name: 'gallery_view',
      icon: gallery_icon,
    },
    {
      name: 'list_view',
      icon: list_icon,
    },
  ];
 
  return (
    <div>
      {type.map((item) => {
        return (
          <button
            key={item.name}
            className={[
              'p-3  sm:p-4  rounded-lg mr-2  overflow-hidden',
              item.name == selected_type
                ? '   bg-primary_light border border-primary text-primary'
                : 'text-[#121212] bg-white',
            ].join(' ')}
            onClick={() => setSelected_type(item.name)}
          >
            {item.icon}
          </button>
        );
      })}
    </div>
  );
};

export default ListingsView;
