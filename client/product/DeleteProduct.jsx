export default function DeleteProduct(props) {
    const [open, setOpen] = useState(false)
    
    const jwt = auth.isAuthenticated()
    const clickButton = () => {
      setOpen(true)
    }
    const deleteProduct = () => {
      remove({
        shopId: props.shopId,
        productId: props.product._id
      }, {t: jwt.token}).then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          setOpen(false)
          props.onRemove(props.product)
        }
      })
    }
    const handleRequestClose = () => {
      setOpen(false)
    }
    DeleteProduct.propTypes = {
        shopId: PropTypes.string.isRequired,
        product: PropTypes.object.isRequired,
        onRemove: PropTypes.func.isRequired
      }
    }      