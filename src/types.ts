import { Post } from './entity/Post';
import { Request, Response } from 'express';

export type MyContext = {
  cm: Array<Post>;
  req: Request & {session: Express.Session};
  res: Response;
}
