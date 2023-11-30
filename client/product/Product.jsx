export default function Product ({match}) {
    const classes = useStyles()
    const [product, setProduct] = useState({shop:{}})
    const [suggestions, setSuggestions] = useState([])
    const [error, setError] = useState('')
      useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
    
        read({productId: match.params.productId}, signal).then((data) => {
          if (data.error) {
            setError(data.error)
          } else {
            setProduct(data)
          }
        })
      return function cleanup(){
        abortController.abort()
      }
    }, [match.params.productId])
  
    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
  
          listRelated({
            productId: match.params.productId}, signal).then((data) => {
            if (data.error) {
              setError(data.error)
            } else {
              setSuggestions(data)
            }
          })
    return function cleanup(){
      abortController.abort()
    }
  }, [match.params.productId])
  
      const imageUrl = product._id
            ? `/api/product/image/${product._id}?${new Date().getTime()}`
            : '/api/product/defaultphoto'
}
