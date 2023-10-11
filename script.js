//DOM VARIABLES 
const input = document.getElementById('input');
const searchBtn = document.getElementById('searchBtn');
const resultDiv = document.querySelector('.result');
//API
const apiKey = `ttyf4tUnJ7MNLFjmkLcaJW4k7Lfn4AJv`;
const apiUrl = `api.giphy.com/v1/gifs/search`;

const generateGif = () => {
    
    var gifLimit = 10;
    var gifName = input.value;
    var finalUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${gifName}&limit=${gifLimit}&offset=0&rating=g&lang=en`;
    resultDiv.innerHTML = '<p style="color:#fff;text-align:center;">Searching...</p>';
    if (gifName >= 0 || !gifName) {
        alert('Invalid Gif Name')
    } else {
        fetch(finalUrl).then(resp => resp.json()).then(data => {
            resultDiv.innerHTML = '';
            //default
            var gifData = data.data;
            console.log(gifData);

          //for each 
            gifData.forEach( gif => {
                const innerDom = `
                <div class="resultCon">
                  <img src="${gif.images.downsized_medium.url}" alt="GIF">
                  <button id="copied">Copy Link</button>
                </div>
              `;
              
              // Append the HTML to the resultDiv using innerHTML
              resultDiv.innerHTML += innerDom;

              //onclick func
              var copyBtn = document.getElementById('copied');
                copyBtn.onclick = function(){
                    var copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;
                  
                    // Check if the Clipboard API is supported
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(copyLink).then(() => alert('Gif Copied to ClipBoard'));
                    } else {
                      // If not supported, use a fallback method
                      alert("GIF copied to clipboard");
                      // Create a temporary input element
                      let hiddenInput = document.createElement("input");
                      hiddenInput.setAttribute("type", "text");
                      document.body.appendChild(hiddenInput);
                      hiddenInput.value = copyLink;
                      // Copy the value
                      document.execCommand("copy");
                      // Remove the input element
                      document.body.removeChild(hiddenInput);
                    }
            } 
            })
           
             //btn for copyLink
               
        }).catch((error) => console.error('Error Fetching Data:' + error))
    }
}
searchBtn.addEventListener('click',generateGif);






