import Livro from "../Models/Livro.js";

class LivroController {  
//funcao responsavel por retornar uma lista com todos os livros cadastrados no banco
    static listarLivros = async (req, res, next) => {
        try{
            const livro = await Livro.find().populate("autor");
            res.status(200).json(livro);
        }catch(erro){
            next(erro); 
        }
    };

    //Funcao responsavel por retornar o objeto (livro) utilizando o ID como parametro
    static listarLivro = async (req, res, next) => {
        try {
            const {id} = req.params;
            const livro = await Livro.findById({_id : id}).populate("autor", "nome");
            if(!livro) {
                return res.status(404).send({mensage: "Livro não encontrado!"});
            }
            res.status(200).json(livro);    
        }catch(erro){
            next(erro); 
        }
    };

    //Funcao responsavel por cadastra os livros no banco (não possuindo grandes filtros devido a regra de negocio)
    static cadastraLivro = async (req, res, next) => {
        try {
            let livro = new Livro(req.body);
            livro.save();
            res.status(201).send(livro.toJSON());
            
        }catch(erro){
            next(erro); 
        }
    };

    //Funcao responsavel por atualizar os dados de um livro no bd usando o ID como localizador
    static updateLivro = async (req, res, next) => {
        try {
            const {id} = req.params;
            await Livro.findByIdAndUpdate(id,{$set: req.body});
            res.status(200).send({mensage: "Livro atualizado com sucesso."});
        }catch(erro){
            next(erro); 
        }

    };
    //Funcao responsavel por deletar livros no banco utilizando o ID
    static deleteLivro = async (req, res, next) => {
        try {
            const {id} = req.params;
            await Livro.deleteOne({_id: id});
            res.status(200).send({mensage: "Livro deletado com sucesso!"});      
        }catch(erro){
            next(erro); 
        }
    };
}


export default LivroController;