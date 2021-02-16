import { Request, Response } from "express"
import User from '../models/user'

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();

  res.json({
    users
  })
}

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (user) {
    res.json({
      user
    })
  } else {
    res.status(404).json({
      msg: `User with id ${id} does not exist`
    })
  }
}

export const postUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const existEmail = await User.findOne({
      where: {
        email: body.email
      }
    })

    if (existEmail) {
      return res.status(400).json({
        msg: `Email ${body.email} already registered!`
      })
    }

    const user = new User(body);
    await user.save()

    res.json({
      user
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Talk to the administrator"
    })
  }


}

export const putUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        msg: `User ${id} does not exist`
      })
    }

    await user.update(body);

    res.json({
      user
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Talk to the administrator"
    })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({
      msg: `User ${id} does not exist`
    })
  }

  await user.update({ status: false })

  // await user.destroy()


  res.json({
    user
  })
}