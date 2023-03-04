import Parser from 'rss-parser'

export type FeedItem = {
    type: string
    title: string
    createdAt: string
    url: string
}

export const getZennRssFeed = async ():Promise<FeedItem[]> => {
  const feed = await new Parser().parseURL('https://zenn.dev/wheatandcat/feed?all=1')
 
  return feed.items.map(item => ({
    type: "zenn",
    title: item.title ?? "",
    createdAt: item.pubDate
      ? new Date(item.pubDate).toISOString()
      : new Date().toISOString(),
    url: item.link ?? "",
  }));
}

export const getHatenaRssFeed = async ():Promise<FeedItem[]> => {
  const feed = await new Parser().parseURL('https://www.wheatandcat.me/rss')
 
  return feed.items.map(item => ({
    type: "hatena",
    title: item.title ?? "",
    createdAt: item.pubDate
      ? new Date(item.pubDate).toISOString()
      : new Date().toISOString(),
    url: item.link ?? "",
  }));
}