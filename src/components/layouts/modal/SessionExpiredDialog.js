import { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import AuthService from "../../../service/auth.service";


class SessionExpiredDialog extends Component {
  constructor(props) {
    super(props);
    this.state={showModal: this.props.show}
  }

  handleClose = () => {
    this.setState({showModal: false});
    AuthService.logout(() => this.props.history.push("/login"));
  }

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Phiên đăng nhập đã hết. Vui lòng đăng nhập lại!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleClose}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default withRouter(SessionExpiredDialog);
