var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");

function inputLength() {
	return input.value.length;
}

function addDeleteButton(x) {
	var del = document.createElement("Button");
	del.classList.add("delete")
	del.appendChild(document.createTextNode("Delete"));
	x.appendChild(del)
}

function toggleCheckList(item) {
	item.addEventListener("click", function(){
		item.classList.toggle("done");
	})
}

function deleteList(item) {
	var delList = Array.from(item.getElementsByTagName("button"))[0]
	delList.addEventListener("click", function(){
		this.parentElement.remove()
	})
}

function createListElement() {
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(input.value));
	addDeleteButton(li);
	toggleCheckList(li);
	deleteList(li)
	ul.appendChild(li);
	input.value = "";
}

function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
		ul = document.querySelector("ul");
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}

button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

var listed = Array.from(ul.children);

listed.forEach(element => {
	addDeleteButton(element);
	toggleCheckList(element);
	deleteList(element);
})

// Event delegation: 
// Capturing and bubbling allow us to implement one of most powerful event handling patterns called event delegation.
// The idea is that if we have a lot of elements handled in a similar way, then instead of assigning a handler to each of them – we put a single handler on their common ancestor.
// Example: 
	// ul.addEventListener("click", function(event) {
	// 	if(event.target.nodeName === "LI"){
	// 		toggleCheckList(event.target);
	// 	}
	// 	else if(event.target.nodeName === "BUTTON") {
	// 		deleteList(event.target);
	// 	}
	// });