import React,{useEffect,useState} from 'react'
import axios from 'axios'

const useTodo = (n) => {
  const [todos, setTodos] = useState([])
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setInterval(() => {
      axios.get("https://sum-server.100xdevs.com/todos")
      .then(res => {
        setTodos(res.data.todos);
        setLoader(false)
      }) 
    }, n*1000);
 
  }, [])
    return {
      todos:todos,
      loader:loader
    }
  
}

export default useTodo