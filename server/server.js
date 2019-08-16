const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const port = 8000
const host = 'localhost'

var data = loadFile();
var app = express();
app.use(cors())
app.use(bodyParser.json());

app.post('/create', function (req, res) {
    try {
        create(req.body)
        res.send({
            status: 200,
            menssage: 'Inserido com sucesso!'
        })
    } catch (error) {
        res.send({
            status: 400,
            menssage: 'Erro ao gravar no banco!',
        })
    }
})

app.get('/getAll', function (req, res) {
    try {
        res.send({
            status: 200,
            message: 'OK',
            list: list()
        })
    } catch (error) {
        res.send({
            status: 500,
            menssage: 'Erro ao retornar dados do banco!',
        })
    }
})

app.post('/updateById', function (req, res) {
    try {
        res.send(updateById(req.body))
    } catch (error) {
        res.send({
            status: 500,
            message: 'Erro interno ao atualizar!'
        })
    }
})

app.post('/deleteById', function (req, res) {
    try {
        res.send(deleteById(req.body))
    } catch (error) {
        res.send({
            status: 500,
            message: 'Erro interno ao deletar!'
        })
    }
})

function create(req) {
    console.log(req);

    var input = {
        id: data[data.length - 1] ? data[data.length - 1].id + 1 : 1,
        obj: {
            name: req.name,
            role: req.role
        }
    }
    data.push(input)
    fileUpdate(data);
}

function list() {
    return data
}

function updateById(req) {
    let index = getByid(parseInt(req.id));
    if (index !== -1) {
        data[index].obj.name = req.obj.name;
        data[index].obj.role = req.obj.role;
        fileUpdate(data);
        return {
            status: 200,
            message: 'OK',
            list: list()
        }
    } else {
        return {
            status: 400,
            message: 'Erro ao atualizar o cadastro, matricula incorreta!'
        }
    }
}

function deleteById(req) {
    let index = getByid(parseInt(req.id));
    if (index !== -1) {
        data.splice(index, 1);
        fileUpdate(data);
        return {
            status: 200,
            message: 'Excluido com sucesso!'
        }
    } else {
        return {
            status: 400,
            message: 'Erro ao excluir, Matricula incorreta!!'
        }
    }
}

function fileUpdate(data) {
    fs.writeFile("Banco.txt", JSON.stringify(data), function (err) {
        if (err) {
            throw err;
        }
    });
}

function loadFile() {
    return fs.readFileSync('Banco.txt', 'utf8') ? JSON.parse(fs.readFileSync('Banco.txt', 'utf8')) : [];
}

function getByid(id) {
    return data.indexOf(data.find(item => item.id === id) !== -1 ? data.find(item => item.id === id) : {});
}

app.listen(port, host, function () {
    console.log('Servidor rodando na porta 8000.');
});