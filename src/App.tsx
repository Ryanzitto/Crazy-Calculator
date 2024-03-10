import { useState } from "react";

const calculatorButtons = [
  { id: "clear", label: "C", type: "function" },
  { id: "divide", label: "/", type: "operator" },
  { id: "multiply", label: "*", type: "operator" },
  { id: "subtract", label: "-", type: "operator" },
  { id: "seven", label: "7", type: "number" },
  { id: "eight", label: "8", type: "number" },
  { id: "nine", label: "9", type: "number" },
  { id: "add", label: "+", type: "operator" },
  { id: "four", label: "4", type: "number" },
  { id: "five", label: "5", type: "number" },
  { id: "six", label: "6", type: "number" },
  { id: "equals", label: "=", type: "function" },
  { id: "one", label: "1", type: "number" },
  { id: "two", label: "2", type: "number" },
  { id: "three", label: "3", type: "number" },
  { id: "decimal", label: ".", type: "function" },
  { id: "zero", label: "0", type: "number" },
];

interface Button {
  id: string;
  label: string;
  type: string;
}

function App() {
  const [expression, setExpression] = useState<string>("");
  const [display, setDisplay] = useState<string>(0);

  const [result, setResult] = useState<string>(0);
  const [scrambledButtons, setScrambledButtons] =
    useState<Button[]>(calculatorButtons);

  const handleClickButton = (button: Button) => {
    if (button.label === "C") {
      setExpression("");
      setDisplay("");
      setResult("");
    } else if (button.label === "=") {
      try {
        const result = eval(expression);
        setDisplay(result.toString());
        setResult(result.toString());
        setExpression(result.toString());
      } catch (error) {
        setDisplay("Error");
        setExpression("");
      }
    } else {
      setExpression((prev) => prev + button.label);
      setDisplay((prev) => prev + button.label);
    }
    shuffle();
  };
  const shuffle = () => {
    for (let i = scrambledButtons.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [scrambledButtons[i], scrambledButtons[j]] = [
        scrambledButtons[j],
        scrambledButtons[i],
      ];
    }
    return setScrambledButtons(scrambledButtons);
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="w-fit flex flex-col shadow-md bg-transparent">
          <div className="w-full h-40 bg-slate-100 rounded-t-md items-end flex flex-col">
            <div className="h-[30%] w-fit flex px-4 items-center">
              <span className="text-sm text-zinc-700/50">{display}</span>
            </div>
            <div className="h-[70%] w-fit flex px-4 items-center">
              <span className="text-4xl text-zinc-600 font-bold">{result}</span>
            </div>
          </div>
          <div className="w-fit h-fit bg-slate-200 rounded-b-md gap-2 p-4 grid grid-cols-4">
            {scrambledButtons.map((button) => {
              return (
                <div
                  onClick={() => handleClickButton(button)}
                  className={`${
                    button.type === "operator" || button.type === "function"
                      ? "bg-zinc-700 hover:bg-zinc-800 text-white"
                      : "bg-white  hover:bg-slate-100 text-zinc-600"
                  } cursor-pointer w-16 h-16 rounded-md  flex justify-center items-center transition-all`}
                >
                  <span className="text-2xl font-semibold">{button.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
