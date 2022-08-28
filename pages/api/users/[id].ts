import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const userHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query: { id },  method } = req
  if (method === 'GET') {
    try {
      if (typeof id === 'string') {
        const user = await prisma.user.findUnique({ where: { id } })
        if (user) {
          res.status(200).json({ data: user })
        } else {
          res.status(400).json({ message: 'Could not find user' })
        }
      }
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}

export default userHandler