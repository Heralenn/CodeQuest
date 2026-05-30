/* ============================================================
   CODEQUEST — MAIN LOGIC
   ============================================================ */

/* ── Player state ── */
let player = {
  name: "Developer",
  xp: 0,
  level: 1,
  title: "Beginner",
  avatar: "👨‍💻"
};

let achievements = [];
let stats = { quizzes: 0, correct: 0, streak: 0 };

/* ── Current quiz state ── */
let quizPool      = [];
let currentIndex  = 0;
let activeLanguage = "All";
let quizHistory   = []; // "correct" | "wrong" per pip

/* ── Quiz bank ── */
const quizData = {
  All: [
    { q:"When was the first high-level programming language (Fortran) released?", opts:["1945","1957","1969","1981"], a:"1957" },
    { q:"Who created the C programming language?", opts:["Dennis Ritchie","Bjarne Stroustrup","James Gosling","Guido van Rossum"], a:"Dennis Ritchie" },
    { q:"What year was JavaScript created?", opts:["1995","1991","2000","1989"], a:"1995" },
    { q:"What does CPU stand for?", opts:["Central Processing Unit","Computer Personal Unit","Central Program Utility","Control Processing Unit"], a:"Central Processing Unit" },
    { q:"Which language was invented first?", opts:["Assembly","Python","C","Java"], a:"Assembly" },
    { q:"Binary system uses?", opts:["0 and 1","0 to 9","A to Z","1 to 10"], a:"0 and 1" },
    { q:"Which memory is fastest?", opts:["Cache","RAM","HDD","SSD"], a:"Cache" },
    { q:"HTTP stands for?", opts:["HyperText Transfer Protocol","High Transfer Text Protocol","Hyper Tool Transfer Process","HyperText Translation Program"], a:"HyperText Transfer Protocol" },
    { q:"What is an algorithm?", opts:["A step-by-step procedure to solve a problem","A type of programming language","A computer component","A database"], a:"A step-by-step procedure to solve a problem" },
    { q:"What does RAM stand for?", opts:["Random Access Memory","Read Access Memory","Rapid Access Module","Random Algorithm Memory"], a:"Random Access Memory" },
  ],
  HTML: [
    { q:"What does HTML stand for?", opts:["HyperText Markup Language","HighText Machine Language","Hyper Tool Markup Language","Hyper Transfer Markup Language"], a:"HyperText Markup Language" },
    { q:"Which tag is used for a paragraph?", opts:["<p>","<para>","<text>","<h>"], a:"<p>" },
    { q:"Which tag creates a hyperlink?", opts:["<a>","<link>","<href>","<url>"], a:"<a>" },
    { q:"Which tag is used for images?", opts:["<img>","<image>","<pic>","<src>"], a:"<img>" },
    { q:"HTML files usually end with?", opts:[".html",".ht",".web",".doc"], a:".html" },
    { q:"Which tag defines the largest heading?", opts:["<h1>","<h6>","<head>","<title>"], a:"<h1>" },
    { q:"Which attribute specifies an image URL?", opts:["src","href","alt","link"], a:"src" },
    { q:"Which tag creates an unordered list?", opts:["<ul>","<ol>","<li>","<list>"], a:"<ul>" },
    { q:"Which tag creates a table row?", opts:["<tr>","<td>","<th>","<table>"], a:"<tr>" },
    { q:"The <head> tag contains?", opts:["Metadata & links","Page content","Images","Navigation"], a:"Metadata & links" },
    { q:"Which HTML attribute is used for tooltips?", opts:["title","tooltip","alt","data-tip"], a:"title" },
    { q:"Which tag embeds a video in HTML5?", opts:["<video>","<media>","<movie>","<embed>"], a:"<video>" },
    { q:"What does the alt attribute in <img> do?", opts:["Describes the image","Defines size","Sets border","Aligns image"], a:"Describes the image" },
    { q:"The <!DOCTYPE html> declaration is used to?", opts:["Tell browser this is HTML5","Start a script","Begin a table","Define a style"], a:"Tell browser this is HTML5" },
    { q:"Which tag defines a form?", opts:["<form>","<input>","<field>","<data>"], a:"<form>" },
  ],
  CSS: [
    { q:"What does CSS stand for?", opts:["Cascading Style Sheets","Creative Style System","Computer Style Syntax","Color Style Sheet"], a:"Cascading Style Sheets" },
    { q:"Which property changes text color?", opts:["color","font-color","text-style","text-color"], a:"color" },
    { q:"Which CSS property changes background color?", opts:["background-color","bgcolor","color-background","background-style"], a:"background-color" },
    { q:"Which unit is relative to the parent font size?", opts:["em","px","cm","mm"], a:"em" },
    { q:"How do you center a block element horizontally?", opts:["margin: 0 auto","align: center","float: center","display: center"], a:"margin: 0 auto" },
    { q:"Which CSS property controls text size?", opts:["font-size","text-size","font-style","text-font"], a:"font-size" },
    { q:"Which value of display makes an element a flex container?", opts:["flex","grid","block","inline"], a:"flex" },
    { q:"Which CSS selector selects all elements?", opts:["*","#",".",":"], a:"*" },
    { q:"Which property adds space inside an element?", opts:["padding","margin","border","spacing"], a:"padding" },
    { q:"Which property adds space outside an element?", opts:["margin","padding","border","outline"], a:"margin" },
    { q:"CSS opacity range is?", opts:["0 to 1","0 to 100","1 to 10","0 to 255"], a:"0 to 1" },
    { q:"Which property sets an element's position?", opts:["position","float","display","placement"], a:"position" },
    { q:"What does z-index control?", opts:["Stacking order","Font size","Grid layout","Animation speed"], a:"Stacking order" },
    { q:"Which property creates rounded corners?", opts:["border-radius","corner-radius","border-curve","round"], a:"border-radius" },
    { q:"Which property makes text bold?", opts:["font-weight","text-style","font-bold","bold"], a:"font-weight" },
  ],
  JavaScript: [
    { q:"Which keyword declares a block-scoped variable?", opts:["let","define","varx","int"], a:"let" },
    { q:"Which symbol is used for single-line comments in JS?", opts:["//","<!-- -->","#","**"], a:"//" },
    { q:"What does DOM stand for?", opts:["Document Object Model","Data Object Model","Digital Output Map","Display Object Mode"], a:"Document Object Model" },
    { q:"Which function prints to the console?", opts:["console.log()","print()","echo()","write()"], a:"console.log()" },
    { q:"Which is a correct array literal?", opts:["[1,2,3]","(1,2,3)","{1,2,3}","<1,2,3>"], a:"[1,2,3]" },
    { q:"What does === check?", opts:["Value and type","Only value","Only type","Assignment"], a:"Value and type" },
    { q:"Which method adds an element to the end of an array?", opts:["push()","pop()","shift()","append()"], a:"push()" },
    { q:"What does typeof return for a function?", opts:['"function"','"object"','"method"','"callable"'], a:'"function"' },
    { q:"Which event fires when a button is clicked?", opts:["click","press","touch","select"], a:"click" },
    { q:"Which keyword is used to define a function?", opts:["function","def","fun","method"], a:"function" },
    { q:"What is NaN?", opts:["Not a Number","Null and None","Not an Array","New Array Node"], a:"Not a Number" },
    { q:"Which method removes the last array element?", opts:["pop()","push()","shift()","splice()"], a:"pop()" },
    { q:"What is a closure in JS?", opts:["A function accessing outer scope","A loop construct","A CSS property","A data type"], a:"A function accessing outer scope" },
    { q:"Which built-in method converts JSON to object?", opts:["JSON.parse()","JSON.stringify()","JSON.convert()","parseJSON()"], a:"JSON.parse()" },
    { q:"What does the spread operator (...) do?", opts:["Expands an iterable","Compresses data","Creates a loop","Defines a variable"], a:"Expands an iterable" },
  ],
  Python: [
    { q:"Who created Python?", opts:["Guido van Rossum","Dennis Ritchie","James Gosling","Linus Torvalds"], a:"Guido van Rossum" },
    { q:"Which symbol is used for comments in Python?", opts:["#","//","<!--","**"], a:"#" },
    { q:"What keyword defines a function in Python?", opts:["def","function","fun","define"], a:"def" },
    { q:"Which data type is immutable in Python?", opts:["tuple","list","dict","set"], a:"tuple" },
    { q:"How do you print in Python 3?", opts:["print()","echo()","console.log()","write()"], a:"print()" },
    { q:"Which keyword is used for loops in Python?", opts:["for","loop","foreach","each"], a:"for" },
    { q:"What is the correct file extension for Python?", opts:[".py",".pyt",".python",".pt"], a:".py" },
    { q:"Which method converts string to integer?", opts:["int()","str_to_int()","parse()","Integer()"], a:"int()" },
    { q:"What does len() return?", opts:["Length of object","Last element","List end","Loop count"], a:"Length of object" },
    { q:"Which operator is used for exponentiation?", opts:["**","^","^^","exp"], a:"**" },
    { q:"How do you start a virtual environment?", opts:["python -m venv","virtualenv start","venv create","python env"], a:"python -m venv" },
    { q:"What is a lambda in Python?", opts:["An anonymous function","A list type","A module","A class keyword"], a:"An anonymous function" },
    { q:"Which built-in sorts a list?", opts:["sorted()","order()","arrange()","sort_list()"], a:"sorted()" },
    { q:"What does // do in Python?", opts:["Floor division","Comment","String concat","Import"], a:"Floor division" },
    { q:"Which data structure uses key-value pairs?", opts:["dict","list","tuple","set"], a:"dict" },
  ],
  Java: [
    { q:"Who created Java?", opts:["James Gosling","Dennis Ritchie","Guido van Rossum","Bjarne Stroustrup"], a:"James Gosling" },
    { q:"Java is platform?", opts:["Independent","Dependent","Hardware based","OS specific"], a:"Independent" },
    { q:"Which keyword defines a class in Java?", opts:["class","Class","define","struct"], a:"class" },
    { q:"Which keyword creates an object?", opts:["new","create","object","make"], a:"new" },
    { q:"Java's main method signature?", opts:["public static void main(String[] args)","void main()","static main(args)","public main(String args)"], a:"public static void main(String[] args)" },
    { q:"Which keyword prevents inheritance?", opts:["final","static","abstract","private"], a:"final" },
    { q:"What is JVM?", opts:["Java Virtual Machine","Java Verified Module","Java Variable Method","Java Version Manager"], a:"Java Virtual Machine" },
    { q:"Which data type holds true/false?", opts:["boolean","bool","bit","binary"], a:"boolean" },
    { q:"Which loop guarantees at least one execution?", opts:["do-while","for","while","foreach"], a:"do-while" },
    { q:"What does System.out.println() do?", opts:["Prints and newline","Only prints","Returns string","Reads input"], a:"Prints and newline" },
    { q:"Which access modifier is visible everywhere?", opts:["public","private","protected","default"], a:"public" },
    { q:"What is an interface in Java?", opts:["Abstract contract for classes","A file type","A loop","A package"], a:"Abstract contract for classes" },
    { q:"Which collection allows duplicates?", opts:["ArrayList","HashSet","TreeSet","LinkedHashSet"], a:"ArrayList" },
    { q:"What is autoboxing in Java?", opts:["Auto converting primitive to wrapper","Auto imports","Auto compile","Auto indent"], a:"Auto converting primitive to wrapper" },
    { q:"Which keyword handles exceptions?", opts:["try","check","handle","catch"], a:"try" },
  ],
  C: [
    { q:"C is a __ level language?", opts:["Middle","High","Low","Very High"], a:"Middle" },
    { q:"Which symbol ends a statement in C?", opts:[";",":",".",","], a:";" },
    { q:"Which function reads input in C?", opts:["scanf","input","readline","read"], a:"scanf" },
    { q:"Which header file is required for printf?", opts:["<stdio.h>","<stdlib.h>","<string.h>","<math.h>"], a:"<stdio.h>" },
    { q:"Which keyword dynamically allocates memory in C?", opts:["malloc","alloc","new","memory"], a:"malloc" },
    { q:"What is a pointer?", opts:["A variable storing address","A function type","A data structure","A file handle"], a:"A variable storing address" },
    { q:"Which operator dereferences a pointer?", opts:["*","&","->","@"], a:"*" },
    { q:"Which operator gets a variable's address?", opts:["&","*","#","@"], a:"&" },
    { q:"What does sizeof() return?", opts:["Size in bytes","Element count","Memory address","Type name"], a:"Size in bytes" },
    { q:"Which storage class keeps value between calls?", opts:["static","auto","register","extern"], a:"static" },
    { q:"Which is NOT a valid C data type?", opts:["string","int","float","char"], a:"string" },
    { q:"What does void mean as return type?", opts:["No return value","Returns zero","Empty string","Optional return"], a:"No return value" },
    { q:"What is a struct in C?", opts:["A user-defined composite type","A loop","A pointer","A file"], a:"A user-defined composite type" },
    { q:"How do you free dynamically allocated memory?", opts:["free()","delete","remove()","dealloc()"], a:"free()" },
    { q:"Which C standard introduced inline functions?", opts:["C99","C89","C11","ANSI C"], a:"C99" },
  ],
  "C++": [
    { q:"C++ supports?", opts:["OOP","Only procedural","Only scripting","Only functional"], a:"OOP" },
    { q:"Who created C++?", opts:["Bjarne Stroustrup","Dennis Ritchie","James Gosling","Linus Torvalds"], a:"Bjarne Stroustrup" },
    { q:"C++ is a superset of?", opts:["C","Java","Python","Rust"], a:"C" },
    { q:"Which keyword defines a class in C++?", opts:["class","struct","object","define"], a:"class" },
    { q:"What is a constructor?", opts:["Auto-called method when object is created","A static method","A destructor alias","A pointer"], a:"Auto-called method when object is created" },
    { q:"What is a destructor called with?", opts:["~ClassName()","delete()","destroy()","free()"], a:"~ClassName()" },
    { q:"Which header is needed for cout?", opts:["<iostream>","<stdio.h>","<output.h>","<stream.h>"], a:"<iostream>" },
    { q:"What does public: mean in a class?", opts:["Members accessible anywhere","Members hidden","Only child access","Static members"], a:"Members accessible anywhere" },
    { q:"What is function overloading?", opts:["Same name, different parameters","Calling a function twice","A virtual method","A static function"], a:"Same name, different parameters" },
    { q:"What is virtual keyword used for?", opts:["Runtime polymorphism","Memory allocation","Loop control","Template definition"], a:"Runtime polymorphism" },
    { q:"What is a template in C++?", opts:["Generic programming construct","A design pattern","A header file","An interface"], a:"Generic programming construct" },
    { q:"Which operator is used for scope resolution?", opts:["::","->",".","*"], a:"::" },
    { q:"What is STL?", opts:["Standard Template Library","System Type Library","Static Thread Library","String Token Library"], a:"Standard Template Library" },
    { q:"Which smart pointer automatically deletes?", opts:["unique_ptr","raw_ptr","auto_ptr","shared_ptr"], a:"unique_ptr" },
    { q:"RAII stands for?", opts:["Resource Acquisition Is Initialization","Random Access Is Integer","Runtime API Invocation Instruction","Recursive Array Item Index"], a:"Resource Acquisition Is Initialization" },
  ],
  "C#": [
    { q:"C# was developed by?", opts:["Microsoft","Google","Apple","Meta"], a:"Microsoft" },
    { q:"C# runs on which platform?", opts:[".NET","JVM","V8","CLR only"], a:".NET" },
    { q:"Which keyword defines a property in C#?", opts:["get/set","prop","property","field"], a:"get/set" },
    { q:"What is a delegate in C#?", opts:["Type-safe function pointer","A class modifier","An interface","A loop keyword"], a:"Type-safe function pointer" },
    { q:"Which keyword makes a method overridable?", opts:["virtual","override","abstract","new"], a:"virtual" },
    { q:"Which method is entry point in C#?", opts:["Main()","Start()","Run()","Init()"], a:"Main()" },
    { q:"What does LINQ stand for?", opts:["Language Integrated Query","Linear Index Query","List Integer Query","Loop Integrated Queue"], a:"Language Integrated Query" },
    { q:"Which keyword prevents class inheritance in C#?", opts:["sealed","final","static","abstract"], a:"sealed" },
    { q:"What is async/await used for?", opts:["Asynchronous programming","Array sorting","Memory management","Dependency injection"], a:"Asynchronous programming" },
    { q:"Which symbol starts a C# attribute?", opts:["[","@","#","<"], a:"[" },
  ],
  PHP: [
    { q:"PHP variables start with?", opts:["$","@","#","&"], a:"$" },
    { q:"PHP stands for?", opts:["PHP: Hypertext Preprocessor","Preprocessor Hypertext Program","Personal Home Page","Programmable Hyperlink Protocol"], a:"PHP: Hypertext Preprocessor" },
    { q:"Which function outputs text in PHP?", opts:["echo","print_line","output","console.log"], a:"echo" },
    { q:"Which tag starts PHP code?", opts:["<?php","<php","<?","<script>"], a:"<?php" },
    { q:"PHP arrays can hold?", opts:["Mixed types","Only strings","Only integers","Only booleans"], a:"Mixed types" },
    { q:"Which function gets string length in PHP?", opts:["strlen()","length()","str_len()","count()"], a:"strlen()" },
    { q:"Which superglobal holds POST data?", opts:["$_POST","$POST","$_REQUEST","$DATA"], a:"$_POST" },
    { q:"Which function connects to MySQL in PHP?", opts:["mysqli_connect()","mysql_open()","db_connect()","connect_db()"], a:"mysqli_connect()" },
    { q:"What does PHP primarily run on?", opts:["Server side","Client side","Both","Neither"], a:"Server side" },
    { q:"Which keyword includes another PHP file?", opts:["include","import","require","use"], a:"include" },
  ],
  Go: [
    { q:"Go was created by?", opts:["Google","Microsoft","Meta","Apple"], a:"Google" },
    { q:"Which keyword declares a variable in Go?", opts:["var","let","dim","auto"], a:"var" },
    { q:"Go's short variable declaration uses?", opts:[":=","==","<=","=>"], a:":=" },
    { q:"Which keyword defines a function in Go?", opts:["func","function","def","method"], a:"func" },
    { q:"Go's concurrency primitive is called?", opts:["goroutine","thread","process","coroutine"], a:"goroutine" },
    { q:"What are channels used for in Go?", opts:["Communication between goroutines","File I/O","Error handling","Memory management"], a:"Communication between goroutines" },
    { q:"Go's zero value for int is?", opts:["0","nil","null","undefined"], a:"0" },
    { q:"Which keyword exits a switch case?", opts:["No break needed","break","exit","continue"], a:"No break needed" },
    { q:"What is a slice in Go?", opts:["Dynamic view of an array","A static array","A map type","A function"], a:"Dynamic view of an array" },
    { q:"How do you handle errors in Go?", opts:["Return error values","Try-catch","Exceptions","Assert"], a:"Return error values" },
  ],
  Rust: [
    { q:"Rust was created by?", opts:["Mozilla","Google","Microsoft","Apple"], a:"Mozilla" },
    { q:"Rust's memory safety is achieved via?", opts:["Ownership system","Garbage collector","Manual free()","Reference counting only"], a:"Ownership system" },
    { q:"Which keyword declares a mutable variable in Rust?", opts:["let mut","var","let","mut"], a:"let mut" },
    { q:"What is a borrow in Rust?", opts:["A reference to data","Copying data","Moving ownership","A macro"], a:"A reference to data" },
    { q:"What does panic! do in Rust?", opts:["Crashes the thread","Logs an error","Returns None","Exits normally"], a:"Crashes the thread" },
    { q:"Which type represents optional values in Rust?", opts:["Option<T>","Maybe<T>","Nullable<T>","Optional<T>"], a:"Option<T>" },
    { q:"What is the ? operator used for?", opts:["Propagating errors","Boolean check","Optional access","Dereference"], a:"Propagating errors" },
    { q:"What is a trait in Rust?", opts:["Shared behavior interface","A class","A macro","A module"], a:"Shared behavior interface" },
    { q:"Rust structs are defined with?", opts:["struct","class","type","record"], a:"struct" },
    { q:"What is Cargo in Rust?", opts:["Package manager & build tool","A runtime","A memory allocator","A debugger"], a:"Package manager & build tool" },
  ],
  Swift: [
    { q:"Swift was created by?", opts:["Apple","Google","Microsoft","Mozilla"], a:"Apple" },
    { q:"Which keyword declares a constant in Swift?", opts:["let","var","const","final"], a:"let" },
    { q:"Which keyword declares a variable in Swift?", opts:["var","let","dim","define"], a:"var" },
    { q:"Swift optionals use which symbol?", opts:["?","!","~","@"], a:"?" },
    { q:"What is force unwrapping in Swift?", opts:["Using ! to unwrap optionals","Optional binding","Guard statements","Nil coalescing"], a:"Using ! to unwrap optionals" },
    { q:"Which keyword defines a protocol in Swift?", opts:["protocol","interface","trait","abstract"], a:"protocol" },
    { q:"What is a closure in Swift?", opts:["An anonymous function","A class","A struct","A module"], a:"An anonymous function" },
    { q:"Swift is primarily used for?", opts:["iOS/macOS development","Web development","System programming","Data science"], a:"iOS/macOS development" },
    { q:"What does guard let do?", opts:["Safely unwraps and exits scope if nil","Creates a constant","Loops until condition","Throws an error"], a:"Safely unwraps and exits scope if nil" },
    { q:"What is a Swift struct vs class?", opts:["Struct is value type, class is reference type","Both are reference types","Struct is reference type","No difference"], a:"Struct is value type, class is reference type" },
  ],
};

