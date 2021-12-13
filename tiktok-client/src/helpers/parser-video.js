export const parserVideo = (array) => {
  if (!Array.isArray(array)) return [];
  return array.map((item) => {
    return {
      url: item.source,
      channel: item.title,
      description: item.description,
      song: item.description,
      likes: item.n_likes,
      messages: item.n_comns,
      shares: item.n_shares,
    };
  });
};
