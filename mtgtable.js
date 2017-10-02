
	/*
		o estado da variavel "CARDS" (em deckdownload.js) é recuperada.

	*/

	//Retrieving data:
	text = localStorage.getItem("deckOfCards");

	//variaveis globais para o deck de cartas e as cartas na mao
	DECK = JSON.parse(text);
	HANDCARDS = handCards(DECK,7);

	

	/*
		retorna n cartas retiradas do deck aleatoriamente
	*/
	function handCards(deck,n){
		var cardIDs = [];

		for(key in deck) {
			cardIDs.push(key);

		}
		var aux=shuffle(cardIDs);
		
		var handCards = [];

		for (var i=0;i<n;i++){
			handCards.push(aux[i]);
		}

		return handCards;
		
	}
	

	function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

 	 return array;
	}

	


/*
	function deck(){
		var deck =["13111","222720","3272","233299","435166","220525","423809","383178","12612","12612","12612"];

		return deck;


	}

*/

	//ids dos divs filhos de: "cards-hand", e "creatures". 
	var num = ["hndum","hnddois","hndtres","hndquatro","hndcinco","hndseis","hndsete","hndoito"];
	var creatures = ["um","dois","tres","quatro","cinco","seis","sete","oito","nove","dez"];
	var card ={};

	/*
		Crias as cartas na mao do jogador
	*/
	function playCards(){
		
		var imgUrl='';
		var cardName='';

		for (var i = 0; i < HANDCARDS.length; i++) {

			var elem = document.createElement("img");

			console.log(HANDCARDS[i]);
			imgUrl=DECK[HANDCARDS[i]].image_url;
			

			elem.src=imgUrl;
			elem.setAttribute('width', '100%');
			elem.setAttribute('onClick',"pickedCard('"+num[i]+"')")

			card[num[i]]=imgUrl;
			
		
			document.getElementById(num[i]).appendChild(elem);
		
			}

	}

	playCards();

	//tornar o visivel o div: cards-hand visivel
	function displayBlock(){
		document.getElementById("cards-hand").style.display="block";
		
	}

	//tornar o visivel o div: cards-hand invisivel
	function displayNone(){

		document.getElementById("cards-hand").style.display="none";

	}
	
	//Faz o zoom as cartas na mao
	function zoom(x){
		
		document.getElementById("cards-hand").style.display="block";
		var elem = document.createElement("img");
		
		elem.src=card[x];
		elem.setAttribute('width', '100%');
		elem.setAttribute('id', 'merda');
		document.getElementById("zoom").appendChild(elem);
		
	}

	/*
		elimina a imagem criada para o div zoom
		onmouseout="clearImg('merda')"
	*/
	function clearImg(x){
		var element = document.getElementById(x);
		element.parentNode.removeChild(element);
		
	}

	/*
		adiciona a carta clicada ao campo creaturas e elimina essa carta
		do da mao do jogador
	*/
	function pickedCard(x){
		var elem = document.createElement("img");
		
		elem.src=card[x];
		elem.setAttribute('width', '100%');

		
		var num="um"
		if(!document.getElementById(creatures[0]).hasChildNodes()){
				num=creatures[0];
			}
			else {
				for(var i=0;i<creatures.length-1;i++){
					if(!document.getElementById(creatures[i+1]).hasChildNodes()){
						num=creatures[i+1];
						break;
					}

				}
			}

		document.getElementById(num).appendChild(elem);
		clearImg(x);
	}