/* ── All questions flat array ── */
const allQuestions = Object.entries(quizData).flatMap(([lang, qs]) =>
  qs.map(q => ({ ...q, lang }))
);

/* ── Challenges bank ── */
const challenges = [
  { title:"Build a Calculator",      diff:"Easy",   lang:"JavaScript" },
  { title:"Reverse a String",        diff:"Easy",   lang:"JavaScript" },
  { title:"Create a Login Form",     diff:"Easy",   lang:"HTML"       },
  { title:"Write a Prime Checker",   diff:"Medium", lang:"Python"     },
  { title:"Build a To-Do App",       diff:"Medium", lang:"JavaScript" },
  { title:"Create a Navbar",         diff:"Easy",   lang:"HTML"       },
  { title:"FizzBuzz Challenge",      diff:"Easy",   lang:"Any"        },
  { title:"Fibonacci Sequence",      diff:"Medium", lang:"Python"     },
  { title:"Linked List from Scratch",diff:"Hard",   lang:"C++"        },
  { title:"REST API Fetcher",        diff:"Medium", lang:"JavaScript" },
  { title:"Binary Search",           diff:"Medium", lang:"Java"       },
  { title:"Palindrome Detector",     diff:"Easy",   lang:"Any"        },
  { title:"OOP Animal Hierarchy",    diff:"Medium", lang:"Java"       },
  { title:"Memory Manager",          diff:"Hard",   lang:"C"          },
  { title:"Type-Safe Generic Stack", diff:"Hard",   lang:"Rust"       },
];

