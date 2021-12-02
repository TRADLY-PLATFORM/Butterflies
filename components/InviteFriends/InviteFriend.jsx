/* eslint-disable react/prop-types */
import React from 'react';
import fbIcon from '../../assets/Images/Invite/facebook.png';
import whatsappIcon from '../../assets/Images/Invite/whatsapp.png';
import instIcon from '../../assets/Images/Invite/instagram.png';
import shareIcon from '../../assets/Images/Invite/google-plus.png';
import groupIcon from '../../assets/Images/Invite/Group 3.png';
import Image from 'next/image';

const InviteFriend = ({ general_configs }) => {
  return (
    <div className=" w-[350px] min-h-[600px] bg-[#FFFFFF] shadow-c-sm rounded-lg  flex flex-col j items-center">
      <div className="w-[252px] h-[197px] relative mt-12">
        <Image src={groupIcon} layout="fill" objectFit="fill" />
      </div>
      <div className="mt-9">
        <p className="text-[#212121] text-lg font-semibold  text-center">
          {general_configs?.invite_friends_collection_title}
        </p>
        <p className="text-sm font-medium text-[#212121] text-center mt-3">
          {general_configs?.invite_friends_collection_description}
        </p>
      </div>
      <div>
        <div>
          <a
            target="_blank"
            href={`https://www.facebook.com/sharer/sharer.php?u=${general_configs?.branch_link_base_url}`}
            rel="noreferrer"
          >
            <div className="w-[40px] h-[40px] relative mt-12">
              <Image src={fbIcon} layout="fill" objectFit="fill" />
            </div>
          </a>
        </div>
        <div>
          <a
            target="_blank"
            href={`https://www.whatsapp.com/sharer/sharer.php?u=${general_configs?.branch_link_base_url}`}
            rel="noreferrer"
          >
            <div className="w-[40px] h-[40px] relative mt-12">
              <Image src={whatsappIcon} layout="fill" objectFit="fill" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default InviteFriend;
