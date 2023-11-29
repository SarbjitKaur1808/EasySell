export default function Search(props) {
    const classes = useStyles()
    const [values, setValues] = useState({
        category: '',
        search: '',
        results: [],
        searched: false
    })
    const handleChange = name => event => {
      setValues({
        ...values, [name]: event.target.value,
      })
    }
    const search = () => {
      if(values.search){
        list({
          search: values.search || undefined, category: values.category
        }).then((data) => {
          if (data.error) {
            console.log(data.error)
          } else {
            setValues({...values, results: data, searched:true})
          }
        })
      }
    }
    const enterKey = (event) => {
      if(event.keyCode == 13){
        event.preventDefault()
        search()
      }
    }
    Search.propTypes = {
        categories: PropTypes.array.isRequired
      }
    }