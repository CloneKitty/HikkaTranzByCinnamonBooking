// Variables

let priceSingleRoom = 25000;
let priceDoubleRoom = 35000;
let priceTripleRoom = 40000;
let priceExtraBed = 8000;
let priceKidsMeal = 5000;
let priceAdvLocalAdult = 5000;
let priceAdvLocalKid = 2000;
let priceAdvForeignAdult = 10000;
let priceAdvForeignKid = 5000;
let priceAdultGuide = 1000;
let priceKidGuide = 500;
let totalGuideCost = 0;
let noLocalAdult = 0;
let noLocalKid = 0;
let noForeignAdult = 0;
let noForeignKid = 0;
let hrsLocalAdult = 0;
let hrsLocalKid = 0;
let hrsForeignAdult = 0;
let hrsForeignKid = 0;
let totalNumberRoomLoyal = 0;
let lyl = 0;

// Variables needed for codes

let roomCost =0;
let adventureCost =0;
let overallCost =0;
let guideCost =0;

// Get reference to interactive elements

// Customer details

const theForm = document.getElementById("bookform");
const theAdvForm = document.getElementById("adventureform");
const fullName = document.getElementById("username");
const emailAdd = document.getElementById("emailadd");
const phoneNumb = document.getElementById("phonenum");

// Room booking details

const singleRoom = document.getElementById("singleroom");
const doubleRoom = document.getElementById("doubleroom");
const tripleRoom = document.getElementById("trpileroom");
const checkinDate = document.getElementById("checkindate");
const checkoutDate = document.getElementById("checkoutdate");
const extraBeds = document.getElementById("extrabed");
const kidsMeal = document.getElementById("kidmeal");
const extraRequirementradio = document.getElementsByName("extraView");
const extraRequirementcheckbox = document.getElementsByName("extrareq");
const checkBoxes = document.querySelectorAll('.checkGroup'); 
const promoCode = document.getElementById("promocode");
const bookRoomForm = document.getElementById('currentroomcost');
const roomForm = document.querySelectorAll('#bookform input');

// Adventure booking details

const advlocalAdult = document.getElementById("localadult");
const advlocalAdulthrs = document.getElementById("localadulthrs");
const advlocalKids = document.getElementById("localkid");
const advlocalKidshrs = document.getElementById("localkidhrs");
const advforeignAdult = document.getElementById("foreignadult");
const advforeignAdulthrs = document.getElementById("foreignadulthrs");
const advforeignKids = document.getElementById("foreignkid");
const advforeignKidshrs = document.getElementById("foreignkidhrs");
const guideRequirementCheckBox = document.getElementsByName("guidereq");
const bookAdventureForm = document.getElementById('currentadventurecost');
const adventureForm = document.querySelectorAll('#adventureform input');

// Output

const outputParagraph = document.getElementById("outputoverall");

// Buttons

const bookAdventureBtn = document.getElementById("bookadventure");
const bookNowBtn = document.getElementById("booknow");
const favBtn = document.getElementById("favbutt");
const loyaltyBtn = document.getElementById("loyaltybutt");

// Current Booking text fields

const txtcurrentadventureCost = document.getElementById("currentadventurecost");
const txtCurrentRoomCost = document.getElementById("currentroomcost");

//Date validation
checkinDate.addEventListener('change',DateCalculation);
checkoutDate.addEventListener('change',DateCalculation);


function DateCalculation(){
    let checkin = checkinDate.value;
    let checkout = checkoutDate.value;
    let NewCheckIn = new Date(checkin);
    let NewCheckOut = new Date(checkout);

    if(NewCheckOut < NewCheckIn)
    {
        alert(`Please Enter Valid Date !!`)
    }
    bookDays = Math.round((new Date(checkout) - new Date(checkin)) / (24 * 3600 * 1000));

    return bookDays;
}

// Function for calculate Room booking cost

function calculateRoomCost() {

    DateCalculation();

    let noSingleRoom = parseInt(singleRoom.value);
    let noDoubleRoom = parseInt(doubleRoom.value);
    let noTripleRoom = parseInt(tripleRoom.value);
    let noKidsMeal = priceKidsMeal * parseInt(kidsMeal.value);
    let noExtraBedsCost = priceExtraBed * parseInt(extraBeds.value);

    roomCost = (((noSingleRoom * priceSingleRoom) + (noDoubleRoom * priceDoubleRoom) + (noTripleRoom * priceTripleRoom)) * bookDays) + noExtraBedsCost + noKidsMeal;

}
extraRequirementcheckbox.forEach(checkbox => checkbox.addEventListener('change', currentBookingCost));

extraRequirementradio.forEach(checkbox => checkbox.addEventListener('select', currentBookingCost))

roomForm.forEach(input => input.addEventListener('change', currentBookingCost));

// Update the current booking

