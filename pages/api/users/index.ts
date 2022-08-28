import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient()

export const usersHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  // change to switch statement to handle other HTTP verbs
  if (method === 'GET') {
    try {
      const allUsers = await prisma.user.findMany()
      res.status(200).json({ data: allUsers })
    } catch (error) {
      res.status(500).json({ error })
    }
  }
  if (method === 'POST') {
    try {
      const { name, email } = req.body
      const user = await prisma.user.create({ data: { name, email }})
      res.status(201).json({ data: user })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
    return
}

export default usersHandler