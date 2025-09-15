// All observables will map to an object of a class which have an apply method, mapping a reduced state to a new state
export interface Action {
  apply(s: State): State;
}

// State types
export type Topic = {
  title: string,
  subtopics: string[]
}
export type State = {
  currTopic?: number;
  topics : Topic[]

}

// Web request types (Wikipedia API)
export type WikiSearchResponse = {
  batchcomplete: string;
  continue: {
    sroffset: number;
    continue: string;
  };
  query: {
    searchinfo: {
      totalhits: number;
    };
    search: {
      ns: number;
      title: string;
      pageid: number;
      snippet: string;
    }[];
  };
};

export type WikiLinksResponse = {
  query: {
    pages: {
      [pageid: string]: {
        pageid: number;
        title: string;
        links?: { ns: number; title: string }[];
      };
    };
  };
};