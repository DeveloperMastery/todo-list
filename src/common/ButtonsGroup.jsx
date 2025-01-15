import Spacer from './Spacer'

function ButtonsGroup({buttons}) {
    return (
        <div className={'buttons-group-container'}>
            {
                buttons.map((button, index, arr) => index !== arr.length - 1 ? [button, <Spacer cx={'buttons-divider'} key={'spacer' + index} />] : button)
            }
        </div>
    )
}

export default ButtonsGroup