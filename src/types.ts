import { Request, Response } from 'express';
import { Session } from 'express-session';

export type MyContext = {
  // Request can store anything, can even store whole user Object
  req: Request & {session?: Session & { userId?: Number }};
  // Mock Request
  // req: Request & { session?: Session & { userId?: 6 } };
  res: Response;
}
