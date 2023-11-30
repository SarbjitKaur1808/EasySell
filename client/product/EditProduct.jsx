export default function EditProduct ({match}) {
    const classes = useStyles()
    const [values, setValues] = useState({
        name: '',
        description: '',
        image: '',
        category: '',
        quantity: '',
        price: '',
        redirect: false,
        error: ''
      })
  
      const jwt = auth.isAuthenticated()
      useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        read({
          productId: match.params.productId
        }, signal).then((data) => {
          if (data.error) {
            setValues({...values, error: data.error})
          } else {
            setValues({...values, id: data._id, name: data.name, description: data.description, category: data.category, quantity:data.quantity, price: data.price})
          }
        })
      return function cleanup(){
        abortController.abort()
      }
    }, [])
    const clickSubmit = () => {
      let productData = new FormData()
      values.name && productData.append('name', values.name)
      values.description && productData.append('description', values.description)
      values.image && productData.append('image', values.image)
      values.category && productData.append('category', values.category)
      values.quantity && productData.append('quantity', values.quantity)
      values.price && productData.append('price', values.price)
    
      update({
        shopId: match.params.shopId,
        productId: match.params.productId
      }, {
        t: jwt.token
      }, productData).then((data) => {
        if (data.error) {
          setValues({...values, error: data.error})
        } else {
          setValues({...values, 'redirect': true})
        }
      })
    }
    const handleChange = name => event => {
      const value = name === 'image'
        ? event.target.files[0]
        : event.target.value
      setValues({...values,  [name]: value })
    }
      const imageUrl = values.id
            ? `/api/product/image/${values.id}?${new Date().getTime()}`
            : '/api/product/defaultphoto'
      if (values.redirect) {
        return (<Redirect to={'/seller/shop/edit/'+match.params.shopId}/>)
      }
    }