const express = require("express");
const app = express();
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>TEsting if it works</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
    const phonebook_length = `<p>Phonebook has infor for ${persons.length} people </p>`;
    const date_to= `<p>${new Date().toUTCString()}</p>`;
    const sentence = phonebook_length+date_to;
    response.send(sentence);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id",(request,response)=>{
    const id = Number(request.params.id);
    persons = persons.filter((person)=>person.id!==id)
    response.status(204).end();
})

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(body)

  if (!body.name) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  if(persons.filter((person)=>person.name===body.name).length>0){
      return response.status(400).json({
          error:"name must be unique"
      })
  }
  const newperson = {
    id: generateId(),
    name: body.name,
    number: body.number || "0"
  };
  persons= persons.concat(newperson)
  response.json(newperson);
});


const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
