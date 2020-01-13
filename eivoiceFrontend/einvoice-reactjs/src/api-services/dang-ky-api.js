import ApiService, {API_LIST, rootAPI} from "./index";

class DangKyAPI extends ApiService {

    async apiDangKy(data) {
        return await rootAPI.postAItemNoId(API_LIST.API_DANG_KY, data);
    }

    async apiDoiMK(data) {
        return await rootAPI.postAItemNoId(API_LIST.API_DOI_MK, data);
    }

    async apiQuenMK(data) {
        let res = await rootAPI.postAItemNoId(API_LIST.API_QUEN_MK, data);
        return res;
    }

    async apiLogout() {
        return await rootAPI.apiGetList(API_LIST.API_LOGOUT);
    }
}

export default new DangKyAPI();
