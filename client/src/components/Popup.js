const styles = {
    popup_container: {
        position: "fixed",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "black",
    },
    popup_body: {
        position: "absolute",
        left: "30%",
        right: "30%",
        bottom: "30%",
        top: "30%",
        textAlign: "center",
        margin: "auto",
        padding: "16px",
        borderRadius: "15px",
        borderColor: "black",
        background: "white",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        display: "flex",
        flexDirection: "column",
        color: "black",
    },
    popup_close: {
        color: "black",
        alignSelf: "flex-end",
        cursor: "pointer",
    },
};

export const Popup = ({ text, closePopup }) => {
    return (
        <div style={styles.popup_container}>
            <div style={styles.popup_body}>
                <a style={styles.popup_close} onClick={closePopup}>
                    X
                </a>
                <h1>{text}</h1>
            </div>
        </div>
    );
};
