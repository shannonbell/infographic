let human = {};

function Dino(dino) {
  this.species = dino.species;
  this.image = dino.image.split(" ", 1)[0].toLowerCase();

  this.fact = function () {
    const facts = Object.keys(dino)
      .filter((key) => key !== "species" && key !== "image")
      .map((key) => {
        switch (key) {
          case "weight":
            return compareWeight(dino[key]);
          case "height":
            return compareHeight(dino[key]);
          case "diet":
            return compareDiet(dino[key]);
          case "where":
            return `This specie lived in ${dino[key]}`;
          case "when":
            return `This specie is dated from ${dino[key]}`;
          default:
            return dino[key];
        }
      });

    return facts[Math.floor(Math.random() * facts.length)];
  };
}

function compareWeight(dinosaurWeight) {
  const weight = parseInt(dinosaurWeight) - parseInt(human.weight);
  return `This dinosaur is ${weight} pounds heavier than ${human.species}`;
}

function compareHeight(dinosaurHeight) {
  const height = parseInt(dinosaurHeight) * 12 - parseInt(human.height);
  return `This dinosaur is ${height} inches taller than ${human.species}`;
}

function compareDiet(dinosaurDiet) {
  const diet =
    dinosaurDiet.toLowerCase() === human.diet.toLowerCase()
      ? "the same diet as"
      : "a different diet then";
  return `This dinosaur has ${diet} ${human.species}`;
}

async function getDinoDataFromJSON() {
  const response = await fetch("dino.json");
  const { Dinos } = await response.json();

  let dinos = Dinos.map((dino) => {
    dino.image = dino.species;
    return new Dino(dino);
  });

  let humanObj = new Dino(human);
  dinos.splice(4, 0, humanObj);

  dinos.forEach(({ species, image, fact }) => {
    let dinoTile = document.createElement("div");
    dinoTile.className = "grid-item";
    dinoTile.style.backgroundImage = `url(images/${image}.png)`;
    dinoTile.style.backgroundPosition = "center";
    dinoTile.style.backgroundSize = "cover";

    let dinoName = document.createElement("h3");
    dinoName.innerHTML = species;
    dinoTile.appendChild(dinoName);

    if (image !== "human") {
      let dinoFact = document.createElement("p");
      if (species.toLowerCase() === "pigeon") {
        const pigeon = Dinos.find(
          (dino) => dino.species.toLowerCase() === "pigeon"
        );
        dinoFact.innerHTML = pigeon.fact;
      } else {
        dinoFact.innerHTML = fact();
      }
      dinoTile.appendChild(dinoFact);
    }
    document.getElementById("grid").appendChild(dinoTile);
  });
}

const handleCompareMeClick = () => {
  const dinoCompare = document.getElementById("dino-compare");
  const species = document.getElementById("name").value;
  const feet = document.getElementById("feet").value;
  const inches = document.getElementById("inches").value;
  const weight = document.getElementById("weight").value;
  const diet = document.getElementById("diet").value;
  const image = "human";

  if (species === "" || feet === "" || inches === "" || weight === "") {
    return false;
  }

  const height = parseInt(feet) * 12 + parseInt(inches);

  human = {
    species,
    weight,
    height,
    diet,
    image,
  };

  dinoCompare.style.display = "none";
  getDinoDataFromJSON();
};

document.getElementById("btn").addEventListener("click", handleCompareMeClick);
