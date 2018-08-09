//htmljs
$(document).ready(function () {
  $('select').formSelect();
  $('.modal').modal();

});

// Get references to page elements
var $mealText = $("#meal-input");
var $submitBtn = $("#submit");
var $wineTypeSubmitBtn = $("#wineTypeSubmit");
var $wineSubTypeSubmitBtn = $("#wineSubTypeSubmit");
// define global variables
var winePairArray = [];
var wineSubTypeArray = [];

var exactST = [];
var descriptionExtract;
var bookOutput = [];
var bookTitle = [];
var descriptionExtractString;
var historyId;
// The API object contains methods for each kind of request we'll make
var API = {
  saveHistory: function (newHistory) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/history",
      data: newHistory
    });
  },
  // method to update history
  updateHistory: function (putHistory) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "PUT",
      url: "api/history",
      data: putHistory
    });
  },
  getHistory: function () {
    return $.ajax({
      url: "api/history",
      type: "GET",
    });
  },
  getPairings: function () {
    return $.ajax({
      url: "api/mealpairs",
      type: "GET",
    });
  },
  getSubTypes: function () {
    return $.ajax({
      url: "api/subtypes",
      type: "GET",
    });
  },
  getNYT: function () {
    return $.ajax({
      url: "http://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=e33525e3c9314318878c888c1b3671d0",
      type: "GET",
    });
  }
};

// handleMealSubmit is called whenever we submit a new request
// Find the matching wine in the DB and refresh the page

$("select[name='foodDropdown']").change(function () {

  event.preventDefault();

  //emptying logic
  $(".subWines").empty();
  $("#cardgrid").empty();
  $(".mainWines").empty();
  winePairArray = [];

  //grabs text from selected option
  var mealText = {
    text: $(this).val().trim(),
  };

  if (!(mealText.text)) {
    alert("You must enter a meal!");
    return;
  }

  API.getPairings().then(function (data) {
    // run matching logic
    for (var i = 0; i < data.length; i++)
      if (mealText.text === data[i]["meal"]) {
        winePairArray.push(data[i]["winePair"]);
      }
    console.log(winePairArray)
    var mealString = JSON.stringify(mealText.text)
    var wineString = JSON.stringify(winePairArray.join())
    console.log(wineString)
    console.log(winePairArray)
    // Find the matching subtypes for the types
    // Make a newHistory object
    var newHistory = {
      meal: mealString,
      winePairings: wineString
    };
    console.log(newHistory);
    $.post("/api/history", newHistory)
      // On success, run the following code
      .then(function (result) {
        console.log(winePairArray);

        // #WINE TYPE BUTTON APPEND LOGIC GOES HERE*****************
        // #WINE TYPE BUTTON APPEND LOGIC GOES HERE*****************
        // #WINE TYPE BUTTON APPEND LOGIC GOES HERE*****************
        // #WINE TYPE BUTTON APPEND LOGIC GOES HERE*****************
        // #WINE TYPE BUTTON APPEND LOGIC GOES HERE*****************
        // #WINE TYPE BUTTON APPEND LOGIC GOES HERE*****************
        // #WINE TYPE BUTTON APPEND LOGIC GOES HERE*****************

      })

    for (var i = 0; i < winePairArray.length; i++) {
      var button = $("<div class = 'col s12 button1'><a href='#'>" + winePairArray[i] + "</a></div>")
      $(".mainWines").append(button)
    }
  })
});

$(document).on("click", ".button1", function () {

  // Find the matching wine subtypes in the DB and refresh the page
  event.preventDefault();
  console.log("check")
  wineSubTypeArray = [];
  $(".subWines").empty();

  var wineType = JSON.stringify($(this).text());
  console.log(wineType)
  API.getSubTypes().then(function (data) {
    // run matching logic
    console.log(data[1]["type"])
    for (var i = 0; i < data.length; i++) {
      var typeOf = JSON.stringify(data[i]["type"]);
      console.log(typeOf)
      console.log(data[i]["subType"])
      if (wineType == typeOf) {
        wineSubTypeArray.push(data[i]["subType"]);
      }
    }

    console.log(wineSubTypeArray)
    var wineSubTypeString = JSON.stringify(winePairArray.join())
    console.log(wineSubTypeString)
    console.log(wineSubTypeArray)
    // Find the matching subtypes for the types
    // Make a newHistory object
    var newHistory = {
      winePairingsSubType: wineSubTypeString
    };
    console.log(newHistory);
    $.post("/api/history", newHistory)
      // On success, run the following code
      .then(function (result) {
        console.log(result);
        // // reset page
        // location.reload();

        // #WINE SUB TYPE BUTTON APPEND LOGIC GOES HERE*****************
        // #WINE SUB TYPE BUTTON APPEND LOGIC GOES HERE*****************
        // #WINE SUB TYPE BUTTON APPEND LOGIC GOES HERE*****************
        // #WINE SUB TYPE BUTTON APPEND LOGIC GOES HERE*****************
        // #WINE SUB TYPE BUTTON APPEND LOGIC GOES HERE*****************

      })

    for (var i = 0; i < wineSubTypeArray.length; i++) {
      var button = $("<div class = 'col s12 button2'><a href='#'>" + wineSubTypeArray[i] + "</a></div>")
      $(".subWines").append(button)
    }

  })

});

