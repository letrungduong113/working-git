import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Login.css';
import ApiService, { API_LIST, rootAPI } from "../../api-services";
import {connect} from 'react-redux'
import {setUserInfo} from '../../redux/actions/setUserInfo'
import $ from 'jquery';
import ModalMsg from '../Modal/Modal';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            passWord: '',
            isLoggedIn: false,
            isComplete: false,
            successMsg: '',
            isOpenModal: false,
        }
    }

    componentDidMount() {
        $('.toggle-password').on('click', function () {
            $(this).toggleClass('fa-eye fa-eye-slash');
            let input = $($(this).attr('toggle'));
            if (input.attr('type') === 'password') {
                input.attr('type', 'text');
            } else {
                input.attr('type', 'password');
            }
        })
    }


    pressToLogin = async () => {
        if(this.state.userName === '' || this.state.passWord === '') {
            this.setState({isOpenModal: true, successMsg: 'Bạn cần nhập đầy đủ thông tin'})
        }
        const loginInfo = {
            email: this.state.userName,
            password: this.state.passWord,
            remember_me: true
        };
        this.setState({isLoggedIn: true});
        await rootAPI.logIn(loginInfo).then(data => {
            if (data && data.Status == true) {
                var userInfo = {
                    token: data.Data.access_token,
                    name: data.Data.name,
                    tel: data.Data.tel,
                    intro: data.Data.intro,
                    role_id: data.Data.role_id,
                    email: data.Data.email,
                    address: data.Data.address,
                    company_name: data.Data.role_id == 1 ? '' : data.Data.company[0].company_name,
                    company_address: data.Data.role_id == 1 ? '' : data.Data.company[0].company_address,
                    company_tel: data.Data.role_id == 1 ? '' : data.Data.company[0].company_tel,
                    company_email: data.Data.role_id == 1 ? '' : data.Data.company[0].company_email,
                    status: data.Data.role_id == 1 ? '' : data.Data.company[0].status
                };
                var userInfoAdmin = {
                    token: data.Data.access_token,
                    name: data.Data.name,
                    tel: data.Data.tel,
                    intro: data.Data.intro,
                    role_id: data.Data.role_id,
                    email: data.Data.email,
                    address: data.Data.address,
                };
                console.log('data day', data.Data);
                data.Data.role_id == 1 ? this.props.setUserInfo(userInfoAdmin) : this.props.setUserInfo(userInfo);
                data.Data.role_id == 1 ? localStorage.setItem('userInfo', JSON.stringify(userInfoAdmin)) : localStorage.setItem('userInfo', JSON.stringify(userInfo));
                rootAPI.setToken(data.Data.access_token);
                this.setState({isLoggedIn: false, isComplete: true});
                console.log(data.Message)
            } else {
                this.setState({isLoggedIn: false, isOpenModal: true, successMsg: 'Sai mật khẩu hoặc tài khoản'});
            }
        });
    };

    render() {
        if (this.state.isComplete === true) {
            return <Redirect to='/'/>
        }
        return (
            <div style={{width: '100wh', height: '100vh', backgroundColor: '#004c40'}}>
                <div id="login-container">
                    <h3>Đăng nhập CRM</h3>
                    <hr/>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <form action method="post" onSubmit={(e) => {
                                    e.preventDefault();
                                    this.pressToLogin()
                                }}>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text" id="email-label">
                                            <i className="fa fa-envelope" aria-hidden="true"/>
                                        </span>
                                        </div>
                                        <input
                                            onChange={(event) => this.setState({userName: event.target.value})}
                                            type="text"
                                            className="form-control"
                                            placeholder="Nhập email"
                                            aria-label="Email"
                                            aria-describedby="email-label"
                                        />
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text" id="password-label">
                                            <i className="fa fa-key" aria-hidden="true"/>
                                        </span>
                                        </div>
                                        <input
                                            onChange={(event) => this.setState({passWord: event.target.value})}
                                            id="input-pwd"
                                            type="password"
                                            className="form-control"
                                            placeholder="Nhập mật khẩu"
                                            aria-label="Password"
                                            aria-describedby="password-label"
                                        />
                                        <span toggle="#input-pwd" className="fa fa-fw fa-eye toggle-password"/>
                                    </div>
                                    <div className="text-center mb-4">
                                        <input
                                            type="submit"
                                            className="btn btn-customized mr-3"
                                            value={"Đăng nhập"}
                                        />
                                        <Link to='forgotpwd'>
                                            <input
                                                type="submit"
                                                className="btn btn-customized mr-3"
                                                value={"Quên mật khẩu"}
                                            />
                                        </Link>
                                    </div>
                                    {
                                        this.state.isLoggedIn == true ?
                                            <div className="text-center mt-4">
                                                <i className="fas fa-3x fa-circle-notch fa-spin text-white mb-4"></i>
                                                <h2 className='text-white'>Đang đăng nhập...</h2>
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
                    button1={() => this.setState({isOpenModal: false})}
                    isShow={false}
                />
            </div>
        );
    }
}

export default connect(null, {setUserInfo})(Login)
