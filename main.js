var fs = require('fs');

const readline = require('readline');
var optionsMenu = '1) Criar \n' +
    '2) Listar \n' +
    '3) Atualizar \n' +
    '4) Deletar \n' +
    '0) Sair \n'
var data = loadFile();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

menu();

function menu() {
    rl.question(optionsMenu, res => {
        switch (parseInt(res)) {
            case 1:
                console.clear();
                create();
                break;
            case 2:
                console.clear();
                list();
                break;
            case 3:
                console.clear();
                updateById();
                break;
            case 4:
                console.clear();
                deleteById();
                break;
            case 0:
                console.clear();
                console.log("Saindo!");
                rl.close();
                break;
            default:
                console.clear();
                console.log("Opção invalida digite novamente! \n");
                menu();
                break;
        }
    });
}

function create() {
    console.log("------CRIAR------");
    var name;
    var role;
    var input;
    rl.question("Digite o nome: ", res => {
        name = res;
        rl.question("Digite o cargo: ", res => {
            role = res;
            input = {
                id: data[data.length - 1] ? data[data.length - 1].id + 1 : 1,
                obj: {
                    name: name,
                    role: role
                }
            }
            data.push(input)
            fileUpdate(data);
            console.log("\n\n Criado com sucesso!");
            setTimeout(() => {
                console.clear();
                menu();
            }, 1000);
        });
    });
}

function list() {
    console.log("------LISTAR------");
    data.forEach(element => {
        console.log(element.id + ' - ' + element.obj.name + ' - ' + element.obj.role);
    });
    console.log("___________________\n\n");
    menu();
}

function updateById() {
    console.log("------ALTERAÇÂO------");

    rl.question("Digite a matricula: ", res => {
        let index = getByid(parseInt(res));
        if (index !== -1) {
            var people = data[index]
            console.log("Nome: " + people.obj.name);
            console.log("Cargo: " + people.obj.role);

            rl.question("\nNovo nome: ", newName => {
                rl.question("Novo cargo: ", newRole => {
                    data[index].obj.name = newName;
                    data[index].obj.role = newRole;
                    fileUpdate(data);
                    console.log("\n\n Alterado com sucesso!");
                    setTimeout(() => {
                        console.clear();
                        menu();
                    }, 1000);
                });
            });
        } else if (res == 0) {
            console.clear()
            menu();
        } else {
            console.log("Matricula incorreta! Digite novamente. \n");
            updateById();
        }
    });
}

function deleteById() {
    console.log("------EXCLUIR------");
    rl.question("Digite a matricula ou (0) para voltar: ", res => {
        let index = getByid(parseInt(res));
        if (index !== -1) {
            data.splice(index, 1);
            fileUpdate(data);
            console.log("\n\n Excluido com sucesso!");
            setTimeout(() => {
                console.clear();
                menu();
            }, 1000);
        } else if (res == 0) {
            console.clear()
            menu();
        } else {
            console.log("Matricula incorreta! Digite novamente. \n");
            deleteById();
        }
    });
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
