import React, { Component } from 'react';
import {connect} from 'react-redux';
import UserAPI from '../../api-services/user-api';
import ModalMsg from '../../components/Modal/Modal';
import {setUserInfo} from '../../redux/actions/setUserInfo'

class EditProfile extends Component {

    state = {
        address: '',
        companyName: '',
        companyEmail: '',
        companyTel: '',
        intro: '',
        companyAddress: '',
        status: '1', //not number,
        isOpenModal: false,
        successMsg: ''
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                name: this.props.userInfo == null ? '' : this.props.userInfo.name, 
                tel: this.props.userInfo == null ? '' : this.props.userInfo.tel, 
                address: this.props.userInfo == null ? '' : this.props.userInfo.address,
                status: this.props.userInfo == null ? '' : this.props.userInfo.role_id == 1 ? '1' : this.props.userInfo.status.toString(),
                intro: this.props.userInfo == null ? '' : this.props.userInfo.intro
            })
        }, 500);
    }
    

    updateProfile() {
        if(this.state.name == '' || this.state.tel == '' || this.state.address == '') {
            this.setState({isOpenModal: true, successMsg: 'Bạn cần nhập thông tin thay đổi'});
            return;
        }
        var body = {
            name: this.state.name,
            tel: this.state.tel,
            intro : this.state.intro,
            address: this.state.address,
            status : Number(this.state.status)
        }
        UserAPI.apiEditProfile(body).then(res => {
            if(res && res.Status == true) {
                this.setState({isOpenModal: true, successMsg: res.Message});
                var userInfo = {
                    token: this.props.userInfo == null ? '' : this.props.userInfo.token,
                    name: this.state.name,
                    tel: this.state.tel,
                    intro: this.state.intro,
                    role_id: this.props.userInfo == null ? '' : this.props.userInfo.role_id,
                    email: this.props.userInfo == null ? '' : this.props.userInfo.email,
                    address: this.state.address,
                    company_name: this.props.userInfo == null ? '' : this.props.userInfo.company_name,
                    company_address: this.props.userInfo == null ? '' : this.props.userInfo.company_address,
                    company_tel: this.props.userInfo == null ? '' : this.props.userInfo.company_tel,
                    company_email: this.props.userInfo == null ? '' : this.props.userInfo.company_email,
                    status: Number(this.state.status)
                };
                this.props.setUserInfo(userInfo);
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
            }
            else {
                this.setState({isOpenModal: true, successMsg: 'Sửa thông tin thất bại. Vui lòng thử lại sau'});
                return;
            }
        });
    }

    handleOptionChange = changeEvent => {
        this.setState({
            status: changeEvent.target.value
        });
      };

    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                    <form style={{width: 550}} method='post'>
                    <div className="card border-primary mb-3 mt-5">
                        <h3 className="card-header text-center text-primary">Sửa thông tin cá nhân</h3>
                        <div className="card-body text-primary">
                    
                            <div className="form-group mt-4">
                                <input
                                    type="text"
                                    name='tel'
                                    className="input-activity"
                                    placeholder="Nhập họ và tên"
                                    onChange={(event) => this.setState({name: event.target.value})}
                                    defaultValue={this.props.userInfo == null ? '' : this.props.userInfo.name}
                                />
                            </div>
                            <div className="form-group mt-4">
                                <input
                                    type="text"
                                    name='tel'
                                    className=" input-activity"
                                    placeholder="Nhập mail"
                                    onChange={(event) => this.setState({email: event.target.value})}
                                    defaultValue={this.props.userInfo == null ? '' : this.props.userInfo.email}
                                    disabled={true}
                                />
                            </div>
                            <div className="form-group mt-4">
                                <input
                                    type="number"
                                    name='tel'
                                    className="input-activity"
                                    placeholder="Nhập số điện thoại"
                                    onChange={(event) => this.setState({tel: event.target.value})}
                                    defaultValue={this.props.userInfo == null ? '' : this.props.userInfo.tel}
                                />
                            </div>
                            <div className="form-group mt-4">
                                <input
                                    type="text"
                                    name='tel'
                                    className="input-activity"
                                    placeholder="Nhập địa chỉ"
                                    onChange={(event) => this.setState({address: event.target.value})}
                                    defaultValue={this.props.userInfo == null ? '' : this.props.userInfo.address}
                                />
                            </div>
                            <div className="form-group mt-4">
                                <input
                                    type="text"
                                    name='tel'
                                    className="input-activity"
                                    placeholder="Nhập giới thiệu"
                                    onChange={(event) => this.setState({intro: event.target.value})}
                                    defaultValue={this.props.userInfo == null ? '' : this.props.userInfo.intro}
                                />
                            </div>
                            {
                                this.props.userInfo == null ? '' : 
                                this.props.userInfo.role_id == 1 ? null :
                                (
                                    <div>
                                        <h1 className='mb-4 mt-4 text-center'>THÔNG TIN CÔNG TY</h1><hr style={{backgroundColor: 'black', width: '80%'}} />
                                        <h4 className='mb-4 text-center'>Công ty làm việc: {this.props.userInfo == null ? '' : this.props.userInfo.company_name}</h4>
                                        <h4 className='mb-4 text-center'>Địa chỉ Công ty: {this.props.userInfo == null ? '' : this.props.userInfo.company_address}</h4>
                                        <h4 className='mb-4 text-center'>Email Công ty: {this.props.userInfo == null ? '' : this.props.userInfo.company_email}</h4>
                                        <h4 className='mb-4 text-center'>Số điện thoại Công ty: {this.props.userInfo == null ? '' : this.props.userInfo.company_tel}</h4>

                                        <div className="form-check text-center">
                                            <label className='mr-4'>
                                                <input
                                                    type="radio"
                                                    value='1'
                                                    checked={this.state.status === '1'}
                                                    className="form-check-input"
                                                    onChange={this.handleOptionChange}
                                                />
                                                Đang làm việc
                                            </label>
                                            <label className='ml-4'>
                                                <input
                                                    type="radio"
                                                    value='2'
                                                    checked={this.state.status === '2'}
                                                    className="form-check-input"
                                                    onChange={this.handleOptionChange}
                                                />
                                                Đã nghỉ
                                            </label>
                                        </div>
                                    </div>
                                )
                            }

                            <div className="form-group mt-4">
                                <input
                                    className="btn btn-block btn-primary"
                                    value='Cập nhật'
                                    onClick={() => this.updateProfile()}
                                />
                            </div>
                        </div>
                    </div>
                    </form>
                    <ModalMsg
                        isOpenModal={this.state.isOpenModal}
                        msg={this.state.successMsg}
                        button1={() => this.setState({isOpenModal: false})}
                        isShow={false}
                    />
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      userInfo: state.userInfo.userInfo
    }
}

export default connect(mapStateToProps, {setUserInfo})(EditProfile)
