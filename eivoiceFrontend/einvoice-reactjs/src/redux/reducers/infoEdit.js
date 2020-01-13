import { GET_PARTNER_EDIT } from '../actions/getInfoEdit';
import { GET_CUSTOMER_EDIT } from '../actions/getInfoEdit';
import { GET_PRODUCT_EDIT} from "../actions/getInfoEdit";
import { GET_CONTRACT_EDIT} from "../actions/getInfoEdit";
import {GET_ACTIVITY_EDIT} from "../actions/getInfoEdit"
import {GET_SERVICE_EDIT} from "../actions/getInfoEdit";

const initialState = {
    partnerEdit: null,
    customerEdit: null,
    productEdit: null,
    activityEdit: null,
    serviceEdit: null,
    contractEdit: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PARTNER_EDIT: return {
            ...state,
            partnerEdit: action.partnerEdit,
        };
        case GET_CUSTOMER_EDIT: return {
            ...state,
            customerEdit: action.customerEdit,
        };
        case GET_PRODUCT_EDIT: return {
            ...state,
            productEdit: action.productEdit,
        };
        case GET_CONTRACT_EDIT: return {
            ...state,
            contractEdit: action.contractEdit,
        };
        case GET_ACTIVITY_EDIT: return {
            ...state,
            activityEdit: action.activityEdit
        };
        case GET_SERVICE_EDIT: return {
            ...state,
            serviceEdit: action.serviceEdit
        };
        default: return state;
    }
}
