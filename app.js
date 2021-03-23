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
var dXdY2 = [
  [0, 0],
  [-1, 0],
  [0, -1],
  [-1, -1],
];
var dXdY3 = [
  [0, 0],
  [-1, 0],
  [-2, 0],
  [0, -1],
  [-1, -1],
  [-2, -1],
  [0, -2],
  [-1, -2],
  [-2, -2],
];
var dXdY4 = [
  [0, 0],
  [-1, 0],
  [-2, 0],
  [-3, 0],
  [0, -1],
  [-1, -1],
  [-2, -1],
  [-3, -1],
  [0, -2],
  [-1, -2],
  [-2, -2],
  [-3, -2],
  [0, -3],
  [-1, -3],
  [-2, -3],
  [-3, -3],
];

var dXdY5 = [
  [0, 0],
  [-1, 0],
  [-2, 0],
  [-3, 0],
  [-4, 0],
  [0, -1],
  [-1, -1],
  [-2, -1],
  [-3, -1],
  [-4, -1],
  [0, -2],
  [-1, -2],
  [-2, -2],
  [-3, -2],
  [-4, -2],
  [0, -3],
  [-1, -3],
  [-2, -3],
  [-3, -3],
  [-4, -3],
  [0, -4],
  [-1, -4],
  [-2, -4],
  [-3, -4],
  [-4, -4],
];

//Define how many pieces we want to slice the image 4-9-16-25-36
var sliceInto = 25; //1-TODO 4-9-16-25-36

//We generate a random number and pass it to a variable
var randomNumber = 4;
//Math.floor(Math.random() * imageList.length);

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

//Here we are splitting the image into parts
function split() {
  //we are going to divide image width and height into square root of given sliceInto value
  // for example ıf we want to divide into 9 pıeces , the image w and h must be divided into 3, the square root of 9
  var divider = Math.sqrt(sliceInto);

  var length = 480 / divider;
  var width = "width: " + length + "px;"; //every sliced image width will be changed due divider. 480px is constant container width
  var height = "height: " + length + "px;"; //every sliced image height will be changed due divider. 480px is constant container height

  var widthPercentage = "width: " + 100 / divider + "%"; // % for column width 25% means 4 images will be shown per row
  var heightPercentage = "height: " + 100 / divider + "%"; // % for column height 25% means 4 images will be shown per row

  canvas.width = img.width / divider;
  canvas.height = img.height / divider;

  for (let i = 0; i < sliceInto; i++) {
    //we take the array from the dXdY array of arrays and push the value pair to a newArray as a seperated value.
    var newArray = [];
    switch (sliceInto) {
      case 4:
        dXdY2[i].forEach((element) => {
          //TODO for sliceInto 4 this must be dxdy2, for 9-dxdy3, for 16-dxdy4 and so on
          newArray.push(element);
        });
        break;
      case 9:
        dXdY3[i].forEach((element) => {
          newArray.push(element);
        });
        break;
      case 16:
        dXdY4[i].forEach((element) => {
          newArray.push(element);
        });
        break;
      case 25:
        dXdY5[i].forEach((element) => {
          newArray.push(element);
        });
        break;
      default:
        break;
    }

    // We assign this seperated value pair to x and y
    var x = newArray[0];
    var y = newArray[1];

    //We generate another random number for the rotate splitted parts of the image
    var randomDeg = Math.floor(Math.random() * 3 + 1); // Random number between 1-4

    ctx.drawImage(
      this,
      x * (img.width / divider),
      y * (img.height / divider),
      img.width,
      img.height
    );

    parts.push(canvas.toDataURL());

    var col = document.getElementById("right");
    var div = document.createElement("div");
    var slicedImage = document.createElement("img");
    slicedImage.src = parts[i];

    col.appendChild(div);
    div.appendChild(slicedImage);

    div.setAttribute("class", "column");
    //TODO: Can we pass widthPercentage and heightPercentage together?
    div.setAttribute("style", widthPercentage);
    div.setAttribute("style", heightPercentage);
    slicedImage.setAttribute("id", "part" + [i]);
    slicedImage.setAttribute("class", "sliced");
    //TODO:Can we pass width and height together?
    slicedImage.setAttribute("style", width);
    slicedImage.setAttribute("style", height);

    // slicedImage.setAttribute(
    //   "style",
    //   "transform: rotate(" + randomDeg * 45 + "deg)"
    // );
  }
  document.querySelectorAll(".column").forEach((item) => {
    item.setAttribute("style", widthPercentage);
    item.setAttribute("style", heightPercentage);
  });

  //Any element with 'part' in the id will have the 'rotate' and 'checkStatus' eventListeners added
  document.querySelectorAll(".sliced").forEach((item) => {
    item.addEventListener("click", rotate);
    item.addEventListener("click", checkStatus);
  });
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
