export default function MyProducts (props){
    const classes = useStyles()
    const [products, setProducts] = useState([])
    
    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
  
      listByShop({
        shopId: props.shopId
      }, signal).then((data)=>{
        if (data.error) {
          console.log(data.error)
        } else {
          setProducts(data)
        }
      })
      return function cleanup(){
        abortController.abort()
      }
    }, [])
  
    const removeProduct = (product) => {
      const updatedProducts = [...products]
      const index = updatedProducts.indexOf(product)
      updatedProducts.splice(index, 1)
      setProducts(updatedProducts)
    }
    MyProducts.propTypes = {
        shopId: PropTypes.string.isRequired
      }
    }      