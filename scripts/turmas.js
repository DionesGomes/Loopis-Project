$(function () {
  var operacao = "C"; //"C"=Crear
  var selected_index = -1; // Indíce do elemento selecionado na lista.
  var tblTurma = localStorage.getItem("tblTurma"); //Retornar os dados armazenados.
  tblTurma = JSON.parse(tblTurma); //Converte String em um Object.
  if (tblTurma === null) // Se não houver dados, inicializa um array vazio.
      tblTurma = [];


  /*Função para buscar pela matricula do aluno */
  function buscarAluno(matricula){
    var alunos = JSON.parse(localStorage.getItem("tblAluno"));
    console.log(matricula+" aluno");
    for(var i in alunos){
      var aluno = JSON.parse(alunos[i]);
      if(aluno.MatriculaAluno==matricula){
        return aluno.NomeAluno;
      }
    }
    return "Matricula inexistente";

  }

  function buscarProfessor(matricula){
    var professores = JSON.parse(localStorage.getItem("tblProfessor"));
    console.log(matricula+" professor");
    for(var i in professores){
      var professor = JSON.parse(professores[i])
      if(professor.Matricula==matricula){
        return professor.Nome;
      }
    }
    return "Professor inexistente";
  }

  //Capturar os dados do forulário HTML e transforma-los em String.
  function Criar() {
    
        var turma = JSON.stringify({
        Turma: $("#txtTurmaNome").val(),
        MatriculaProfessor: $("#txtMatriculaProfessor").val(),
        MatriculaAluno: $("#txtMatriculaAluno").val(),     
    
    }); 
    //Adicionar o objeto a tabela.
    tblTurma.push(turma);
    //Armazenar os dados em um Local Storage
    localStorage.setItem("tblTurma", JSON.stringify(tblTurma));
    alert("Os dados foram armazenados com sucesso!"); //alerta!
    return true;
  }

  function Editar() {
    // Editar um item seleccionado na tabela.
    tblTurma[selected_index] = JSON.stringify({
      Turma: $("#txtTurmaNome").val(),
      MatriculaProfessor: $("#txtMatriculaProfessor").val(),
      MatriculaAluno: $("#txtMatriculaAluno").val(),
    });
    //Armazenando os dados em um Local Storage
    localStorage.setItem("tblTurma", JSON.stringify(tblTurma)); 
    alert("Os dados foram editados"); //alerta!
    return true;
  }

  function Deletar() {
    //Excluindo um elemento selecionado na tabela!
    tblTurma.splice(selected_index, 1); 
    //Atualizando os dados no Local Storage
    localStorage.setItem("tblTurma", JSON.stringify(tblTurma)); 
    alert("Pessoa exlcuída"); //alerta!
  }

  function Listar() {
    $("#tblList").html("");
    $("#tblList").html(
            "<thead>" +
            "<tr>" +                
            "<th>Nome da Turma</th>" +
            "<th>Nome do Professor</th>" +
            "<th>Nome do Aluno</th>" +
            "<th>Opções</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            ); //Agregando tabela a  estrutura HTML
    for (var i in tblTurma) {
        var per = JSON.parse(tblTurma[i]);
        $("#tblList tbody").append("<tr>" +                    
                "<td>" + per.Turma + "</td>" +
                "<td>" + buscarProfessor(per.MatriculaProfessor)+ "</td>" +
                "<td>" + buscarAluno(per.MatriculaAluno) + "</td>" +                                               
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
    var per = JSON.parse(tblTurma[selected_index]); 
    $("#txtTurmaNome").val(per.Turma);
    $("#txtMatriculaProfessor").val(per.MatriculaProfessor).attr("readonly", "readonly");
    $("#txtMatriculaAluno").val(per.MatriculaAluno).attr("readonly", "readonly");
    $("#txtTurmaNome").focus();
  });

  $(".btnDelete").bind("click", function () {
    //Obtendo o identificador de um item a ser Excluido.
    selected_index = parseInt($(this).attr("alt").replace("Delete", "")); 
    Deletar(); //Excluir o item
    Listar(); //Listar os items da tabela.
  });
});

