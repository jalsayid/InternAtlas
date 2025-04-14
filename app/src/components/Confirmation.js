import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../formsStyles.css';

function Confirmation({ 
    show, 
    onHide, 
    title, 
    bodyText, 
    closeButtonLabel, 
    saveButtonLabel, 
    onSave
}) {
  return (
    <Modal className="custom-modal" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{bodyText}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {closeButtonLabel || 'Close'}
        </Button>
        <Button variant="primary" onClick={onSave}>
          {saveButtonLabel || 'Save changes'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Confirmation;
