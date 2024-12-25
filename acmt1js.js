const API_KEY = 'AIzaSyDqY9LYDTkQt7rlKQi7GDsEzBh8KiNSa3M';
const topics = ["adventure", "mystery", "fantasy", "romance", "thriller", "science", "history", "biography", "philosophy", "psychology", "poetry", "technology", "education", "fiction", "nonfiction", "health", "travel", "children", "classics", "art", "self-help", "horror", "crime", "spirituality", "cookbook", "graphic novel", "science fiction", "drama", "humor", "short stories", "mythology", "war", "economics", "politics", "business", "autobiography", "nature", "environment", "music", "sports", "leadership", "success", "relationships", "magic", "comics", "animals", "aliens", "space", "epic", "detective", "supernatural", "anthology", "dark fantasy", "urban fantasy", "western", "dystopian", "cyberpunk", "steampunk", "literature", "memoir", "young adult", "middle grade", "parenting", "career", "productivity", "mindfulness", "meditation", "philosophical fiction", "graphic biography", "true crime", "engineering", "architecture", "astrology", "astronomy", "artificial intelligence", "coding", "programming", "physics", "mathematics", "chemistry", "biology", "geography", "linguistics", "folklore", "travelogue", "futurism", "inspiration", "motivation", "personal finance", "investment", "entrepreneurship", "design", "fashion", "photography", "gaming", "esports", "paranormal", "ethics", "cultural studies", "world religions"];
const query=topics[Math.floor(Math.random()*100)];
const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${API_KEY}`;
let x = Math.floor(Math.random()*(Math.floor(10)-Math.ceil(1)+1))+1;
let desc;
let count =0;
function startTestActual(){
fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
  })
  .then(data => {
if (data.items) {
desc = data.items[x].volumeInfo.description;
let inp = document.getElementById("input-box");
inp.placeholder="Type!";
let words  = desc.replace('–', '-');
words  = desc.replace('—', '-');
words  = desc.replace('— ', '-');
words = desc.split(/\s+/);
if(words.length>50){
    words=words.slice(0,50);
}
for(let i=0;i<words.length;i++){
    for(let ch in words[i]){
        count++;
    }
}
let maintext = document.getElementById("main-text");
let speed = document.getElementById("speed");
let wi=0;
let endTime;
let startTime;
function reloadPage(){
    window.location.reload();
}
function startTest() {
    inp.disabled=false;
    startTime=Date.now();
    const but_text = document.getElementById("res-but");
    but_text.textContent="Restart";
    but_text.removeEventListener("click", startTest);
    but_text.addEventListener("click", reloadPage);
    inp.focus();
  }
startTest()
maintext.textContent="";
for(var i=0;i<words.length;i++){
    sp = document.createElement("span");
    sp.textContent = words[i] + " ";
    sp.id = `word-${i}`;
    maintext.appendChild(sp);
}
inp.addEventListener("input", function(event) {
    const inputValue = event.target.value;
    if (inputValue === words[wi]) {
      const currentWordSpan = document.getElementById(`word-${wi}`);
      currentWordSpan.classList.add("correct");
      inp.value = "";
      wi++; 
      if(wi==words.length){
        endTime = Date.now();
        speed.textContent = "Speed : " + Math.floor(count*1000*60/((endTime-startTime)*5))+" WPM";
        inp.disabled = true;
        inp.placeholder = "Click Restart to try again!";
    }
}
  });
    inp.addEventListener("keydown", function(event){
        if(event.key === " "){
            event.preventDefault();
        }
    })
        }
  })}
