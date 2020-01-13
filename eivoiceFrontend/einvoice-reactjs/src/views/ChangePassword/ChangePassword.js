import React, { Component } from 'react';
import DangKyAPI from '../../api-services/dang-ky-api';

export default class ChangPassword extends Component {

    state = {
        oldPassword: '',
        newPassword: '',
        rePassword: ''
    };

    changePassword() {
        if(this.state.oldPassword == '' || this.state.newPassword == '' || this.state.rePassword == '') {
            return alert('Bạn cần nhập đầy đủ thông tin')
        }
        if(this.state.newPassword !== this.state.rePassword) {
            return alert('Bạn đã nhập mật khẩu không khớp nhau. Vui lòng nhập lại')
        }
        var body = {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
            againPassword: this.state.newPassword
        };
        DangKyAPI.apiDoiMK(body).then(res => {
            if(res && res.Status == true) {
                return alert(res.Message);
            }
            else return alert(res.Message + ' Bạn cần nhập đúng mật khẩu cũ')
        })
    }

    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <form style={{width: 550}} method='post'>
                    <div className="card border-primary mb-3 mt-5">
                        <h3 className="card-header text-center text-primary">Change Password</h3>
                        <div className="card-body text-primary">
                            <div className="form-group text-center mt-4">
                                <input
                                    type="password"
                                    name='tel'
                                    className="input-activity"
                                    placeholder="Input current password"
                                    onChange={(event) => this.setState({oldPassword: event.target.value})}
                                />
                            </div>
                            <div className="form-group mt-4">
                                <input
                                    type="password"
                                    name='tel'
                                    className="input-activity"
                                    placeholder="Input new password"
                                    onChange={(event) => this.setState({newPassword: event.target.value})}
                                />
                            </div>
                            <div className="form-group mt-4">
                                <input
                                    type="password"
                                    name='tel'
                                    className="input-activity"
                                    placeholder="Input new password again"
                                    onChange={(event) => this.setState({rePassword: event.target.value})}
                                />
                            </div>
                            <div className="form-group mt-4">
                                <input
                                    type='reset' //Để sau khi click thêm mới n sẽ reset, và vùng rs phải bọc tong thẻ form
                                    className="btn btn-block btn-primary"
                                    value='Save'
                                    onClick={(e) => {e.preventDefault();this.changePassword()}}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
