const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios=require("axios") //traemos axios para poderlo utilizar
const { Pokemon, Type }=require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//------------------------------ Functiones --------------------------------------------------------\\
const getApiPoke = async (url) => {
    try {
      // aca me traigo los primeros 40 pokemones
      const apiResults = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
      const apiNext = await axios.get(apiResults.data.next);
      const allPokemons = apiResults.data.results.concat(apiNext.data.results);
      for (let p of allPokemons) {
        let url = await axios.get(p.url);
        delete p.url;
        p.id = url.data.id;
        p.img = url.data.sprites.front_default;
        p.hp = url.data.stats[0].base_stat;
        p.strength = url.data.stats[1].base_stat;
        p.defense = url.data.stats[2].base_stat;
        p.speed = url.data.stats[5].base_stat;
        p.height = url.data.height;
        p.weight = url.data.weight;
        p.types = url.data.types.map((el) => el.type.name);
      }
      return allPokemons;
    } catch (error) {
      console.log(error);
    }
  };

  const getInfoDB = async () => {
    try {
      let dbData = await Pokemon.findAll({
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            types: [],
          },
        },
      });
  
      let poke = [];
      for (let i = 0; i < dbData.length; i++) {
        let tipos = dbData[i].types.map((tipo) => {
          return tipo.name;
        });
  
        let newPoke = {
          id: dbData[i].id,
          name: dbData[i].name,
          img: dbData[i].img,
          hp: dbData[i].hp,
          strength: dbData[i].strength,
          defense: dbData[i].defense,
          speed: dbData[i].speed,
          height: dbData[i].height,
          weight: dbData[i].weight,
          types: tipos,
          createdDB: true,
        };
        poke.push(newPoke);
      }
  
      return poke;
    } catch (error) {
      console.log(error);
    }
  };

  const allPoke = async () => {
    try {
      const api = await getApiPoke("https://pokeapi.co/api/v2/pokemon");
      const dbInfo = await getInfoDB();
      const allInfo = api.concat(dbInfo);
      return allInfo;
    } catch (error) {
      console.log(error);
    }
  };

  const getApiTypes = async () => {
    try {
      let tipos = await Type.findAll({ attributes: ["name"] });
      if (!tipos.length) {
        let url = `https://pokeapi.co/api/v2/type`;
        tipos = await axios.get(url);
        tipos = tipos.data.results.map((result) => ({
          name: result.name,
        }));
        await Type.bulkCreate(tipos);
      }
      return tipos;
    } catch (error) {
      console.log(error);
    }
  };

  //------------------------------ Rutas --------------------------------------------------------\\


  // aqui rutas solicitadas
  router.get("/pokemons", async (req, res) =>{ 
    const name = req.query.name // ej: "/pokemons?gta"
    const pokesTotales = await allPoke()//trae todos los pekes
    if(name){ //pregunta si hay un name por query
        let pokesName = await pokesTotales.filter(ele => ele.name.toLowerCase().includes(name.toLowerCase()))
        pokesName.length ?//encontraste el nombre?
        res.status(200).send(pokesName):
        res.status(404).send("No esta disponible");
    }else{   
        res.status(200).send(pokesTotales)//si no hay un query envia los pokes totales
    }
})//quiero guardar solo los tipos en la bd y dejarlas listas para cada vez

router.get("/types", async (req, res) => {
    try {
      const allTypes = await getApiTypes();
      res.send(allTypes);
    } catch (error) {
      console.log(error);
    }
  });

  router.post("/pokemons", async(req, res)=>{
    const { name, img, hp, strength, defense, speed, height, weight, types } = req.body;
    let pokeName = await getApiPoke().then((d) => d.find((d) => d.name === name)); // se fija si el nombre esta en la api
        // Creo el Poke

        if(!name ||
            !hp ||
            !strength ||
            !defense ||
            !speed ||
            !height ||
            !weight ||
            !types){
            res.status(400).send("Faltan datos"); 
        }else if (pokeName){ 
            res.status(404).send("El nombre del pokemon ya existe"); 
        } else{
            Pokemon.create({ 
                name,
                hp,
                img,
                strength,
                defense,
                speed,
                height,
                weight,
                createdDB: true,
            })
            .then(async (pokemon) => {
                // Guardo el type
                const typ = await Type.findAll({
                    where: { name: types },
                });
                // Guardo el Dog en el temperamento
                await pokemon.addType(typ);
                res.json(pokemon);
            }).catch(err => err)
    
            res.send("Pokemon creado");
        }

    
})


  //ruta id
  router.get("/pokemons/:id", async(req, res)=>{
    const id = req.params.id;
    const pokemonsTotales= await allPoke()
    if(id){
        let pokeId= await pokemonsTotales.filter(element=> element.id == id)//filtrar los pokes totales por el id solicitado
        pokeId.length ?
        res.status(200).json(pokeId): 
        res.status(404).send("Raza no encontrada")
    }
}) 


 
       

    
  

 
module.exports = router;
