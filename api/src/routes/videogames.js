const {Router} = require('express')
const {Videogame, Genre, Platform}= require('../db.js')
const {Op} = require('sequelize')
const router = Router()

// mainRouter.get('/',()=>{})

// Todos los videogames y por query name...
router.get('/',async (req,res)=>{
 const all = await Videogame.findAll({include: Genre})
    if (req.query.name) {
        try{
            let { name } = req.query
            const found = await Videogame.findAll({
            include: Genre,    
            where: { name: { [Op.iLike]: '%'+name+'%'} },
            })
        
            return res.json(found)
        }
        catch(error){
            console.log(error)
        } 
    }
 res.json(all)
})

router.post('/', async (req,res)=>{
 const {genres, 
  platforms, 
  name, 
  description, 
  released, 
  rating,
  createdInDb} = req.body
  let platformsFormated = platforms && platforms.join(', ');
 const newVideogame = await Videogame.create({
    name,
    description,
    released,
    rating,
    createdInDb,
    platforms: platformsFormated,
 })


//console.log(newVideogame.setGenres());
console.log(genres);
genres&&genres.map(
    async (c) => await newVideogame.setGenres(await Genre.findByPk(c))
  )
res.json(newVideogame)

})

// router.post('/', async (req,res)=>{
//  const newVideogame =req.body;
// //  const {idgenres, idplatforms, name, description, released, rating,createdInDb} = req.body
// try{
//   let[videogame, created]= await Videogame.findOrCreate({
//     where: {
//       name: newVideogame.name,
//     }
//   });
//   console.log(created);
//   // Seteo las relaciones

//   await videogame.setGenre(newVideogame.idgenres);
//   return res.json(videogame)

// } catch(error){
//  console.log(error)
// }
// })

router.get('/:id', async (req, res)=>{

    const found = await Videogame.findByPk(req.params.id, 
        {include: Genre})
    
    if (!found) {
            return res.status(404).send('Error: videogame not found')
    }
    
    return res.json(found)

})


module.exports = router