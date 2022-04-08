// des que le html est charger fait ça : 

    //Variables:
    //couleur selectionner
    let currentColor = "white"
    //cellule du tour en cours
    let currentBoardCells = ["board40", "board41", "board42", "board43"]
    //cellule réponse du tour en cours
    let currentPegCells = ["peg40", "peg41", "peg42", "peg43"]
    //ligne du tour en cour
    let currentRow = 11
    //Les couleurs disponibles :
    let possibleColor = ["blue", "green", "red", "yellow", "orange", "pink"]
    let hasWon = false


    let cell1Color, cell2Color, cell3Color, cell4Color;
    

    //dictionnaire de couleurs:
    let colors = {
        "green": "green",
        "yellow": "yellow",
        "red": "red",
        "blue": "blue",
        "pink": "pink",
        "orange": "orange"
    }

    //Code mystère :
    let code = [
        possibleColor[Math.floor(Math.random()*6)],
        possibleColor[Math.floor(Math.random()*6)],
        possibleColor[Math.floor(Math.random()*6)],
        possibleColor[Math.floor(Math.random()*6)],
    ]
    console.log(code);

    // création des cellules vides du plateau
    for(let i =0; i<44; i++){
        let cell = document.createElement("div")
        cell.className = "boardCell"
        cell.id = "board"+i 
        document.querySelector(".board").appendChild(cell)
    }
    //création des cellule reponse vide
    for(let i =0; i<44; i++){
        let cell = document.createElement("div")
        cell.className = "pegCell"
        cell.id = "peg"+i 
        document.querySelector(".pegs").appendChild(cell)
    }


    //Mise en place du selecteur de couleur:
    document.querySelectorAll(".color").forEach(element => {
        let color = element.getAttribute("id")
        element.style.backgroundColor = color
    })


    //Selection de la couleur en cours par le joueur
    document.querySelectorAll(".color").forEach(element => {
        element.addEventListener("click", function() {
            let color = this.getAttribute("id")
            currentColor = color
            document.querySelector(".currentColor").style.backgroundColor = color
        })
    }); 

    //Placement de la couleur selectionner par le joueur
    document.querySelectorAll(".boardCell").forEach(element => {
        element.addEventListener("click", function(){
            let id = this.getAttribute("id")
            if(isValid(id)){
                this.style.backgroundColor = currentColor
            }
        }); 
    })

    
    //Event listenner du bouton de validation du tour
    document.querySelector(".submit").addEventListener("click", function(){
        updatePegs();
        checkWin();
        changeCurrentRow();
    })

    //Changement de ligne et des cellules correspondantes
    function changeCurrentRow() {
        currentRow -= 1
        let mult = 4


        currentBoardCells = [
            "board" + (currentRow*mult-4),
            "board" + (currentRow*mult-3),
            "board" + (currentRow*mult-2),
            "board" + (currentRow*mult-1)
        ]
        currentPegCells = [
            "peg" + (currentRow*mult-4),
            "peg" + (currentRow*mult-3),
            "peg" + (currentRow*mult-2),
            "peg" + (currentRow*mult-1)
        ]
    }

    //Vérifie si le joueur joue à la bonne ligne
    function isValid(id) {
        if(currentBoardCells.includes(id) && hasWon == false){
            return true
        } else {
            return false
        }
    }


    //Verifie si le joueur a gagné
    function checkWin() {
        if (code[0] === cell1Color && code[1] === cell2Color && code[2] === cell3Color && code[3] === cell4Color) {
            hasWon = true
            alert("Bravo vous avez gagné!")
            document.querySelector(".secretColor1").style.backgroundColor = code[0]
            document.querySelector(".secretColor2").style.backgroundColor = code[1]
            document.querySelector(".secretColor3").style.backgroundColor = code[2]
            document.querySelector(".secretColor4").style.backgroundColor = code[3]
        }
        return hasWon
    }


    //Change les cellule réponses en fonction de la couleur des cellules
    function updatePegs(){
        let cell1 = document.querySelector("#"+currentBoardCells[0]);
        let cell2 = document.querySelector("#"+currentBoardCells[1]);
        let cell3 = document.querySelector("#"+currentBoardCells[2]);
        let cell4 = document.querySelector("#"+currentBoardCells[3]);

        cell1Color = colors[cell1.style.backgroundColor];
        cell2Color = colors[cell2.style.backgroundColor];
        cell3Color = colors[cell3.style.backgroundColor];
        cell4Color = colors[cell4.style.backgroundColor];

        let peg1 = document.querySelector("#"+currentPegCells[0]);
        let peg2 = document.querySelector("#"+currentPegCells[1]);
        let peg3 = document.querySelector("#"+currentPegCells[2]);
        let peg4 = document.querySelector("#"+currentPegCells[3]);

        let pegs = [peg1, peg2, peg3, peg4];

        //array des cellules réponse rempli
        let filledPegs = [];
        //array des cellules qui ont déja été prise en compte
        let chosenCells = [];
        //créer une copie de l'array de code
        let codeCopy = [...code];

        //si les couleurs sont dans les bonnes positions,
        //  change les cellules réponse en rouge
        if(code[0] === cell1Color){
            //choisi une cellule réponse qui n'a pas déja ete rempli
            let num = randomNum14(filledPegs);
            filledPegs.push(num);

            //supprime la couleur de codeCopy car elle a déjà été prise en compte
            let index = codeCopy.indexOf(cell1Color);
            if(index > -1){
                codeCopy.splice(index, 1);
            }

            //ajouter un nombre à chosenCells pour indiquer que cette cellule a maintenant été prise en compte
            chosenCells.push(1);

            //remplissage de la cellule reponse correspondante
            pegs[num-1].style.backgroundColor = "red";
    }
        if(code[1] === cell2Color){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);

            //supprime la couleur de codeCopy car elle a déjà été prise en compte
            let index = codeCopy.indexOf(cell2Color);
            if(index > -1){
                codeCopy.splice(index, 1);
            }

            chosenCells.push(2);

            pegs[num-1].style.backgroundColor = "red";
        }
        if(code[2] === cell3Color){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);

            //supprime la couleur de codeCopy car elle a déjà été prise en compte
            let index = codeCopy.indexOf(cell3Color);
            if(index > -1){
                codeCopy.splice(index, 1);
            }

            chosenCells.push(3);

            pegs[num-1].style.backgroundColor = "red";
        }
        if(code[3] === cell4Color){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);

            //supprime la couleur de codeCopy car elle a déjà été prise en compte
            let index = codeCopy.indexOf(cell4Color);
            if(index > -1){
                codeCopy.splice(index, 1);
            }

            chosenCells.push(4);

            pegs[num-1].style.backgroundColor = "red";
        }

        
        //si la copie de code inclut les couleurs des quatre cellules, changez les cellules réponse en blanc car codeCopy n'inclut désormais que les couleurs qui n'ont pas été prises en compte

        if(codeCopy.includes(cell1Color) && !chosenCells.includes(1)){
            //choisi une cellule réponse qui n'a pas déja ete rempli
            let num = randomNum14(filledPegs);
            filledPegs.push(num);

            //remplissage de la cellule reponse correspondante
            pegs[num-1].style.backgroundColor = "white";
        }       
        if(codeCopy.includes(cell2Color) && !chosenCells.includes(2)){
            //choisi une cellule réponse qui n'a pas déja ete rempli
            let num = randomNum14(filledPegs);
            filledPegs.push(num);

            //remplissage de la cellule reponse correspondante
            pegs[num-1].style.backgroundColor = "white";
        }    
        if(codeCopy.includes(cell3Color) && !chosenCells.includes(3)){
            //choisi une cellule réponse qui n'a pas déja ete rempli
            let num = randomNum14(filledPegs);
            filledPegs.push(num);

            //remplissage de la cellule reponse correspondante
            pegs[num-1].style.backgroundColor = "white";
        }    
        if(codeCopy.includes(cell4Color) && !chosenCells.includes(4)){
            //choisi une cellule réponse qui n'a pas déja ete rempli
            let num = randomNum14(filledPegs);
            filledPegs.push(num);

            //remplissage de la cellule reponse correspondante
            pegs[num-1].style.backgroundColor = "white";
        }     
    }

    //choisissez un nombre aléatoire de 1 à 4 qui n'est pas dans l'array donné
    function randomNum14(nums){
        //génére un nombre de 1 à 4
        let num = Math.floor(Math.random()*4) + 1;
        while(nums.includes(num)){
            num = Math.floor(Math.random()*4) + 1;
        }
        return num;
    }
