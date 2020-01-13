import { combineReducers } from 'redux';
import userInfo from './userInfo';
import partnerEdit from './infoEdit';
import customerEdit from './infoEdit';
import productEdit from './infoEdit';
import activityEdit from './infoEdit';
import contractEdit from './infoEdit';
import serviceEdit from './infoEdit';

export default combineReducers({
  userInfo, partnerEdit, customerEdit, productEdit, activityEdit, contractEdit, serviceEdit
});
