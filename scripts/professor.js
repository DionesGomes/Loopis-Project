$(function () {
  var operacao = "C"; //"C"=Crear
  var selected_index = -1; // Indíce do elemento selecionado na lista.
  var tblProfessor = localStorage.getItem("tblProfessor"); //Retornar os dados armazenados.
  tblProfessor = JSON.parse(tblProfessor); //Converte String em um Object.
  if (tblProfessor === null) // Se não houver dados, inicializa um array vazio.
      tblProfessor = [];

  function Criar() {
    //Capturar os dados do forulário HTML e transforma-los em String.
    var professor = JSON.stringify({
      Matricula: $("#txtMatricula").val(),
      Nome: $("#txtNome").val(),
      Nascimento: $("#txtNascimento").val(),
      Admissao: $("#txtAdmissao").val(),
      Salario: $("#txtSalario").val(),
    }); 
    //Adicionar o objeto a tabela.
    tblProfessor.push(professor);
    //Armazenar os dados em um Local Storage
    localStorage.setItem("tblProfessor", JSON.stringify(tblProfessor));
    alert("Os dados foram armazenados com sucesso!"); //alerta!
    return true;
  }

  function Editar() {
    // Editar um item seleccionado na tabela.
    tblProfessor[selected_index] = JSON.stringify({
      Matricula: $("#txtMatricula").val(),
      Nome: $("#txtNome").val(),
      Nascimento: $("#txtNascimento").val(),
      Admissao: $("#txtAdmissao").val(),
      Salario: $("#txtSalario").val(),
    });
    //Armazenando os dados em um Local Storage
    localStorage.setItem("tblProfessor", JSON.stringify(tblProfessor)); 
    alert("Os dados foram editados"); //alerta!
    return true;
  }

  function Deletar() {
    //Excluindo um elemento selecionado na tabela!
    tblProfessor.splice(selected_index, 1); 
    //Atualizando os dados no Local Storage
    localStorage.setItem("tblProfessor", JSON.stringify(tblProfessor)); 
    alert("Pessoa exlcuída"); //alerta!
  }

  function Listar() {
    $("#tblList").html("");
    $("#tblList").html(
            "<thead>" +
            "<tr>" +                
            "<th>Matricula</th>" +
            "<th>Nome</th>" +
            "<th>Data de Nascimento</th>" +
            "<th>Data de Admissão</th>" +
            "<th>Salário </th>" +
            "<th>Opções</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            ); //Agregando tabela a  estrutura HTML
    for (var i in tblProfessor) {
        var per = JSON.parse(tblProfessor[i]);
        $("#tblList tbody").append("<tr>" +                    
                "<td>" + per.Matricula + "</td>" +
                "<td>" + per.Nome + "</td>" +
                "<td>" + per.Nascimento + "</td>" +
                "<td>" + per.Admissao + "</td>" +
                "<td>" + per.Salario + "</td>" +                 
                "<td><img src='img/edit.png' alt='Edit" + i + "' class='btnEdit'/>&nbsp &nbsp<img src='img/delete.png' alt='Delete" + i + "' class='btnDelete'/></td>" +
                "</tr>"
                );
    } 
  }

  $("#frm").bind("submit", function () {
    if (operacao === "C")
        return Criar();
    else
        return Editar();
  }); 
  
  Listar();

  $(".btnEdit").bind("click", function () {
    operacao = "E"; //"E" = Editar
    //Obter o identificador do item editado.
    selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
    // Convertando de JSON para o formato editável dos dados.
    var per = JSON.parse(tblProfessor[selected_index]); 
    $("#txtMatricula").val(per.Matricula);
    $("#txtCpf").val(per.Cpf);
    $("#txtNome").val(per.Nome);
    $("#txtNascimento").val(per.Nascimento);
    $("#txtAdmissao").val(per.Admissao);    
    $("#txtSalario").val(per.Salario);
    $("#txtMatricula").attr("readonly", "readonly");
    $("#txtNome").focus();
  });

  $(".btnDelete").bind("click", function () {
    //Obtendo o identificador de um item a ser Excluido.
    selected_index = parseInt($(this).attr("alt").replace("Delete", "")); 
    Deletar(); //Excluir o item
    Listar(); //Listar os items da tabela.
  });
});

