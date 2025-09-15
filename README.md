# Website for Lazily Explored Wikipedia Topics
'Lazy DFS' style wikipedia exploration, starting at some root topic

### Prerequisites
- Install [Node.js](https://nodejs.org/en/download)
- Run `npm install`


### Dependencies
- Wikipedia API endpoints remain functional and do not change their JSON response structure
- The frontend diretly interacts with the Wikipedia API `https://en.wikipedia.org/w/api.php?action=query&format=json&title...` as opposed to through a middleman server

### Inspect code
- in the root directory
    - `index.html`
- in the src directory
    - typescript
        - `main.ts` - master MVC logic
        - `observable.ts` - user input / web request streams
        - `types.ts`
        - `state.ts` - define actions which define reductions from oldState -> newState 
        - `util.ts` -
        - `render.ts` - define how a state should look in the view

    - css
        - `style.css`

### Run website
- To run live server `npm run dev`
- To compile into vanilla html/css/js with `npm run build`, open `dist/index.html`

