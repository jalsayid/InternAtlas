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
        <button className='second-btn' onClick={onHide}>
          {closeButtonLabel || 'Close'}
        </button>
        <button className='def-btn' onClick={onSave}>
          {saveButtonLabel || 'Save changes'}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default Confirmation;
