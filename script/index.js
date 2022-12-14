// function main() {}

// module.exports = { main }


// let API_url = 'https://swapi.dev/api/people/?page=1';

//this async method fetches the info from the api,
// then returns it as a response which is the given to the data variable in a json format


async function fetchPeople() {

    try {

        const response = await fetch('https://swapi.dev/api/people');

        if(!response.ok) {
            throw new Error(`Something went weong: ${response.status}`)
        }

        return response.json()
    }

    catch(e) {
        console.log(e);
    }
}


//this function is used in creating the people list and web kits i.e the html tags
function listPeople(elementId) {

    const poepleContainerElement = document.getElementById(elementId);

    if (!elementId) {
        return
    }

    fetchPeople().then(data => {

        //the project demands that we return images or dummy images, but i decided to create arrays of image to be added as new properties to our fetchd object

        let image_array = ['luke_skywalker.jpeg', 'c-3po.jpeg', 'r2d2.jpeg', 'darth_varda.jpeg', 'Leia_Organa.jpeg', 'owen_lars.jpeg', 'beru_whitesun.jpeg', 'r5-d4.jpeg', 'biggsHS-ANH.jpeg', 'obi_won.jpeg']
        
        // since the fetched data is an object, the values of its key called result has all that we need for this project, therefore, i created another variable for it

        let obj_array = data.results;
        
        let output = '';

        //this loop destructure the obj-array, and add an image property to each objects in the obj_array

        for(let x in obj_array) {
            // if(obj_array) {
                obj_array[x].image = image_array[x];
            // }
        }

        //this block of code loops through the objects at obj_arrays, and append the name, height and gender properties to the html

        for(let i in obj_array){

            let prop = obj_array[i];

            output += `
            <div class='container'>
               <div class='content'>
                    <div class='card_img'>
                        <img src=./picture/${prop.image} alt='actors' style="max-with: 400px;"/>
                    </div>
                    <div class = 'card_content'>
        
                           <a href='#' onclick='event.preventDefault()'>${prop.name}</a>
                            <p class='click'>Height  : ${ prop.height }cm </p>
                            <p class='click'>Gender  :  ${ prop.gender?prop.gender: ' N/A '}</p>
                    
                    </div>
               </div>
            </div>
            `
        };




        // console.log(obj_array);

        poepleContainerElement.innerHTML = output;
        

    }).catch(err => {
        console.log('No Actor Found', err)
    })

    // return poepleContainerElement;



 
};

