import { Modal, Button } from 'react-bootstrap';
import SVG from 'react-inlinesvg';

const UserDialog = (props) => {
    const { show, handleOk, handleClose, variant, message } = props;

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <span className={`svg-icon svg-icon-xxl svg-icon-${variant} mr-3`}>
                {variant=== "primary" && <SVG src="assets/media/svg/icons/General/Unlock.svg" />}
                {variant=== "warning" && <SVG src="assets/media/svg/icons/General/Lock.svg" />}
                {variant=== "danger" && <SVG src="assets/media/svg/icons/Code/Minus.svg" />}
            </span>
            {message}
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Hủy bỏ
        </Button>
        <Button variant={variant} onClick={handleOk}>
            Đồng ý
        </Button>
        </Modal.Footer>
    </Modal>
    );
}

export default UserDialog;