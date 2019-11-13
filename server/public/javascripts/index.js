Dropzone.autoDiscover = false;
var myDropzone = new Dropzone("#dn-dropzone", {
    maxFilesize: 4, // MB,
    //maxFiles: 1,
    timeout: 1000 * 60 * 3,
    success: (file, responseText) => {
        const newHtml = '<img src="data:image/jpeg;base64,' + responseText + '" />';
        console.log(newHtml)
        // The element into which appending will be done
        var element = document.querySelector("#response");
        // The element to be appended
        var child = document.createElement("DIV");
        child.innerHTML = newHtml;
        // append
        element.appendChild(child);
    },
    error: (file, responseText) => {
        console.log('server error: "'+responseText+'"')
    }
});