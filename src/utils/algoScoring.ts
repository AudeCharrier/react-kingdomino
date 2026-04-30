const array = [
    {id:1,
        landscape:"vide"
    },
    {id:2,
        landscape:"prairie"
    },
    {id:3,
        landscape:"forest"
    },
    {id:4,
        landscape:"forest"
    },
    {id:5,
        landscape:"desert"
    },
    {id:6,
        landscape:"vide"
    },
    {id:7,
        landscape:"dsert"
    },
    {id:8,
        landscape:"desert"
    },
    {id:9,
        landscape:"lake"
    },
    {id:10,
        landscape:"lake"
    },
    {id:11,
        landscape:"forest"
    },
    {id:12,
        landscape:"forest"
    },
    {id:13,
        landscape:"lake"
    },
    {id:14,
        landscape:"forest"
    },
    {id:15,
        landscape:"forest"
    },
    {id:16,
        landscape:"forest"
    },
    {id:17,
        landscape:"forest"
    },
    {id:18,
        landscape:"forest"
    },
    {id:19,
        landscape:"lake"
    },
    {id:20,
        landscape:"lake"
    },
    {id:21,
        landscape:"forest"
    },
    {id:22,
        landscape:"forest"
    },
    {id:23,
        landscape:"forest"
    },
    {id:24,
        landscape:"forest"
    },
    {id:25,
        landscape:"center"
    },
    {id:26,
        landscape:"lake"
    },
    {id:27,
        landscape:"cave"
    },
    {id:28,
        landscape:"lake"
    },
    {id:29,
        landscape:"desert"
    },
    {id:30,
        landscape:"desert"
    },
    {id:31,
        landscape:"prairie"
    },
    {id:32,
        landscape:"prairie"
    },
    {id:33,
        landscape:"marais"
    },
    {id:34,
        landscape:"marais"
    },
    {id:35,
        landscape:"lake"
    },
    {id:36,
        landscape:"desert"
    },
    {id:37,
        landscape:"desert"
    },
    {id:38,
        landscape:"desert"
    },
    {id:39,
        landscape:"prairie"
    },
    {id:40,
        landscape:"prairie"
    },
    {id:41,
        landscape:"prairie"
    },
    {id:42,
        landscape:"lake"
    },
    {id:43,
        landscape:"cave"
    },
    {id:44,
        landscape:"cave"
    },
    {id:45,
        landscape:"desert"
    },
    {id:46,
        landscape:"desert"
    },
    {id:47,
        landscape:"prairie"
    },
    {id:48,
        landscape:"prairie"
    },
    {id:49,
        landscape:"desert"
    },
]

function separateLandscapes(array) {
    const forest = array.filter(cell => cell.landscape === "forest");
    return forest
}

const forest = separateLandscapes(array);
console.log(forest);

const potentialZones = [[forest[0]]];

function isAdjacent(forest) {
	let newzone = [];

    for(let i = 1 ; i < forest.length ; i++) {
        const potentialAdjIds = [forest[i].id -1, forest[i].id + 1, forest[i].id - 7, forest[i].id + 7];
        let matched = false;
		let indexesJ;
        for (let j = 0 ; j < potentialZones.length ; j++) {
            const pot = potentialZones[j].some(cell => potentialAdjIds.includes(cell.id));
            if (pot) {
                matched = true;
                indexesJ.push(j)
                potentialZones[j] = [...potentialZones[j], forest[i]]
            }
        } 
      
        if (!matched) {
            potentialZones.push([forest[i]])
        } else if (indexesJ.length === 1) {
            potentialZones[indexesJ[0]] = [...potentialZones[indexesJ[0]], forest[i]] 
        } else if (indexesJ.length > 1) {
            for(let k = 0 ; k < indexesJ.length -1 ; k++) {
                newzone = [...newzone, ...potentialZones[indexes[k]]];
				potentialZones.splice(indexes[k], 1);
				k--
            }
            newzone.push(forest[i])
	
        }
    }
    return potentialZones
}
console.log(isAdjacent(forest));

//forest[i].id et potentialZones[j][k]
/*     if (((ids[0].id%7 ===0 && ids[1].id) %7 === 1) || ((ids[1].id%7 ===0 && ids[0].id) %7 === 1)) {
        const isAdj = [false]
        return isAdj
    }
 else if (((ids[0].id - ids[1].id) !== -1) && ((ids[0].id - ids[1].id) !== 1) && ((ids[0].id - ids[1].id) !== -7) && ((ids[0].id - ids[1].id) !== 7)) {
const isAdj = [false]
        return isAdj
    }  

    else if (((ids[0].id - ids[1].id) === -1) || ((ids[0].id - ids[1].id) === 1) || ((ids[0].id - ids[1].id) === -7) || ((ids[0].id - ids[1].id) === 7)) {
const isAdj = [ids[0], ids[1]]
return isAdj
    }
}
console.log(isAdjacent(ids)) */

// filtrer pour liste d'id par paysage
// comparer premier id et 2e id
// si les deux id sont de types : id%7 = 0 et i%7 = 1 -> adajcence impossible -> mettre le 2e dans un tableau séparé
// si écart !== -1 +1 -7 +7 : pas adjacence
// si écart = -1, +1, -7 ou +7 : adjacence (on peut dire |1| en valeur absolue ?) -> un new tableau avec ceux-là

// comparer le 3e id : aux tableaux précédents générés
// si matche avec aucun tableau : créer un new
// si matche un seul tableau on le rajoute
 // si match avec plusieurs, on l'ajoute et on fusionne les tableaux
 //on compare les tableaux.length pour trouver la plus grande
	//forest[i].id et potentialZones[j][k]
	if (
		(ids[0].id % 7 === 0 && ids[1].id) % 7 === 1 ||
		(ids[1].id % 7 === 0 && ids[0].id) % 7 === 1
	) {
		const isAdj = [false];
		return isAdj;
	} else if (
		ids[0].id - ids[1].id !== -1 &&
		ids[0].id - ids[1].id !== 1 &&
		ids[0].id - ids[1].id !== -7 &&
		ids[0].id - ids[1].id !== 7
	) {
		const isAdj = [false];
		return isAdj;
	} else if (
		ids[0].id - ids[1].id === -1 ||
		ids[0].id - ids[1].id === 1 ||
		ids[0].id - ids[1].id === -7 ||
		ids[0].id - ids[1].id === 7
	) {
		const isAdj = [ids[0], ids[1]];
		return isAdj;
	}

console.log(isAdjacent(ids));

// filtrer pour liste d'id par paysage
// comparer premier id et 2e id
// si les deux id sont de types : id%7 = 0 et i%7 = 1 -> adajcence impossible -> mettre le 2e dans un tableau séparé
// si écart !== -1 +1 -7 +7 : pas adjacence
// si écart = -1, +1, -7 ou +7 : adjacence (on peut dire |1| en valeur absolue ?) -> un new tableau avec ceux-là

// comparer le 3e id : aux tableaux précédents générés
// si matche avec aucun tableau : créer un new
// si matche un seul tableau on le rajoute
// si match avec plusieurs, on l'ajoute et on fusionne les tableaux

//on compare les tableaux.length pour trouver la plus grande zone
