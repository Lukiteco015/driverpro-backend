import { Request, Response } from 'express';
import User from "../models/User";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { firebaseUid, nome, email, tipo, telefone } = req.body;

    if (!firebaseUid) {
      return res.status(400).json({ message: "Firebase UID é obrigatório." });
    }

    const newUser = await User.create({
      firebaseUid,
      nome,
      email,
      tipo,
      telefone
    });

    return res.status(201).json(newUser);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Usuário ou e-mail já cadastrado." });
    }
    
    return res.status(500).json({ message: "Erro interno ao criar usuário.", error: error.message });
  }
};