import styled from "styled-components";
import close from "../../asset/close.png"

const UpcomingModal = ({closeModal}) => {
    const CloseButton = {
        position: "fixed",
        top: "1rem",
        right: "1rem",
        width: "2rem",
        height: "2rem",
    }
    
    return(
        <ModalWrapper onClick={closeModal}>
            <Modal onClick={(e) => {e.stopPropagation();}}>
                <img src={close} alt="close" style={CloseButton} onClick={closeModal}></img>
                세부 정보?
            </Modal>
        </ModalWrapper>
    );
}

export default UpcomingModal;

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 1;
`;

const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 80%;
    transform: translate(-50%, -50%);
    background-color: white;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
`;