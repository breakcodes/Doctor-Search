$('document').ready(function()
{
	$('#previous').addClass('hide');
	$('#next').addClass('hide');
	
	var flag = 0;
	$('#search-button').on('click', function(){
		flag = 0
		action(flag);
		$('#previous').removeClass('hide');
		$('#next').removeClass('hide');
	})

	//On pressing enter key search starts
	$('#specialization').keyup(function(event){
    if(event.keyCode == 13){
        action(flag)
        $('#previous').removeClass('hide');
		$('#next').removeClass('hide');
    	}	
	})

	$('#locality').keyup(function(event){
    if(event.keyCode == 13){
        action(flag)
        $('#previous').removeClass('hide');
		$('#next').removeClass('hide');
    	}	
	})

	$('#previous').on('click', function(){
		flag--
		if(flag < 0)
			flag = 0
		action(flag)
		$('html,body').scrollTop(0);

	})

	$('#next').on('click', function(){
		flag++
		action(flag)
		$('html,body').scrollTop(0);

	})

})

function action(flag)
{
	
	var specialization = $('#specialization').val().trim()
	var locality = $('#locality').val().trim()

	specialization = String(specialization).toLowerCase()
	locality = String(locality).toLowerCase()

	var offset = flag * 10

	// Search based on the location and specialization
	if(specialization.length > 0 && locality.length > 0)
	{

			link = 'http://127.0.0.1:8085/doctors/search0/'+locality+'/'+specialization+'/'+offset
	}
	
	//Search based only on location
	if(specialization.length == 0)
	{
			link = 'http://127.0.0.1:8085/doctors/search1/'+locality+'/'+offset
	}

	//Prompts if location is not entered as practo api does not allow api calls without location
	if(locality.length == 0)
	{
			window.alert('Please Enter location to procees')
	}

	$.getJSON(link, function(data){
		var obj=(JSON.parse(data))
		var doctorList = '' 
		//Parsing Json to find required data

		if(obj.doctors.length == 0)
		{
			window.alert('No doctors found')
		}


		for(var i = 0;i < obj.doctors.length;i++)
		{

			var name = obj.doctors[i].doctor_name
			var did = obj.doctors[i].doctor_id

			var experienceScore = obj.doctors[i].appointment_experience_score
			
			if(obj.doctors[i].photos.length >0)
				photo = obj.doctors[i].photos[0].url
			else
				photo = 'https://lh3.googleusercontent.com/P0NGOaUkQNiO-PhqBhh2ywcXPAlBzP2FKrProoZ5qffK-plUBa_4NXtITCodWSI-Igw=w300'
				//Default image if the image is not provided

			var consultationFees = 'Not allowed' 
			consultationFees = obj.doctors[i].consultation_fees

			var qual = []
			for ( j = 0; j < obj.doctors[i].qualifications.length;j++)
				qual.push(obj.doctors[i].qualifications[j].qualification.name)

			if(obj.doctors[i].qualifications.length == 0)
				qual.push('No qualifications found')

			var recommendationPercent = obj.doctors[i].recommendation_percent

			doctorList+=
						'<div class=\'row list-row\'>'+
						'<a id='+did+' onClick=\'render(this.id)\' >'+
						'<div class=\'col-sm-4 \'>'+
						'<center>'+
						'<img src='+photo+' style=\'width:60%\'>'+
						'</center>'+
						'</div>'+
						'<div class=\'col-sm-8\'>'+
						'<table class=\'table table-striped\'>'+
						'<tr><td>NAME</td><td>'+name+'</td></tr>'+
						'<tr><td>QUALIFICATION</td><td>'+qual+'</td></tr>'+
						'<tr><td>EXPERIENCE SCORE</td><td>'+experienceScore+'</td></tr>'+
						'<tr><td>CONSULTATION FEE</td><td>'+consultationFees+'</td></tr>'+
						'<tr><td>RECOMMENDATION</td><td>'+recommendationPercent+'%</td></tr>'+
						'</table>'+
						'</div>'+
						 '</a>'+
						'</div>'+
						'<div class=\'row\'>'+
						'<hr class=\'half-line\'>'+
						'</div>'
		}
	//Displaying doctor info on the card
	$('#card').html(doctorList)	
	})
}

//Moving to next page to dislay doctor's detailed profile
function render(id)
{
	window.location = 'profile.html?id=' + id
}
