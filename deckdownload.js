	//https://stackoverflow.com/questions/247483/http-get-request-in-javascript
	
	//Fazer o GET request 
	function httpGet(theUrl){
		var xmlHttp = new XMLHttpRequest();
	    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
	    xmlHttp.send( null );
    	return xmlHttp.responseText;
	}

	/*
	function httpGetAsync(theUrl, callback){
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() { 
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			            callback(xmlHttp.responseText);
			    }
		 xmlHttp.open("GET", theUrl, true); // true for asynchronous 
		 xmlHttp.send(null);
	}*/


	/*
		constroi o deck de cartas, com os atributos de cada carta.
		O mome de cada carta é retirado da textArea.
		O nome é utilizado para obter o JSON file da carta pela API
		É criada uma variavel objecto com as informações de cada carta.
		As cartas sao indexadas pelo "multiverse_id"

		Retorna o deck e o numero de cartas
	*/
	function deckOfCards(){
		var deck ={};
		var x = document.getElementById("myTextarea").value;
    
    	var y=x.split(/[\r\n]+/g);

	    
	    for(var i=0;i<y.length;i++){

	    	var s = y[i].split(/[0-9]+/g,3);
	    	
	    	var caralho=s[1].trim();

			var json=httpGet("https://api.deckbrew.com/mtg/cards?name="+caralho);
			var data= JSON.parse(json);

			var aux = {};

			aux["name"]=data[0].name;
			aux["types"]=data[0].types;
			aux["subtypes"]=data[0].subtypes;
			aux["colors"]=data[0].colors;
			aux["cmc"]=data[0].cmc;
			aux["cost"]=data[0].cost;
			aux["text"]=data[0].text;
			aux["power"]=data[0].power;
			aux["toughness"]=data[0].toughness;

			var nEditions = data[0].editions.length;

			aux["image_url"]=data[0].editions[nEditions-1].image_url;
			aux["multiverse_id"]=data[0].editions[nEditions-1].multiverse_id;

	
			deck[aux["multiverse_id"]]=aux;

	    }


		return [deck,i];

	}

	/*
		Elimina todas as imagens criadas no div contain-cards.
		objectivo: fazer alterações na lista de cartas e carregar, 
		simplesmente, no butao "load", em vez de ter de actualizar a pagina.
	*/
	function clearCards(){
		var myNode = document.getElementById("contain-cards");
		myNode.innerHTML = '';
	}

	/*
		Cria as imagens de cada carta.
		Esta função é acionada quando o butao "load" é premido

		Nesta função é tambem guardado o estado da variavel CARDS no browser
		para depois ser usada no script mtgtable.js

	*/

	function displayCards() {
		clearCards()

		CARDS=deckOfCards()[0];
		NUMCARDS=deckOfCards()[1];

		//Storing data:
		myJSON = JSON.stringify(CARDS);
		localStorage.setItem("deckOfCards", myJSON);


	    for(key in CARDS) {
	   		 
			
			var elem = document.createElement("img");

			elem.src=CARDS[key].image_url;
			elem.setAttribute('width', '20%');
			elem.setAttribute('id',CARDS[key].multiverse_id);
			elem.setAttribute('onmouseover',"zoom('"+CARDS[key].multiverse_id+"')")
			elem.setAttribute('onmouseout',"clearImg('merda')")

			document.getElementById("contain-cards").appendChild(elem);

			}

	
	}
	
	//eleminar imagem
	function clearImg(x){
		var element = document.getElementById(x);
		element.parentNode.removeChild(element);
		
	}


	//faz o zoom as cartas
	function zoom(x){	
		
		var elem = document.createElement("img");
		
		elem.src=CARDS[x].image_url;
		elem.setAttribute('width', '100%');
		elem.setAttribute('id', 'merda');
		document.getElementById("zoom").appendChild(elem);
		
	
	}

	