function currentBookingCost()
{
    calculateRoomCost();
    
    if(promoCode.value === "promo123")

    {
        let discount = ((roomCost/100)*5);
        roomCost -= discount;
    }
    txtCurrentRoomCost.innerHTML = `
    <h1>Current Booking</h1>
    <p>Full Name: ${fullName.value}</p>
    <p>Email: ${emailAdd.value}</P>
    <p>Phone Number: ${phoneNumb.value}</p>
    <p>Single Rooms: ${singleRoom.value}</p>
    <p>Double Rooms: ${doubleRoom.value}</p>
    <p>Triple Rooms: ${tripleRoom.value}</p>
    <p>Check-in Date: ${checkinDate.value}</p>
    <p>Check-out Date: ${checkoutDate.value}</p>
    <p>Extra Beds: ${extraBeds.value}</p>
    <p>No of Kids meals: ${kidsMeal.value}</p>
    <p>Extra View Requirement: ${getExtraView()}</p>
    <p>Extra Requirement: ${getExtraRequirements()}</p>
    <p>Cost: ${roomCost.toFixed(2)}LKR</p>`;

}

//Add extra requirement (AC/ WIFI)

function getExtraRequirements()
{
    const selectedExtras = [];
    extraRequirementcheckbox.forEach(checkbox => {if(checkbox.checked){
        selectedExtras.push(checkbox.id);
    }
    })
    return selectedExtras.join(', ');
}

//View reqirement array limitation and add element

function getExtraView()
{
    const selectView = [];
    extraRequirementradio.forEach(checkbox => 
        {
            if(checkbox.checked)
                 {
                   if(selectView.length === 0)
                    {
                        selectView.push(checkbox.id);
                    }
                }
        }   
    )
    return selectView.join()
}

//Limit check box inputs into 1 

checkBoxes.forEach(checkbox => 
    {
    checkbox.addEventListener('change',function()
    {
        checkBoxes.forEach(cbox => {
            if (cbox !== checkbox){
                cbox.checked = false;
            }
        });
    });
})


// Function for calculate Adventure booking cost

function calculateAdventureCost()
{
    let noLocalAdult = parseInt(advlocalAdult.value);
    let noLocalKid = parseInt(advlocalKids.value);
    let noForeignAdult = parseInt(advforeignAdult.value);
    let noForeignKid = parseInt(advforeignKids.value);

// Duration

    let hrsLocalAdult = parseInt(advlocalAdulthrs.value);
    let hrsLocalKid = parseInt(advlocalKidshrs.value);
    let hrsForeignAdult = parseInt(advforeignAdulthrs.value);
    let hrsForeignKid = parseInt(advforeignKidshrs.value);
 

    adventureCost = (((noLocalAdult * priceAdvLocalAdult)*hrsLocalAdult)+((noLocalKid*priceAdvLocalKid)*hrsLocalKid)+((noForeignAdult* priceAdvForeignAdult)*hrsForeignAdult)+((noForeignKid* priceAdvForeignKid)*hrsForeignKid) + guideCost);

}

// Function for calculate guide cost

//Event listeners
guideRequirementCheckBox.forEach(item => item.addEventListener("change", guideTotal));

//function
function guideTotal()

{

    if (this.id === "adultguide")
    {
        if(this.checked){
            guideCost = guideCost + priceAdultGuide;
        } else {
            guideCost = guideCost - priceAdultGuide;
        }
    } else if(this.id === "kidguide")
    {
        if(this.checked){
            guideCost = guideCost + priceKidGuide;
        } else {
            guideCost = guideCost - priceKidGuide;
        }
    } 
    adventureCost = (((noLocalAdult * priceAdvLocalAdult)*hrsLocalAdult)+((noLocalKid*priceAdvLocalKid)*hrsLocalKid)+((noForeignAdult* priceAdvForeignAdult)*hrsForeignAdult)+((noForeignKid* priceAdvForeignKid)*hrsForeignKid)+ guideCost);
    adventureBookingCost();

}
//Event listener for change the current adventure cost when updating the inputs

adventureForm.forEach(input => input.addEventListener('change',adventureBookingCost,));

//Update current Adventure booking

function adventureBookingCost()
{
    calculateAdventureCost();

    txtcurrentadventureCost.innerHTML =
     `
    <h1>Current Adventure Booking</h1>
    <p>No of Local Adults: ${advlocalAdult.value} Time Duration: ${advlocalAdulthrs.value}</p>
    <p>No of Local Kids: ${advlocalKids.value} Time Duration: ${advlocalKidshrs.value}</p>
    <p>No of Local Kids: ${advforeignAdult.value} Time Duration: ${advforeignAdulthrs.value}</p>
    <p>No of Local Kids: ${advforeignKids.value} Time Duration: ${advforeignKidshrs.value}</p>
    <p>Cost: ${adventureCost.toFixed(2)}LKR</p>
    `
}

//Display Booking details on a text field

