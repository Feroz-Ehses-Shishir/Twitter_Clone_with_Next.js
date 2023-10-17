import styles from "../component/Modal.module.css";

const Modal = ({ isOpen, closeModal, children }) => {
  return (
    <>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
          <button className={styles.btn} onClick={closeModal}>X</button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
