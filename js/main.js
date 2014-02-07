	$(document).ready(function(){
	// arrays of hashes for the drop downs
	//todo: recreate a json feed that contains all content?
		options = get_options();
		
		populate_select($('#source'), options.source);
		populate_select($('#medium'), options.medium);
		populate_select($('#content'), options.content);
		populate_select($('#campaign'), options.campaign);
		

		$('button#generate').click(function(){
			generate_code();
		})
	

	function populate_select(target, data){
	
		var select = target;
		
		select.append('<option value="">Unkown/Undefined</option>')		

		for(i=0; i < data.length; i++){
			select.append('<option value="'+ data[i].value +'">'+ data[i].label + '</option>')
			}
	}
	
	function insert_utm(url, tag, value){

		if(tag.length && value.length){
			console.log('inserting code')
			return url + get_concatenator(url) + tag + '=' + value;
		}

		else{
			console.log('no code to insert')
			console.log(tag + ' / ' + value)
			return url
		}

	}

	function get_concatenator(url){
		if (url.indexOf("?") < 0 ){
			return "?";
		}

		else{
			return "&";
		}
	}

	$('input,select').click(function(){
		console.log('change is coming!')
		$('div#generated').fadeOut();
	})

	function generate_code(){
		var url = $('select#protocol').val() + $('input#url').val()
		var link_text = $('input#text').val()

		var source = $('select#source').val();
		var campaign = $('select#campaign').val();
		var medium = $('select#medium').val();
		var content = $('select#content').val();

		url = insert_utm(url, 'utm_source', source );
		url = insert_utm(url, 'utm_campaign', campaign );
		url = insert_utm(url, 'utm_medium', medium );
		url = insert_utm(url, 'utm_content', content );
		
		
		$('div#code').html(url)
		$('div#generated').fadeIn();
	}






	function get_options(){
		
		var options =  {
			source:  [
					{value: "students", label: "Students"},
					{value: "hf", label: "High Fliers"},
					{value: "suspects", label: "Suspects"},
					{value: "prospect", label: "Prospects"},
				  ],

			medium: [
							{value:"email", label:"Email"}, 
							{value:"social", label:"Social Media"}
						  ],

			content: [
							{value: "text", label: "Simple Text Link"},
							{value: "graphic", label: "Graphic/Image Link"},
							{value: "button", label: "HTML/Graphic Button"},
							{value: "Logo", label: "Logo Image"}
						  ],

			campaign: [
							{value: "mmba", label: "Monday & MBA"},
							{value: "ethos", label: "Ethos & Echoes"}
						  ]

		}

		return options
	}

	

	})