/* ============================================================
   STORAGE
   ============================================================ */

function loadData() {
  try {
    const saved = localStorage.getItem("codequest_v2");
    if (saved) {
      const d = JSON.parse(saved);
      player       = { ...player,       ...(d.player       || {}) };
      achievements = d.achievements     || [];
      stats        = { ...stats,        ...(d.stats        || {}) };
    }
  } catch(_) {}
}

function saveData() {
  try {
    localStorage.setItem("codequest_v2", JSON.stringify({ player, achievements, stats }));
  } catch(_) {}
}

/* ============================================================
   PROFILE
   ============================================================ */

function saveProfile() {
  const nameEl = document.getElementById("nameInput");
  const bioEl  = document.getElementById("bioInput");
  if (nameEl && nameEl.value.trim()) player.name = nameEl.value.trim();
  if (bioEl)  player.bio = bioEl.value.trim();
  updateUI();
  saveData();
  showToast("Profile saved!", "success");
}

/* ── Avatar photo upload ── */
function handleAvatarUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  // Accept only images, guard against huge files (>5 MB)
  if (!file.type.startsWith("image/")) {
    showToast("Please choose an image file.", "error");
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    showToast("Image must be under 5 MB.", "error");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    player.avatarPhoto = e.target.result; // base64 data URL
    saveData();
    applyAvatarPhoto(player.avatarPhoto, player.name);
    showToast("Profile picture updated!", "success");
  };
  reader.readAsDataURL(file);
}

