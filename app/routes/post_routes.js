const sha256 = require('sha256');
var ObjectID = require('mongodb').ObjectID;


module.exports = function(app, db){
  const posts = [
    { 
      postId: 1, 
      title: "Amsterdam",
      tags: ['123', '456'],
      img: "amsterdam.jpg",
      textContent: "Amsterdam, capital of the Netherlands! These days the city has a population of just over 790.000 inhabitants and is the largest city in the country. Amsterdam is located in the province ‘Noord-Holland’, situated in the west. It is one of the most popular destinations in Europe, receiving more than 4.5 million tourists annually.Amsterdam has a great history. It is very unique for its large and untouched historic center. It has a rich architectural history, dominated by water. It is a meeting point for all different cultures around the world and has a welcoming attitude towards visitors. Well known for its museums, red light district, coffee shops but also the great variety of eating & drinking places and night life. Therefore a lot of hotels and hostels can be found on different locations, value for money and ambience.It is a beautiful and romantic city with its antique houses, lovely bridges, famous canals and of course the list of world class attractions!" 
    }, 
    { 
      postId: 2, 
      title: "Barcelona", 
      tags: ['123', '456'], 
      img: "barcelona.jpg", 
      textContent: "Barcelona is a city on the coast of northeastern Spain. It is the capital and largest city of the autonomous community of Catalonia, as well as the second most populous municipality of Spain. With a population of 1.6 million within city limits, its urban area extends to numerous neighbouring municipalities within the Province of Barcelona and is home to around 4.8 million people, making it the fifth most populous urban area in the European Union after Paris, the Ruhr area, Madrid, and Milan. It is one of the largest metropolises on the Mediterranean Sea, located on the coast between the mouths of the rivers Llobregat and Besòs, and bounded to the west by the Serra de Collserola mountain range, the tallest peak of which is 512 metres (1,680 feet) high.Founded as a Roman city, in the Middle Ages Barcelona became the capital of the County of Barcelona. After merging with the Kingdom of Aragon, Barcelona continued to be an important city in the Crown of Aragon as an economic and administrative centre of this Crown and the capital of the Principality of Catalonia. Barcelona has a rich cultural heritage and is today an important cultural centre and a major tourist destination. Particularly renowned are the architectural works of Antoni Gaudí and Lluís Domènech i Montaner, which have been designated UNESCO World Heritage Sites. Since 1450, it is home to the University of Barcelona, widely considered the most prestigious university in Spain. The headquarters of the Union for the Mediterranean are located in Barcelona. The city is known for hosting the 1992 Summer Olympics as well as world-class conferences and expositions and also many international sport tournaments.Barcelona is a major cultural, economic, and financial centre in southwestern Europe, as well as the main biotech hub in Spain. As a leading world city, Barcelona's influence in global socio-economic affairs qualifies it for global city status. Barcelona is a transport hub, with the Port of Barcelona being one of Europe's principal seaports and busiest European passenger port, an international airport, Barcelona–El Prat Airport, which handles over 50 million passengers per year, an extensive motorway network, and a high-speed rail line with a link to France and the rest of Europe." 
    }
  ];
  const PASSWORD = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8";
  const authMiddleWare = (req, res, next) =>{
    const { password } = req.body;
    if(sha256(password) === PASSWORD){
      next;
    }else{
      res.send(
        {
          staus: 'error',
          message: 'Password is not correct.',
        }
      )
    }
  }
  app.use('/posts/new', authMiddleWare);
  app.get('/posts', (req, res) => res.send(posts));
  app.get("/posts/:id", (req, res) => { 
    const { id } = req.params; 
    const details = {"_id" : new ObjectID(id)}
    db.collections('posts').findOne(details, (err, item) => {
      if(err){
        res.send({"error" : "An error has occured"})
      }else{
        res.send(item);
      }
    })
      const post = posts.find(item => item.postId === Number(id));
      res.json({ 
        id: post.postId, 
        title: post.title, 
        tags: post.tags, 
        img: post.img, 
        textContent: post.textContent,
      }); 
   });
    
  app.post('/posts', (req, res) => { 

    db.collection('posts').insert(post, (err, result) => {
      const { title, tags, textContent } = req.body;
      const lastPost = posts.length - 1;
      
      if (!title || !textContent) {
        return res.status(400).send({
          status: 'error',
          message: 'Title or text is empty!',
        });
      }
        
      const post = {
        postId: lastPost.postId + 1,
        title,
        tags,
        textContent,
      }
    if(err){
      res.send({"error" : "An error has occured"})
    }else{
      res.send(result.ops[0]);
    }

//   
//   const blogPost = { 
//     postId: lastPost.postId + 1,
//     title,
//     tags,
//     textContent,
//   }
//   posts.push(blogPost); 
//   res.send(blogPost); 
// });


  });