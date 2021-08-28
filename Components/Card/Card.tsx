import React, { FC, HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant: 'elevation' | 'outlined';
  classes?: string;
}

export const Card: FC<CardProps> = ({ variant = 'elevation', children, classes, ...rest }) => {
  return (
    <div
      className={[
        classes,
        'rounded-xl p-2',
        `${variant === 'elevation' ? 'shadow-md' : 'border-2 border-solid'}`
      ].join(' ')}
      {...rest}>
      {children}
    </div>
  );
};