/* Apply photo (or fall back to initials) across the avatar widget */
function applyAvatarPhoto(dataUrl, name) {
  const photo    = document.getElementById("avatarPhoto");
  const initials = document.getElementById("avatarInitials");
  if (!photo || !initials) return;

  if (dataUrl) {
    photo.src           = dataUrl;
    photo.style.display = "block";
    initials.style.display = "none";
  } else {
    photo.style.display    = "none";
    initials.style.display = "flex";
    // Show first letter of name
    initials.textContent = (name || "D").charAt(0).toUpperCase();
  }
}

/* Legacy stubs – kept so any old saved data referencing these won't crash */
function toggleEmojiPicker() {}
function setAvatar(emoji) {}

/* ============================================================
   PLAYER SYSTEM
   ============================================================ */

function updateTitle() {
  if      (player.level < 5)  player.title = "Beginner";
  else if (player.level < 10) player.title = "Apprentice";
  else if (player.level < 20) player.title = "Developer";
  else if (player.level < 35) player.title = "Senior Dev";
  else                        player.title = "Master";
}

function addXP(amount) {
  player.xp += amount;
  while (player.xp >= player.level * 1000) {
    player.xp -= player.level * 1000;
    player.level++;
    showToast(`Level Up! Now Level ${player.level}`, "level");
  }
  updateTitle();
  saveData();
  updateUI();
}

