export interface TwitterMention {
  start: number;
  end: number;
  username: string;
  id: string;
}

export interface TwitterEntities {
  mentions: TwitterMention[];
}

export interface TweetReference {
  type: string;
  id: string;
}

export interface TwitterData {
  id: string;
  author_id: string;
  created_at: string;
  entities: TwitterEntities;
  text: string;
  referenced_tweets: TweetReference[];
}

export interface TwitterUser {
  created_at: string;
  id: string;
  name: string;
  username: string;
}

export interface TwitterInclude {
  users: TwitterUser[];
}

export interface TwitterRule {
  id: string;
  tag: string;
}

export interface TwitterResponse {
  data: TwitterData;
  includes: TwitterInclude;
  matching_rules: TwitterRule[];
}
