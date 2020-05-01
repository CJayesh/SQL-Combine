function run() {
    document.getElementById('inputFile').addEventListener('change', handleFile);
    document.getElementById('outputTextArea').addEventListener('drop', handleDroppedFile);
}

function handleDroppedFile(event) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    processFiles(files);
}

function handleFile() {
    processFiles(this.files);
}

function processFiles(files) {
    const uploadedFiles = files;
    document.getElementById('copied').classList.add('hide');
    const comment = '-'.repeat(10);
    const output = document.getElementById('outputTextArea');
    const fileNames = document.getElementById('fileNames');
    output.value = '';
    fileNames.textContent = '';

    let filePromises = Array.from(uploadedFiles).map(file => readFile(file));
    Promise.all(filePromises)
    .then(responses => {
        responses.forEach(response => {
            if (response.name.split('.').pop() === "sql") {
                output.value += comment.concat(response.name, comment, '\n');
                output.value += response.text.concat('\nGO\n\n\n');
                fileNames.textContent += response.name.concat('\n');
            }
        });
    });
}

function readFile(file) {
    return new Promise(resolve => {
        const fileReader = new FileReader();
        fileReader.onload = function() {
            const fileData = {name: file.name, text: fileReader.result.concat('\n\n\n')};
            resolve(fileData);
        };
        fileReader.readAsText(file);
    });
}

function copyToClipboard() {
    const selection = document.getElementById('outputTextArea');
    selection.select();
    document.execCommand('copy');
    document.getElementById('copied').classList.remove('hide');
}

function reset() {
    document.getElementById('inputFile').value = '';
    document.getElementById('outputTextArea').value = '';
    document.getElementById('fileNames').textContent = '';
    document.getElementById('copied').classList.add('hide');
}