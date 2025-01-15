function Input({ placeholder, type, cx, value, onChange }) {
    return (
            <input type={type} placeholder={placeholder} className={cx} value={value} onChange={onChange} />
    )
}

export default Input