export default function Categories(props){
    const classes = useStyles()
    const [products, setProducts] = useState([])
    const [selected, setSelected] = useState(props.categories[0])
  
    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
  
      list({
        category: props.categories[0]
      }).then((data) => {
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
  
    const listbyCategory = category => event => {
      setSelected(category)
      list({
        category: category
      }).then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          setProducts(data)
        }
      })
    }
}