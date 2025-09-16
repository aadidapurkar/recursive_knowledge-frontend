import type { Action, State, SubtopicPref, Topic } from "./types";

// Initial state: no current topic, and no known topics
export const initialState: State = {
  topics: [],
  pref: "default",
  limit: 100
};


export class ChangeSubtopicLimit implements Action {
  constructor(public readonly limit: number) {}
  apply(s: State): State {
    return {
      ...s,
      limit: this.limit
  }
}
}

export class ChangeSubtopicPref implements Action {
  constructor(public readonly pref: SubtopicPref) {}
  apply(s: State): State {
    return {
      ...s,
      pref: this.pref
    };
  }
}


// Set current topic index to 0, and set known topics to just the root
export class RootTopic implements Action {
  constructor(public readonly rootTopic: Topic) {}
  apply(s: State): State {
    return {
      ...s,
      currTopic: 0,
      topics: [this.rootTopic],
    };
  }
}

// Remove topics to the right, preverse topics to the left
export class AddTopic implements Action {
  constructor(
    public readonly newTopic: Topic,
    public readonly currTopicIndex: number
  ) {}
  apply(s: State): State {
    return {
      ...s,
      currTopic: this.currTopicIndex + 1,
      topics: s.topics.slice(0, this.currTopicIndex + 1).concat(this.newTopic),
    };
  }
}
// Change the current topic index by a certain amount if its valid with respect to topics of State and whether currTopic is defined
export class CurrTopicIdxChange implements Action {
  constructor(public readonly changeAmount: number) {}
  apply(s: State): State {
    if (s.currTopic === undefined) {
      return s;
    }
    const changeValid =
      s.currTopic + this.changeAmount >= 0 &&
      s.currTopic + this.changeAmount <= s.topics.length - 1;
    const newCurrTopic = changeValid
      ? s.currTopic + this.changeAmount
      : s.currTopic;
    return {
      ...s,
      currTopic: newCurrTopic,
    };
  }
}
