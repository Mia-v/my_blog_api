const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => { 
  console.log("Localhost:" + port);
});

app.use(express.json());

const posts = [
  { 
    postId: 1, 
    title: "Amsterdam",
    tags: ['123', '456'],
    img: "amsterdam.jpg",
    textContent: "Amsterdam, capital of the Netherlands! These days the city has a population of just over 790.000 inhabitants and is the largest city in the country. Amsterdam is located in the province ‘Noord-Holland’, situated in the west. It is one of the most popular destinations in Europe, receiving more than 4.5 million tourists annually.Amsterdam has a great history. It is very unique for its large and untouched historic center. It has a rich architectural history, dominated by water. It is a meeting point for all different cultures around the world and has a welcoming attitude towards visitors. Well known for its museums, red light district, coffee shops but also the great variety of eating & drinking places and night life. Therefore a lot of hotels and hostels can be found on different locations, value for money and ambience.It is a beautiful and romantic city with its antique houses, lovely bridges, famous canals and of course the list of world class attractions!" 
  }, 
  { 
    postId: 2, 
    title: "Barcelona", 
    tags: ['123', '456'], 
    img: "barcelona.jpg", 
    textContent: "Barcelona is a city on the coast of northeastern Spain. It is the capital and largest city of the autonomous community of Catalonia, as well as the second most populous municipality of Spain. With a population of 1.6 million within city limits, its urban area extends to numerous neighbouring municipalities within the Province of Barcelona and is home to around 4.8 million people, making it the fifth most populous urban area in the European Union after Paris, the Ruhr area, Madrid, and Milan. It is one of the largest metropolises on the Mediterranean Sea, located on the coast between the mouths of the rivers Llobregat and Besòs, and bounded to the west by the Serra de Collserola mountain range, the tallest peak of which is 512 metres (1,680 feet) high.Founded as a Roman city, in the Middle Ages Barcelona became the capital of the County of Barcelona. After merging with the Kingdom of Aragon, Barcelona continued to be an important city in the Crown of Aragon as an economic and administrative centre of this Crown and the capital of the Principality of Catalonia. Barcelona has a rich cultural heritage and is today an important cultural centre and a major tourist destination. Particularly renowned are the architectural works of Antoni Gaudí and Lluís Domènech i Montaner, which have been designated UNESCO World Heritage Sites. Since 1450, it is home to the University of Barcelona, widely considered the most prestigious university in Spain. The headquarters of the Union for the Mediterranean are located in Barcelona. The city is known for hosting the 1992 Summer Olympics as well as world-class conferences and expositions and also many international sport tournaments.Barcelona is a major cultural, economic, and financial centre in southwestern Europe, as well as the main biotech hub in Spain. As a leading world city, Barcelona's influence in global socio-economic affairs qualifies it for global city status. Barcelona is a transport hub, with the Port of Barcelona being one of Europe's principal seaports and busiest European passenger port, an international airport, Barcelona–El Prat Airport, which handles over 50 million passengers per year, an extensive motorway network, and a high-speed rail line with a link to France and the rest of Europe." 
  }
];

app.get('/posts', (req, res) => res.send(posts));

app.get("/posts/:id", (req, res) => { 
  const { id } = req.params; 
  res.json({ 
    id: post.postId, 
    title: post.title, 
    tags: post.tags, 
    img: post.img, 
    textContent: post.textContent,
  }); 
});

app.post('/posts/new', (req, res) => { 
  lastPost = posts.length - 1; console.log(lastPost); 
  const blogPost = { 
    id: posts[lastPost].postId + 1,
    title: req.body.title,
    textContent: req.body.textContent
  }
  posts.push(blogPost); 
  res.send(blogPost); 
});