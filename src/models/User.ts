import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const userSchema = new Schema({
  firebaseUid: {
    type: String,
    required: [true, 'O firebaseUid é obrigatório'],
    unique: true,
    index: true
  },
  nome: {
    type: String,
    required: [true, 'O nome é obrigatório'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'O email é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    select: false
  },
  telefone: {
    type: String,
    required: [true, 'O telefone é obrigatório']
  },
  tipo: {
    type: String,
    enum: ['motorista', 'passageiro'],
    required: [true, 'O tipo de usuário é obrigatório']
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['ativo', 'pendente', 'bloqueado'],
    default: 'ativo'
  }
}, {
  timestamps: true
});

// Nunca salvar senha em texto puro — só dispara se passwordHash for preenchido/alterado
userSchema.pre('save', async function () {
  if (!this.isModified('passwordHash') || !this.passwordHash) return;
  this.passwordHash = await bcrypt.hash(this.passwordHash, SALT_ROUNDS);
});

export default model('User', userSchema);
