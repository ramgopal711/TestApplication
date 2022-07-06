import "./style.css";

function Modal(props) {
  const { onClose, children, headerName } = props;

  return (
    <div className="modal-content">
      <div className="modal-header">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{headerName}</h2>
      </div>
      <div className="modal-body">{children}</div>
    </div>
  );
}

export default Modal;