$(document).on("click", ".button2", function () {

  $("#cardgrid").empty();

  var searchte = JSON.stringify($(this).text())
  $(exactST).push(searchte);

  //"searchterm takes the wine, and converts the spaces to +'s, so it's "Pinot+Noir" instead of "Pinot Noir."
  var searchterm = searchte.replace(/ /g, "+")

  //"start" is the number the search begins on, a couple of the wines have enough info for a second search that would begin on "26," since it maxes the search to 25.
  if (searchte == "Chardonnay" || searchte == "Merlot") {
    start = 26;
  }
  else if (searchte == "Champagne") {
    start = 9
  }
  else {
    ;
    start = 1
  }
  var secondSearch = ["bob", "White Table Wine", "Albarino", "Riesling", "Muscat", "Gewurztraminer", "Malvasia", "Viognier", "Cava", "Red Table Wine", "Tempranillo", "Sanglovese", "Grenache", "Malbec", "Syrah", "Shiraz", "Menastreli", "Ice Wine", "Sherry", "Port"]
  console.log(secondSearch.indexOf(searchte) + Math.abs(secondSearch.indexOf(searchte)))
  console.log(searchte);
  console.log(secondSearch.indexOf(searchte));
  if (secondSearch.indexOf(searchte) + Math.abs(secondSearch.indexOf(searchte)) < 1) {

    //This is for the MAIN search.  There are some wines that are not on the regular Walmart site, they have the alternate search for them, below.
    (function ($) {
      $(document).ready(function () {
        $(document).on("click", ".button2", function () {
          api_key = "je2h842rufj3ba7u88a2tbzb&lsPublisherId=d4yXPxJh";
          wineURL = "http://api.walmartlabs.com/v1/search?apiKey=" + api_key +
            "&query=" + searchterm +
            "&categoryId=976759_976782_1001579_1001324&sort=bestseller&responseGroup=full&start="
            + start + "&numItems=25";

          console.log(searchterm);
          $.ajax({
            url: wineURL,
            dataType: 'jsonp',
            success: function (data) {
              //console.log("DATA IS", data.items);
              //  console.log("DATA IS", data.items.length);

              $('#wine-images').empty();
              wineres = data.items
              console.log(data);

              if (data.items.length > 0) {
                carderize();
                //console.log(wineres[i].name);
              } else {
                $('<p>No results.</p>').appendTo('#wine-images');
              }
              //} else {
              //  $('#wine-images').empty();
              //  $(data).appendTo('#wine-images');
            }
          }
          );

          return false;
        })
      });

    })
      (jQuery);
  }
  else {
    //This is for the SECONDARY search.  
    //first, it has to figure out which wine, because each one requires a specific search.
    console.log("testssss")
    switch (searchte) {

      case "White Table Wine":
        var wineids = "47360093,47360090,10984586,47360096,130579395,10984579,131685421,10984580,47360094";
        break;

      case "Albarino":
        var wineids = "157123792,117576025";
        break;

      case "Riesling":
        var wineids = "190415823,196946515,14053297,49933092,517612727,115512601,172062323,23623618,171330946,143002881,141267848,117652475,187201562,126862514,184099464,119402793,23555118,34260396,112915959,173063175";
        break;

      case "Muscat":
        var wineids = "22038337,183488654,138105515,130366350,141207117,150886084,110148702";
        break;

      case "Gewurztraminer":
        var wineids = "23623621,125093615,19718020,148857585,14118970,141207117";
        break;

      case "Malvasia":
        var wineids = "183262060";
        break;

      case "Viognier":
        var wineids = "119457778,187131733";
        break;

      case "Cava":
        var wineids = "100001201,142512284,112467614";
        break;

      case "Red Table Wine":
        var wineids = "47360094,47360091,22038333,113620851,49303141,10984575,10984576,44419723";
        break;

      case "Tempranillo":
        var wineids = "121213266,133449211,182123654,185990738,115124021,197788128,184311991,181811684,122141983";
        break;

      case "Sanglovese":
        var wineids = "172878093,180674922,127595167,132317083,194650989";
        break;

      case "Grenache":
        var wineids = "128872364,54333793,428028609,115724102,116510350,167136206,489955530,143016477,106154161,132227827";
        break;

      case "Malbec":
        var wineids = "39321720,46491722,148735204,169294300,167719938,182179666,169882461,47333699,23554800,138281803,192419177,106052090,181861357,141231283,176004448,49933093,110103402,172900604,195931548,129733986";
        break;

      case "Syrah":
        var wineids = "116340537,101065614,126984268,158811018,152423804,167420131,175954336,137062416,185034689,54333698,132227827,100880990,240123203,198747854,186878097";
        break;

      case "Shiraz":
        var wineids = "119613927,125105954,10996964,54333737,20607992,120564633,11027500,731723089,10996600,54333800,139569001,145621783,171513996,572291979,122158234,23623612,181311008,114137685,33339175,163657299";
        break;

      case "Menastreli":
        var wineids = "133449211";
        break;

      case "Ice Wine":
        var wineids = "143361079,176847504";
        break;

      case "Sherry":
        var wineids = "23623635,23623638,23623639,23623640,128204958,168404008,190667513";
        break;

      case "Port":
        var wineids = "104207235,151310901,127599025,150600462,169993973,194480640,116383129,23623631,23623632,189269319,160807837";
        break
    };

    console.log(wineids);
    //function secondAPI() {
    (function ($) {
      console.log(181);
      $(document).ready(function () {
        $(document).on("click", ".button2", function () {
          api_key = "je2h842rufj3ba7u88a2tbzb&lsPublisherId=d4yXPxJh";
          wineURL = "http://api.walmartlabs.com/v1/items?ids=" + wineids +
            "&apiKey=je2h842rufj3ba7u88a2tbzb";

          console.log(searchterm);
          var ideal = wineids.split(",");
          console.log(ideal.length);
          console.log(wineURL)
          $.ajax({
            url: wineURL,
            dataType: 'jsonp',
            success: function (data) {
              //console.log("DATA IS", data.items);
              console.log("DATA IS", data.items.length);

              $('#wine-images').empty();
              wineres = data.items
              //console.log(data.items.length);
              if (data.items.length > 0) {

                carderize()


              } else {
                $('<p>No results.</p>').appendTo('#wine-images');
              }
              //} else {
              //  $('#wine-images').empty();
              //  $(data).appendTo('#wine-images');
            }
          }
          );

          return false;
        })
      });

    })



      (jQuery)
  }
  function carderize() {
    console.log(242)
    $("#cardgrid").text("");
    if (wineres.length > 13) {
      cardcount = 12
    } else {
      cardcount = wineres.length
    }
    for (i = 0; i < cardcount; i++) {
      console.log(wineres[i])

      var dumbBrands = ["bob", "Warburn Rumours", "ST CLAIR MALV BIANCA", "PR SANTIAGO RUIZ", "BODEGAS SALNERSUR", "PINORD", "FREIXENET WINE"]

      if (wineres[i].size || (dumbBrands.indexOf(searchte) + Math.abs(dumbBrands.indexOf(searchte)) > 0)) {
        console.log(cardcount)
        console.log(dumbBrands.indexOf(searchte))
        if (wineres[i].salePrice) {
          winePrice = ("<br>$" + wineres[i].salePrice);
        } else { winePrice = "" }

        var butt = $("<button>");
        butt.addClass("wineSelector");
        butt.attr("data-name", wineres[i].name);
        butt.text("Save to History");
        //.appendTo("#wine-images")
        var wineDetails = (wineres[i].name + winePrice + "<br>" + wineres[i].size + "<br>")
        var sizer = $('<div class="col m6 s6">')
        var cardrow = ("<div class='row'>")
        var cardcol = ('<div class="col s12 m4">')
        var cardClass = $("<div class='card'>");
        var cardImage = $("<div class='card-image'>");
        var img = $("<img>").attr({ "src": wineres[i].mediumImage, "title": wineres[i].longDescription });
        var spanner = ("<span class='card-title' id='spanner'>" + wineres[i].name + "</span>")
        var winelink = $('<a target=_"blank" href="' + wineres[i].productUrl + '">');
        var divender = ("</div></div></div></div>");
        var singlediv = ("</div>");
        var divClass = $('<div class="card-content">' + wineDetails);

        //winelink.append(img);
        cardImage.append(img);
        cardImage.append(spanner);
        winelink.append(cardImage);
        cardClass.append(winelink);
        cardClass.append(butt)
        cardClass.append(divClass);
        sizer.append(cardClass)
        //cardClass.append(cardImage);
        //$("#wine-images").append("<br>");
        //$("#wine-images").append(butt);
        //$("#wine-images").append(wineDetails);
        $("#cardgrid").append(sizer);
      }
    }
  }

  //BEGINNING OF BOOK SEARCH-------------------------------------------------------------
  //USE THIS FOR SEARCH TERM
  

})

