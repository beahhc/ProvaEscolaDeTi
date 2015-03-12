module = angular.module("Trabalho", []);

module.controller("DisciplinaController", ["$scope","$http", DisciplinaController]);


function DisciplinaController($scope,$http) {
    
    $scope.iniciar = funcaoIniciar;
    $scope.salvar = funcaoSalvar;
    $scope.excluir = funcaoExcluir;
    $scope.editar = funcaoEditar;
    
    $scope.disciplinas = [];
    $scope.disciplina = {};
    $scope.isNovo = true;
    
    function funcaoEditar(disciplina) {
        $scope.disciplina = angular.copy(disciplina);
        $scope.isNovo = false;
        funcaoCarregar();
    }

    
    function funcaoExcluir(disciplina) {
        $http.delete("/disciplina/"+disciplina.id).succes(onSucess).error(onError);
        
        function onSucess (data, status){
            funcaoCarregar();
        }
        function onError (data, status){
            alert ("Deu erro: " + data);
        }
        funcaoCarregar();
    }
    
    function funcaoSalvar(disciplina) {
        if ($scope.isNovo){
            $http.post("/disciplina", $scope.disciplina).sucess(onSucess).error(onError);
        }
        else {
            $http.put("/disciplina", $scope.disciplina).sucess(onSucess).error(onError);
        }
        
        function onSucess (data,status){
            funcaoCarregar();
            $scope.disciplinas={};
            $scope.isNovo=true;
        }
        function onError (data, status){
            alert ("Deu erro: " + data);
        }
       funcaoCarregar();
    }
    
    function funcaoCarregar() {
        $http.get("/disciplina").success(onSuccess).error(onError);
        
        function onSuccess(data, status) {
            $scope.disciplinas = data;       
        }
        function onError(data, status) {
            alert("Deu erro: " + data);
        }
    }
    
    function funcaoIniciar() {
        funcaoCarregar();
        console.log(">>> veículos carregados....");
    }
        
}


