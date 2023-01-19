export interface ChannelRowInterface {
    kind: string
    etag: string
    nextPageToken: string
    regionCode: string
    pageInfo: PageInfo
    items: ChannelItem[]
}

export interface PageInfo {
    totalResults: number
    resultsPerPage: number
}

export interface ChannelItem {
    kind: string
    etag: string
    id: Id
    snippet: Snippet
}

export interface Id {
    kind: string
    channelId: string
}

export interface Snippet {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: Thumbnails
    channelTitle: string
    liveBroadcastContent: string
    publishTime: string
}

export interface Thumbnails {
    default: Default
    medium: Medium
    high: High
}

export interface Default {
    url: string
}

export interface Medium {
    url: string
}

export interface High {
    url: string
}

export interface ChannelRowCardInterface {
    image?: string,
    channelId?: string,
    subs?: string,
    noOfVideos?: string,
    description?: string,
    title?: string,
    channel?: string,
}
