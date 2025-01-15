function List({ type, cx, children }) {
    return type === 'unordered' ? (
        <ul className={cx}>{children}</ul>
    ) : <ol className={cx}>{children}</ol>
}

export default List