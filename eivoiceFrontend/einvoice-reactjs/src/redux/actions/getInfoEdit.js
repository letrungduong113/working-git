export const GET_PARTNER_EDIT = 'GET_PARTNER_EDIT';
export const GET_CUSTOMER_EDIT = 'GET_CUSTOMER_EDIT';
export const GET_PRODUCT_EDIT = 'GET_PRODUCT_EDIT';
export const GET_ACTIVITY_EDIT = 'GET_ACTIVITY_EDIT';
export const GET_CONTRACT_EDIT = 'GET_CONTRACT_EDIT';
export const GET_SERVICE_EDIT = 'GET_SERVICE_EDIT';


export function getPartnerEdit(partnerEdit) {
  // alert(JSON.stringify(markers))
  return {
    type: GET_PARTNER_EDIT,
    partnerEdit
  };
}

export function getCustomerEdit(customerEdit) {
  // alert(JSON.stringify(markers))
  return {
    type: GET_CUSTOMER_EDIT,
    customerEdit
  };
}

export function getProductEdit(productEdit) {
  return {
    type: GET_PRODUCT_EDIT,
    productEdit,
  }
}

export function getActivityEdit(activityEdit) {
  return {
    type: GET_ACTIVITY_EDIT,
    activityEdit,
  }
}

export function getContractEdit(contractEdit) {
  return {
    type: GET_CONTRACT_EDIT,
    contractEdit,
  }
}

export function getServiceEdit(serviceEdit) {
  return {
    type: GET_SERVICE_EDIT,
    serviceEdit,
  }
}
