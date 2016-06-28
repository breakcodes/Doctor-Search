$('document').ready(function(){

var query = window.location.search.substring(1);

//Parsing Uri parameter to find the doctor's id
var pos = query.indexOf('=');
var key = query.substring(0, pos);
var val = query.substring(pos + 1);

//Link to make call to the practo api using web app
var link = 'http://127.0.0.1:8085/doctors/profile/'+val;

$.getJSON(link, function(data){

	var obj = JSON.parse(data);

		// Parsing Json to extract the details of a doctor	
		var photo;	
		if(obj.photos.length >0){
			photo = obj.photos[0].photo_url;
		}
		else{
			photo = 'https://lh3.googleusercontent.com/P0NGOaUkQNiO-PhqBhh2ywcXPAlBzP2FKrProoZ5qffK-plUBa_4NXtITCodWSI-Igw=w300';
		}

		var practices;
		if(obj.relations.length>0){
			practices = obj.relations[0].practice.name;
		}
		else{
			practices = 'No practices found';
		}

		var address;
		if(obj.relations.length >0){
			if(typeof(obj.relations[0].practice) != 'undefined'){
				address = obj.relations[0].practice.street_address;
			}
			if(typeof (obj.relations[0].practice.locality) != 'undefined'){
				address = address + obj.relations[0].practice.locality.city.name;
			}
		}
		
		var consultationFees;
		if(obj.relations.length >0){
			consultationFees = obj.relations[0].consultation_fee;
		}
		else{
			consultationFees = 'Not Provided';
		}
		
		var recommendation;
		if(typeof (obj.recommendation) != 'undefined' ){
			recommendation = obj.recommendation.recommendation;
		}
		else{
			recommendation = 'Not recommendations';
		}
		
		var services=[];
		for(var i = 0;i<obj.services.length;i++){
			services.push(obj.services[i].service.name);
		}

		if(obj.services.length == 0){
			services.push('No services Provided');
		}
		
		var qualifications = [];
		for(var i = 0;i<obj.qualifications.length;i++){
			qualifications.push(obj.qualifications[i].qualification.name);
		}

		if(obj.qualifications.length == 0){
			qualifications.push('No qualifications proviced');
		}

		var awards;
		if(obj.awards.length >0){
			awards = obj.awards[0].title;
		}
		else{
			awards = 'No awards';
		}

		var name = obj.name;
		
		// Rendering the data on the UI.
		$('#image').attr('src',photo);
		$('#name').text(name);
		$('#practices').text(practices);
		$('#address').text(address);
		$('#fees').text(consultationFees);
		$('recommendations').text(recommendation);
		$('#services').text(services);
		$('#qualification').text(qualifications);
		$('#awards').text(awards);

	});
});
