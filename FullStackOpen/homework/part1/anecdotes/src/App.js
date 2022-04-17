import { Fragment, useState } from "react";
const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const MostVotes = ({ votes, anecdotes }) => {
  const max = Math.max(...votes);
  const index = votes.indexOf(max);
  return (
    <Fragment>
      <div>{anecdotes[index]}</div>
      <div>has {max} votes</div>
    </Fragment>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];
  const changeSelected = () => {
    const min = 0;
    const max = anecdotes.length;
    const chosen = Math.floor(Math.random() * (max - min) + min);
    console.log(chosen);
    setSelected(chosen);
  };
  const voteAnecdote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVote(copy);
  };

  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState([0, 0, 0, 0, 0, 0, 0]);
  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button onClick={() => voteAnecdote()} text={"vote"} />
      <Button onClick={() => changeSelected()} text={"next anecdote"} />
      <h1>Anecdote with most votes</h1>
      <MostVotes votes={votes} anecdotes={anecdotes} />
    </>
  );
};

export default App;
