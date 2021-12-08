import express from 'express';
import bodyParser from 'body-parser';
const app = express();

let tasks = [
   {
      title: "Clean the room",
      due: "tomorrow"
   },
   {
      title: "Finish homework",
      due: "next Monday"
   },
   {
      title: "Complete JavaScript course",
      due: "12/20"
   }
];

app.use(express.static('./web'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
   res.sendFile('./web/index.html');
})

app.get('/tasks-api', (req, res) => {
   res.json(tasks)
})

app.post('/tasks-api', (req, res) => {
   const newTask = { ...req.body };
   tasks.push(newTask);
   console.log(`new task added: title[${newTask.title}] due[${newTask.due}]`);
   res.send(newTask);
})

app.delete('/tasks-api/:index', (req, res) => {
   const index = +req.params.index;
   tasks = tasks.filter((task, i) => i !== index);
   res.send('Deleted task');
})

app.listen(3000, () => {
   const now = new Date();
   console.log(`[${now}] Server is listening on port 3000...`);
})