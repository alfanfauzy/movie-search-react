import React, {useState} from 'react'
import {Button, Modal} from 'react-bootstrap'

const PopUpModal = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    return (
        <div>
            <Modal
                {...props}
            >
                <Modal.Body>
                    <h4>{props.movieByID.Title}</h4>
                    <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.close}>Close</Button>
                </Modal.Footer> 
            </Modal>
        </div>
    )
}

export default PopUpModal
