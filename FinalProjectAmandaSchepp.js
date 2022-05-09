
/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e){
    hideErrors();

    if(formHasErrors()){

        e.preventDefault();
        return false;
    }

    return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e){
    if ( confirm('Clear order?') ){
        hideErrors();
        
        document.getElementById("qty1").focus();
        
        return true;
    }

    e.preventDefault();
    
    return false;   
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors(){
    let errorFlag = false;

    let requiredFields = ["fullname","address","city","postal","email", "cardname", "cardnumber"];

    for(let i=0; i<requiredFields.length; i++){
        let textField = document.getElementById(requiredFields[i]);
        if(!formFieldHasInput(textField)){
            document.getElementById(requiredFields[i] + "_error").style.display = "block";

            if(!errorFlag){
                textField.focus();
                textField.select();
            }
            errorFlag = true;
        }
    }

    let regexEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    let regexPostal = new RegExp(/[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d/);

    let emailValue = document.getElementById("email").value;
    if(!regexEmail.test(emailValue)){
        document.getElementById("emailformat_error").style.display = "block";

        if(!errorFlag){
            document.getElementById("email").focus();
            document.getElementById("email").select();
        }
        errorFlag = true;
    }

    let postalValue = document.getElementById("postal").value;
    if(!regexPostal.test(postalValue)){
        document.getElementById("postalformat_error").style.display = "block";

        if(!errorFlag){
            document.getElementById("postal").focus();
            document.getElementById("postal").select();
        }
        errorFlag = true;
    }

    let card = ["visa", "amex","mastercard"];
    let cardChecked = false;

    for(let i = 0; i < card.length && !cardChecked; i++){
        if(document.getElementById(card[i]).checked){
            cardChecked = true;
        }
    }

    if(!cardChecked){
        document.getElementById("cardtype_error").style.display = "block";
        errorFlag = true;
    }

    if(document.getElementById("month").selectedIndex <= 0)
    {
        document.getElementById("month_error").style.display = "block";
        errorFlag = true;
    }

    let currentMonth = new Date().getMonth();
    let selectedMonth = document.getElementById("month").selectedIndex;
    if(currentMonth >= selectedMonth )
    {
        document.getElementById("expiry_error").style.display = "block";
        errorFlag = true;
    }

    let regexCardNum = new RegExp(/^[0-9]{10}$/);
    let cardValue = document.getElementById("cardnumber").value;
    if(!regexCardNum.test(cardValue))
    {
        document.getElementById("invalidcard_error").style.display = "block";
        errorFlag = true;
    }

    return errorFlag;
}


/*
 * Hides all of the error elements.
 */
function hideErrors(){
    let error = document.getElementsByClassName("error");

    for ( let i = 0; i < error.length; i++ ){
        error[i].style.display = "none";
    }
}

/*
 * Determines if a text field element has input, Taken from the Formvalidation by Alan
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement){
    // Check if the text field has a value
    if ( fieldElement.value == null || trim(fieldElement.value) == "" )
    {
        return false;
    }
    return true;
}

/*
 * Handles the load event of the document.
 */
function load(){

    document.getElementById("orderform").addEventListener("submit", validate);
    document.getElementById("orderform").addEventListener("clear", resetForm);
    document.getElementById("orderform").reset();

    hideErrors();

    let year = document.getElementById("year");
    let currentDate = new Date();
    for(let i = 0; i < 7; i++){
        let newYearOption = document.createElement("option");
        newYearOption.value = currentDate.getFullYear() + i;
        newYearOption.innerHTML = currentDate.getFullYear() + i;
        year.appendChild(newYearOption);
    }

}

/*
 * Removes white space from a string value.
 * Borrowed from the p2 utility file.
 * return  A string with leading and trailing white-space removed.
 */
function trim(str) 
{
    return str.replace(/^\s+|\s+$/g,"");
}

document.addEventListener("DOMContentLoaded", load);