function outputoverallText()
{
    if(theForm.checkValidity())
    {
    currentBookingCost();

    calculateRoomCost();

    saveLoyaltyToLS();

    outputParagraph.innerHTML = 

    `
    <p>Full Name: ${fullName.value}</p>
    <p>Email: ${emailAdd.value}</p>
    <p>Phone Number: ${phoneNumb.value}</p>
    <p>Check-in Date: ${checkinDate.value}</p>
    <p>Check-out Date: ${checkoutDate.value}</p>
    <p>Number Of Single Rooms: ${singleRoom.value}</p>
    <p>Number Of Double Rooms: ${doubleRoom.value}</p>
    <p>Number Of Triple Rooms: ${tripleRoom.value}</p>
    <p>Number Of Extra Beds: ${extraBeds.value}</p>
    <p>No of Kids meals: ${kidsMeal.value}</p>
    <p>Extra View Requirement: ${getExtraView()}</p>
    <p>Extra Requirement: ${getExtraRequirements()}</p>
    <p>Cost: ${roomCost.toFixed(2)}LKR</p>
    `

    theForm.reset();
    txtCurrentRoomCost.innerHTML = ""

    }
}

//Button to update the overall 

function submitButtonClick()
{

    outputoverallText();
}

//Event listner for book now button

bookNowBtn.addEventListener("click",submitButtonClick);

//Function for adventure booking alert

function alertAdventureOutput(event)
{

    if(theAdvForm.checkValidity())
    {
        
    event.preventDefault();
    
    calculateAdventureCost();
    
    outputoverallText();

    let advOutputText = `Thank you for choosing Hikka Tranz by Cinnamon have a great vacation!\nYou have selected\n No Local Adults: ${advlocalAdult.value} for ${advlocalAdulthrs.value}Hours \n No Foreign Adults: ${advforeignAdult.value} for ${advforeignAdulthrs.value}Hours\n No Local Kids: ${advlocalKids.value} for ${advlocalKidshrs.value}Hours\n No Foreign Kids: ${advforeignKids.value} for ${advforeignKidshrs.value}Hours\nTotal ${adventureCost.toFixed(2)}LKR`;

    alert(advOutputText);

    outputParagraph.innerHTML = '';

    txtcurrentadventureCost.innerHTML = '';

    theAdvForm.reset();

    } 
    
}
//Show alert when click on the book adventure

bookAdventureBtn.addEventListener("click", alertAdventureOutput);

//Favourtite button

//Event listner for add to favorite button

favBtn.addEventListener("click", saveFavouriteToLS);

//function for saving current booking for local storage

function saveFavouriteToLS()
{

    if (theForm.checkValidity())
    {

    localStorage.removeItem('favOrder')

    let favOrder = {
        fullname:fullName.value,
        email:emailAdd.value,
        phonenumber:phoneNumb.value,
        nosingleroom:singleRoom.value,
        nodoubleroom:doubleRoom.value,
        notripleroom:tripleRoom.value,
        checkIndate:checkinDate.value,
        checkOutdate:checkoutDate.value,
        viewRequirement:getExtraView(),
        extrarequirement:getExtraRequirements(),
        nokidsmeal:kidsMeal.value,
        noextrabeds:extraBeds.value,
        totalCost:roomCost.toFixed(2),
    };
    const favOrderJSON = JSON.stringify(favOrder);
    localStorage.setItem("favOrder",favOrderJSON);

    alert("Your Order was succesfully saved to favourites")
    }
}
//Check Loyalty

//Loyalty Calculation Function

function calculateLoyalty()
{
    let noSingleRoomLoyal = parseInt(singleRoom.value);
    let noDoubleRoomLoyal = parseInt(doubleRoom.value);
    let noTripleRoomLoyal = parseInt(tripleRoom.value);

    let totalNumberRoomLoyal = (noSingleRoomLoyal + noDoubleRoomLoyal + noTripleRoomLoyal);

    if(totalNumberRoomLoyal > 3)
    {
        lyl = (totalNumberRoomLoyal * 20);
    }else
    {
        lyl = (totalNumberRoomLoyal * 0);
    }   
}

//Function to save Loyalty in Local Storage

function saveLoyaltyToLS()
{

    calculateLoyalty();

    let earnedloyaltyPoint ={
        LoyaltyPoint:lyl,
    }
    const earnedloyaltyPointJSON = JSON.stringify(earnedloyaltyPoint);
    localStorage.setItem("earnedloyaltyPoint",earnedloyaltyPointJSON);

    alert(`You got ${lyl} Points!`);
} 

//Event listener to loyalty button

loyaltyBtn.addEventListener('click', getItemFromLS);

//Get item from local storage

function getItemFromLS()
{

    const savedLoyaltyPointsJSON =localStorage.getItem('earnedloyaltyPoint');

    if(savedLoyaltyPointsJSON)
    {
        const savedLoyaltyPoints = JSON.parse(savedLoyaltyPointsJSON);
        const finalLoyaltyRes = savedLoyaltyPoints.LoyaltyPoint || 0;
    alert(`You've have ${finalLoyaltyRes} points`);
    }
    else
    {
        alert(`You got no points`);
    }
}

