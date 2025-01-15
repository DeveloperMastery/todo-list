import { useEffect, useState } from 'react'
import Container from './common/Container'
import Heading from './common/Heading'
import InputContainer from './components/InputContainer'
import Modal from './components/Modal'
import Todos from './components/Todos'
import { useSession, useSnackbar } from './store/store'
import Snackbar from './components/Snackbar'

function App() {
  const [showModal, setShowModal] = useState(true)

  const isLoggedIn = useSession(state => state.isLoggedIn)
  const showSnackbar = useSnackbar(state => state.showSnackbar)

  const closeModal = function() {
    setShowModal(false)
  }

  useEffect(() => {
    if(!isLoggedIn)  return
    setShowModal(false)
    showSnackbar()
  }, [isLoggedIn])

  return (
    <Container cx={'main-container'}>
      <Heading title={'Just Do It! 🤠'} cx={'heading'} type={'h1'} />
      <InputContainer />
      <Todos />
      {showModal && <Modal onClose={closeModal} />}
      <Snackbar title={'Logged In'}/>
    </Container>
  )
}

export default App
