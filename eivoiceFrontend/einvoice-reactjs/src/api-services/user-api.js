import ApiService, {API_LIST, rootAPI} from "./index";

class UserAPI extends ApiService {

    async apiGetManager() {
        let res = await rootAPI.apiGetList(API_LIST.API_GET_LIST_MANAGER);
        return res;
    }

    async apiGetUser() {
        return await rootAPI.apiGetList(API_LIST.API_GET_LIST_USER);
    }

    async apiEditProfile(data) {
        return await rootAPI.postAItemNoId(API_LIST.API_EDIT_PROFILE, data);
    }
}

export default new UserAPI();