/* ============================================================
   ACHIEVEMENTS
   ============================================================ */

function addAchievement() {
  const input = document.getElementById("achievementInput");
  const value = (input.value || "").trim();
  if (!value) return;
  if (achievements.includes(value)) { showToast("Already added!", "error"); return; }
  achievements.push(value);
  input.value = "";
  saveData();
  renderAchievements();
  showToast("Achievement added!", "success");
}

function deleteAchievement(idx) {
  achievements.splice(idx, 1);
  saveData();
  renderAchievements();
}

function renderAchievements() {
  const list = document.getElementById("achievementList");
  list.innerHTML = "";
  if (achievements.length === 0) {
    list.innerHTML = '<li style="border-left:none;color:var(--text-3);font-size:.82rem;padding:10px 0;">No achievements yet. Add your first one!</li>';
    return;
  }
  achievements.forEach((a, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="ach-icon"></span>
      <span>${a}</span>
      <span class="ach-delete" onclick="deleteAchievement(${i})" title="Remove">✕</span>
    `;
    list.appendChild(li);
  });
}

/* ============================================================
   STATS + UI
   ============================================================ */

function updateUI() {
  /* Profile */
  const name = player.name || "Developer";
  const el = (id) => document.getElementById(id);

  if (el("playerNameDisplay"))  el("playerNameDisplay").textContent  = name;
  if (el("playerTitleBadge"))   el("playerTitleBadge").textContent   = player.title;
  if (el("playerLevel"))        el("playerLevel").textContent        = player.level;
  if (el("playerXP"))           el("playerXP").textContent          = player.xp;
  if (el("levelPill"))          el("levelPill").textContent          = `Lv. ${player.level}`;
  if (el("nameInput") && !el("nameInput").value) el("nameInput").value = name;
  /* Avatar: show uploaded photo or fall back to initials */
  applyAvatarPhoto(player.avatarPhoto || null, name);

  /* Stats */
  if (el("statQuizzes"))  el("statQuizzes").textContent  = stats.quizzes;
  if (el("statCorrect"))  el("statCorrect").textContent  = stats.correct;
  if (el("statStreak"))   el("statStreak").textContent   = stats.streak;
  const acc = stats.quizzes === 0 ? 0 : Math.round((stats.correct / stats.quizzes) * 100);
  if (el("statAccuracy")) el("statAccuracy").textContent = acc + "%";

  /* XP bar */
  const xpPct = Math.min((player.xp / Math.max(player.level * 1000, 1)) * 100, 100);
  if (el("xpBar"))       el("xpBar").style.width = xpPct + "%";
  if (el("xpValues"))    el("xpValues").textContent = `${player.xp} / ${player.level * 1000} XP`;
}

/* ============================================================
   LANGUAGE FILTER
   ============================================================ */

function selectLanguage(lang) {
  activeLanguage = lang;

  /* Update pill styles */
  document.querySelectorAll(".lang").forEach(el => {
    el.classList.toggle("active", el.dataset.lang === lang);
  });

  initQuiz();
  showToast(`${lang} mode`, "info");
}

function getActivePool() {
  if (activeLanguage === "All") {
    return shuffleArray([...allQuestions]);
  }
  const pool = quizData[activeLanguage];
  if (!pool || pool.length === 0) return shuffleArray([...allQuestions]);
  return shuffleArray(pool.map(q => ({ ...q, lang: activeLanguage })));
}

/* ============================================================
   CHALLENGES
   ============================================================ */

function loadChallenges() {
  const container = document.getElementById("challengeContainer");
  container.innerHTML = "";
  const shuffled = shuffleArray([...challenges]);

  shuffled.forEach((c, i) => {
    const diffClass = c.diff === "Easy" ? "diff-easy" : c.diff === "Medium" ? "diff-medium" : "diff-hard";
    const diffEmoji = c.diff === "Easy" ? "" : c.diff === "Medium" ? "" : "";
    const div = document.createElement("div");
    div.className = "challenge";
    div.innerHTML = `
      <div class="challenge-num">Challenge ${i + 1}</div>
      <div class="challenge-title">${c.title}</div>
      <span class="challenge-diff ${diffClass}">${diffEmoji} ${c.diff}</span>
      <div class="challenge-arrow">→</div>
    `;
    div.onclick = () => openChallenge(c);
    container.appendChild(div);
  });
}

/* ============================================================
   CODE EDITOR (same-site styling)
   ============================================================ */

function openChallenge(challenge) {
  const win = window.open("", "_blank");
  const boilerplate = getBoilerplate(challenge);

  win.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CodeQuest — ${challenge.title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{
  --brand-1:#6366f1;--brand-2:#8b5cf6;
  --bg:#080b12;--surface:#0d1117;--card:#111827;--card-2:#161d2d;--lift:#1e2a3a;
  --text:#e8edf5;--text-2:#9ba8bb;--text-3:#5a6578;
  --border:rgba(255,255,255,.06);--border-2:rgba(255,255,255,.11);
  --success:#10b981;--danger:#f43f5e;
}
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);height:100vh;display:flex;flex-direction:column;overflow:hidden;}
body::before{content:'';position:fixed;inset:0;background:radial-gradient(ellipse 80% 50% at 50% -5%,rgba(99,102,241,.15),transparent);pointer-events:none;}

/* topbar */
.topbar{
  display:flex;align-items:center;justify-content:space-between;
  height:56px;padding:0 20px;
  background:rgba(8,11,18,.9);backdrop-filter:blur(16px);
  border-bottom:1px solid var(--border);
  flex-shrink:0;
  gap:12px;
}
.topbar-left{display:flex;align-items:center;gap:12px;}
.logo{width:30px;height:30px;background:linear-gradient(135deg,var(--brand-1),var(--brand-2));border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:12px;font-family:'JetBrains Mono',monospace;font-weight:600;color:#fff;}
.challenge-name{font-family:'Syne',sans-serif;font-weight:700;font-size:.95rem;color:var(--text);}
.lang-tag{padding:3px 10px;background:rgba(99,102,241,.15);border:1px solid rgba(99,102,241,.3);border-radius:99px;font-size:.7rem;color:#a5b4fc;font-family:'JetBrains Mono',monospace;font-weight:600;}
.run-btn{
  display:flex;align-items:center;gap:7px;
  padding:7px 18px;border-radius:10px;border:none;
  background:linear-gradient(135deg,var(--brand-1),var(--brand-2));
  color:#fff;font-weight:600;font-size:.85rem;cursor:pointer;
  transition:all .2s;box-shadow:0 4px 14px rgba(99,102,241,.35);
}
.run-btn:hover{filter:brightness(1.1);transform:translateY(-1px);}

/* layout */
.workspace{display:flex;flex:1;overflow:hidden;}
.editor-side{width:50%;display:flex;flex-direction:column;border-right:1px solid var(--border);background:var(--surface);}
.preview-side{flex:1;display:flex;flex-direction:column;background:var(--card);}
.pane-header{
  display:flex;align-items:center;gap:8px;
  padding:10px 16px;
  background:var(--card);border-bottom:1px solid var(--border);
  font-size:.72rem;font-weight:600;color:var(--text-3);letter-spacing:.07em;text-transform:uppercase;
  flex-shrink:0;
}
.pane-dot{width:7px;height:7px;border-radius:50%;}
.dot-r{background:#f43f5e;} .dot-y{background:#f59e0b;} .dot-g{background:#10b981;}

/* code area */
textarea{
  flex:1;padding:18px 20px;
  font-family:'JetBrains Mono',monospace;font-size:.84rem;line-height:1.7;
  border:none;outline:none;resize:none;
  background:var(--surface);color:var(--text);
  overflow-y:auto;
}
textarea::-webkit-scrollbar{width:5px;}
textarea::-webkit-scrollbar-track{background:transparent;}
textarea::-webkit-scrollbar-thumb{background:#2d3748;border-radius:99px;}

/* preview */
iframe{flex:1;border:none;background:#fff;}
.preview-empty{
  flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;
  color:var(--text-3);font-size:.88rem;text-align:center;padding:20px;
}
.preview-empty .big{font-size:2.5rem;}

/* status bar */
.statusbar{
  display:flex;align-items:center;gap:16px;padding:6px 16px;
  background:var(--card);border-top:1px solid var(--border);
  font-size:.72rem;color:var(--text-3);font-family:'JetBrains Mono',monospace;
  flex-shrink:0;
}
.status-dot{width:6px;height:6px;border-radius:50%;background:#10b981;}
</style>
</head>
<body>

<div class="topbar">
  <div class="topbar-left">
    <div class="logo">CQ</div>
    <span class="challenge-name">${challenge.title}</span>
    <span class="lang-tag">${challenge.lang}</span>
  </div>
  <button class="run-btn" onclick="runCode()">▶ Run Code</button>
</div>

<div class="workspace">
  <div class="editor-side">
    <div class="pane-header">
      <div class="pane-dot dot-r"></div>
      <div class="pane-dot dot-y"></div>
      <div class="pane-dot dot-g"></div>
      &nbsp;&nbsp;editor.html
    </div>
    <textarea id="code" spellcheck="false">${boilerplate}</textarea>
  </div>

  <div class="preview-side">
    <div class="pane-header">
      <div class="pane-dot dot-g"></div>
      &nbsp;&nbsp;preview
    </div>
    <div id="previewWrap" style="flex:1;display:flex;flex-direction:column;">
      <div class="preview-empty" id="emptyState">
        <div class="big">▶</div>
        <div>Click <strong style="color:#a5b4fc">Run Code</strong> to see your output here</div>
      </div>
      <iframe id="preview" style="display:none;flex:1;border:none;"></iframe>
    </div>
  </div>
</div>

<div class="statusbar">
  <div class="status-dot"></div>
  <span>CodeQuest Editor</span>
  <span style="margin-left:auto;">Tab = 2 spaces</span>
</div>

<script>
function runCode() {
  const code = document.getElementById("code").value;
  const iframe = document.getElementById("preview");
  const empty = document.getElementById("emptyState");
  empty.style.display = "none";
  iframe.style.display = "block";
  iframe.contentDocument.open();
  iframe.contentDocument.write(code);
  iframe.contentDocument.close();
}

// Tab key inserts spaces
document.getElementById("code").addEventListener("keydown", function(e) {
  if (e.key === "Tab") {
    e.preventDefault();
    const s = this.selectionStart;
    this.value = this.value.slice(0, s) + "  " + this.value.slice(this.selectionEnd);
    this.selectionStart = this.selectionEnd = s + 2;
  }
  // Ctrl+Enter runs
  if (e.ctrlKey && e.key === "Enter") runCode();
});
<\/script>
</body>
</html>`);
  win.document.close();
}

function getBoilerplate({ title, lang }) {
  const map = {
    "Build a Calculator": `<!DOCTYPE html>
<html>
<head><title>Calculator</title>
<style>
  body { margin:0; display:flex; align-items:center; justify-content:center; min-height:100vh; background:#111; font-family:Arial; }
  .calc { background:#1a1a2e; border-radius:16px; padding:20px; width:280px; box-shadow:0 20px 60px rgba(0,0,0,.5); }
  .display { background:#0a0a16; color:#00ff88; font-size:2rem; text-align:right; padding:16px; border-radius:10px; margin-bottom:16px; min-height:60px; word-break:break-all; }
  .grid { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; }
  button { padding:16px; border:none; border-radius:10px; font-size:1rem; cursor:pointer; font-weight:600; transition:.15s; }
  .num { background:#1e293b; color:#e2e8f0; }
  .num:hover { background:#334155; }
  .op  { background:#6366f1; color:#fff; }
  .op:hover { filter:brightness(1.15); }
  .eq  { background:#10b981; color:#fff; grid-column:span 2; }
  .eq:hover { filter:brightness(1.1); }
  .cl  { background:#f43f5e; color:#fff; }
</style></head>
<body>
<div class="calc">
  <div class="display" id="display">0</div>
  <div class="grid">
    <button class="cl" onclick="clearAll()">C</button>
    <button class="op" onclick="appendOp('%')">%</button>
    <button class="op" onclick="deleteLast()">⌫</button>
    <button class="op" onclick="appendOp('/')">÷</button>
    <button class="num" onclick="appendNum('7')">7</button>
    <button class="num" onclick="appendNum('8')">8</button>
    <button class="num" onclick="appendNum('9')">9</button>
    <button class="op" onclick="appendOp('*')">×</button>
    <button class="num" onclick="appendNum('4')">4</button>
    <button class="num" onclick="appendNum('5')">5</button>
    <button class="num" onclick="appendNum('6')">6</button>
    <button class="op" onclick="appendOp('-')">−</button>
    <button class="num" onclick="appendNum('1')">1</button>
    <button class="num" onclick="appendNum('2')">2</button>
    <button class="num" onclick="appendNum('3')">3</button>
    <button class="op" onclick="appendOp('+')">+</button>
    <button class="num" onclick="appendNum('0')" style="grid-column:span 2;">0</button>
    <button class="num" onclick="appendNum('.')">.</button>
    <button class="eq" onclick="calculate()">=</button>
  </div>
</div>
<script>
let display = document.getElementById("display"), expr = "";
function appendNum(n) { expr = expr==="0"?"":expr; expr+=n; display.textContent=expr; }
function appendOp(o) { if(expr) { expr+=o; display.textContent=expr; } }
function clearAll() { expr=""; display.textContent="0"; }
function deleteLast() { expr=expr.slice(0,-1); display.textContent=expr||"0"; }
function calculate() { try { let r=Function('"use strict";return ('+expr+')')(); expr=String(r); display.textContent=expr; } catch(e) { display.textContent="Error"; expr=""; } }
<\/script>
</body></html>`,
    "Reverse a String": `<!DOCTYPE html>
<html><head><title>Reverse String</title>
<style>
body{margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#111;font-family:Arial;color:#e2e8f0;}
.box{background:#1a1a2e;border-radius:16px;padding:30px;width:400px;}
h2{color:#a5b4fc;margin-bottom:20px;font-size:1.4rem;}
input{width:100%;padding:12px;border-radius:10px;border:1px solid #334155;background:#0f172a;color:#e2e8f0;font-size:1rem;outline:none;margin-bottom:12px;}
button{padding:12px 24px;border:none;border-radius:10px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;font-size:1rem;font-weight:600;cursor:pointer;width:100%;}
.result{margin-top:20px;padding:16px;background:#0f172a;border-radius:10px;border-left:3px solid #6366f1;font-family:monospace;font-size:1.1rem;word-break:break-all;}
</style></head>
<body>
<div class="box">
  <h2>String Reverser</h2>
  <input id="inp" placeholder="Type something here..." oninput="reverse()">
  <div class="result" id="out">Result appears here</div>
</div>
<script>
function reverse() {
  const v = document.getElementById("inp").value;
  document.getElementById("out").textContent = v ? v.split("").reverse().join("") : "Result appears here";
}
<\/script>
</body></html>`,
    "Create a Login Form": `<!DOCTYPE html>
<html><head><title>Login</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#080b12,#111827);font-family:Arial;color:#e2e8f0;}
.card{background:#111827;border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:40px;width:360px;box-shadow:0 20px 60px rgba(0,0,0,.5);}
h2{font-size:1.5rem;margin-bottom:8px;text-align:center;}
.sub{color:#64748b;font-size:.85rem;text-align:center;margin-bottom:28px;}
label{font-size:.78rem;color:#94a3b8;font-weight:600;letter-spacing:.06em;text-transform:uppercase;display:block;margin-bottom:6px;}
input{width:100%;padding:12px 14px;background:#0f172a;border:1px solid rgba(255,255,255,.1);border-radius:10px;color:#fff;font-size:.95rem;outline:none;margin-bottom:16px;transition:.2s;}
input:focus{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.2);}
button{width:100%;padding:13px;border:none;border-radius:10px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;font-size:1rem;font-weight:700;cursor:pointer;margin-top:4px;}
.msg{margin-top:14px;padding:12px;border-radius:10px;text-align:center;font-size:.88rem;display:none;}
.success{background:rgba(16,185,129,.15);border:1px solid rgba(16,185,129,.3);color:#6ee7b7;}
.error{background:rgba(244,63,94,.15);border:1px solid rgba(244,63,94,.3);color:#fda4af;}
</style></head>
<body>
<div class="card">
  <h2>Welcome Back</h2>
  <div class="sub">Sign in to CodeQuest</div>
  <label>Email</label>
  <input type="email" id="email" placeholder="you@example.com">
  <label>Password</label>
  <input type="password" id="pass" placeholder="••••••••">
  <button onclick="login()">Sign In</button>
  <div id="msg" class="msg"></div>
</div>
<script>
function login() {
  const email = document.getElementById("email").value;
  const pass  = document.getElementById("pass").value;
  const msg   = document.getElementById("msg");
  msg.style.display = "block";
  if (email && pass.length >= 6) {
    msg.className = "msg success";
    msg.textContent = "Login successful! Welcome back.";
  } else {
    msg.className = "msg error";
    msg.textContent = pass.length < 6 ? "❌ Password must be at least 6 characters." : "❌ Please enter a valid email.";
  }
}
<\/script>
</body></html>`,
  };

  return map[title] || `<!DOCTYPE html>
<html>
<head>
<title>${title}</title>
<style>
  body { margin: 0; padding: 30px; font-family: Arial; background: #111; color: #e2e8f0; }
  h1 { color: #a5b4fc; font-size: 1.4rem; margin-bottom: 12px; }
  p  { color: #64748b; font-size: .88rem; }
</style>
</head>
<body>
  <h1>Challenge: ${title}</h1>
  <p>Language hint: ${lang}</p>
  <p>Delete this content and write your solution above!</p>

  <script>
    // Your ${lang} code here
    console.log("Start coding!");
  <\/script>
</body>
</html>`;
}

/* ============================================================
   QUIZ
   ============================================================ */

function initQuiz() {
  quizPool    = getActivePool();
  currentIndex = 0;
  quizHistory  = [];
  renderPips();
  loadQuestion();
}

function loadQuestion() {
  if (!quizPool.length) { quizPool = getActivePool(); currentIndex = 0; }
  if (currentIndex >= quizPool.length) { quizPool = getActivePool(); currentIndex = 0; }

  const q = quizPool[currentIndex];
  if (!q) return;

  /* chips */
  const langChip = document.getElementById("quizLangChip");
  const numChip  = document.getElementById("quizNumChip");
  if (langChip) langChip.textContent = q.lang || activeLanguage;
  if (numChip)  numChip.textContent  = `#${currentIndex + 1} / ${quizPool.length}`;

  /* question */
  const qEl = document.getElementById("question");
  if (qEl) qEl.textContent = q.q;

  /* options */
  const opts = document.getElementById("options");
  if (!opts) return;
  opts.innerHTML = "";

  const shuffledOpts = shuffleArray([...q.opts]);
  shuffledOpts.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.innerHTML = `<span>${opt}</span>`;
    btn.onclick = () => checkAnswer(opt, btn);
    opts.appendChild(btn);
  });

  updateActivePip();
}

