// Util functions
export const jsonParser = (res: Response) => res.json();
export const textParser = (res: Response) => res.text();
export const getUrlWikiTopicQueryApi = (topic: string) =>
  `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=${topic}&srlimit=1&srprop=snippet&origin=*`;