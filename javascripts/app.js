var organizedByTags = function (toDoObjects) {
	var result = {};
	result.tags = [];
	result.list = [];

	result.addToDo = function(description, tags){
		tags.forEach(function(tag) {
			var ind = result.tags.indexOf(tag);
			if(ind < 0) {
				ind = result.tags.length;
				result.tags.push(tag);
				result.list.push({name: tag, toDos: []});
			}

			result.list[ind].toDos.push(description);
		});
	}


	toDoObjects.forEach(function(todo){
		result.addToDo(todo.description, todo.tags);
	});

	return result;

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
			description: "Take Gracie to the park",
			tags: ["chores", "pets"]
		}, 
		{
			description: "Finish writing this book",
			tags: ["writing", "work"]
		}
	];

	var organizedByTag = organizedByTags(toDoObjects);

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
				$content = $("<ul>");
				toDos.forEach(function(todo){
					$content.append($("<li>").text(todo));
				});
				$("main .content").append($content);
			} else if ($element.parent().is(":nth-child(3)")){
				organizedByTag.list.forEach(function (tag) {
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
				var $input = $("<input>").addClass("todo"),
					$inputLabel = $("<p>").text("Description:"),
					$tagInput = $("<input>").addClass("tags"),
					$tagLabel = $("<p>").text("Tags:"),
					$button = $("<button>").text("+");

				$button.on("click", function(){
					var description = $("input.todo").val(),
						tagsCsv = $("input.tags").val(),
						tags = tagsCsv.split(",");

					organizedByTag.addToDo(description, tags);
					toDoObjects.push({description: description, tags: tags});
					toDos.push(description);
					
					$("input.todo").val("");
					$("input.tags").val("");
				});

				$content = $("<div>").append($inputLabel)
									 .append($input)
									 .append($tagLabel)
									 .append($tagInput)
									 .append($button);

				$("main .content").append($content);
			}

			return false;
		})
	});

	$(".tabs a:first-child span").trigger("click");
};

$(document).ready(main);