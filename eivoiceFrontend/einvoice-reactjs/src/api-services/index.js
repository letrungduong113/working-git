const server = 'http://27.72.31.133:6898/api/';

export const API_LIST = {
    LOG_IN: 'login',

    //List Master API
    API_GET_LIST_USER: 'user-list',
    API_GET_LIST_MANAGER: 'manager-list',
    API_EDIT_PROFILE: 'edit-user',
    API_GET_RELATIONSHIP_LEVEL: 'master/relationship-level',
    API_GET_CONTRACT_TYPE: 'master/contract-type',
    API_GET_ACTIVITY_TOOL: 'master/activity-tool',
    API_GET_ACTIVITY_TYPE: 'master/activity-type',
    API_GET_PURPOSE_TYPE: 'master/purpose-type',
    API_GET_OPERATION_STATUS: 'master/operation-status',
    API_GET_SERVICE_TYPE: 'master/service-type',
    API_GET_COMPANY_POSITION_TYPE: 'master/company-position-type',
    API_GET_STATUS: 'master/status',
    API_GET_COMPANY_SCALE: 'master/scale-company',

    //Đăng ký
    API_DANG_KY: 'adduser',
    API_LOGOUT: 'logout',

    //Đổi mật khẩu
    API_DOI_MK: 'resetpassword',
};

export default class ApiService {
    static accesstoken = '';
    setToken(token) {
        // console.log("setToken:", token)
        this.accesstoken = token;
    }
    getToken() {
        return "Bearer " + this.accesstoken;
    }
    removeToken() {
        this.accesstoken = '';
    }
    async apiGetList(apiName, params = null) {
        let paramStr = '?';
        if (params) {
            Object.keys(params).map((item) => {
                paramStr += (item + "=" + params[item] + "&");
            })
        }
        const paramStrFull = paramStr.slice(0, -1);
        let url = server + apiName + paramStrFull
        // alert(this.getToken())
        try {
            let response = await fetch(
                url,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: this.getToken(),
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(url);
            console.log('Res apigetlist', response);
            console.log('Token', this.getToken());
            if (response.status === 200) {
                let responseJson = await response.json();
                console.log('OK ' + JSON.stringify(responseJson));
                return responseJson;
            }
            else {
                // this.processError(apiName, response.status, response);
                console.log('get Data err')
                return null;
            }
        } catch (error) {
            console.log('Lỗi ' + error);
            return null;
        }
    }

    async apiGetDetail(apiName, id, userId) {
        // alert(apiName)
        // if (isUsingDummy || DummyDataService.isForcedDummy(apiName)) {
        //     return DummyDataService.getDummyData(apiName, id);
        // }
        var token = this.accesstoken;
        let url = server + apiName;
        if (id) {
            url = url + '/' + id;
        }

        try {
            let response = await fetch(
                url,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: token,
                        'Content-Type': 'application/json',
                        userId: userId
                    },
                }
            )
            console.log("---------------------------------------------------------------");
            console.log(url);
            console.log(response.status);
            if (response.status == "200") {
                let responseJson = await response.json();
                //console.log(responseJson);
                // alert(JSON.stringify(responseJson))
                return responseJson;
            }
            else {
                this.processError(apiName, response.status, response);
                return null;
            }

        } catch (error) {
            //alert(error);
            console.error(error);
            return null;
        }
    }

    async logIn(loginInfo) {
        // if (isUsingDummy) {
        //     return DummyDataService.getDummyData(API_LIST.LOG_IN);
        // }
        let url = server + API_LIST.LOG_IN;
        try {
            let response = await fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    timeout: 10000,
                    body: JSON.stringify(loginInfo)
                }
            )
            if (response.status == "200") {
                // console.log("login success:", response)
                // this.setToken(response.headers.map.authorization);
                let responseJson = await response.json();
                return responseJson;
            }
            else {

                return null;
            }

        } catch (error) {
            return null;
        }
    }

    async postAItem(apiName, id, itemData) {
        // if (isUsingDummy || DummyDataService.isForcedDummy(apiName)) {
        //     return DummyDataService.getDummyData(apiName);
        // }
        const token = this.accesstoken;
        let url = server + apiName + "/" + id;
        console.log(url);
        // console.log("token---:", this.getToken());
        // console.log("body: ", JSON.stringify(itemData))
        try {
            let response = await fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        Authorization: this.getToken(),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(itemData)
                }
            )
            console.log("HTTP status: " + response.status);
            if (response.status === 200) {
                let responseJson = await response.json();
                console.log(responseJson);
                // alert(JSON.stringify(responseJson))
                return responseJson;
            }
            else {
                this.processError(apiName, response.status, response);
                return null;
            }
        } catch (error) {
            return null;
        }
    }

    async postAItemNoId(apiName, itemData) {
        let url = server + apiName;
        // console.log(url);
        // console.log("token---:", this.accesstoken);
        // console.log('id+itemData')
        // alert(JSON.stringify(itemData))

        try {

            let response = await fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        Authorization: this.getToken(),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(itemData)

                }
            )
            console.log('itemData', itemData)
            console.log('response', response)
            if (response.status === 201 || response.status === 200) {
                let responseJson = await response.json();
                console.log('AAAAAAAAAAAAÂ' + JSON.stringify(responseJson));
                return responseJson;
            }
            else {
                console.log('Fail');
                this.processError(apiName, response.status, response);
                return null;
            }
        } catch (error) {
            //console.log(error);
            // alert(error) 
            return null;
        }
    }

    async apiPostHaveFile(apiName, data, uploadFile) {
        let url = server + apiName;
        const form = new FormData();

        form.append('attachment', uploadFile);
        form.append('type', data.type);
        form.append('customer_id', data.customer_id);
        form.append('service_id', data.service_id);
        form.append('partner_id', data.partner_id);
        form.append('content', data.content);
        form.append('date_start', data.date_start);
        form.append('date_end', data.date_end);
        form.append('cost', data.cost);
        form.append('status', data.status);
        form.append('id', data.id);
        for(var pair of form.entries()) {
            console.log(pair[0]+', '+pair[1]);
          }
        //  console.log("------------------Uploading File...--------------------")
        //  console.log(" API name: " + url);
        try {
            let response = await fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                         Authorization: this.getToken(),
                        // 'Content-Type': 'multipart/form-data;',
                        // 'Accept': 'application/json',
                    },
                    body: form,
                }
            )
             console.log(" HTTP status: " + response.status);
            if (response.status == "200") {
                let responseJson = await response.json();
                console.log(responseJson);
                return responseJson;
            }
            else {
                this.processError(apiName, response.status, response);
                return null;
            }
        } catch (error) {
            console.log("------API ERROR-------")
            console.log(error);
            return null;
        }

    }

    async processError(api, errorCode, response) {
        if (errorCode !== 500) {
            return 'Đường truyền tín hiệu không ổn định\n Bạn vui lòng truy cập lại sau';
        }
        if (errorCode.toString() == 410) {
            return "Bạn vui lòng đăng nhập lại"
        }
    }
}

export const rootAPI = new ApiService();
