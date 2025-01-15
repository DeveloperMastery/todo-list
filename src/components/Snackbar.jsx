import { useEffect } from "react";
import Container from "../common/Container";
import Text from "../common/Text";
import { useSnackbar } from "../store/store";

function Snackbar({title}) {
    const isShowSnackbar = useSnackbar(state => state.isShowSnackbar)
    const hideSnackbar = useSnackbar(state => state.hideSnackbar)
    
    useEffect(() => {
        if(!isShowSnackbar)   return
        const timer = setTimeout(() => {
            hideSnackbar()
        }, 3000)
        return () => clearTimeout(timer)
    }, [isShowSnackbar])

    return isShowSnackbar &&  (
        <Container cx={'snackbar'}>
            <Text cx={'snackbar-text'} title={title} />
        </Container>
    )
}

export default Snackbar