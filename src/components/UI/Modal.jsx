import { forwardRef, useImperativeHandle, useRef, useContext } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import Snackbar from './Snackbar';

import { ModalContext } from '../../store/modal-context';

const Modal = forwardRef(function Modal(
    { children, submitBtnText, hasError },
    ref
) {
    const dialog = useRef();
    const { handleModalSubmit, handleModalClose, disableModal } =
        useContext(ModalContext);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
            close() {
                dialog.current.close();
            },
        };
    });

    return createPortal(
        <dialog className='modal' ref={dialog} onClose={handleModalClose}>
            {hasError && <Snackbar message={hasError.message} type='error' />}
            {children}
            <form method='dialog' className='modal-actions'>
                <Button textOnly={true} onClick={handleModalClose}>
                    Close
                </Button>
                <Button
                    className={`${disableModal ? 'disabled' : ''}`}
                    disabled={disableModal}
                    onClick={handleModalSubmit}
                >
                    {submitBtnText}
                </Button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
});

export default Modal;
