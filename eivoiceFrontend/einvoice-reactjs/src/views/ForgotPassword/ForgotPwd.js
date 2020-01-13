import React, { Component } from 'react';
import '../Login/Login.css';
import ModalMsg from '../Modal/Modal';
import DangKyAPI from '../../api-services/dang-ky-api';
import { Redirect } from 'react-router-dom';

export default class ForgotPwd extends Component {

    state = {
        email: '',
        isOpenModal: false,
        successMsg: '',
        isComplete: false,
        returnLogin: false,
        isSending: false
    }

    forgotPwd() {
        if(this.state.email == '') {
            this.setState({isOpenModal: true, successMsg: 'Bạn cần nhập email'});
            return;
        }
        var body = {
            email: this.state.email
        };
        this.setState({isSending: true})
        DangKyAPI.apiQuenMK(body).then(res => {
            if(res && res.Status == true) {
                this.setState({isSending: false})
                this.setState({isOpenModal: true, successMsg: res.Message, isComplete: true});
            }
            else {
                this.setState({isSending: false})
                this.setState({isOpenModal: true, successMsg: 'Bạn cần nhập đúng định dạng email hoặc email này không tồn tại trong hệ thống. Xin thử lại'});
                return;
            }
        })
    }
    

    render() {
        if(this.state.returnLogin == true) {
            return <Redirect to='/login' />
        }
        return (
            <div style={{width: '100wh', height: '100vh', backgroundColor: '#004c40'}}>
                <div style={{height: 400}} id="login-container">
                    <h3>Quên mật khẩu</h3>
                    <hr />
                    <div className="container">
                        <div className="row">
                        <div className="col-12">
                            <form action method="post" onSubmit={(e) => {e.preventDefault(); this.forgotPwd() }}>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="email-label">
                                            <i className="fa fa-envelope" aria-hidden="true" />
                                        </span>
                                    </div>
                                    <input 
                                        onChange={(event) => this.setState({email: event.target.value})}
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Nhập email"
                                        aria-label="Email" 
                                        aria-describedby="email-label" 
                                    />
                                </div>
                
                                <div className="text-center mb-4">
                                    <input
                                        type="submit"
                                        className="btn btn-customized mr-3"
                                        value={"Gửi"}
                                    />
                                </div> 
                                {
                                    this.state.isSending == true ?
                                    <div className="text-center mt-4">
                                        <i className="fas fa-3x fa-circle-notch fa-spin text-white mb-4"></i>
                                        <h2 className='text-white'>Đang gửi...</h2>
                                    </div> : null
                                }
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
                <ModalMsg 
                    isOpenModal={this.state.isOpenModal} 
                    msg={this.state.successMsg} 
                    button1={() => this.state.isComplete == true ? this.setState({returnLogin: true}) : this.setState({isOpenModal: false})} 
                    isShow={false}
                />
            </div>
        )
    }
}
