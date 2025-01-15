import ButtonsGroup from "../common/ButtonsGroup";
import Container from "../common/Container";
import Text from "../common/Text";
import Button from "../common/Button"
import { useTodo } from "../store/store";
import Checkbox from "../common/Checkbox";
import { deleteDocument, updateDocument } from "../appwrite/appwrite";
import { useState } from "react";
import Input from "../common/Input";

function Todo({ todo }) {
    const [isEditing, setIsEditing] = useState(false)
    const [todoText, setTodoText] = useState('')
    
    const removeTodo = useTodo(state => state.removeTodo)
    const toggleTodo = useTodo(state => state.toggleTodo)
    const updateTodo = useTodo(state => state.updateTodo)

    const edit = function() {
        setIsEditing(true)
        setTodoText(todo.todo)
    }

    const onTodoInputChange = function(event)   {
        setTodoText(event.target.value)
    }

    const cancel = function()   {
        setIsEditing(false)
        setTodoText(todo.todo)
    }

    const onToggleTodo = async function(selectedTodoId)    {
        toggleTodo(selectedTodoId)
        await updateDocument(selectedTodoId, {completed: !todo.completed})
    }

    const onUpdateTodo = async () => {
        updateTodo(todo.$id, {todo: todoText})
        await updateDocument(todo.$id, {todo: todoText})
        setTodoText('')
        setIsEditing(false)
    }
    
    const onDeleteTodo = async function (selectedTodoId) {
        removeTodo(selectedTodoId)
        await deleteDocument(selectedTodoId)
    }

    return isEditing ? 
    (
        <Container cx={'update-todo-input-container'}>
            <Input cx={'todo-input'} placeholder={'Enter todo here...'} type={'text'} value={todoText} onChange={onTodoInputChange} />
            <ButtonsGroup buttons={[(<Button cx={'button'} title={'Update'} onClick={() => onUpdateTodo(todo.$id)} key={0} />),
            (<Button cx={'button'} title={'Cancel'} onClick={cancel} key={1} />)]} />
        </Container>
    ) :
    (
        <Container cx={'todo-container'}>
            <Checkbox cx={'todo-checkbox'} value={todo.completed} onChange={() => onToggleTodo(todo.$id)} checked={todo.completed} />
            <Text cx={`todo-text ${todo.completed ? 'checked' : ''}`} title={todo.todo} />
            <ButtonsGroup buttons={[(<Button cx={'button'} title={'Edit'} onClick={edit} key={0} />),
            (<Button cx={'button'} title={'Delete'} onClick={() => onDeleteTodo(todo.$id)} key={1} />)]} />
        </Container>
    )
}

export default Todo