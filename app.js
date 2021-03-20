//TODO: Is there any way to write filenames to an array?
//We create an image array,later we will randomly pick one of them to split, png files are better to use?
var imageList = [
  "cat0",
  "cat1",
  "cat2",
  "cat3",
  "cat4",
  "cat5",
  "cat6",
  "cat7",
];
var dXdY = [
  [0, 0],
  [-1, 0],
  [0, -1],
  [-1, -1],
  [0, -2],
  [-1, -2],
  [-2, -2],
  [-2, 0],
  [-2, -1],
];

//Define how many pieces we want to slice the image 4-9-16-25-36
var sliceInto = 4;

//We generate a random number and pass it to a variable
var randomNumber = Math.floor(Math.random() * imageList.length);

// With random number we generate a image name variable
var imageSrc = "images/" + imageList[randomNumber] + ".jpg";

//Show the image at the left side of the screen
document.getElementById("original").setAttribute("src", imageSrc);

//Creating the <canvas> element to use as a container for images.
var canvas = document.createElement("canvas");

//The getContext() method returns an object that provides methods and properties for drawing on the canvas.
var ctx = canvas.getContext("2d");

//We will create an empty array to save the parts of the splitted image
var parts = [];

//An instance of an Image object
var img = new Image();
//We will set image source to randomly generated image source that we created before
img.src = imageSrc;

//Split when image has loaded
img.onload = split;

//Here we are splitting the image into 4 parts
function split() {
  //we are going to divide image width and height into square root of given sliceInto value
  // for example ıf we want to divide ınto 9 pıeces , the image w and h must be divided into 3, the square root of 9
  var div = Math.sqrt(sliceInto);

  var dividedWidth = img.width / div;
  var dividedHeight = img.height / div;

  canvas.width = dividedWidth;
  canvas.height = dividedHeight;

  for (let i = 0; i < sliceInto; i++) {
    //we take the array from the dXdY array of arrays and push the value pair to a newArray as a seperated value.
    var newArray = [];
    dXdY[i].forEach((element) => {
      newArray.push(element);
    });
    // we assign this seperated value pair to x and y
    var x = newArray[0];
    var y = newArray[1];

    //We generate another random number for the rotate splitted parts of the image
    var randomDeg = Math.floor(Math.random() * 3 + 1); // Random number between 1-4

    //console.log(x + "  " + y);

    ctx.drawImage(
      this,
      x * dividedWidth,
      y * dividedHeight,
      img.width,
      img.height
    );

    parts.push(canvas.toDataURL());

    var slicedImage = document.createElement("img");
    slicedImage.src = parts[i];
    var div = document.getElementById("canvas");
    div.appendChild(slicedImage);
    slicedImage.setAttribute("id", "part" + [i]);
    slicedImage.setAttribute("class", "item sliced");
    //style="width:128px;height:128px;" can be used also
    // slicedImage.setAttribute("width", canvas.width, "height", canvas.height);
    slicedImage.setAttribute(
      "style",
      "transform: rotate(" + randomDeg * 45 + "deg)"
    );
  }

  //TODO: for loop?
  //ENABLE IMAGE CONTROLS
  //Any element with 'part' in the id will have the 'rotate' and 'checkStatus' eventListeners added
  document.querySelectorAll("div[id*='part]").forEach(item => {
    item.addEventListener('click', rotate);
    item.addEventListener('click', checkStatus)
  })
}

// TODO: for loop?
function checkStatus() {
  //GET HTML ELEMENT TRANSFORM VALUES
  var part0Degree = document.getElementById("part0").style.transform;
  var part1Degree = document.getElementById("part1").style.transform;
  var part2Degree = document.getElementById("part2").style.transform;
  var part3Degree = document.getElementById("part3").style.transform;

  //TODO better/shorter way?
  if (part0Degree === "rotate(360deg)") {
    if (part1Degree === "rotate(360deg)") {
      if (part2Degree === "rotate(360deg)") {
        if (part3Degree === "rotate(360deg)") {
          //TODO: before calling gameover() function remove eventlisteners?
          //document.getElementById("part0").removeEventListener("click", rotate);
          gameOver();
        } else {
          return;
        }
      } else {
        return;
      }
    } else {
      return;
    }
  } else {
    return;
  }
}

//TODO:remove eventlisteners before calling gameover()
//for loop to remove?

//When game ends do something.
//TODO: Show score (Time passed in seconds x 5)
function gameOver() {
  setTimeout(function () {
    alert("Congratulations! Here is your kitty cat :)");
  }, 1000);
  clearTimeout();
}

//Rotate the image by 90 degree in clockwise direction ...
//TODO: Can we make it current value +90deg instead of checking 4 different status ?
function rotate() {
  var currentDeg = this.style.transform;

  switch (currentDeg) {
    case "rotate(90deg)":
      this.style.transform = "rotate(180deg)";
      break;
    case "rotate(180deg)":
      this.style.transform = "rotate(270deg)";
      break;
    case "rotate(270deg)":
      this.style.transform = "rotate(360deg)";
      break;
    default:
      this.style.transform = "rotate(90deg)";
      break;
  }
}
