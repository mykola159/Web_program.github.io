document.addEventListener("DOMContentLoaded", function () {
    const addPublicationButton = document.getElementById("addPublication");
    const mainContainer = document.querySelector("main");

    // Отримати збережені публікації з локального сховища
    let savedPublications = JSON.parse(localStorage.getItem("publications")) || [];

    // Відобразити збережені публікації
    savedPublications.forEach((publicationData) => {
        const newPublication = createPublicationElement(publicationData.author, publicationData.age, publicationData.description);
        mainContainer.appendChild(newPublication);
    });

    addPublicationButton.addEventListener("click", function () {
        const newPublication = createPublication();
        mainContainer.insertBefore(newPublication, mainContainer.firstChild);
    });

    function createPublication() {
        const authorInput = document.createElement("input");
        authorInput.type = "text";
        authorInput.placeholder = "name";

        const ageInput = document.createElement("input");
        ageInput.type = "number";
        ageInput.placeholder = "age";

        const descriptionInput = document.createElement("textarea");
        descriptionInput.placeholder = "Description of the author";

        const saveButton = document.createElement("button");
        saveButton.textContent = "to add";
        saveButton.addEventListener("click", function () {
            const author = authorInput.value;
            const age = ageInput.value;
            const description = descriptionInput.value;
            if (author && age && description) {
                const newPublication = createPublicationElement(author, age, description);
                mainContainer.appendChild(newPublication);
                authorInput.value = "";
                ageInput.value = "";
                descriptionInput.value = "";

                // Зберегти публікацію в локальне сховище
                savedPublications.push({ author, age, description });
                localStorage.setItem("publications", JSON.stringify(savedPublications));
            }
        });

        const publication = document.createElement("section");
        publication.className = "publication";
        publication.appendChild(authorInput);
        publication.appendChild(ageInput);
        publication.appendChild(descriptionInput);
        publication.appendChild(saveButton);

        return publication;
    }

    function createPublicationElement(author, age, description) {
        const publication = document.createElement("section");
        publication.className = "publication";

        const greetingElement = document.createElement("p");
        greetingElement.innerHTML = `hello, my name is ${author}, ${age} age.<br>${description}`;

        const editButton = document.createElement("button");
        editButton.textContent = "edit";
        editButton.style.marginRight = "10px"; // Встановлюємо відступ праворуч для кнопки "edit"
        editButton.style.marginBottom = "5px"; // Встановлюємо відступ між кнопками "edit" та "delete"
        editButton.addEventListener("click", function () {
            editPublication(publication, author, age, description);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.addEventListener("click", function () {
            mainContainer.removeChild(publication);

            // Оновити збережені публікації після видалення
            const updatedPublications = savedPublications.filter((publicationData) => {
                return !(publicationData.author === author && publicationData.age === age && publicationData.description === description);
            });
            savedPublications = updatedPublications;
            localStorage.setItem("publications", JSON.stringify(savedPublications));
        });

        publication.appendChild(greetingElement);
        publication.appendChild(editButton);
        publication.appendChild(deleteButton);

        return publication;
    }

    function editPublication(publication, author, age, description) {
        const newAuthor = prompt("Your name:", author);
        const newAge = prompt("your age:", age);
        const newDescription = prompt("your new description:", description);

        if (newAuthor !== null && newAge !== null && newDescription !== null) {
            const greetingElement = publication.querySelector("p");
            greetingElement.innerHTML = `hello, my name is ${newAuthor}, ${newAge} age.<br>${newDescription}`;

            // Оновити збережені публікації після редагування
            const updatedPublications = savedPublications.map((publicationData) => {
                if (publicationData.author === author && publicationData.age === age && publicationData.description === description) {
                    return { author: newAuthor, age: newAge, description: newDescription };
                }
                return publicationData;
            });

            savedPublications = updatedPublications;
            localStorage.setItem("publications", JSON.stringify(savedPublications));
        }
    }

});
