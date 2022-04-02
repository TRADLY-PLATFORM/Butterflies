import { TYPE_CONSTANT } from './Web_constant';

export const check_flavours = (number) => {
  if (Number(TYPE_CONSTANT.MARKETPLACE_FLAVOURS) === Number(number)) {
    return true;
  } else {
    return false;
  }
};
