import { appState } from './types';

export const initialState: appState = {
  movies: [
    {
      rank: 0,
      title: '',
      thumbnail: '',
      rating: '',
      id: '',
      year: 0,
      image: '',
      description: '',
      trailer: '',
      genre: [''],
      writers: [''],
      imdbid: '',
    },
  ],
};
