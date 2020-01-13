import React, { Component } from 'react'
import UserRow from './UserRow';
import UserAPI from '../../api-services/user-api';
import {rootAPI} from "../../api-services";

export default class Users extends Component {

    state = {
        listUser: null
    }

    async componentDidMount() {
        let temp = await JSON.parse(localStorage.getItem('userInfo'));
        if(temp) {
            rootAPI.setToken(temp.token);
        }

        UserAPI.apiGetUser().then(res => {
            if(res.Data && res.Status == true) {
                this.setState({listUser: res.Data})
            }
        });
    }

    render() {
        return (
            <section>
                <div className="container-fluid">
                    <header >
                        <h1 className="h3 display text-primary">Users Management</h1>
                    </header>
                    <table className="table table-striped table-hover">
                        <thead className="thead-inverse">
                        <tr>
                            <th>STT</th>
                            <th>Tên User</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Công ty</th>
                            <th>Trạng thái</th>
                            <th>hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.listUser === null ? '' : this.state.listUser.map((value, key) => (
                                <UserRow
                                    stt={key + 1}
                                    fullName={value.user_name}
                                    // key={key} stt={key}
                                    // id={value.id}
                                    email={value.email}
                                    tel={value.tel}
                                    company={value.company_name}
                                    status={value.status}
                                />
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </section>

        )
    }
}