function checkAnswer(answer, button) {
  const q = quizPool[currentIndex];
  if (!q) return;

  document.querySelectorAll(".option").forEach(b => b.disabled = true);

  if (answer === q.a) {
    button.classList.add("correct");
    addXP(100);
    updateStats(true);
    quizHistory[currentIndex] = "correct";
    showToast("Correct! +100 XP", "success");
  } else {
    button.classList.add("wrong");
    document.querySelectorAll(".option").forEach(b => {
      if (b.querySelector("span").textContent === q.a) b.classList.add("correct");
    });
    updateStats(false);
    quizHistory[currentIndex] = "wrong";
    showToast(`Wrong! Answer: ${q.a}`, "error");
  }
  renderPips();
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex >= quizPool.length) {
    quizPool = getActivePool();
    currentIndex = 0;
    showToast("New round started!", "info");
  }
  loadQuestion();
}

function updateStats(correct) {
  stats.quizzes++;
  if (correct) { stats.correct++; stats.streak++; }
  else          { stats.streak = 0; }
  saveData();
  updateUI();
}

/* Pips */
function renderPips() {
  const wrap = document.getElementById("quizTrack");
  if (!wrap) return;
  wrap.innerHTML = "";
  const count = Math.min(quizPool.length, 20);
  for (let i = 0; i < count; i++) {
    const d = document.createElement("div");
    d.className = "quiz-pip";
    if      (quizHistory[i] === "correct") d.classList.add("correct-pip");
    else if (quizHistory[i] === "wrong")   d.classList.add("wrong-pip");
    else if (i === currentIndex)           d.classList.add("active-pip");
    wrap.appendChild(d);
  }
}

function updateActivePip() { renderPips(); }

/* ============================================================
   TOAST
   ============================================================ */

function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "toast-out .25s ease forwards";
    setTimeout(() => toast.remove(), 260);
  }, 2200);
}

/* ============================================================
   UTIL
   ============================================================ */

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ============================================================
   INIT
   ============================================================ */

function init() {
  loadData();
  renderAchievements();
  loadChallenges();
  updateUI();
  initQuiz();
}

init();