var main = function () {
	"use strict";

	var toDos = [
		"Finish writing this book",
		"Take Gracie to the park",
		"Answer emails",
		"Prep for Monday's class",
		"Make up some new ToDos",
		"Get Groceries"
	];
	
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
			} else if ($element.parent().is(":nth-child(3)")) {
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