$(document).on("click", ".wineSelector", function() {
  // Find the matching book in the DB and refresh the page
  
  var userSelectedSubType = exactST[0]
  event.preventDefault();

  console.log(userSelectedSubType);

  API.getSubTypes().then(function (data) {
    // run matching logic
    console.log(data)
    for (var i = 0; i < data.length; i++) {
      // match subtype
      if (userSelectedSubType === data[i]["subType"]) {
        // extract description words from data string
        descriptionExtractString = data[i]["description"]
        // split string to array
        descriptionExtract = descriptionExtractString.split(", ")
      }
      console.log(data[i])

    }
    // for later query url manipulation
    var queryURL;
    // get NYT data for matching
    API.getNYT().then(function (data) {
      // for all books returned
      for (var j = 0; j < data.results.lists[0].books.length; j++) {
        // store the specific description and lowercase
        console.log(data.results.lists[0].books[j])

        var descriptionLower = data.results.lists[0].books[j]["description"].toLowerCase();
        bookTitle = data.results.lists[0].books[j]["title"];
        // for all wine descriptions extract 
        for (var k = 0; k < descriptionExtract.length; k++) {
          // if wine description matches a word in the book description
          console.log(descriptionExtract[k])
          if (descriptionLower.includes(descriptionExtract[k])) {
            // push to matches array
            bookOutput.push(bookTitle);
          }
        }
      }
      // Randomly pick from the bookOutput array
      var randomBookMatch = JSON.stringify(bookOutput[Math.floor(Math.random() * bookOutput.length)]);
      // Make a newHistory object
      console.log(randomBookMatch);
      // Get most recent history id
      API.getHistory().then(function (data) {
        var historyLength = data.length - 1;
        // get the ID of the most recent history entry and parse
        historyIdNum = data[historyLength]["id"]
        historyId = historyIdNum.toString();
        idString = JSON.stringify(historyId);
        userSelectedSubType = JSON.stringify(userSelectedSubType);
        var putHistory = {
          // send the wine subtype
          wineSubType: userSelectedSubType,
          // send the book title
          bookSuggestion: randomBookMatch,
          // send the previous history ID
          recentId: idString
        };
        // putHistory = JSON.stringify(putHistory);
        console.log(putHistory);
        // // putHistory = JSON.stringify(putHistory)
        // putHistory = jQuery.parseJSON(JSON.stringify(putHistory));
        $.post("/api/history", putHistory)
          // On success, run the following code
          .then(function (result) {
            // console.log(result);
            // reset page
            location.reload();
          });
      });
    });
  });
})



