import { useCallback, memo, useState } from 'react';
import TodoListTemplate from './components/TodoListTemplate'
import Form from './components/Form'
import TodoItemList from './components/TodoItemList'

let id = 0;

// reactNode 를 반환하는 함수인 거임
const App = () => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  const handleChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const handleRemove = useCallback((id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }, [todos]);

  const handleCreate = useCallback(() => {
    setInput('');
    setTodos(todos.concat({
      id: id++,
      text: input,
      checked: false
    }));
  }, [todos, input]);

  const handleKeyPress = useCallback((e) => {
    if(e.key === 'Enter') {
      handleCreate();
    }
  }, [handleCreate]);

  const handleToggle = useCallback((id) => {
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];

    const nextTodos = [...todos];

    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    setTodos(nextTodos);
  }, [todos]);

  // 얘 어차피 무조건 input이든 todo든 바뀌면 렌더링되니까 굳이 메모리에 안올려놓음
  // 예전값이랑 비교하면 무조건 false임 (계속 ReactNode 새로 만들어야됨)
  const todoListForm = (
    <Form
      value={input}
      onKeyPress={handleKeyPress}
      onChange={handleChange}
      onCreate={handleCreate}
    />
  );

  return (
    <TodoListTemplate form={todoListForm}>
      <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
    </TodoListTemplate>
  );
};

export default memo(App);
