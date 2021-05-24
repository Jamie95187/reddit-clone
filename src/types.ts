import { Post } from './entity/Post';
import { Request, Response } from 'express';
import { Session } from 'express-session';

export type MyContext = {
  req: Request & {session?: Session & { userId?: Number }};
  res: Response;
}
