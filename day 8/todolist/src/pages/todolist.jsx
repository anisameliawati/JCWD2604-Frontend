/** @format */
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../App";
import { useDispatch } from "react-redux";
import { decrement, increment } from "../redux/constant";
import {
  functionDecrementSlice,
  functionIncrementSlice,
  functionincrementbyAmountSlice,
} from "../redux/slices/counterSlice";

function TodoListPage() {
  const { setTotal } = useContext(ThemeContext);
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");
  const [idx, setIdx] = useState(null);
  const dispatch = useDispatch();

  const hapus = (index) => {
    console.log("test");
    const tmp = [...todos];
    tmp.splice(index, 1);

    setTodos(tmp);
  };
  const submit = () => {
    if (idx == null) setTodos((prev) => [...prev, content]);
    else {
      //edit
      setTodos((prev) => {
        const tmp = [...prev];
        tmp[idx] = content;
        return tmp;
      });
      setIdx(null);
    }
    setContent("");
  };

  useEffect(() => {
    console.log(idx);
  }, [idx]);

  useEffect(() => {
    setTotal(todos.length);
  }, [todos]);

  const functionIncrement = () => {
    dispatch(functionIncrementSlice()); //slice
    dispatch({ type: increment }); //reducer
  };
  const functionDecrement = () => {
    dispatch(functionDecrementSlice()); //slice
    dispatch({ type: decrement }); //reducer
  };

  const plus5 = () => {
    dispatch({ type: "increment 5", payload: 5 });
    dispatch(functionincrementbyAmountSlice(5));
  };

  return (
    <div className=" min-h-screen m-auto w-96 p-8">
      <div className="flex justify-between w-full  my-3">
        <button
          className=" bg-green-500 p-2 rounded-lg"
          onClick={functionDecrement}
        >
          decrement
        </button>
        <button
          className=" bg-green-500 p-2 rounded-lg"
          onClick={functionIncrement}
        >
          increment
        </button>
        <button className=" bg-green-500 p-2 rounded-lg" onClick={plus5}>
          plus 5
        </button>
      </div>
      <h1>All Tasks</h1>
      <div className="full flex gap-1">
        <input
          placeholder="input to do"
          className="w-full  border-2 rounded-md p-1 "
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={submit} className=" bg-green-600 rounded-lg px-4 ">
          submit
        </button>
      </div>

      <div className="flex py-5 flex-col w-full gap-3">
        {todos.map((todo, key) => (
          <Card
            key={key}
            content={todo}
            setContent={setContent}
            idx={key}
            setIdx={setIdx}
            hapus={hapus}
            onEdit={idx}
          />
        ))}
      </div>
    </div>
  );
}

function Card({ content, setContent, idx, setIdx, hapus, onEdit }) {
  useEffect(() => {
    console.log(onEdit, "ini edit");
  }, [onEdit]);
  return (
    <div className="w-full border-2 rounded-md p-2 flex justify-between h-12">
      <div className="flex items-center h-full text-ellipsis overflow-hidden ... ">
        <input
          type="checkbox"
          name=""
          id=""
          className=" mr-2  h-full accent-green-500 bg-white"
        />
        {content}
      </div>

      <div className="flex gap-2">
        {onEdit != null ? (
          <button
            className="py-1 px-3 rounded-md bg-cyan-200 text-black "
            onClick={() => {
              setIdx(null);
              setContent("");
            }}
          >
            cancel
          </button>
        ) : (
          <button
            className="py-1 px-3 rounded-md bg-yellow-400 text-black "
            onClick={() => {
              setContent(content);
              setIdx(idx);
            }}
          >
            edit
          </button>
        )}

        <button
          className="py-1 px-2 rounded-md bg-red-600 "
          onClick={() => hapus(idx)}
        >
          delete
        </button>
      </div>
    </div>
  );
}
export default TodoListPage;
