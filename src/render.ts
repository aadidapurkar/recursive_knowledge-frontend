import type { State, Topic } from "./types"

// A function which takes a state and updates view as necessary
export const render = (s : State) => {
  // HTML elems
  const topicContainer = document.getElementById("topicContainer")! 
  const subtopicContainer = document.getElementById("subtopicContainer")! 
  const topicText = document.getElementsByClassName("topicText")[0]!
  const stps = document.getElementById("stps")! 
  const stepsText = document.getElementById("stepsAway")! 

  const topicChangeRequired : boolean = s.currTopic !== undefined && s.currTopic >= 0 && s.currTopic <= s.topics.length - 1 //&& s.currTopic != parseInt(topicText.id)

  if (s.currTopic !== undefined) {
    topicContainer.style.visibility = "visible"
    stps.style.visibility = "visible"
  }
  // heading
  if(topicChangeRequired) {
    stepsText.textContent = `${s.currTopic!}`
    topicText.textContent = s.topics[s.currTopic!].title
    topicText.id = `${s.currTopic!}`
  }

  // subtopics
  if (topicChangeRequired) {
    subtopicContainer.innerHTML = '';
    const topic : Topic =  s.topics[s.currTopic!]
    const subtopicElems = topic.subtopics.map((subtopic : string) => {
      const p = document.createElement('p');
      p.id = subtopic
      p.textContent = subtopic
      return p
    })
    
    subtopicElems.forEach((st) => {
      subtopicContainer.appendChild(st)
    })

  }
}
