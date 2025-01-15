import Container from "../common/Container"
import Heading from "../common/Heading"
import Overlay from "../common/Overlay"
import LoginButton from "../common/LoginButton"
import { useSession } from "../store/store"

function Modal({onClose}) {
    const session = useSession(state => state.session)

    const handleOverlayClick = function()   {
        if(!session)    return
        onClose()
    }

    return (
        <>
            <Container cx={'modal-container'}>
                    <Heading cx={!!session ? 'modal-signin-note' : 'modal-heading'} title={!!session ? `Logged in as ${session.email}` : 'Login using Google'} type={!!session ? 'h4' : 'h2'} />
                    <LoginButton cx={'button'} />
            </Container>
            <Overlay cx={'modal-overlay'} onClick={handleOverlayClick} />
        </>
    )
}

export default Modal