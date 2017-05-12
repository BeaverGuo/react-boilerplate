import {
  CHANGE_USERNAME,
} from '../actionType/changeUserName';


export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name,
  };
}