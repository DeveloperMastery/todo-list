function Checkbox({cx, value, onChange, checked}) {
    return (
        <input className={cx} type="checkbox" value={value} onChange={onChange} checked={checked} />
    )
}

export default Checkbox