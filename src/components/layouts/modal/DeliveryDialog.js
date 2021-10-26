import { Modal, Button } from 'react-bootstrap';

const DeliveryDialog = (props) => {
    const { show, handleOk, handleClose, variant, message } = props;

    return (
        <Modal show={show} onHide={handleClose || handleOk}>
        <Modal.Header closeButton>
            <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <span className="mr-3">
                {variant=== "success" && <i className={`bi bi-check-circle-fill text-${variant}`}></i>}
                {variant=== "danger" && <i className={`bi bi-x-circle-fill text-${variant}`}></i>}
                {variant=== "primary" && <i className={`bi bi-exclamation-circle-fill`}></i>}
            </span>
            {message}
        </Modal.Body>
        <Modal.Footer>
        {handleClose && <Button variant="secondary" onClick={handleClose}>
            Hủy bỏ
        </Button>}
        <Button variant={variant} onClick={handleOk}>
            Đồng ý
        </Button>
        </Modal.Footer>
    </Modal>
    );
}

export default DeliveryDialog;