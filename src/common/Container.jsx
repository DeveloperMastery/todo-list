function Container({cx, children})    {
    return (
        <div className={cx}>
            {children}
        </div>
    )
}

export default Container