//ARRAYS
// var descriptionExtract;
// var bookOutput = [];
// var bookTitle = [];
// var descriptionExtractString;
// var historyId;

// handleBookSubmit is called whenever we submit a new book request



// Add event listeners to the submit and book buttons
// $submitBtn.on("click", handleMealSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);


// var handleMealSubmit = function (event) {
//   event.preventDefault();

//   var mealText = {
//     text: $mealText.val().trim(),
//   };

//   if (!(mealText.text)) {
//     alert("You must enter a meal!");
//     return;
//   }

//   API.getPairings().then(function (data) {
//     // run matching logic
//     for (var i = 0; i < data.length; i++)
//       if (mealText.text === data[i]["meal"]) {
//         winePairArray.push(data[i]["winePair"]);
//       }
//     console.log(winePairArray)
//     var mealString = JSON.stringify(mealText.text)
//     var wineString = JSON.stringify(winePairArray.join())
//     console.log(wineString)
//     console.log(winePairArray)
//     // Find the matching subtypes for the types
//     // Make a newHistory object
//     var newHistory = {
//       meal: mealString,
//       winePairings: wineString
//     };
//     console.log(newHistory);
//     $.post("/api/history", newHistory)
//       // On success, run the following code
//       .then(function (result) {
//         console.log(winePairArray);

//         // #WINE TYPE BUTTON APPEND LOGIC GOES HERE*****************
//         // #WINE TYPE BUTTON APPEND LOGIC GOES HERE*****************
//         // #WINE TYPE BUTTON APPEND LOGIC GOES HERE*****************
//         // #WINE TYPE BUTTON APPEND LOGIC GOES HERE*****************
//         // #WINE TYPE BUTTON APPEND LOGIC GOES HERE*****************
//         // #WINE TYPE BUTTON APPEND LOGIC GOES HERE*****************
//         // #WINE TYPE BUTTON APPEND LOGIC GOES HERE*****************

//       })
//   })
// };
