import Container from "../common/Container";
import List from "../common/List";
import Todo from "./Todo";
import { useSession, useTodo } from "../store/store";
import ListItem from "../common/ListItem";
import { databases, getDocuments,  } from "../appwrite/appwrite";
import { useEffect } from "react";

function Todos() {
    const todos = useTodo(state => state.todos)
    const session = useSession(state => state.session)
    const setTodos = useTodo(state => state.setTodos)

    const init = async () => {
        const fetchedTodos = await getDocuments()
        setTodos(fetchedTodos.documents.filter(document => document.userId === session.$id))
    }

    useEffect(() => {
        if(!session) {
            return
        }
        init()
    }, [session])

    console.log({todos})

    if(!todos)  return null

    return (
        <Container cx={'todos-container'}>
            <List cx={'todos-list'} type={'ordered'}>{
                todos.map((todo, index) => (
                    <ListItem cx={'todo-item'} key={index}>
                        <Todo todo={todo} index={index} />
                    </ListItem>
                ))
            }
            </List>
        </Container>
    )
}

export default Todos