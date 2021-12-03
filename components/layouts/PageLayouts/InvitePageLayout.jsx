import React from 'react';
import { useSelector } from 'react-redux';
import { configsSelector } from '../../../store/feature/configsSlice';
import InviteFriend from '../../InviteFriends/InviteFriend';

const InvitePageLayout = () => {
      const { general_configs, accounts_configs, marketplace_type } =
        useSelector(configsSelector);
    return (
      <div className=" flex justify-center ">
        {/* <iframe
          src="https://www.facebook.com/plugins/share_button.php?href=https://superadmin.dev.tradly.app/"
          width="96"
          height="20"
          scrolling="no"
          frameBorder="0"
          allowFullScreen="true"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        >
          Share
        </iframe> */}
        <InviteFriend general_configs={general_configs} />
      </div>
    );
};

export default InvitePageLayout;