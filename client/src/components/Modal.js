import { useRef, useEffect } from "react";

const styles = {
    dialog: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",

        width: "100%",
        height: "100%",
        maxWidth: "none",
        maxHeight: "none",
        border: "none",
    },
    dialog_inner: {
        backgroundColor: "white",
        border: "2px solid #eee",
        borderRadius: "8px",
        padding: "1rem",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
    },
    dialog_content: {
        padding: "16px",
        marginBottom: "18px",
    },
};

function Modal({ openModal, closeModal, children }) {
    const ref = useRef();

    useEffect(() => {
        if (openModal) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [openModal]);

    return (
        <dialog style={styles.dialog} ref={ref} onCancel={closeModal}>
            <div style={styles.dialog_inner}>
                <div style={styles.dialog_content}>{children}</div>
                <button className="btn" onClick={closeModal}>
                    Close
                </button>
            </div>
        </dialog>
    );
}

export default Modal;
