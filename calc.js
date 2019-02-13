
let previous = "";
let result = "";
let numinput = ["n0","n1","n2","n3","n4","n5","n6","n7","n8","n9"];
let expinput = ["elb","erb","ediv","emul","emin","eplu"];
let expequ = ["(",")","/","*","-","+"];

//what happens if there was an error then user cleared it?
$("#clear").on("click",function () {
    result='';
    $("#current").text(' ');
    console.log("Test");
});

$("#answer").on("click",function () {
    try{
        previous = result;
        result = eval(result);
        console.log(result);
    }catch(error){
        console.log("There is an error");
        previous = result + "ERROR";
        result = 0;
    }finally {
        $("#previous").text(previous);
        $("#current").text(result);
    }

});

$(".num").on("click",function () {
    let input = numinput.indexOf(this.id);
    console.log(input);
    addSymbols(input);

});

$(".expression").on("click",function () {
    let input = expinput.indexOf(this.id);
    let expr = expequ[input];
    console.log(expr);
    addSymbols(expr);

});

function addSymbols(input){
    result = result + input;
    $("#current").text(result);
}