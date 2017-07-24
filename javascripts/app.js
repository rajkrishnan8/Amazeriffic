var organizedByTags = function (toDoObjects) {
	var tags = [];
	var organizedByTag = [];


	toDoObjects.map(function(todo){
		todo.tags.forEach(function(tag){
			if(tags.indexOf(tag) < 0){
				tags.push(tag);
			}
		});
	});

	console.log(tags);
};

var main = function () {
	"use strict";

	var toDoObjects = [
		{
			description: "Get groceries", 
			tags: ["shopping", "chores"]
		},
		{
			description: "Make up some new ToDos", 
			tags: ["writing", "work"]
		},
		{
			description: "Prep for Monday's class",
			tags: ["work", "teaching"]
		},
		{
			description: "Answer emails",
			tags: ["work"]
		},
		{
			description: "Take Gracies to the park",
			tags: ["chores", "pets"]
		}, 
		{
			description: "Finish writing this book",
			tags: ["writing", "work"]
		}
	];

	var toDos = toDoObjects.map(function(todoObj){return todoObj.description;});
	
	$(".tabs span").toArray().forEach(function (element) {
		// create a click handler for this element
		$(element).on("click", function() {
			var $element = $(element),
				$content;

			$(".tabs span").removeClass("active");
			$(element).addClass("active");
			$("main .content").empty();

			if($element.parent().is(":nth-child(1)")) {
				$content = $("<ul>");
				for(var i = toDos.length-1; i>=0; i--){
					$content.append($("<li>").text(toDos[i]));
				}
				$("main .content").append($content);
			} else if ($element.parent().is(":nth-child(2)")){
				var $content = $("<ul>");
				toDos.forEach(function(todo){
					$content.append($("<li>").text(todo));
				});
				$("main .content").append($content);
			} else if ($element.parent().is(":nth-child(3)")){
				var organizedByTag = [
				{
					name: "shopping",
					toDos: ["Get groceries"]
				},
				{
					name: "chores",
					toDos: ["Get groceries", "Take Gracie to the park"]
				}];

				organizedByTag = organizedByTags(toDoObjects);



				organizedByTag.forEach(function (tag) {
					var $tagName = $("<h3>").text(tag.name),
						$content = $("<ul>");

					tag.toDos.forEach(function(description) {
						var $li = $("<li>").text(description);
						$content.append($li);
					});

					$("main .content").append($tagName);
					$("main .content").append($content);
				})



			} else if ($element.parent().is(":nth-child(4)")) {
				$content = $("<span>");

				$content.append($("<input>").addClass("todo"));
				$content.append($("<button>").text("+")).on("click", function(){
					var msg;
					if((msg = $("input.todo").val()) !== "") {
						toDos.push(msg);
						$("input.todo").val("");
					}
				});

				$("main .content").append($content);
			}

			return false;
		})
	});

	$(".tabs a:first-child span").trigger("click");
};

$(document).ready(main);