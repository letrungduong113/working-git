import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';

export default class ModalMsg extends Component {
    render() {
        return (
            <Modal isOpen={this.props.isOpenModal}>
                <ModalHeader>Thông báo</ModalHeader>
                <ModalBody>{this.props.msg}</ModalBody>
                <ModalFooter>
                    <Button className='bg-success' onClick={() => this.props.button1()}>Đồng ý</Button>
                    {this.props.isShow == true ? 
                    <Button className='bg-danger' onClick={() => this.props.button2()}>Hủy</Button> : null}
                </ModalFooter>
            </Modal>
        )
    }
}
