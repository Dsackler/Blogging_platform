import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/client';

type PostInclude = {
  user: true;
  comments: true;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    //fetch all posts
    try {
      const data = await prisma.post.findMany({
        include: {
          user: true,
          comments: true,
        } as PostInclude,
        orderBy: {
          createdAt: 'desc',
        },
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(403).json({ err: 'Error has occured while retireving posts' });
    }
  }
}
