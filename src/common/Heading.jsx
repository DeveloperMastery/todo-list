function Heading({title, cx, type})   {
    switch(type)    {
        case 'h1': return (
            <h1 className={cx}>{title}</h1>
        )
        case 'h2': return (
            <h2 className={cx}>{title}</h2>
        )
        case 'h3': return (
            <h3 className={cx}>{title}</h3>
        )
        case 'h4': return (
            <h4 className={cx}>{title}</h4>
        )
        case 'h5': return (
            <h5 className={cx}>{title}</h5>
        )
        case 'h6': return (
            <h6 className={cx}>{title}</h6>
        )
        default: return null
    }
}

export default Heading