function Button({title, cx, onClick})   {
    return (
        <button className={cx} onClick={onClick}>
            {title}
        </button>
    )
}

export default Button