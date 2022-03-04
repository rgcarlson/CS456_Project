function myAlert(){
	let i = 0;
	console.log(i++);
	window.alert(i++);
}

function helloAlert(){
	window.alert('Hello!');
}

function conf(){
	let ret = window.confirm('Do you want to Continue?');
	console.log(ret);
	return ret;
}

function inpDialog(){
	let numero = window.prompt('What is your favorite number?','0');
	console.log(numero);
	return numero;
}