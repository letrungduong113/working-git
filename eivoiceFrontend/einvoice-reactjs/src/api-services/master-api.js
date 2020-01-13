import ApiService, {API_LIST, rootAPI} from "./index";

class MasterApi extends ApiService {

    async apiGetListRelationshipLevel() {
        return await rootAPI.apiGetList(API_LIST.API_GET_RELATIONSHIP_LEVEL)
    }
    async apiGetListContractType() {
        return await rootAPI.apiGetList(API_LIST.API_GET_CONTRACT_TYPE)
    }
    async apiGetListActivityTool() {
        return await rootAPI.apiGetList(API_LIST.API_GET_ACTIVITY_TOOL)
    }
    async apiGetListActivityType() {
        return await rootAPI.apiGetList(API_LIST.API_GET_ACTIVITY_TYPE)
    }
    async apiGetListPurposeType() {
        return await rootAPI.apiGetList(API_LIST.API_GET_PURPOSE_TYPE)
    }
    async apiGetListOperationStatus() {
        return await rootAPI.apiGetList(API_LIST.API_GET_OPERATION_STATUS)
    }
    async apiGetListServiceType() {
        return await rootAPI.apiGetList(API_LIST.API_GET_SERVICE_TYPE)
    }
    async apiGetListCompanyPositionType() {
        return await rootAPI.apiGetList(API_LIST.API_GET_COMPANY_POSITION_TYPE)
    }

    async apiGetListStatus() {
        return await rootAPI.apiGetList(API_LIST.API_GET_STATUS);
    }

    async apiGetListCompanyScale() {
        return await rootAPI.apiGetList(API_LIST.API_GET_COMPANY_SCALE)
    }
}

export default new MasterApi();
