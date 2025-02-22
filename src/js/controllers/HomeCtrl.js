angular.module('climbingeApp')
.controller('HomeCtrl', ['$scope','$http','$location', function($scope, $http, $location) {
        // $scope.home = "This is the homepage";

        // Creating arrays and models for multiselect dropdown
        var towns = []; var selectedTownList = []; var selectedCragList = []; var selectedAreaList = []; var selectedTypeList = [];
        var selectedGradeList = []; var selectedRatingList = [];
        $scope.gradesmodel = []; $scope.townsmodel = []; $scope.cragsectorsmodel = []; $scope.areasmodel = [];
        $scope.typesmodel = []; $scope.ratingsmodel = [];
        // Variable used to display the submit after Town,Crag,Area selected
        $scope.selection = false;


        // Variables for the controlling the 1st click/mouseover of subsequenct filters
        var cragmouseoverevent = false; var areamouseoverevent = false; var typemouseoverevent = false; 
        var grademouseoverevent = false;

        // Variables for the names of the filter buttons
        $scope.townscustomTexts = {buttonDefaultText: 'Towns'}
        $scope.cragsectorscustomTexts = {buttonDefaultText: 'Crag/Sectors'}
        $scope.areascustomTexts = {buttonDefaultText: 'Areas'}
        $scope.typescustomTexts = {buttonDefaultText: 'Types'}
        $scope.gradescustomTexts = {buttonDefaultText: 'Grades'}
        $scope.ratingscustomTexts = {buttonDefaultText: 'Ratings'};


        // Dummy data for instances because CORS error happening from localhost
		var allroutes = {
            "routeList": [{"area": "Savandurga Hill", "is_active": true, "town": "Savandurga", "latitude": "12.91917", "rating": 4, "grade_french": "4c", "grade_dirty": "5.7+ X", "grade_yds": "5.7", "title": "Deepavali", "primary_key": 1, "main_city": "Bangalore", "route_type": "Trad", "pitches": 8, "crag": "Savandurga", "longitude": "77.29473"}, {"area": "The Domes Area", "is_active": true, "town": "Kanakapura", "latitude": "12.73205", "rating": 4, "grade_french": "7a+", "grade_dirty": "5.12a/b", "grade_yds": "5.12a", "title": "Vara's Got 'em Calves", "primary_key": 9, "main_city": "Bangalore", "route_type": "Trad", "pitches": 1, "crag": "Raogudlu", "longitude": "77.50034"}, {"area": "The Domes Area", "is_active": true, "town": "Kanakapura", "latitude": "12.73205", "rating": 3, "grade_french": "6c+", "grade_dirty": "5.11c/d", "grade_yds": "5.11c", "title": "Bee-Ka-Boo", "primary_key": 17, "main_city": "Bangalore", "route_type": "Trad", "pitches": 1, "crag": "Raogudlu", "longitude": "77.50034"}, {"area": "Middle Earth Area", "is_active": true, "town": "Kanakapura", "latitude": "12.73513", "rating": 3, "grade_french": "6c+", "grade_dirty": "5.11c/d", "grade_yds": "5.11c", "title": "The Jungle Harmony", "primary_key": 19, "main_city": "Bangalore", "route_type": "Trad", "pitches": 1, "crag": "Raogudlu", "longitude": "77.5005"}, {"area": "High Noon Area", "is_active": true, "town": "Kanakapura", "latitude": "12.73111", "rating": 3, "grade_french": "6a", "grade_dirty": "5.10b/c", "grade_yds": "5.10b", "title": "High Noon", "primary_key": 22, "main_city": "Bangalore", "route_type": "Trad", "pitches": 1, "crag": "Raogudlu", "longitude": "77.49903"}, {"area": "High Noon Area", "is_active": true, "town": "Kanakapura", "latitude": "12.73111", "rating": 3, "grade_french": "7c+", "grade_dirty": "5.13 V8", "grade_yds": "5.13a", "title": "Rush Hour", "primary_key": 23, "main_city": "Bangalore", "route_type": "Trad", "pitches": 1, "crag": "Raogudlu", "longitude": "77.49903"}, {"area": "The Domes Area", "is_active": true, "town": "Kanakapura", "latitude": "12.73205", "rating": 3, "grade_french": "6b+", "grade_dirty": "5.11a", "grade_yds": "5.11a", "title": "Devil's Snare", "primary_key": 24, "main_city": "Bangalore", "route_type": "Trad", "pitches": 1, "crag": "Raogudlu", "longitude": "77.50034"}, {"area": "Red Sea Area", "is_active": true, "town": "Kanakapura", "latitude": "12.73254", "rating": 3, "grade_french": "5b", "grade_dirty": "5.9", "grade_yds": "5.9", "title": "Red Sea", "primary_key": 28, "main_city": "Bangalore", "route_type": "Trad", "pitches": 1, "crag": "Raogudlu", "longitude": "77.49917"}, {"area": "Red Sea Area", "is_active": true, "town": "Kanakapura", "latitude": "12.73254", "rating": 2, "grade_french": "6a+", "grade_dirty": "5.10c R", "grade_yds": "5.10c", "title": "Indian Grit", "primary_key": 31, "main_city": "Bangalore", "route_type": "Trad", "pitches": 1, "crag": "Raogudlu", "longitude": "77.49917"}, {"area": "High Noon Area", "is_active": true, "town": "Kanakapura", "latitude": "12.73111", "rating": 2, "grade_french": "5a", "grade_dirty": "5.8", "grade_yds": "5.8", "title": "The Sweet Smell of Guano", "primary_key": 32, "main_city": "Bangalore", "route_type": "Trad", "pitches": 1, "crag": "Raogudlu", "longitude": "77.49903"}, {"area": "Magic Cookie Area", "is_active": true, "town": "Chikkaballapur", "latitude": "13.30094", "rating": 4, "grade_french": "6b", "grade_dirty": null, "grade_yds": null, "title": "Magic Cookie", "primary_key": 37, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Avathi", "longitude": "77.70949"}, {"area": "Parking Area", "is_active": true, "town": "Chikkaballapur", "latitude": "13.30094", "rating": 4, "grade_french": "6c", "grade_dirty": null, "grade_yds": null, "title": "Bye Bye", "primary_key": 38, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Avathi", "longitude": "77.70949"}, {"area": "Cave Area", "is_active": true, "town": "Chikkaballapur", "latitude": "13.30094", "rating": 4, "grade_french": "7b+", "grade_dirty": null, "grade_yds": null, "title": "Yabadabadoo", "primary_key": 39, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Avathi", "longitude": "77.70949"}, {"area": "Police Area", "is_active": true, "town": "Chikkaballapur", "latitude": "13.30094", "rating": 4, "grade_french": "7q", "grade_dirty": null, "grade_yds": null, "title": "Red bull", "primary_key": 40, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Avathi", "longitude": "77.70949"}, {"area": "Parking Area", "is_active": true, "town": "Chikkaballapur", "latitude": "13.30094", "rating": 4, "grade_french": "7b", "grade_dirty": null, "grade_yds": null, "title": "Power of boti", "primary_key": 42, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Avathi", "longitude": "77.70949"}, {"area": "Parking Area", "is_active": true, "town": "Chikkaballapur", "latitude": "13.30094", "rating": 4, "grade_french": "7a", "grade_dirty": null, "grade_yds": null, "title": "Avathi Special", "primary_key": 43, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Avathi", "longitude": "77.70949"}, {"area": "Sunset Area", "is_active": true, "town": "Chikkaballapur", "latitude": "13.30094", "rating": 4, "grade_french": "6c", "grade_dirty": null, "grade_yds": null, "title": "Defying sanity", "primary_key": 44, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Avathi", "longitude": "77.70949"}, {"area": "Police Area", "is_active": true, "town": "Chikkaballapur", "latitude": "13.30094", "rating": 4, "grade_french": "7a", "grade_dirty": null, "grade_yds": null, "title": "Aint no sunshine", "primary_key": 45, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Avathi", "longitude": "77.70949"}, {"area": "Kokkare Series", "is_active": true, "town": "Chikkaballapur", "latitude": "13.30094", "rating": 4, "grade_french": "6c+", "grade_dirty": null, "grade_yds": null, "title": "Lead speed", "primary_key": 46, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Avathi", "longitude": "77.70949"}, {"area": "Cave Area", "is_active": true, "town": "Chikkaballapur", "latitude": "13.30094", "rating": 3, "grade_french": "6a", "grade_dirty": null, "grade_yds": null, "title": "Dragon wings", "primary_key": 47, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Avathi", "longitude": "77.70949"}, {"area": "Sunset Area", "is_active": true, "town": "Chikkaballapur", "latitude": "13.30094", "rating": 3, "grade_french": "6c", "grade_dirty": null, "grade_yds": null, "title": "Chutney", "primary_key": 48, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Avathi", "longitude": "77.70949"}, {"area": "Parking Area", "is_active": true, "town": "Chikkaballapur", "latitude": "13.30094", "rating": 4, "grade_french": "6c", "grade_dirty": null, "grade_yds": null, "title": "Tree jump", "primary_key": 49, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Avathi", "longitude": "77.70949"}, {"area": "Sunset Area", "is_active": true, "town": "Chikkaballapur", "latitude": "13.30094", "rating": 3, "grade_french": "6c", "grade_dirty": null, "grade_yds": null, "title": "Coffee boulder traverse", "primary_key": 50, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Avathi", "longitude": "77.70949"}, {"area": "Parking Area", "is_active": true, "town": "Chikkaballapur", "latitude": "13.30094", "rating": 3, "grade_french": "6a", "grade_dirty": null, "grade_yds": null, "title": "Tree route", "primary_key": 51, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Avathi", "longitude": "77.70949"}, {"area": "Parking Area", "is_active": true, "town": "Chikkaballapur", "latitude": "13.30094", "rating": 3, "grade_french": "6a", "grade_dirty": null, "grade_yds": null, "title": "Row 1 sit start", "primary_key": 52, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Avathi", "longitude": "77.70949"}, {"area": "Kokkare Series", "is_active": true, "town": "Chikkaballapur", "latitude": "13.30094", "rating": 3, "grade_french": "7a", "grade_dirty": null, "grade_yds": null, "title": "Dhillan's warm up", "primary_key": 53, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Avathi", "longitude": "77.70949"}, {"area": "Sunset Area", "is_active": true, "town": "Chikkaballapur", "latitude": "13.30094", "rating": 3, "grade_french": "6a", "grade_dirty": null, "grade_yds": null, "title": "Obiwan", "primary_key": 54, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Avathi", "longitude": "77.70949"}, {"area": "Man Bun Area", "is_active": true, "town": "Chikkaballapur", "latitude": "13.30094", "rating": 4, "grade_french": "6c+", "grade_dirty": null, "grade_yds": null, "title": "Man Bun", "primary_key": 55, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Avathi", "longitude": "77.70949"}, {"area": "Sector A", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "6c+", "grade_dirty": null, "grade_yds": null, "title": "Deadly crazy fall ", "primary_key": 64, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector B", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "7b+", "grade_dirty": null, "grade_yds": null, "title": "Scramble ", "primary_key": 63, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector A", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "6c+", "grade_dirty": null, "grade_yds": null, "title": "Philip boulder ", "primary_key": 61, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector D", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "5c+", "grade_dirty": null, "grade_yds": null, "title": "Krishna high ball ", "primary_key": 62, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector D", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "6a", "grade_dirty": null, "grade_yds": null, "title": "That insect ", "primary_key": 60, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector A", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "7a", "grade_dirty": null, "grade_yds": null, "title": "Bum scraper ", "primary_key": 59, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector B", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "6b+", "grade_dirty": null, "grade_yds": null, "title": "Step rock", "primary_key": 58, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector A", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "7b", "grade_dirty": null, "grade_yds": null, "title": "Lemon Tree ", "primary_key": 57, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector B", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "7b", "grade_dirty": null, "grade_yds": null, "title": "Ultraflash ", "primary_key": 56, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Temple area", "is_active": true, "town": "Chikkaballapur", "latitude": "13.30094", "rating": 3, "grade_french": "6a", "grade_dirty": null, "grade_yds": null, "title": "Gow Wow", "primary_key": 41, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Avathi", "longitude": "77.70949"}, {"area": "Middle Earth Area", "is_active": true, "town": "Kanakapura", "latitude": "12.73513", "rating": 2, "grade_french": "6c", "grade_dirty": "5.11b/c", "grade_yds": "5.11b", "title": "Chris Shawarma", "primary_key": 33, "main_city": "Bangalore", "route_type": "Trad", "pitches": 1, "crag": "Raogudlu", "longitude": "77.5005"}, {"area": "Middle Earth Area", "is_active": true, "town": "Kanakapura", "latitude": "12.73513", "rating": 4, "grade_french": "7a", "grade_dirty": "5.11d R", "grade_yds": "5.11d", "title": "The Bare Necessities", "primary_key": 8, "main_city": "Bangalore", "route_type": "Trad", "pitches": 1, "crag": "Raogudlu", "longitude": "77.5005"}, {"area": "BM Betta", "is_active": true, "town": "Kanakapura", "latitude": "12.56142", "rating": 3, "grade_french": "4b", "grade_dirty": "5.6 R", "grade_yds": "5.6", "title": "Cicada Uprising", "primary_key": 13, "main_city": "Bangalore", "route_type": "Trad", "pitches": 6, "crag": "BM Betta", "longitude": "77.37146"}, {"area": "Left hill", "is_active": true, "town": "Ramanagara", "latitude": "12.73532", "rating": 4, "grade_french": "6a+", "grade_dirty": "5.10c", "grade_yds": "5.10c", "title": "Boom Shankar", "primary_key": 5, "main_city": "Bangalore", "route_type": "Trad", "pitches": 2, "crag": "Cheluvarayaswamy Betta", "longitude": "77.25714"}, {"area": "BM Betta", "is_active": true, "town": "Kanakapura", "latitude": "12.56142", "rating": 4, "grade_french": "5b", "grade_dirty": "5.9+ R", "grade_yds": "5.9", "title": "High Lonesome", "primary_key": 4, "main_city": "Bangalore", "route_type": "Trad", "pitches": 7, "crag": "BM Betta", "longitude": "77.37146"}, {"area": "Elba Rock", "is_active": true, "town": "Ramanagara", "latitude": "12.69528", "rating": 2, "grade_french": "5a", "grade_dirty": "5.1", "grade_yds": "2a", "title": "Back for More", "primary_key": 29, "main_city": "Bangalore", "route_type": "Trad", "pitches": 1, "crag": "Achalu", "longitude": "77.28585"}, {"area": "Left side wall", "is_active": true, "town": "Varlakonda", "latitude": "13.63655", "rating": 2, "grade_french": "5c", "grade_dirty": "5.10a", "grade_yds": "5.10a", "title": "Giant Robot", "primary_key": 36, "main_city": "Bangalore", "route_type": "Sport", "pitches": 1, "crag": "Varlakonda", "longitude": "77.78353"}, {"area": "Left side wall", "is_active": true, "town": "Varlakonda", "latitude": "13.63655", "rating": 2, "grade_french": "5b", "grade_dirty": "5.9", "grade_yds": "5.9", "title": "Limestone Hack", "primary_key": 35, "main_city": "Bangalore", "route_type": "Sport", "pitches": 1, "crag": "Varlakonda", "longitude": "77.78353"}, {"area": "Left side wall", "is_active": true, "town": "Varlakonda", "latitude": "13.63655", "rating": 2, "grade_french": "6b+", "grade_dirty": "5.11a", "grade_yds": "5.11a", "title": "Feel the flow", "primary_key": 34, "main_city": "Bangalore", "route_type": "Sport", "pitches": 1, "crag": "Varlakonda", "longitude": "77.78353"}, {"area": "Madhepurabetta", "is_active": true, "town": "Ramanagara", "latitude": "12.77183", "rating": 2, "grade_french": "7a", "grade_dirty": "5.11d", "grade_yds": "5.11d", "title": "Sankranti", "primary_key": 30, "main_city": "Bangalore", "route_type": "Sport", "pitches": 2, "crag": "Madhepurabetta", "longitude": "77.32158"}, {"area": "Achalu Upper Wall", "is_active": true, "town": "Ramanagara", "latitude": "12.6931", "rating": 3, "grade_french": "5c", "grade_dirty": "5.10+ R", "grade_yds": "5.10a", "title": "Autobahn", "primary_key": 27, "main_city": "Bangalore", "route_type": "Sport", "pitches": 3, "crag": "Achalu", "longitude": "77.28927"}, {"area": "Left side wall", "is_active": true, "town": "Varlakonda", "latitude": "13.63655", "rating": 3, "grade_french": "6b+", "grade_dirty": "5.11a", "grade_yds": "5.11a", "title": "P3", "primary_key": 26, "main_city": "Bangalore", "route_type": "Sport", "pitches": 1, "crag": "Varlakonda", "longitude": "77.78353"}, {"area": "Gethnaa Area", "is_active": true, "town": "Ramanagara", "latitude": "12.75067", "rating": 3, "grade_french": "7b", "grade_dirty": "5.12b", "grade_yds": "5.12b", "title": "Mango Snack", "primary_key": 25, "main_city": "Bangalore", "route_type": "Sport", "pitches": 1, "crag": "Gethnaa Area", "longitude": "77.31883"}, {"area": "Rasta Cafe", "is_active": true, "town": "Ramanagara ", "latitude": "12.77077", "rating": 3, "grade_french": "6a", "grade_dirty": "5.10b/c", "grade_yds": "5.10b", "title": "Prana", "primary_key": 21, "main_city": "Bangalore", "route_type": "Sport", "pitches": 1, "crag": "Rasta Cafe", "longitude": "77.32467"}, {"area": "Achalu South Wall", "is_active": true, "town": "Ramanagara", "latitude": "12.69176", "rating": 3, "grade_french": "7a", "grade_dirty": "5.11d", "grade_yds": "5.11d", "title": "Sab Kuch Milega", "primary_key": 20, "main_city": "Bangalore", "route_type": "Sport", "pitches": 3, "crag": "Achalu", "longitude": "77.29015"}, {"area": "Savandurga Hill", "is_active": true, "town": "Savandurga", "latitude": "12.91917", "rating": 3, "grade_french": "4c", "grade_dirty": "5.7 PG13", "grade_yds": "5.7", "title": "Cloud Nine", "primary_key": 18, "main_city": "Bangalore", "route_type": "Sport", "pitches": 9, "crag": "Savandurga", "longitude": "77.29473"}, {"area": "Banyan Tree Pillar", "is_active": true, "town": "Savandurga", "latitude": "12.90633", "rating": 3, "grade_french": "6a", "grade_dirty": "5.10b PG13", "grade_yds": "5.10b", "title": "Khoday Neer", "primary_key": 16, "main_city": "Bangalore", "route_type": "Trad", "pitches": 3, "crag": "Savandurga", "longitude": "77.28962"}, {"area": "Banyan Tree Pillar", "is_active": true, "town": "Savandurga", "latitude": "12.90633", "rating": 3, "grade_french": "6a", "grade_dirty": "5.10b", "grade_yds": "5.10b", "title": "Cane Toad", "primary_key": 15, "main_city": "Bangalore", "route_type": "Trad", "pitches": 1, "crag": "Savandurga", "longitude": "77.28962"}, {"area": "Elba Rock", "is_active": true, "town": "Ramanagara", "latitude": "12.69528", "rating": 3, "grade_french": "5c", "grade_dirty": "5.10a/b", "grade_yds": "5.10a", "title": "Rapide Coupe", "primary_key": 14, "main_city": "Bangalore", "route_type": "Sport", "pitches": 1, "crag": "Achalu", "longitude": "77.28585"}, {"area": "Achalu South Wall", "is_active": true, "town": "Ramanagara", "latitude": "12.69176", "rating": 3, "grade_french": "5b", "grade_dirty": "5.9", "grade_yds": "5.9", "title": "Broomberg", "primary_key": 12, "main_city": "Bangalore", "route_type": "Sport", "pitches": 4, "crag": "Achalu", "longitude": "77.29015"}, {"area": "Banyan Tree Pillar", "is_active": true, "town": "Savandurga", "latitude": "12.90633", "rating": 3, "grade_french": "4c", "grade_dirty": "5.7+", "grade_yds": "5.7", "title": "To Bee or Not to Bee", "primary_key": 11, "main_city": "Bangalore", "route_type": "Trad", "pitches": 3, "crag": "Savandurga", "longitude": "77.28962"}, {"area": "Savandurga Hill", "is_active": true, "town": "Savandurga", "latitude": "12.91917", "rating": 4, "grade_french": "5c", "grade_dirty": "5.10a PG13", "grade_yds": "5.10a", "title": "Beladingalu", "primary_key": 10, "main_city": "Bangalore", "route_type": "Trad", "pitches": 7, "crag": "Savandurga", "longitude": "77.29473"}, {"area": "Rasta Cafe", "is_active": true, "town": "Ramanagara", "latitude": "12.77077", "rating": 4, "grade_french": "6b+", "grade_dirty": "5.11a PG13", "grade_yds": "5.11a", "title": "Veer Madrasi", "primary_key": 7, "main_city": "Bangalore", "route_type": "Sport", "pitches": 1, "crag": "Rasta Cafe", "longitude": "77.32467"}, {"area": "Cave area", "is_active": true, "town": "Avathi", "latitude": "13.30094", "rating": 4, "grade_french": "7b", "grade_dirty": "5.12b/c", "grade_yds": "5.12b", "title": "Yabadabadoo", "primary_key": 6, "main_city": "Bangalore", "route_type": "Trad", "pitches": 1, "crag": "Avathi", "longitude": "77.70949"}, {"area": "Banyan Tree Pillar", "is_active": true, "town": "Savandurga", "latitude": "12.90633", "rating": 4, "grade_french": "6b", "grade_dirty": "5.10d PG13", "grade_yds": "5.10d", "title": "Bombs Away", "primary_key": 3, "main_city": "Bangalore", "route_type": "Trad", "pitches": 1, "crag": "Savandurga", "longitude": "77.28962"}, {"area": "Banyan Tree Pillar", "is_active": true, "town": "Savandurga", "latitude": "12.90633", "rating": 4, "grade_french": "5b", "grade_dirty": "5.9", "grade_yds": "5.9", "title": "Louvre", "primary_key": 2, "main_city": "Bangalore", "route_type": "Trad", "pitches": 2, "crag": "Savandurga", "longitude": "77.28962"}], "townList": ["Avathi", "Bangalore", "Chikkaballapur", "Kanakapura", "Ramanagara", "Savandurga", "Varlakonda"]
        };

        var arearoutes = {"routeTypeList": ["Boulder", "Sport", "Trad"], "pitchesList": [1, 2, 3, 4, 6, 7, 8, 9], "ratingList": [2, 3, 4], "routeList": [{"area": "Savandurga Hill", "is_active": true, "town": "Savandurga", "latitude": "12.91917", "rating": 4, "grade_french": "4c", "grade_dirty": "5.7+ X", "grade_yds": "5.7", "title": "Deepavali", "primary_key": 1, "main_city": "Bangalore", "route_type": "Trad", "pitches": 8, "crag": "Savandurga", "longitude": "77.29473"}, {"area": "Savandurga Hill", "is_active": true, "town": "Savandurga", "latitude": "12.91917", "rating": 3, "grade_french": "4c", "grade_dirty": "5.7 PG13", "grade_yds": "5.7", "title": "Cloud Nine", "primary_key": 18, "main_city": "Bangalore", "route_type": "Sport", "pitches": 9, "crag": "Savandurga", "longitude": "77.29473"}, {"area": "Savandurga Hill", "is_active": true, "town": "Savandurga", "latitude": "12.91917", "rating": 4, "grade_french": "5c", "grade_dirty": "5.10a PG13", "grade_yds": "5.10a", "title": "Beladingalu", "primary_key": 10, "main_city": "Bangalore", "route_type": "Trad", "pitches": 7, "crag": "Savandurga", "longitude": "77.29473"}, {"area": "Cave area", "is_active": true, "town": "Avathi", "latitude": "13.30094", "rating": 4, "grade_french": "7b", "grade_dirty": "5.12b/c", "grade_yds": "5.12b", "title": "Yabadabadoo", "primary_key": 6, "main_city": "Bangalore", "route_type": "Trad", "pitches": 1, "crag": "Avathi", "longitude": "77.70949"}]};
        
        var cragroutes = {"areaList": ["Banyan Tree Pillar", "Cave area", "Savandurga Hill", "Sector A", "Sector B", "Sector D"], "routeList": [{"area": "Savandurga Hill", "is_active": true, "town": "Savandurga", "latitude": "12.91917", "rating": 4, "grade_french": "4c", "grade_dirty": "5.7+ X", "grade_yds": "5.7", "title": "Deepavali", "primary_key": 1, "main_city": "Bangalore", "route_type": "Trad", "pitches": 8, "crag": "Savandurga", "longitude": "77.29473"}, {"area": "Sector A", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "6c+", "grade_dirty": null, "grade_yds": null, "title": "Deadly crazy fall ", "primary_key": 64, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector B", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "7b+", "grade_dirty": null, "grade_yds": null, "title": "Scramble ", "primary_key": 63, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector A", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "6c+", "grade_dirty": null, "grade_yds": null, "title": "Philip boulder ", "primary_key": 61, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector D", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "5c+", "grade_dirty": null, "grade_yds": null, "title": "Krishna high ball ", "primary_key": 62, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector D", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "6a", "grade_dirty": null, "grade_yds": null, "title": "That insect ", "primary_key": 60, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector A", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "7a", "grade_dirty": null, "grade_yds": null, "title": "Bum scraper ", "primary_key": 59, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector B", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "6b+", "grade_dirty": null, "grade_yds": null, "title": "Step rock", "primary_key": 58, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector A", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "7b", "grade_dirty": null, "grade_yds": null, "title": "Lemon Tree ", "primary_key": 57, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector B", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "7b", "grade_dirty": null, "grade_yds": null, "title": "Ultraflash ", "primary_key": 56, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Savandurga Hill", "is_active": true, "town": "Savandurga", "latitude": "12.91917", "rating": 3, "grade_french": "4c", "grade_dirty": "5.7 PG13", "grade_yds": "5.7", "title": "Cloud Nine", "primary_key": 18, "main_city": "Bangalore", "route_type": "Sport", "pitches": 9, "crag": "Savandurga", "longitude": "77.29473"}, {"area": "Banyan Tree Pillar", "is_active": true, "town": "Savandurga", "latitude": "12.90633", "rating": 3, "grade_french": "6a", "grade_dirty": "5.10b PG13", "grade_yds": "5.10b", "title": "Khoday Neer", "primary_key": 16, "main_city": "Bangalore", "route_type": "Trad", "pitches": 3, "crag": "Savandurga", "longitude": "77.28962"}, {"area": "Banyan Tree Pillar", "is_active": true, "town": "Savandurga", "latitude": "12.90633", "rating": 3, "grade_french": "6a", "grade_dirty": "5.10b", "grade_yds": "5.10b", "title": "Cane Toad", "primary_key": 15, "main_city": "Bangalore", "route_type": "Trad", "pitches": 1, "crag": "Savandurga", "longitude": "77.28962"}, {"area": "Banyan Tree Pillar", "is_active": true, "town": "Savandurga", "latitude": "12.90633", "rating": 3, "grade_french": "4c", "grade_dirty": "5.7+", "grade_yds": "5.7", "title": "To Bee or Not to Bee", "primary_key": 11, "main_city": "Bangalore", "route_type": "Trad", "pitches": 3, "crag": "Savandurga", "longitude": "77.28962"}, {"area": "Savandurga Hill", "is_active": true, "town": "Savandurga", "latitude": "12.91917", "rating": 4, "grade_french": "5c", "grade_dirty": "5.10a PG13", "grade_yds": "5.10a", "title": "Beladingalu", "primary_key": 10, "main_city": "Bangalore", "route_type": "Trad", "pitches": 7, "crag": "Savandurga", "longitude": "77.29473"}, {"area": "Cave area", "is_active": true, "town": "Avathi", "latitude": "13.30094", "rating": 4, "grade_french": "7b", "grade_dirty": "5.12b/c", "grade_yds": "5.12b", "title": "Yabadabadoo", "primary_key": 6, "main_city": "Bangalore", "route_type": "Trad", "pitches": 1, "crag": "Avathi", "longitude": "77.70949"}, {"area": "Banyan Tree Pillar", "is_active": true, "town": "Savandurga", "latitude": "12.90633", "rating": 4, "grade_french": "6b", "grade_dirty": "5.10d PG13", "grade_yds": "5.10d", "title": "Bombs Away", "primary_key": 3, "main_city": "Bangalore", "route_type": "Trad", "pitches": 1, "crag": "Savandurga", "longitude": "77.28962"}, {"area": "Banyan Tree Pillar", "is_active": true, "town": "Savandurga", "latitude": "12.90633", "rating": 4, "grade_french": "5b", "grade_dirty": "5.9", "grade_yds": "5.9", "title": "Louvre", "primary_key": 2, "main_city": "Bangalore", "route_type": "Trad", "pitches": 2, "crag": "Savandurga", "longitude": "77.28962"}]};

        var townroutes = {"cragList": ["Avathi", "Savandurga", "Turahalli"], "routeList": [{"area": "Savandurga Hill", "is_active": true, "town": "Savandurga", "latitude": "12.91917", "rating": 4, "grade_french": "4c", "grade_dirty": "5.7+ X", "grade_yds": "5.7", "title": "Deepavali", "primary_key": 1, "main_city": "Bangalore", "route_type": "Trad", "pitches": 8, "crag": "Savandurga", "longitude": "77.29473"}, {"area": "Sector A", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "6c+", "grade_dirty": null, "grade_yds": null, "title": "Deadly crazy fall ", "primary_key": 64, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector B", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "7b+", "grade_dirty": null, "grade_yds": null, "title": "Scramble ", "primary_key": 63, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector A", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "6c+", "grade_dirty": null, "grade_yds": null, "title": "Philip boulder ", "primary_key": 61, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector D", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "5c+", "grade_dirty": null, "grade_yds": null, "title": "Krishna high ball ", "primary_key": 62, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector D", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "6a", "grade_dirty": null, "grade_yds": null, "title": "That insect ", "primary_key": 60, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector A", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "7a", "grade_dirty": null, "grade_yds": null, "title": "Bum scraper ", "primary_key": 59, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector B", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "6b+", "grade_dirty": null, "grade_yds": null, "title": "Step rock", "primary_key": 58, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector A", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "7b", "grade_dirty": null, "grade_yds": null, "title": "Lemon Tree ", "primary_key": 57, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Sector B", "is_active": true, "town": "Bangalore", "latitude": "12.885", "rating": 4, "grade_french": "7b", "grade_dirty": null, "grade_yds": null, "title": "Ultraflash ", "primary_key": 56, "main_city": "Bangalore", "route_type": "Boulder", "pitches": null, "crag": "Turahalli", "longitude": "77.525"}, {"area": "Savandurga Hill", "is_active": true, "town": "Savandurga", "latitude": "12.91917", "rating": 3, "grade_french": "4c", "grade_dirty": "5.7 PG13", "grade_yds": "5.7", "title": "Cloud Nine", "primary_key": 18, "main_city": "Bangalore", "route_type": "Sport", "pitches": 9, "crag": "Savandurga", "longitude": "77.29473"}, {"area": "Banyan Tree Pillar", "is_active": true, "town": "Savandurga", "latitude": "12.90633", "rating": 3, "grade_french": "6a", "grade_dirty": "5.10b PG13", "grade_yds": "5.10b", "title": "Khoday Neer", "primary_key": 16, "main_city": "Bangalore", "route_type": "Trad", "pitches": 3, "crag": "Savandurga", "longitude": "77.28962"}, {"area": "Banyan Tree Pillar", "is_active": true, "town": "Savandurga", "latitude": "12.90633", "rating": 3, "grade_french": "6a", "grade_dirty": "5.10b", "grade_yds": "5.10b", "title": "Cane Toad", "primary_key": 15, "main_city": "Bangalore", "route_type": "Trad", "pitches": 1, "crag": "Savandurga", "longitude": "77.28962"}, {"area": "Banyan Tree Pillar", "is_active": true, "town": "Savandurga", "latitude": "12.90633", "rating": 3, "grade_french": "4c", "grade_dirty": "5.7+", "grade_yds": "5.7", "title": "To Bee or Not to Bee", "primary_key": 11, "main_city": "Bangalore", "route_type": "Trad", "pitches": 3, "crag": "Savandurga", "longitude": "77.28962"}, {"area": "Savandurga Hill", "is_active": true, "town": "Savandurga", "latitude": "12.91917", "rating": 4, "grade_french": "5c", "grade_dirty": "5.10a PG13", "grade_yds": "5.10a", "title": "Beladingalu", "primary_key": 10, "main_city": "Bangalore", "route_type": "Trad", "pitches": 7, "crag": "Savandurga", "longitude": "77.29473"}, {"area": "Cave area", "is_active": true, "town": "Avathi", "latitude": "13.30094", "rating": 4, "grade_french": "7b", "grade_dirty": "5.12b/c", "grade_yds": "5.12b", "title": "Yabadabadoo", "primary_key": 6, "main_city": "Bangalore", "route_type": "Trad", "pitches": 1, "crag": "Avathi", "longitude": "77.70949"}, {"area": "Banyan Tree Pillar", "is_active": true, "town": "Savandurga", "latitude": "12.90633", "rating": 4, "grade_french": "6b", "grade_dirty": "5.10d PG13", "grade_yds": "5.10d", "title": "Bombs Away", "primary_key": 3, "main_city": "Bangalore", "route_type": "Trad", "pitches": 1, "crag": "Savandurga", "longitude": "77.28962"}, {"area": "Banyan Tree Pillar", "is_active": true, "town": "Savandurga", "latitude": "12.90633", "rating": 4, "grade_french": "5b", "grade_dirty": "5.9", "grade_yds": "5.9", "title": "Louvre", "primary_key": 2, "main_city": "Bangalore", "route_type": "Trad", "pitches": 2, "crag": "Savandurga", "longitude": "77.28962"}]};

        var typeroutes = {"routeList": [{"area": "Savandurga Hill", "is_active": true, "town": "Savandurga", "latitude": "12.91917", "rating": 4, "grade_french": "4c", "grade_dirty": "5.7+ X", "grade_yds": "5.7", "title": "Deepavali", "primary_key": 1, "main_city": "Bangalore", "route_type": "Trad", "pitches": 8, "crag": "Savandurga", "longitude": "77.29473"}, {"area": "Savandurga Hill", "is_active": true, "town": "Savandurga", "latitude": "12.91917", "rating": 4, "grade_french": "5c", "grade_dirty": "5.10a PG13", "grade_yds": "5.10a", "title": "Beladingalu", "primary_key": 10, "main_city": "Bangalore", "route_type": "Trad", "pitches": 7, "crag": "Savandurga", "longitude": "77.29473"}, {"area": "Cave area", "is_active": true, "town": "Avathi", "latitude": "13.30094", "rating": 4, "grade_french": "7b", "grade_dirty": "5.12b/c", "grade_yds": "5.12b", "title": "Yabadabadoo", "primary_key": 6, "main_city": "Bangalore", "route_type": "Trad", "pitches": 1, "crag": "Avathi", "longitude": "77.70949"}], "gradeFrenchList": ["4b", "4c", "5a", "5b", "5c", "6a", "6a+", "6b", "6b+", "6c", "6c+", "7a", "7a+", "7b", "7c+"]};

        var graderoutes = {'routeList': [{'area': 'Savandurga Hill', 'is_active': true, 'town': 'Savandurga', 'latitude': '12.91917', 'rating': 4, 'grade_french': '4c', 'grade_dirty': '5.7+ X', 'grade_yds': '5.7', 'title': 'Deepavali', 'primary_key': 1, 'main_city': 'Bangalore', 'route_type': 'Trad', 'pitches': 8, 'crag': 'Savandurga', 'longitude': '77.29473'}, {'area': 'Savandurga Hill', 'is_active': true, 'town': 'Savandurga', 'latitude': '12.91917', 'rating': 4, 'grade_french': '5c', 'grade_dirty': '5.10a PG13', 'grade_yds': '5.10a', 'title': 'Beladingalu', 'primary_key': 10, 'main_city': 'Bangalore', 'route_type': 'Trad', 'pitches': 7, 'crag': 'Savandurga', 'longitude': '77.29473'}]};
        var ratingroutes = {'routeList': [{'area': 'Savandurga Hill', 'is_active': true, 'town': 'Savandurga', 'latitude': '12.91917', 'rating': 4, 'grade_french': '4c', 'grade_dirty': '5.7+ X', 'grade_yds': '5.7', 'title': 'Deepavali', 'primary_key': 1, 'main_city': 'Bangalore', 'route_type': 'Trad', 'pitches': 8, 'crag': 'Savandurga', 'longitude': '77.29473'}, {'area': 'Savandurga Hill', 'is_active': true, 'town': 'Savandurga', 'latitude': '12.91917', 'rating': 4, 'grade_french': '5c', 'grade_dirty': '5.10a PG13', 'grade_yds': '5.10a', 'title': 'Beladingalu', 'primary_key': 10, 'main_city': 'Bangalore', 'route_type': 'Trad', 'pitches': 7, 'crag': 'Savandurga', 'longitude': '77.29473'}]};



        // Array for populating the ratings multiselect dropdown
        var ratings = [1,2,3,4,5]        
        ratings = ratings.map(x => {
                            return({id:ratings.indexOf(x) + 1,label: x});
                            });
        $scope.ratingsdata = ratings;
        $scope.ratingssettings = {}; 

        // Populating the towns dropdown
        var req = {
        	method: 'POST',
        	url: 'http://139.59.22.177:8080/AVATHI_API/rest/ajaxRoute/getRouteList',
        	data: {"route":"routeList"},
        	headers: {'Content-Type': 'application/json; charset=utf-8'}
        };
        $http(req).then(function success(response){
	        $scope.statusval = "Post Data Submitted Successfully!";
            var towns = response.data.townList;
            $scope.townsmodel = [];
            towns = towns.map(x => {
                                return({id:towns.indexOf(x) + 1,label: x});
                                });
            $scope.townsdata = towns;
            $scope.townssettings = {}; 
        },
        function(response){
            towns = allroutes.townList;
            $scope.townsmodel = [];
            towns = towns.map(x => {
                                return({id:towns.indexOf(x) + 1,label: x});
                                });
            $scope.townsdata = towns;
            $scope.townssettings = {}; 
        });
        // Populating the crag sectors dropdown
        $scope.populatecragsectors = function(){
            if (cragmouseoverevent == false & $scope.townsmodel.length != 0){
                var a = $scope.townsmodel;
                for (var key in a){
                    selectedTownList.push(a[key]['label'])}

                var req = {
                    method: 'POST',
                    url: 'http://139.59.22.177:8080/AVATHI_API/rest/ajaxRoute/getRouteListByTown',
                    data: {"townReqList" : selectedTownList},
                    headers: {'Content-Type': 'application/json; charset=utf-8'}
                };
                $http(req).then(function success(response){
                $scope.statusval = "Post Data Submitted Successfully!";
                var crags = response.data.cragList;
                $scope.cragsectorsmodel = [];
                crags = crags.map(x => {
                                    return({id:crags.indexOf(x) + 1,label: x});
                                    });
                $scope.cragsectorsdata = crags;
                $scope.cragsectorssettings = {}; 
                cragmouseoverevent = true;
                },
                function(response){
                    crags = townroutes.cragList;
                    $scope.cragsectorsmodel = [];
                    crags = crags.map(x => {
                                        return({id:crags.indexOf(x) + 1,label: x});
                                        });
                    $scope.cragsectorsdata = crags;
                    $scope.cragsectorssettings = {}; 
                    cragmouseoverevent = true;
                });
            }
        };
        // Populating the area dropdown
        $scope.populateareas = function(){
            if (areamouseoverevent == false & $scope.cragsectorsmodel.length != 0){
                var a = $scope.cragsectorsmodel;
                for (var key in a){
                    selectedCragList.push(a[key]['label'])}

                var req = {
                    method: 'POST',
                    url: "http://139.59.22.177:8080/AVATHI_API/rest/ajaxRoute/getRouteListByCrag",
                    data: {"townReqList" : selectedTownList, "cragReqList": selectedCragList},
                    headers: {'Content-Type': 'application/json; charset=utf-8'}
                };
                $http(req).then(function success(response){
                $scope.statusval = "Post Data Submitted Successfully!";
                var areas = response.data.areaList;
                $scope.areasmodel = [];
                areas = areas.map(x => {
                                    return({id:areas.indexOf(x) + 1,label: x});
                                    });
                $scope.areasdata = areas;
                $scope.areassettings = {}; 
                areamouseoverevent = true;
                },
                function(response){
                    areas = cragroutes.areaList;
                    $scope.areasmodel = [];
                    areas = areas.map(x => {
                                        return({id:areas.indexOf(x) + 1,label: x});
                                        });
                    $scope.areasdata = areas;
                    $scope.areassettings = {}; 
                    areamouseoverevent = true;
                    $scope.selection = true;
                });
            }
        };
        // Populating the types dropdown        
        $scope.populatetypes = function(){
            if (typemouseoverevent == false & $scope.areasmodel.length != 0){
                var a = $scope.areasmodel;
                for (var key in a){
                    selectedAreaList.push(a[key]['label'])}

                var req = {
                    method: 'POST',
                    url: "http://139.59.22.177:8080/AVATHI_API/rest/ajaxRoute/getRouteListByArea",
                    data: {"townReqList" : selectedTownList, "cragReqList": selectedCragList,
                         "areaReqList": selectedAreaList},
                    headers: {'Content-Type': 'application/json; charset=utf-8'}
                };
                $http(req).then(function success(response){
                $scope.statusval = "Post Data Submitted Successfully!";
                var types = response.data.routeTypeList;
                $scope.typesmodel = [];
                types = types.map(x => {
                                    return({id:types.indexOf(x) + 1,label: x});
                                    });
                $scope.typesdata = types;
                $scope.typessettings = { selectionLimit: 1, }; 
                typemouseoverevent = true;
                },
                function(response){
                    types = arearoutes.routeTypeList;
                    $scope.typesmodel = [];
                    types = types.map(x => {
                                        return({id:types.indexOf(x) + 1,label: x});
                                        });
                    $scope.typesdata = types;
                    $scope.typessettings = { selectionLimit: 1, }; 
                    typemouseoverevent = true;
                });
            }
        };
        // Populating the grades dropdown
        $scope.populategrades = function(){
            if (grademouseoverevent == false & $scope.typesmodel.length != 0){
                var a = $scope.typesmodel;
                for (var key in a){
                    selectedTypeList.push(a[key]['label'])}

                var req = {
                    method: 'POST',
                    url: "http://139.59.22.177:8080/AVATHI_API/rest/ajaxRoute/getRouteListByType",
                    data: {"townReqList" : selectedTownList, "cragReqList": selectedCragList,
                         "areaReqList": selectedAreaList, "type": selectedTypeList},
                    headers: {'Content-Type': 'application/json; charset=utf-8'}
                };
                $http(req).then(function success(response){
                $scope.statusval = "Post Data Submitted Successfully!";
                var grades = response.data.gradeFrenchList;
                $scope.gradesmodel = [];
                grades = grades.map(x => {
                                    return({id:grades.indexOf(x) + 1,label: x});
                                    });
                $scope.gradesdata = grades;
                $scope.gradessettings = {}; 
                grademouseoverevent = true;
                },
                function(response){
                    grades = typeroutes.gradeFrenchList;
                    $scope.gradesmodel = [];
                    grades = grades.map(x => {
                                        return({id:grades.indexOf(x) + 1,label: x});
                                        });
                    $scope.gradesdata = grades;
                    $scope.gradessettings = {}; 
                    grademouseoverevent = true;
                });
            }
        };
        // Populating the tables
        $scope.populatetable =function(){
            try {
                var a = $scope.townsmodel;
                for (var key in a){
                    selectedTownList.push(a[key]['label'])}
                }    
            catch {}
            try {
                var a = $scope.cragsectorsmodel;
                for (var key in a){
                    selectedCragList.push(a[key]['label'])}    
            }
            catch {}
            try {
                var a = $scope.areasmodel;
                for (var key in a){
                    selectedAreaList.push(a[key]['label'])}    
            }
            catch {}
            try {
                var a = $scope.typesmodel;
                for (var key in a){
                    selectedTypeList.push(a[key]['label'])}    
            }
            catch {}
            try {
                var a = $scope.gradesmodel;
                for (var key in a){
                    selectedGradeList.push(a[key]['label'])}    
            }
            catch {}
            try {
                var a = $scope.ratingsmodel;
                for (var key in a){
                    selectedRatingList.push(a[key]['label'])}
            }
            catch {}            
            if ($scope.ratingsmodel.length>0){
                if($scope.gradesmodel.length>0){
                    var req = {
                    method: 'POST',
                    url: "http://139.59.22.177:8080/AVATHI_API/rest/ajaxRoute/getRouteListByRatingAndPitches",
                    data: {"townReqList" : selectedTownList, "cragReqList": selectedCragList,
                         "areaReqList": selectedAreaList, "type": selectedTypeList[0], "gradeReqList" :selectedGradeList,
                            "RatingReqList": selectedRatingList},
                    headers: {'Content-Type': 'application/json; charset=utf-8'}
                    };
                    $http(req).then(function success(response){
                    $scope.statusval = "Post Data Submitted Successfully!";
                    $scope.routes = response.data.routeList;
                                    },
                    function(response){
                        $scope.routes = ratingroutes.routeList;
                    });
                }
                else{
                    var req = {
                    method: 'POST',
                    url: "http://139.59.22.177:8080/AVATHI_API/rest/ajaxRoute/getRouteListByRatingAndPitches",
                    data: {"townReqList" : selectedTownList, "cragReqList": selectedCragList,
                         "areaReqList": selectedAreaList, "RatingReqList": selectedRatingList},
                    headers: {'Content-Type': 'application/json; charset=utf-8'}
                    };
                    $http(req).then(function success(response){
                    $scope.statusval = "Post Data Submitted Successfully!";
                    $scope.routes = response.data.routeList;
                                    },
                    function(response){
                        $scope.routes = ratingroutes.routeList;
                    });
                }
            }
            else if($scope.townsmodel.length>0 & $scope.cragsectorsmodel.length>0 & $scope.areasmodel.length>0
             & $scope.typesmodel.length>0 & $scope.gradesmodel.length>0){
                var req = {
                    method: 'POST',
                    url: "http://139.59.22.177:8080/AVATHI_API/rest/ajaxRoute/getRouteListByGrade",
                    data: {"townReqList" : selectedTownList, "cragReqList": selectedCragList,
                         "areaReqList": selectedAreaList,"type": selectedTypeList[0], "gradeReqList" :selectedGradeList},
                    headers: {'Content-Type': 'application/json; charset=utf-8'}
                };
                $http(req).then(function success(response){
                $scope.statusval = "Post Data Submitted Successfully!";
                $scope.routes = response.data.routeList;
                                },
                function(response){
                    $scope.routes = graderoutes.routeList;
                });
            }
            else if($scope.townsmodel.length>0 & $scope.cragsectorsmodel.length>0 & $scope.areasmodel.length>0 
                & $scope.typesmodel.length>0){
                var req = {
                    method: 'POST',
                    url: "http://139.59.22.177:8080/AVATHI_API/rest/ajaxRoute/getRouteListByType",
                    data: {"townReqList" : selectedTownList, "cragReqList": selectedCragList,
                         "areaReqList": selectedAreaList, "type": selectedTypeList[0]},
                    headers: {'Content-Type': 'application/json; charset=utf-8'}
                };
                $http(req).then(function success(response){
                $scope.statusval = "Post Data Submitted Successfully!";
                $scope.routes = response.data.routeList;
                                },
                function(response){
                    $scope.routes = typeroutes.routeList;
                });
            }
            else if($scope.townsmodel.length>0 & $scope.cragsectorsmodel.length>0 & $scope.areasmodel.length>0){
                var req = {
                    method: 'POST',
                    url: "http://139.59.22.177:8080/AVATHI_API/rest/ajaxRoute/getRouteListByArea",
                    data: {"townReqList" : selectedTownList, "cragReqList": selectedCragList,
                         "areaReqList": selectedAreaList},
                    headers: {'Content-Type': 'application/json; charset=utf-8'}
                };
                $http(req).then(function success(response){
                $scope.statusval = "Post Data Submitted Successfully!";
                $scope.routes = response.data.routeList;
                                },
                function(response){
                    $scope.routes = arearoutes.routeList;
                });
            }
        };
	}
]);

