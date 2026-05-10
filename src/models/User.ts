import { Schema, model } from "mongoose";

const userSchema = new Schema({
    firebaseUid: {
        type: String,
        required: true,
        unique: true,
        index: true 
    },
    nome: {
        type: String,
        required: [true, "O nome é obrigatório"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "O email é obrigatório"],
        unique: true,
        lowercase: true,
        trim: true
    },
    telefone: {
        type: String,
        required: [true, "O telefone é obrigatório"],
    },
    tipo: {
        type: String,
        enum: ["motorista", "passageiro"],
        required: [true, "O tipo de usuário é obrigatório"]
    },
    avatarUrl: { 
        type: String, 
        default: ''
    },
    status: {
        type: String,
        enum: ["ativo", "pendente", "bloqueado"],
        default: "ativo"
    }
}, {
    timestamps: true
});

export default model("User", userSchema);