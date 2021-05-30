import { Request, Response } from 'express';
import { Session } from 'express-session';

export type MyContext = {
  req: Request & {session?: Session & { userId?: Number }};
  // Mock Request
  // req: Request & { session?: Session & { userId?: 6 } };
  res: Response;
}
