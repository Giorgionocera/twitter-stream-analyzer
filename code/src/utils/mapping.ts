import { differenceByMonths } from './date';
import { Author } from 'src/schemas/author.schema';
import { Tweet } from 'src/schemas/tweet.schema';
import { UserV2, TweetV2 } from 'twitter-api-v2';

export const mapAuthor = (user: UserV2, address: string): Author => {
  const months = differenceByMonths(user.created_at);

  return {
    authorId: user.id,
    twitterCreatedAt: user.created_at,
    profileImageUrl: user.profile_image_url,
    name: user.name,
    username: user.username,
    address,
    valid: months >= 4,
  };
};

export const mapTweet = (tweet: TweetV2, author: string): Tweet => ({
  id: tweet.id,
  text: tweet.text,
  tweetCreatedAt: tweet.created_at,
  author,
});
