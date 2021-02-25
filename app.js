const api_key =`6gtAwh4zHWXKUd8hboy7B5JN14ZwciQKnMVHjVsl`
let numberVal=$('#number')
let number=10
let state=''


function updateSearch(){
state=$('#state').val();
console.log(state)
getParks()
}

$('#number').bind('change', function() {
  number= numberVal.val();
});     


function getParks() {
  console.log(`${state}`)
  fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=${number}&api_key=${api_key}`)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => console.log('Something went wrong. Try again later.'));
}


function displayResults(responseJson) {
$('#results-list')[0].innerHTML=""
console.log(responseJson); 
status=responseJson.status
if(status==='error'){
  $('.results-img').addClass('hidden'); 
  $('.results-message').removeClass('hidden');
  $('#results p')[0].innerHTML="Something went wrong. Please try again later."  
console.log(responseJson);  
}else{
  
}
// $('#results').removeClass('hidden'); 
$('#results-list').empty();
for (let i = 0; i < responseJson.data.length; i++){
$('#results-list').append(
`<li>
  <h3>
    <a href="${responseJson.data[i].url}" target='blank'>
${responseJson.data[i].fullName}
  </a> 
</h3>
<p>${responseJson.data[i].addresses[0].line1}</p>
<p>${responseJson.data[i].addresses[0].city} ${responseJson.data[i].addresses[0].stateCode}, ${responseJson.data[i].addresses[0].postalCode}</p>

<p>${responseJson.data[i].description}</p> 

</li> `

)}
};


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    updateSearch()
  });
}


$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});
