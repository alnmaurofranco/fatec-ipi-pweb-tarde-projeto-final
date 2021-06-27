import React from 'react';
import { Background, ModalWrapper, ModalImg, ModalContent, CloseModalButton } from './styles';

import imgModal from '../../assets/img/order_confirmed.svg';

export const Modal = ({ showModal, setShowModal }) => {
    return (
        <>
            {showModal ? (
                <Background>
                    <ModalWrapper showModal={showModal}>
                        <ModalImg src={imgModal} alt="Modal" />
                        <ModalContent>
                            <h1>kkk</h1>
                            <p>Lorem3231232321321213</p>
                            <button>OK</button>
                        </ModalContent>
                        <CloseModalButton aria-label="Close modal" onClick={() => setShowModal(prev => !prev)} />
                    </ModalWrapper>
                </Background>
            ) : null}
        </>
    )
}