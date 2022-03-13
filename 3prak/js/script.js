window.onload = function () {

	let arr=[
		{name: "apple", count: 5, price: 70},
		{name: "orange", count: 10, price: 90}
	]

	let count=0;
	arr.forEach(function(object)
	{
		count = count + object.count*object.price;
	});

	console.log("All cost: " + count);

	let new_arr = {
	  bill: arr,
	  result: count
	};

	console.log(JSON.stringify(new_arr));

	console.log("Дата:" + Date());

	//получаем идентификатор элемента
	document.getElementById('js-action').onclick = function() {
		let list = document.getElementsByClassName('list-item');
		for (let i=0; i<list.length; i++){
			document.getElementById('main-id').append(list[i].innerHTML + " ");
		}
	}

	document.getElementById('js-action-style').onclick = function() {
		let list = document.getElementsByClassName('list-item');
		if (document.getElementsByClassName('list-item')[0].style.backgroundColor == "red")
		{
			for (let i=0; i<list.length; i++){
				document.getElementsByClassName('list-item')[i].style.backgroundColor = "";
			}
		}
		else {
			for (let i=0; i<list.length; i++){
				document.getElementsByClassName('list-item')[i].style.backgroundColor = "red";
			}
		}
	}

		// Access the form element...
	const form = document.getElementById("js-action-search");

	// ...and take over its submit event.
	form.addEventListener( "submit", function ( event ) {
		event.preventDefault();

		let list = document.getElementsByClassName('list-item');
		for (let i=0; i<list.length; i++){
			if (list[i].innerHTML.includes(document.getElementById("js-text").value))
			{
				document.getElementsByClassName('list-item')[i].style.color = "blue";
			}
			else {
				document.getElementsByClassName('list-item')[i].style.color = "";
			}
		}
	} );
}
