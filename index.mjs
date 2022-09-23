const STAR_WARS_API_URL = "https://swapi.dev/api";
const STAR_WARS_ACCEPTED_RESOURCES = [
  "people",
  "planets",
  "starships",
  "films",
];

const POKEAPI_URL = "https://pokeapi.co/api/v2";
// globalThis === window

// Personas de star wars
// const res = await fetch(`${API_URL}/people/1`);
// const json = await res.json();
// const { name: personName, gender } = json;
// console.log({ personName, gender });

// // Planetas de star wars
// const res2 = await fetch(`${API_URL}/planets/1`);
// const json2 = await res2.json();
// const { name: planetName } = json2;
// console.log({ planetName });

// Funcion usando proxys de node 18.9.0

const createApi = (url) => {
  return new Proxy(
    {},
    {
      get: (target, prop) => {
        //   if (!acceptedResources.includes(prop)) {return Promise.reject({error: `La propiedad ${prop} no es aceptada en la peticion, cambiela por favor.`});}
        return async (id, queryParams) => {
          let qs = queryParams
            ? `?${new URLSearchParams(queryParams).toString()}`
            : "";
          const resource = `${url}/${prop}/${id}`;
          console.log({resource});
          const res = await fetch(resource);
          if (res.ok) return res.json();
          return Promise.reject({
            error: `Algo ha sucedido, vuelvalo a intentar en ${resource}`,
          });
        };
      },
    }
  );
};

// const api = createApi(STAR_WARS_API_URL);
// const kevin = await api.vehicles(1);

const pokeApi = createApi(POKEAPI_URL);
const ditto = await pokeApi.pokemon("ditto");
// const luke = await api.people(1);
// const c3po = await api.people(2);
// const planet = await api.planets(1);
// const starship = await api.starships(2);
// console.log(luke);
// console.log(c3po);
// console.log(planet);
// console.log(starship);
console.log(ditto);
