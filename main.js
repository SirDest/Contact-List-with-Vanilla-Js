window.addEventListener("load", (e) => {
  // Saving contacts data into the local storage
  contactStorage = JSON.parse(localStorage.getItem("contacts")) || [];

  // variables
  const contactForm = document.querySelector(".getContactsForm");
  const contactDiv = document.querySelector(".getContact");
  const cancelAddButton = document.querySelector("#cancelbut");
  const searchInput = document.querySelector(".inputs");
  const addContactButton = searchInput["addContacts"];
  const deleteAll = document.querySelector(".delete");
  const firstNameInput = contactForm["firstName"];
  const lastNameInput = contactForm["lastName"];
  const emailInput = contactForm["emailAddress"];
  const phoneInput = document.querySelector("#phoneNumber");
  const contactList = document.querySelector(".list-contact");
  const contactsDetails = document.querySelector(".contactdetails");
  const selectAll = document.querySelector(".selectall");
  const firstNameDetails = document.querySelector(".firstnameinputdet");
  const lastNameDetails = document.querySelector(".lastnameinputdet");
  const emailDetails = document.querySelector(".emailinputdet");
  const phoneDetails = document.querySelector(".numberinputdet");

  // this is to remove the contact display form
  const removeContactDet = () => {
    contactsDetails.style.display = "none";
  };
  // Search input
  const findContacts = (e) => {
    e.preventDefault;
    const searchedText = e.target.value.toLowerCase();
    const contactData = document.querySelectorAll(".list-contact tr");
    contactData.forEach((each) => {
      const cells = each.querySelectorAll("td");
      const phoneNumCell = cells[4];
      const lastName = cells[1].innerHTML.toLowerCase();
      const firstName = cells[2].innerHTML.toLowerCase();
      const email = cells[3].innerHTML.toLowerCase();
      const phoneNum = cells[4].innerHTML.toLowerCase();
      if (
        firstName.includes(searchedText) ||
        lastName.includes(searchedText) ||
        phoneNum.includes(searchedText) ||
        email.includes(searchedText)
      ) {
        phoneNumCell.parentElement.style.display = "";
      } else {
        phoneNumCell.parentElement.style.display = "none";
      }
    });
  };
  const contactRowDetails = (e) => {
    e.preventDefault();
    const contactRow = document.querySelectorAll(".list-contact tr");
    contactRow.forEach(each => {
      each.addEventListener("click", () => {
        const editButton = contactsDetails.querySelector(".editdetails");
        if (contactsDetails.style.display === "none") {
          contactsDetails.style.display = "inline-block";
        } else {
          contactsDetails.style.display = "none";
        }

        const removeDetail = document.querySelector(".canceldetails");
        removeDetail.addEventListener("click", removeContactDet);
        const cells = each.querySelectorAll("td");
        const lastName = cells[1].innerHTML;
        const firstName = cells[2].innerHTML;
        const email = cells[3].innerHTML;
        const phone = cells[4].innerHTML;
        firstNameDetails.value = firstName;
        lastNameDetails.value = lastName;
        phoneDetails.value = phone;
        emailDetails.value = email;
        let id = contactStorage.find((item) => item.phone === phone);
        const editInfo = (e) => {
          e.preventDefault();
          if (editButton.value.toLowerCase() == "edit contact") {
            firstNameDetails.removeAttribute("readonly");
            lastNameDetails.removeAttribute("readonly");
            phoneDetails.removeAttribute("readonly");
            emailDetails.removeAttribute("readonly");
            lastNameDetails.focus();
            firstNameDetails.style.color = "black";
            lastNameDetails.style.color = "black";
            phoneDetails.style.color = "black";
            emailDetails.style.color = "black";
            editButton.value = "Save";
          } else {
            firstNameDetails.setAttribute("readonly", "readonly");
            lastNameDetails.setAttribute("readonly", "readonly");
            emailDetails.setAttribute("readonly", "readonly");
            phoneDetails.setAttribute("readonly", "readonly");
            editButton.value = "Edit Contact";
            // contactsDetails.style.display = 'none';
            const newLastName =
              contactsDetails.querySelector(".lastnameinputdet");
            const newFirstName =
              contactsDetails.querySelector(".firstnameinputdet");
            const newEmail = contactsDetails.querySelector(".emailinputdet");
            const newPhone = contactsDetails.querySelector(".numberinputdet");
            firstNameDetails.style.color = "grey";
            lastNameDetails.style.color = "grey";
            phoneDetails.style.color = "grey";
            emailDetails.style.color = "grey";
            if (newPhone.value.length !== 11) {
              alert("Number must be 11 digits");
              return false;
            }
            cells[1].innerHTML = newLastName.value;
            cells[2].innerHTML = newFirstName.value;
            cells[3].innerHTML = newEmail.value;
            cells[4].innerHTML = newPhone.value;
            id.lastName = newLastName.value;
            id.firstName = newFirstName.value;
            id.email = newEmail.value;
            id.phone = newPhone.value;
            localStorage.setItem("contacts", JSON.stringify(contactStorage));
          }
        };
        editButton.addEventListener("click", editInfo);
      });
    });
  };
  //this is to display the delete all contacts button and set the checkboxes
  const checkboxDeleteAll = () => {
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    if (localStorage.getItem("contacts") === null) {
      addContactButton.disabled = false;
      deleteAll.style.display = "none";
      selectAll.checked = false;
    } else if (
      localStorage.getItem("contacts") !== null &&
      selectAll.checked == true
    ) {
      deleteAll.style.display = "block";
      addContactButton.disabled = true;
      checkboxes.forEach((each) => {
        each.checked = true;
      });
    } else if (
      localStorage.getItem("contacts") !== null &&
      selectAll.checked == false
    ) {
      deleteAll.style.display = "none";
      addContactButton.disabled = false;
      checkboxes.forEach((each) => {
        each.checked = false;
      });
    }
    checkboxes.forEach((a) => {
      a.addEventListener("click", (e) => {
        selectAll.checked = false;
        deleteAll.style.display = "none";
        addContactButton.disabled = false;
      });
    });
  };
  // uncheck checkboxes after deleting
  const unCheckboxes = (e) => {
    e.preventDefault();
    selectAll.checked = false;
  };
  // deleting all contacts;
  const deleteAllContacts = (a) => {
    e.preventDefault();
    localStorage.clear("contacts");
    contactList.innerHTML = "";
    deleteAll.style.display = "none";
    addContactButton.disabled = "false";
  };
  //arranging the contacts accordingly
  contactStorage.sort((a, b) => {
    if (a.lastName < b.lastName) {
      return -1;
    }
    if (a.lastName > b.lastName) {
      return 1;
    }
    return 0;
  });
  // delete icon function
  const deleteEachContact = (e) => {
    e.target.parentElement.parentElement.parentElement.remove();
    let removedItem =
      e.target.parentElement.parentElement.parentElement.childNodes[4]
        .innerHTML;
    const newArr = contactStorage.filter((item) => item.phone !== removedItem);
    contactStorage = newArr;
    localStorage.setItem("contacts", JSON.stringify(contactStorage));
  };
  // this code below is to show the popup display form to add new contacts
  searchInput.addEventListener("submit", (e) => {
    e.preventDefault();
    contactDiv.style.display = "flex";
  });
  // To remove the popup for adding contact
  const removeContactForm = () => {
    contactDiv.style.display = "none";
    contactForm.reset();
  };
  const addContacts = (firstName, lastName, email, phone) => {
    contactStorage.push({
      firstName,
      lastName,
      email,
      phone,
    });
    localStorage.setItem("contacts", JSON.stringify(contactStorage));
    return { firstName, lastName, email, phone };
  };
  const newContact = ({ firstName, lastName, email, phone }) => {
    row = contactList.insertRow();
    const cell1 = row.insertCell();
    const cellLastName = row.insertCell();
    const cellFirstName = row.insertCell();
    const cell4 = row.insertCell();
    const cell5 = row.insertCell();
    const cell6 = row.insertCell();
    cellLastName.innerHTML = lastName;
    cellFirstName.innerHTML = firstName;
    cellFirstName.style.textTransform = "capitalize";
    cellLastName.style.textTransform = "capitalize";
    cell4.innerHTML = email;
    cell5.innerHTML = phone;
    const deleteIcon = document.createElement("button");
    deleteIcon.classList.add("contactdelete");
    const deleteIconLogo = document.createElement("ion-icon");
    deleteIconLogo.name = "trash-outline";
    deleteIcon.appendChild(deleteIconLogo);
    cell6.appendChild(deleteIcon);
    const tableCheckbox = document.createElement("input");
    tableCheckbox.type = "checkbox";
    tableCheckbox.name = "checkbox";
    tableCheckbox.id = "checkbox";
    cell1.appendChild(tableCheckbox);
    cellLastName.classList.add("text-transform");
    deleteIcon.addEventListener("click", deleteEachContact);
    cellLastName.addEventListener("click", contactRowDetails);
    cell4.addEventListener("click", contactRowDetails);
    cell5.addEventListener("click", contactRowDetails);
  };
  contactForm.onsubmit = (e) => {
    // e.preventDefault();
    const firstNameValue = firstNameInput.value;
    const lastNameValue = lastNameInput.value;
    const emailValue = emailInput.value;
    const phoneValue = phoneInput.value;
    if (firstNameValue.trim() === "" || lastNameValue.trim() === "")
      return false;
    // this is to make sure there isnt any duplicate phone number and email address
    for (let i = 0; i < contactStorage.length; i++) {
      if (contactStorage[i].phone === phoneValue) {
        alert("Phone number already exists");
        return false;
      } else if (contactStorage[i].email === emailValue) {
        alert("Mail address already exists");
        return false;
      }
    }
    // this is to make ssure the phone number is of 11 digits
    if (phoneValue.length !== 11) {
      alert("Number must be 11 digits");
      return false;
    }
    const contactsDetails = addContacts(
      firstNameValue.trim(),
      lastNameValue.trim(),
      emailValue.trim(),
      phoneValue.trim()
    );
    newContact(contactsDetails);
    firstNameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    contactDiv.style.display = "none";
  };
  // All event listeners
  contactStorage.forEach(newContact);
  deleteAll.addEventListener("click", deleteAllContacts);
  deleteAll.addEventListener("click", unCheckboxes);
  cancelAddButton.addEventListener("click", removeContactForm);
  selectAll.addEventListener("change", checkboxDeleteAll);
  searchInput.addEventListener("input", findContacts);
});
