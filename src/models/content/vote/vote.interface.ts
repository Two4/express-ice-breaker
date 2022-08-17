
export interface IVote {
    contentId: string
    voter: string
    up: boolean
    timestampUTC: number | null
}

export interface IVoteCount {
    upvotes: number
    downvotes: number
}