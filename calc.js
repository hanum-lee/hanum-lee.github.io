
let previous = "";
let result = "";
let numinput = ["n0","n1","n2","n3","n4","n5","n6","n7","n8","n9"];
let expinput = ["elb","erb","ediv","emul","emin","eplu"];
let expequ = ["(",")","/","*","-","+"];

//what happens if there was an error then user cleared it?
$("#clear").on("click",function () {
    result='';
    $("#current").text(' ');
});

$("#answer").on("click",function () {
    try{
        previous = result;
        result = eval(result);
    }catch(error){
        previous = result + "ERROR";
        result = 0;
    }finally {
        $("#previous").text(previous);
        $("#current").text(result);
    }

});

$(".num").on("click",function () {
    let input = numinput.indexOf(this.id);
    addSymbols(input);

});

$(".expression").on("click",function () {
    let input = expinput.indexOf(this.id);
    let expr = expequ[input];
    addSymbols(expr);

});

function addSymbols(input){
    result = result + input;
    $("#current").text(result);
}