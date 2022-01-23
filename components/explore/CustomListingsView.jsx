import React from 'react';
import {
  gallery_icon,
  list_icon,
  map_icon,
} from '../Shared/Constant/Icons/AllIcons';

const CustomListingsView = ({ selected_type, setSelected_type }) => {
  const type = [
    
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
                ? '   bg-secondary border border-primary text-primary'
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

export default CustomListingsView;
