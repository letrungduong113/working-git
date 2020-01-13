import React, { Component } from 'react'

export default class UserRow extends Component {
    render() {
        return (
            <tr>
                <td >{this.props.stt}</td>
                <td>{this.props.fullName}</td>
                <td>{this.props.email}</td>
                <td>{this.props.tel}</td>
                <td>{this.props.company}</td>
                <td>{this.props.status == 1 ? 'Đang hoạt động' : 'Đã nghỉ'}</td>
                <td>
                    <div className="btn btn-group">
                        <i className="fas fa-2x fa-eye mr-3" />
                        <i className="fas fa-2x fa-edit mr-3" />
                        <i className="fas fa-2x fa-trash mr-3" />
                    </div>
                </td>
            </tr>
        )
    }
}
