const data = [
  {
    color: 'aliceblue',
    image: './assets/umbrella_blue.png',
  },
  {
    color: 'khaki',
    image: './assets/umbrella_yellow.png',
  },
  {
    color: 'pink',
    image: './assets/umbrella_pink.png',
  },
];

let currentColor = 'pink'; // deafult color just in case
const body = document.body; // <body><body/>
const umbrella = document.getElementById('umbrella');
const loader = document.getElementById('loader');

// change color of umbrella
function changeColor(color) {
  umbrella.style.display = 'none';
  // since the file upload doesn't take a lot of time like shown in the video
  // I have recreated the mock loader simulation using setTimeout
  loader.style.display = 'block';

  setTimeout(() => {
    loader.style.display = 'none';

    const selectedUmbrella = data.find((item) => item.color === color);

    if (selectedUmbrella) {
      // we are not disturbing the background image of umbrella, just setting it.
      umbrella.style.backgroundImage = `url(${selectedUmbrella.image})`;
      body.style.backgroundColor = color;
      currentColor = color;
    }

    umbrella.style.display = 'block';
    //changed the time for setimeout
  }, 4000);
}

// default color of pink would be selected in case the selectedUmbrella can't find the color
changeColor(currentColor);

const colorSwitches = document.querySelectorAll('.color');
colorSwitches.forEach((switchKaro) => {
  switchKaro.addEventListener('click', () => {
    const color = switchKaro.dataset.color;
    changeColor(color);
  });
});

function previewLogo(event) {
  const file = event.target.files[0];
  // using file reader api
  const reader = new FileReader();

  reader.onload = (e) => {
    // const img = new Image();
    const img = document.createElement('img');
    //* we can use both the new Image and createElement

    img.src = e.target.result;

    const maxWidth = 50;

    img.onload = function () {
      const aspectRatio = img.width / img.height;
      const maxHeight = maxWidth / aspectRatio;

      img.width = maxWidth;
      img.height = maxHeight;

      umbrella.appendChild(img);

      //* not using another style sheet as we can't use class when there is no image in default
      img.style.position = 'absolute';
      img.style.bottom = '10%';
      img.style.left = '50%';
      img.style.transform = 'translateX(-50%)';
    };
  };

  reader.readAsDataURL(file);
}

const previewInput = document.querySelector('input[type="file"]');
// when the user modifies the element's value
previewInput.addEventListener('change', previewLogo);
