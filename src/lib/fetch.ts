// src/lib/fetch.ts
import axios from 'axios';

export interface Pokemon {
  name: string;
  url: string;
  id: number;
  image: string;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  };
  sprites: {
    other: {
      ['official-artwork']: {
        front_default: string;
      };
    };
  };
}

export const fetchPokemonList = async (
  limit: number,
  offset: number
): Promise<Pokemon[]> => {
  const res = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  const detailed = await Promise.all(
    res.data.results.map(async (pokemon: { name: string; url: string }) => {
      const detail = await axios.get(pokemon.url);
      const types = detail.data.types
        .map((t: { slot: number; type: { name: string; url: string } }) => ({
          slot: t.slot,
          type: {
            name: t.type.name,
            url: t.type.url,
          },
        }))
        .slice(0, 3);

      const result = {
        name: pokemon.name,
        url: pokemon.url,
        id: detail.data.id,
        image: detail.data.sprites.other['official-artwork'].front_default,
        types: types,
      };

      console.log('nama pokemon dan typenya:', result.name, result.types);

      console.log('detailnya:', {
        name: pokemon.name,
        url: pokemon.url,
        id: detail.data.id,
        image: detail.data.sprites.other['official-artwork'].front_default,
        types,
      });
      return result;
    })
  );

  return detailed;
};

export const fetchPokemonDetail = async (id: number) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return res.data;
};
export const fetchPokemonSpecies = async (id: number) => {
  const res = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );
  return res.data;
};
export const fetchPokemonEvolutionChain = async (id: number) => {
  const species = await fetchPokemonSpecies(id);
  const res = await axios.get(species.evolution_chain.url);
  return res.data;
};
export const fetchPokemonByName = async (name: string) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return res.data;
};
export const fetchPokemonById = async (id: number) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return res.data;
};
export const fetchPokemonByUrl = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
};
export const fetchPokemonSpeciesByUrl = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
};
export const fetchPokemonEvolutionChainByUrl = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
};
export const fetchPokemonListByUrl = async (url: string) => {
  const res = await axios.get(url);
  const detailed = await Promise.all(
    res.data.results.map(async (pokemon: Pokemon) => {
      const detail = await axios.get(pokemon.url);
      return {
        name: pokemon.name,
        url: pokemon.url,
        id: detail.data.id,
        image: detail.data.sprites.other['official-artwork'].front_default,
      };
    })
  );
  return detailed;
};
export const fetchPokemonListByUrlWithLimit = async (
  url: string,
  limit: number,
  offset: number
): Promise<Pokemon[]> => {
  const res = await axios.get(`${url}?limit=${limit}&offset=${offset}`);
  const detailed = await Promise.all(
    res.data.results.map(async (pokemon: Pokemon) => {
      const detail = await axios.get(pokemon.url);
      return {
        name: pokemon.name,
        url: pokemon.url,
        id: detail.data.id,
        image: detail.data.sprites.other['official-artwork'].front_default,
      };
    })
  );
  return detailed;
};
export const fetchPokemonListWithLimit = async (
  limit: number,
  offset: number
): Promise<Pokemon[]> => {
  const res = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const detailed = await Promise.all(
    res.data.results.map(async (pokemon: Pokemon) => {
      const detail = await axios.get(pokemon.url);
      return {
        name: pokemon.name,
        url: pokemon.url,
        id: detail.data.id,
        image: detail.data.sprites.other['official-artwork'].front_default,
      };
    })
  );
  return detailed;
};
export const fetchPokemonListWithLimitAndUrl = async (
  url: string,
  limit: number,
  offset: number
): Promise<Pokemon[]> => {
  const res = await axios.get(`${url}?limit=${limit}&offset=${offset}`);
  const detailed = await Promise.all(
    res.data.results.map(async (pokemon: Pokemon) => {
      const detail = await axios.get(pokemon.url);
      return {
        name: pokemon.name,
        url: pokemon.url,
        id: detail.data.id,
        image: detail.data.sprites.other['official-artwork'].front_default,
      };
    })
  );
  return detailed;
};
export const fetchPokemonListWithLimitAndUrlAndType = async (
  url: string,
  limit: number,
  offset: number,
  type: string
): Promise<Pokemon[]> => {
  const res = await axios.get(
    `${url}?limit=${limit}&offset=${offset}&type=${type}`
  );
  const detailed = await Promise.all(
    res.data.results.map(async (pokemon: Pokemon) => {
      const detail = await axios.get(pokemon.url);
      return {
        name: pokemon.name,
        url: pokemon.url,
        id: detail.data.id,
        image: detail.data.sprites.other['official-artwork'].front_default,
      };
    })
  );
  return detailed;
};
export const fetchPokemonListWithLimitAndUrlAndTypeAndRegion = async (
  url: string,
  limit: number,
  offset: number,
  type: string,
  region: string
): Promise<Pokemon[]> => {
  const res = await axios.get(
    `${url}?limit=${limit}&offset=${offset}&type=${type}&region=${region}`
  );
  const detailed = await Promise.all(
    res.data.results.map(async (pokemon: Pokemon) => {
      const detail = await axios.get(pokemon.url);
      return {
        name: pokemon.name,
        url: pokemon.url,
        id: detail.data.id,
        image: detail.data.sprites.other['official-artwork'].front_default,
      };
    })
  );
  return detailed;
};
export const fetchPokemonListWithLimitAndUrlAndTypeAndRegionAndGeneration =
  async (
    url: string,
    limit: number,
    offset: number,
    type: string,
    region: string,
    generation: string
  ): Promise<Pokemon[]> => {
    const res = await axios.get(
      `${url}?limit=${limit}&offset=${offset}&type=${type}&region=${region}&generation=${generation}`
    );
    const detailed = await Promise.all(
      res.data.results.map(async (pokemon: Pokemon) => {
        const detail = await axios.get(pokemon.url);
        return {
          name: pokemon.name,
          url: pokemon.url,
          id: detail.data.id,
          image: detail.data.sprites.other['official-artwork'].front_default,
        };
      })
    );
    return detailed;
  };
export const fetchPokemonListWithLimitAndUrlAndTypeAndRegionAndGenerationAndAbility =
  async (
    url: string,
    limit: number,
    offset: number,
    type: string,
    region: string,
    generation: string,
    ability: string
  ): Promise<Pokemon[]> => {
    const res = await axios.get(
      `${url}?limit=${limit}&offset=${offset}&type=${type}&region=${region}&generation=${generation}&ability=${ability}`
    );
    const detailed = await Promise.all(
      res.data.results.map(async (pokemon: Pokemon) => {
        const detail = await axios.get(pokemon.url);
        return {
          name: pokemon.name,
          url: pokemon.url,
          id: detail.data.id,
          image: detail.data.sprites.other['official-artwork'].front_default,
        };
      })
    );
    return detailed;
  };
