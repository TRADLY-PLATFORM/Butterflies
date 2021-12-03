/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/prop-types */
import React from 'react';
import fbIcon from '../../assets/Images/Invite/facebook.png';
import whatsappIcon from '../../assets/Images/Invite/whatsapp.png';
import instIcon from '../../assets/Images/Invite/instagram.png';
import shareIcon from '../../assets/Images/Invite/google-plus.png';
import groupIcon from '../../assets/Images/Invite/Group 3.png';
import Image from 'next/image';

const InviteFriend = ({ general_configs }) => {

  // const shareButton = document.querySelector('.share-button');
  // const shareDialog = document.querySelector('.share-dialog');
  // const closeButton = document.querySelector('.close-button');

  // shareButton.addEventListener('click', (event) => {
  //   if (navigator.share) {
  //     navigator
  //       .share({
  //         title: 'WebShare API Demo',
  //         url: 'https://codepen.io/ayoisaiah/pen/YbNazJ',
  //       })
  //       .then(() => {
  //         console.log('Thanks for sharing!');
  //       })
  //       .catch(console.error);
  //   } else {
  //     shareDialog.classList.add('is-open');
  //   }
  // });

  // closeButton.addEventListener('click', (event) => {
  //   shareDialog.classList.remove('is-open');
  // });

  return (
    <div className=" w-full  xxs:w-[350px] min-h-[600px] bg-[#FFFFFF] shadow-c-sm rounded-lg  flex flex-col j items-center">
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
      <div className="flex items-center mt-12 gap-3">
        <div className="cursor-pointer">
          <a
            target="_blank"
            href={`whatsapp://send?text=${general_configs?.branch_link_domain}`}
            data-action="share/whatsapp/share"
            target="_blank"
            rel="noreferrer"
          >
            <div className="w-[40px] h-[40px] relative  ">
              <Image src={whatsappIcon} layout="fill" objectFit="fill" />
            </div>
          </a>
        </div>
        <div className="cursor-pointer">
          <a
            target="_blank"
            href={`https://www.facebook.com/sharer/sharer.php?u=${general_configs?.branch_link_domain}`}
            rel="noreferrer"
          >
            <div className="w-[40px] h-[40px] relative  ">
              <Image src={fbIcon} layout="fill" objectFit="fill" />
            </div>
          </a>
        </div>
        <div className="cursor-pointer">
          <a
            onClick={() => {
              navigator
                .share({
                  title: `${general_configs?.invite_friends_collection_title}`,
                  url: `${general_configs?.branch_link_domain}`,
                })
                .then(() => {
                  console.log('Thanks for sharing!');
                })
                .catch(console.error);
            }}
          >
            <div className="w-[40px] h-[40px] aspect-w-1 aspect-h-1 relative">
              <Image src={shareIcon} layout="fill" objectFit="cover" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default InviteFriend;
