export default function NewProduct({match}) {
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
    const handleChange = name => event => {
      const value = name === 'image'
        ? event.target.files[0]
        : event.target.value
      setValues({...values,  [name]: value })
    }
    const clickSubmit = () => {
      let productData = new FormData()
      values.name && productData.append('name', values.name)
      values.description && productData.append('description', values.description)
      values.image && productData.append('image', values.image)
      values.category && productData.append('category', values.category)
      values.quantity && productData.append('quantity', values.quantity)
      values.price && productData.append('price', values.price)
  
      create({
        shopId: match.params.shopId
      }, {
        t: jwt.token
      }, productData).then((data) => {
        if (data.error) {
          setValues({...values, error: data.error})
        } else {
          setValues({...values, error: '', redirect: true})
        }
      })
    }
}