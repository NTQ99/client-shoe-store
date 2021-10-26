import { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class GeneralDialog extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      btnLoading: false
    })
  }
  
  handleOk = async () => {
    this.setState({btnLoading: true});
    await this.props.handleOk();
    this.setState({btnLoading: false});
  }
  render() {
    const props = this.props;
    const { btnLoading }  = this.state;
    const handleOk = this.handleOk;
    return (
      <Modal show={props.show} onHide={props.handleClose || props.handleOk}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(() => {
            switch (props.variant) {
              case "success": 
                return (<i className="bi bi-check-circle-fill text-success mr-3"></i>);
              case "error":
                return (<i className="bi bi-x-circle-fill text-danger mr-3"></i>);
              case "danger":
                return (<i className="bi bi-exclamation-circle-fill text-danger mr-3"></i>);
              default:
                return;
            }
          })()}
          {props.message}
        </Modal.Body>
        <Modal.Footer>
          {props.handleClose && (<>
            <Button variant="secondary" onClick={props.handleClose} disabled={btnLoading ? true : false}>
              Hủy bỏ
            </Button>
            <Button
              autoFocus
              variant={props.variant==="error"? "danger": props.variant}
              disabled={btnLoading ? true : false}
              onClick={handleOk}
            >
              {btnLoading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              {!btnLoading && "Đồng ý"}
            </Button>
          </>)}
          {!props.handleClose && (
            <Button variant={props.variant==="error"? "danger": props.variant} onClick={props.handleOk}>
              Đồng ý    
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default GeneralDialog;
