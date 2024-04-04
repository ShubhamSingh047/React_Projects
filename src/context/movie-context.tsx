import { ReactNode, createContext, useReducer } from "react";
import { MovieDataType, moviesData } from "../assets/data";

interface MovieContextProps {
  children: ReactNode;
}

interface MovieState {
  movies: MovieDataType[];
  isLoggedIn?: boolean;
}

interface MovieAction {
  type: string;
  id?: string;
}

const MovieList: MovieDataType[] = moviesData;

const initalMovieState: MovieState = {
  movies: MovieList,
  isLoggedIn: false,
};

const MovieReducer = (state: MovieState, action: MovieAction): MovieState => {
  switch (action.type) {
    case "TOOGLE BOOKMARK":
      return {
        ...state,
        movies: state.movies.map((movie) => {
          if (movie.id === action.id) {
            return { ...movie, isBookmarked: !movie.isBookmarked };
          }
          return movie;
        }),
      };
    case "LOGIN": // Handle login action
      return {
        ...state,
        isLoggedIn: true,
      };
    case "LOGOUT": // Handle logout action
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export const MovieContext = createContext<{
  state: MovieState;
  dispatch: React.Dispatch<MovieAction>;
}>({
  state: initalMovieState,
  dispatch: () => {},
});

export const MovieProvider = ({ children }: MovieContextProps) => {
  const [state, dispatch] = useReducer(MovieReducer, initalMovieState);
  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};
