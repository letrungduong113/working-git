import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import DangKyAPI from "../../api-services/dang-ky-api";
import {connect} from "react-redux";
import {setUserInfo} from "../../redux/actions/setUserInfo";
import ModalMsg from './/Modal'

class Header extends Component {
    state = {
        successMsg: '',
        isOpenModal: false
    };

    logOut() {
        this.props.setUserInfo(0);
        localStorage.removeItem('userInfo');
        DangKyAPI.apiLogout().then(res => {
            if(res) {
                this.setState({successMsg: res.message});
            }
        });
    }

    render() {
        return (
            <div>
                <header className="header">
                    <nav className="navbar">
                        <div className="container-fluid">
                            <div className="navbar-holder d-flex align-items-center justify-content-between">
                                <div className="navbar-header"><a href="/" className="navbar-brand">
                                    <div className="brand-text d-none d-md-inline-block"><span>MiraiSoft</span></div>
                                </a>
                                </div>
                                <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">

                                    {/*Create New User*/}
                                    {this.props.userInfo == null ? '' :
                                        this.props.userInfo.role_id == 3 || this.props.userInfo.role_id == 4 ? null :
                                            <li className="nav-item"><Link to="/addUsers"
                                                                           className="nav-link nav-link-hover"> <i
                                                className="fas fa-user-circle mr-2"/><span
                                                className="d-none d-sm-inline-block ">Tạo người dùng</span></Link></li>}
                                    {/*User Setting*/}
                                    <li className="nav-item ">
                                        <div className="dropdown">
                                            <a id="userSetting" rel="nofollow" data-target="#"
                                               href="#" data-toggle="dropdown"
                                               aria-haspopup="true" aria-expanded="false"
                                               className="nav-link dropdown-toggle nav-link-hover">
                                        <span
                                            className="d-none d-sm-inline-block nav-link-hover">Tài khoản</span></a>
                                            <ul aria-labelledby="userSetting" className="dropdown-menu">
                                                <li><Link to='/editprofile' rel="nofollow" href="#"
                                                          className="dropdown-item nav-link-hover"> <i
                                                    className="fas fa-user-edit"/><span>Sửa thông tin cá nhân</span></Link>
                                                </li>
                                                <li><Link to='/changePassword' rel="nofollow" href="#"
                                                          className="dropdown-item nav-link-hover"> <i
                                                    className="fas fa-key"/><span>Đổi mật khẩu</span></Link>
                                                </li>
                                                <li><a rel="nofollow" href="#" className="dropdown-item " onClick={() => this.setState({isOpenModal: true})}><i
                                                    className="fas fa-sign-out-alt" /><span>Đăng xuất</span></a>
                                                </li>
                                            </ul>
                                        </div>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
                <ModalMsg
                    isOpenModal={this.state.isOpenModal}
                    msg='Bạn có muốn đăng xuất khỏi hệ thống?'
                    button1={() => {this.logOut()}}
                    button2={() => this.setState({isOpenModal: false})}
                    isShow={true}
                />
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo.userInfo,
    }
};

export default connect(mapStateToProps, {setUserInfo})(Header)

